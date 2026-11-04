import { layNguoiDungHienTai, nguonGocHopLe } from '@/lib/auth/phien';
import { DO_DAI_HOI_DAP_TOI_DA, lietKeHoiDap, themHoiDap, type TinNhanDaLuu } from '@/lib/db/du-lieu';

type NguCanh = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: NguCanh) {
  const nguoiDung = await layNguoiDungHienTai();
  if (!nguoiDung) return Response.json({ error: 'chua-dang-nhap' }, { status: 401 });
  const { id } = await params;
  const tinNhan = lietKeHoiDap(nguoiDung.id, id);
  if (!tinNhan) return Response.json({ error: 'khong-tim-thay' }, { status: 404 });
  return Response.json({ tinNhan }, { headers: { 'Cache-Control': 'no-store' } });
}

/** Thêm tin nhắn vào lịch sử của lá số. Nội dung gửi lên: { tinNhan: [{ vaiTro, noiDung, an? }] }. */
export async function POST(request: Request, { params }: NguCanh) {
  if (!nguonGocHopLe(request)) return Response.json({ error: 'nguon-goc-khong-hop-le' }, { status: 403 });
  const nguoiDung = await layNguoiDungHienTai();
  if (!nguoiDung) return Response.json({ error: 'chua-dang-nhap' }, { status: 401 });
  const { id } = await params;

  let noiDung: { tinNhan?: unknown };
  try {
    noiDung = await request.json();
  } catch {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }
  if (!Array.isArray(noiDung.tinNhan) || noiDung.tinNhan.length === 0 || noiDung.tinNhan.length > 10) {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }
  const danhSach: TinNhanDaLuu[] = [];
  for (const t of noiDung.tinNhan as { vaiTro?: unknown; noiDung?: unknown; an?: unknown }[]) {
    if ((t?.vaiTro !== 'user' && t?.vaiTro !== 'assistant') || typeof t.noiDung !== 'string' || !t.noiDung.trim()) {
      return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
    }
    danhSach.push({ vaiTro: t.vaiTro, noiDung: t.noiDung.slice(0, DO_DAI_HOI_DAP_TOI_DA), an: t.an === true });
  }
  return themHoiDap(nguoiDung.id, id, danhSach)
    ? new Response(null, { status: 204 })
    : Response.json({ error: 'khong-tim-thay-hoac-day' }, { status: 404 });
}
