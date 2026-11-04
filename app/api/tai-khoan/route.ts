import { dangXuat, layNguoiDungHienTai, nguonGocHopLe } from '@/lib/auth/phien';
import { xoaNguoiDung } from '@/lib/db/du-lieu';

/** Xóa tài khoản đang đăng nhập cùng toàn bộ lá số và hỏi đáp. Không hoàn tác được. */
export async function DELETE(request: Request) {
  if (!nguonGocHopLe(request)) return Response.json({ error: 'nguon-goc-khong-hop-le' }, { status: 403 });
  const nguoiDung = await layNguoiDungHienTai();
  if (!nguoiDung) return Response.json({ error: 'chua-dang-nhap' }, { status: 401 });
  xoaNguoiDung(nguoiDung.id);
  await dangXuat(); // xóa cookie phiên (bản ghi phiên đã mất theo người dùng)
  return new Response(null, { status: 204 });
}
