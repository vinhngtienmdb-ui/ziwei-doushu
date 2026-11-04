import { layNguoiDungHienTai, nguonGocHopLe } from '@/lib/auth/phien';
import { lietKeLaSo, luuLaSo } from '@/lib/db/du-lieu';
import { lamSachBieuMau } from '@/lib/db/xac-thuc';

const khongLuuDem = { 'Cache-Control': 'no-store' };

/** Danh sách lá số đã lưu của người dùng đang đăng nhập. */
export async function GET() {
  const nguoiDung = await layNguoiDungHienTai();
  if (!nguoiDung) return Response.json({ error: 'chua-dang-nhap' }, { status: 401 });
  return Response.json({ laSo: lietKeLaSo(nguoiDung.id) }, { headers: khongLuuDem });
}

/** Lưu một lá số mới. Nội dung gửi lên: { ten, bieuMau }. */
export async function POST(request: Request) {
  if (!nguonGocHopLe(request)) return Response.json({ error: 'nguon-goc-khong-hop-le' }, { status: 403 });
  const nguoiDung = await layNguoiDungHienTai();
  if (!nguoiDung) return Response.json({ error: 'chua-dang-nhap' }, { status: 401 });

  let noiDung: { ten?: unknown; bieuMau?: unknown };
  try {
    noiDung = await request.json();
  } catch {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }
  const bieuMau = lamSachBieuMau(noiDung.bieuMau);
  if (!bieuMau) return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  const ten = (typeof noiDung.ten === 'string' ? noiDung.ten.trim() : '').slice(0, 80) || 'Lá số chưa đặt tên';

  const ketQua = luuLaSo(nguoiDung.id, ten, bieuMau);
  if (ketQua === 'day') return Response.json({ error: 'da-du-so-luong' }, { status: 409 });
  return Response.json({ id: ketQua }, { status: 201 });
}
