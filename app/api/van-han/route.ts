import type { ZiweiChart } from '@/lib/ziwei/types';
import { LOI_DAN_HE_THONG, dungNguCanhLaSo } from '@/lib/ziwei/ngu-canh-ai';
import { tinhVanHan, type TangVan } from '@/lib/ziwei/van-han';
import { loiYeuCauVanHan, nguCanhDayDu } from '@/lib/ziwei/ngu-canh-van-han';
import { phatLuongClaude } from '@/lib/ai/luong-claude';

function laLaSoHopLe(chart: unknown): chart is ZiweiChart {
  if (!chart || typeof chart !== 'object') return false;
  const c = chart as Partial<ZiweiChart>;
  return Array.isArray(c.palaces) && c.palaces.length === 12 && !!c.birthInfo && !!c.lunarInfo && Array.isArray(c.daXians);
}

const laSo = (v: unknown, nho: number, lon: number): v is number => typeof v === 'number' && Number.isInteger(v) && v >= nho && v <= lon;

/** Luận giải vận hạn năm/tháng/ngày. Nội dung gửi lên: { chart, ngay, thang, nam, tang }. Vận hạn được tính lại ở máy chủ. */
export async function POST(request: Request) {
  let noiDung: Record<string, unknown>;
  try {
    noiDung = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }
  const { chart, ngay, thang, nam, tang } = noiDung;
  if (!laLaSoHopLe(chart) || !laSo(ngay, 1, 31) || !laSo(thang, 1, 12) || !laSo(nam, 1900, 2100) || (tang !== 'nam' && tang !== 'thang' && tang !== 'ngay')) {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }
  let vh;
  try {
    vh = tinhVanHan(chart, ngay, thang, nam);
  } catch {
    vh = null;
  }
  if (!vh) return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });

  const phanHoi = phatLuongClaude(
    `${LOI_DAN_HE_THONG}\n\nLÁ SỐ VÀ VẬN HẠN:\n${nguCanhDayDu(chart, vh, tang as TangVan, dungNguCanhLaSo)}`,
    [{ role: 'user', content: loiYeuCauVanHan(tang as TangVan) }],
  );
  if (!phanHoi) return Response.json({ error: 'chua-cau-hinh' }, { status: 503 });
  return phanHoi;
}
