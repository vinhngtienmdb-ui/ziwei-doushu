import Anthropic from '@anthropic-ai/sdk';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { LOI_DAN_HE_THONG, dungNguCanhLaSo } from '@/lib/ziwei/ngu-canh-ai';

const MO_HINH_MAC_DINH = 'claude-sonnet-5-5';
const SO_TIN_NHAN_TOI_DA = 30;
const DO_DAI_TIN_NHAN_TOI_DA = 4000;
const SO_TOKEN_TOI_DA = 3000;

interface TinNhan {
  role: 'user' | 'assistant';
  content: string;
}

function laLaSoHopLe(chart: unknown): chart is ZiweiChart {
  if (!chart || typeof chart !== 'object') return false;
  const c = chart as Partial<ZiweiChart>;
  return Array.isArray(c.palaces) && c.palaces.length === 12 && !!c.birthInfo && typeof c.birthInfo === 'object';
}

function docTinNhan(messages: unknown): TinNhan[] | null {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > SO_TIN_NHAN_TOI_DA) return null;
  const ketQua: TinNhan[] = [];
  for (const m of messages) {
    if (!m || typeof m !== 'object') return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    // Lượt trả lời rỗng (ví dụ lần gọi trước bị ngắt giữa chừng) bị bỏ qua thay vì làm hỏng cả yêu cầu
    if (!content.trim()) continue;
    ketQua.push({ role, content: content.slice(0, DO_DAI_TIN_NHAN_TOI_DA) });
  }
  // Mô hình yêu cầu lượt đầu là của người dùng và lượt cuối là câu hỏi cần trả lời
  while (ketQua.length > 0 && ketQua[0].role !== 'user') ketQua.shift();
  return ketQua.length > 0 && ketQua[ketQua.length - 1].role === 'user' ? ketQua : null;
}

export async function POST(request: Request) {
  let noiDung: unknown;
  try {
    noiDung = await request.json();
  } catch {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }
  const { chart, messages } = (noiDung ?? {}) as { chart?: unknown; messages?: unknown };
  const tinNhan = docTinNhan(messages);
  if (!laLaSoHopLe(chart) || !tinNhan) {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }

  const khoaApi = process.env.ANTHROPIC_API_KEY;
  if (!khoaApi) {
    return Response.json({ error: 'chua-cau-hinh' }, { status: 503 });
  }


  const khach = new Anthropic({ apiKey: khoaApi });
  const moHinhRieng = process.env.ANTHROPIC_MODEL;
  const thamSo = {
    model: moHinhRieng || MO_HINH_MAC_DINH,
    max_tokens: SO_TOKEN_TOI_DA,
    system: `${LOI_DAN_HE_THONG}\n\nLÁ SỐ:\n${dungNguCanhLaSo(chart)}`,
    messages: tinNhan,
    // Mô hình mặc định tự "suy nghĩ" trước khi trả lời và có thể dùng hết hạn mức token mà chưa ra chữ nào.
    // Luận giải cần câu trả lời ngay nên tắt bước này. Giá trị do mô hình yêu cầu; bản SDK hiện tại chưa khai báo
    // trường thinking nên ép kiểu. Khi người dùng tự chọn mô hình khác thì không gửi trường này, vì giá trị hợp lệ
    // phụ thuộc từng mô hình.
    ...(moHinhRieng ? {} : { thinking: { type: 'between_tools' } }),
  } as Anthropic.MessageStreamParams;
  const luongMo = khach.messages.stream(thamSo);

  const maHoa = new TextEncoder();
  const luong = new ReadableStream<Uint8Array>({
    start(controller) {
      let daDong = false;
      const gui = (chuoi: string) => {
        if (!daDong) controller.enqueue(maHoa.encode(chuoi));
      };
      const guiVanBan = (text: string) => gui(`data: ${JSON.stringify({ delta: { text } })}\n\n`);
      const dong = () => {
        if (daDong) return;
        gui('data: [DONE]\n\n');
        daDong = true;
        controller.close();
      };

      luongMo.on('text', (text) => guiVanBan(text));
      luongMo.on('error', (e) => {
        // Không đưa chi tiết lỗi của nhà cung cấp ra trình duyệt, tránh lộ thông tin cấu hình
        guiVanBan('\n\nKhông gọi được dịch vụ AI. Vui lòng kiểm tra khóa API và thử lại sau.');
        dong();
      });
      luongMo.on('abort', dong);
      luongMo.on('end', dong);
      // Lỗi và việc hủy đã được xử lý qua các sự kiện ở trên; bắt lời hứa cuối để không phát sinh lỗi chưa xử lý
      luongMo.finalMessage().catch(() => {});
    },
    // Chỉ dừng gọi mô hình khi trình duyệt thật sự hủy luồng phản hồi.
    // Không dùng request.signal vì tín hiệu này có thể báo ngắt sớm trong lúc máy chủ vẫn đang phát luồng.
    cancel() {
      luongMo.abort();
    },
  });

  return new Response(luong, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
