import { phatLuongClaude } from '@/lib/ai/luong-claude';
import { chanNeuVuotGioiHan } from '@/lib/ai/gioi-han';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { LOI_DAN_HE_THONG, dungNguCanhLaSo } from '@/lib/ziwei/ngu-canh-ai';

const SO_TIN_NHAN_TOI_DA = 30;
const DO_DAI_TIN_NHAN_TOI_DA = 4000;

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

  const biChan = await chanNeuVuotGioiHan(request);
  if (biChan) return biChan;

  const phanHoi = phatLuongClaude(`${LOI_DAN_HE_THONG}

LÁ SỐ:
${dungNguCanhLaSo(chart)}`, tinNhan);
  if (!phanHoi) return Response.json({ error: 'chua-cau-hinh' }, { status: 503 });
  return phanHoi;
}
