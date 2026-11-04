import Anthropic from '@anthropic-ai/sdk';

const MO_HINH_MAC_DINH = 'claude-sonnet-5-5';
export const SO_TOKEN_TOI_DA = 3000;

export interface TinNhan {
  role: 'user' | 'assistant';
  content: string;
}

/** Gọi Claude và trả về luồng SSE `data: {"delta":{"text":...}}` kết thúc bằng `[DONE]`. Trả về null nếu chưa cấu hình khóa API. */
export function phatLuongClaude(heThong: string, tinNhan: TinNhan[], soTokenToiDa = SO_TOKEN_TOI_DA): Response | null {
  const khoaApi = process.env.ANTHROPIC_API_KEY;
  if (!khoaApi) return null;

  const khach = new Anthropic({ apiKey: khoaApi });
  const moHinhRieng = process.env.ANTHROPIC_MODEL;
  const thamSo = {
    model: moHinhRieng || MO_HINH_MAC_DINH,
    max_tokens: soTokenToiDa,
    system: heThong,
    messages: tinNhan,
    // Mô hình mặc định tự "suy nghĩ" trước khi trả lời và có thể dùng hết hạn mức token mà chưa ra chữ nào.
    // Cần câu trả lời ngay nên tắt bước này; giá trị hợp lệ phụ thuộc từng mô hình nên chỉ gửi với mô hình mặc định.
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
      luongMo.on('error', () => {
        // Không đưa chi tiết lỗi của nhà cung cấp ra trình duyệt, tránh lộ thông tin cấu hình
        guiVanBan('\n\nKhông gọi được dịch vụ AI. Vui lòng kiểm tra khóa API và thử lại sau.');
        dong();
      });
      luongMo.on('abort', dong);
      luongMo.on('end', dong);
      luongMo.finalMessage().catch(() => {});
    },
    // Chỉ dừng gọi mô hình khi trình duyệt thật sự hủy luồng phản hồi (không dùng request.signal: có thể báo ngắt sớm)
    cancel() {
      luongMo.abort();
    },
  });

  return new Response(luong, {
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache, no-transform' },
  });
}
