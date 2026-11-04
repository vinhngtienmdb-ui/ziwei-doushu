import type { NextRequest } from 'next/server';

export const TEN_COOKIE_TRANG_THAI = 'oauth_google';

/** Địa chỉ gốc dùng làm đường chuyển hướng. Đặt AUTH_ORIGIN khi chạy sau máy chủ trung gian. */
export function layGocXacThuc(request: NextRequest): string {
  return (process.env.AUTH_ORIGIN || request.nextUrl.origin).replace(/\/+$/, '');
}
