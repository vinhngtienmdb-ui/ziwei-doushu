import { layNguoiDungHienTai } from '@/lib/auth/phien';

/** Cho giao diện biết ai đang đăng nhập và đã cấu hình đăng nhập Google hay chưa. */
export async function GET() {
  const nguoiDung = await layNguoiDungHienTai();
  const daCauHinh = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
  return Response.json(
    { nguoiDung: nguoiDung ? { ten: nguoiDung.ten, email: nguoiDung.email, anh: nguoiDung.anh } : null, daCauHinh },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
