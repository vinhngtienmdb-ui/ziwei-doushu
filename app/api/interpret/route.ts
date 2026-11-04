import Anthropic from '@anthropic-ai/sdk';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { LOI_DAN_HE_THONG, dungNguCanhLaSo } from '@/lib/ziwei/ngu-canh-ai';

const MO_HINH_MAC_DINH = 'claude-sonnet-5-5';
const SO_TIN_NHAN_TOI_DA = 30;
const DO_DAI_TIN_NHAN_TOI_DA = 4000;
const SO_TOKEN_TOI_DA = 2000;

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
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string' || !content.trim()) return null;
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
  const luongMo = khach.messages.stream({
    model: process.env.ANTHROPIC_MODEL || MO_HINH_MAC_DINH,
    max_tokens: SO_TOKEN_TOI_DA,
    system: `${LOI_DAN_HE_THONG}\n\nLÁ SỐ:\n${dungNguCanhLaSo(chart)}`,
    messages: tinNhan,
  });

  const maHoa = new TextEncoder();
  const luong = new ReadableStream<Uint8Array>({
    start(controller) {
      const gui = (chuoi: string) => controller.enqueue(maHoa.encode(chuoi));
      const guiVanBan = (text: string) => gui(`data: ${JSON.stringify({ delta: { text } })}\n\n`);
      let daDong = false;
      const dong = () => {
        if (daDong) return;
        daDong = true;
        gui('data: [DONE]\n\n');
        controller.close();
      };

      luongMo.on('text', (text) => guiVanBan(text));
      luongMo.on('error', () => {
        // Không đưa chi tiết lỗi của nhà cung cấp ra trình duyệt, tránh lộ thông tin cấu hình
        guiVanBan('\n\nKhông gọi được dịch vụ AI. Vui lòng kiểm tra khóa API và thử lại sau.');
        dong();
      });
      luongMo.on('end', dong);
      request.signal.addEventListener('abort', () => {
        luongMo.abort();
        dong();
      });
    },
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
