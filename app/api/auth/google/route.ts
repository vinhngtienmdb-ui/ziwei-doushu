import { createHash, randomBytes } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { chuanHoaDuongDanQuayLai } from '@/lib/auth/phien';
import { TEN_COOKIE_TRANG_THAI, layGocXacThuc } from '@/lib/auth/google';

/** Bước 1: chuyển người dùng sang Google để đăng nhập. */
export async function GET(request: NextRequest) {
  const maUngDung = process.env.GOOGLE_CLIENT_ID;
  if (!maUngDung || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.redirect(new URL('/tai-khoan?loi=chua-cau-hinh', layGocXacThuc(request)));
  }

  const trangThai = randomBytes(16).toString('base64url');
  const maXacMinh = randomBytes(32).toString('base64url'); // PKCE
  const quayLai = chuanHoaDuongDanQuayLai(request.nextUrl.searchParams.get('quay-lai'));

  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', maUngDung);
  url.searchParams.set('redirect_uri', `${layGocXacThuc(request)}/api/auth/google/callback`);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('state', trangThai);
  url.searchParams.set('code_challenge', createHash('sha256').update(maXacMinh).digest('base64url'));
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('prompt', 'select_account');

  const phanHoi = NextResponse.redirect(url);
  // Giữ trạng thái, mã PKCE và nơi quay lại trong cookie ngắn hạn; chỉ route đăng nhập đọc được
  phanHoi.cookies.set(TEN_COOKIE_TRANG_THAI, `${trangThai}|${maXacMinh}|${encodeURIComponent(quayLai)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/api/auth',
    maxAge: 600,
  });
  return phanHoi;
}
