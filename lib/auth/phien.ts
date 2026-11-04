import { cookies } from 'next/headers';
import { huyPhien, layNguoiDungTheoPhien, type NguoiDung, THOI_HAN_PHIEN_MS } from '@/lib/db/du-lieu';

export const TEN_COOKIE_PHIEN = 'phien_tu_vi';

const cookieAnToan = () => process.env.NODE_ENV === 'production';

/** Người dùng đang đăng nhập (theo cookie phiên), hoặc null. Dùng trong trang máy chủ và route. */
export async function layNguoiDungHienTai(): Promise<NguoiDung | null> {
  const kho = await cookies();
  return layNguoiDungTheoPhien(kho.get(TEN_COOKIE_PHIEN)?.value);
}

/** Tùy chọn cookie phiên: httpOnly để mã không đọc được từ trình duyệt, SameSite=Lax chặn gửi chéo trang. */
export function tuyChonCookiePhien() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: cookieAnToan(),
    path: '/',
    maxAge: Math.floor(THOI_HAN_PHIEN_MS / 1000),
  };
}

/** Hủy phiên hiện tại ở cơ sở dữ liệu và xóa cookie. */
export async function dangXuat(): Promise<void> {
  const kho = await cookies();
  huyPhien(kho.get(TEN_COOKIE_PHIEN)?.value);
  kho.delete(TEN_COOKIE_PHIEN);
}

/**
 * Chặn yêu cầu ghi từ trang khác (CSRF): trình duyệt luôn gửi tiêu đề Origin cho yêu cầu POST, DELETE.
 * Origin phải cùng máy chủ với địa chỉ đang được gọi.
 */
export function nguonGocHopLe(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Chỉ cho phép quay lại đường dẫn nội bộ, tránh chuyển hướng ra trang ngoài. */
export function chuanHoaDuongDanQuayLai(giaTri: string | null | undefined): string {
  if (!giaTri || !/^\/[A-Za-z0-9/_\-?=&%.]*$/.test(giaTri) || giaTri.startsWith('//')) return '/tai-khoan';
  return giaTri.slice(0, 200);
}
