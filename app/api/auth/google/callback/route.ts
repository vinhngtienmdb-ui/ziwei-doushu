import { timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { luuHoacCapNhatNguoiDung, taoPhien } from '@/lib/db/du-lieu';
import { TEN_COOKIE_PHIEN, chuanHoaDuongDanQuayLai, tuyChonCookiePhien } from '@/lib/auth/phien';
import { TEN_COOKIE_TRANG_THAI, layGocXacThuc } from '@/lib/auth/google';

function bangNhau(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Bước 2: Google chuyển người dùng về đây kèm mã xác thực. Đổi mã lấy thông tin tài khoản rồi tạo phiên. */
export async function GET(request: NextRequest) {
  const goc = layGocXacThuc(request);
  const loi = (ma: string) => {
    const phanHoi = NextResponse.redirect(new URL(`/tai-khoan?loi=${ma}`, goc));
    phanHoi.cookies.delete({ name: TEN_COOKIE_TRANG_THAI, path: '/api/auth' });
    return phanHoi;
  };

  const maUngDung = process.env.GOOGLE_CLIENT_ID;
  const baoMat = process.env.GOOGLE_CLIENT_SECRET;
  if (!maUngDung || !baoMat) return loi('chua-cau-hinh');
  if (request.nextUrl.searchParams.get('error')) return loi('tu-choi');

  const ma = request.nextUrl.searchParams.get('code');
  const trangThai = request.nextUrl.searchParams.get('state');
  const cookieTrangThai = request.cookies.get(TEN_COOKIE_TRANG_THAI)?.value;
  const [trangThaiDaLuu, maXacMinh, quayLaiMaHoa] = (cookieTrangThai ?? '').split('|');
  if (!ma || !trangThai || !trangThaiDaLuu || !maXacMinh || !bangNhau(trangThai, trangThaiDaLuu)) return loi('trang-thai');

  try {
    const phanHoiToken = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: ma,
        client_id: maUngDung,
        client_secret: baoMat,
        redirect_uri: `${goc}/api/auth/google/callback`,
        grant_type: 'authorization_code',
        code_verifier: maXacMinh,
      }),
    });
    if (!phanHoiToken.ok) return loi('google');
    const { access_token: maTruyCap } = (await phanHoiToken.json()) as { access_token?: string };
    if (!maTruyCap) return loi('google');

    const phanHoiThongTin = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${maTruyCap}` },
    });
    if (!phanHoiThongTin.ok) return loi('google');
    const thongTin = (await phanHoiThongTin.json()) as { sub?: string; email?: string; email_verified?: boolean; name?: string; picture?: string };
    if (!thongTin.sub || !thongTin.email || thongTin.email_verified === false) return loi('email');

    const nguoiDung = luuHoacCapNhatNguoiDung({ googleSub: thongTin.sub, email: thongTin.email, ten: thongTin.name, anh: thongTin.picture });
    const maPhien = taoPhien(nguoiDung.id);

    const quayLai = chuanHoaDuongDanQuayLai(decodeURIComponent(quayLaiMaHoa ?? ''));
    const phanHoi = NextResponse.redirect(new URL(quayLai, goc));
    phanHoi.cookies.set(TEN_COOKIE_PHIEN, maPhien, tuyChonCookiePhien());
    phanHoi.cookies.delete({ name: TEN_COOKIE_TRANG_THAI, path: '/api/auth' });
    return phanHoi;
  } catch {
    return loi('google');
  }
}
