import { amLichHopLe, amSangDuong, duongSangAm, thangNhuanCuaNamAm } from './am-lich-viet';

/** Cầu nối cho biểu mẫu: đổi giữa dương lịch và âm lịch Việt Nam (GMT+7), cùng dạng dữ liệu với module lunar-solar cũ. */

export interface NgayDuong {
  year: number;
  month: number;
  day: number;
}

export interface NgayAmViet {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
}

/** Âm lịch Việt Nam sang dương lịch. Ngày âm lịch không tồn tại thì trả về null, không tự dồn sang ngày khác. */
export function amVietSangDuong(year: number, month: number, day: number, isLeapMonth = false): NgayDuong | null {
  if (!amLichHopLe(day, month, year, isLeapMonth)) return null;
  const kq = amSangDuong(day, month, year, isLeapMonth);
  return kq ? { year: kq[2], month: kq[1], day: kq[0] } : null;
}

/** Dương lịch sang âm lịch Việt Nam. Ngày dương lịch không có thật thì trả về null. */
export function duongSangAmViet(year: number, month: number, day: number): NgayAmViet | null {
  const probe = new Date(Date.UTC(year, month - 1, day));
  if (probe.getUTCFullYear() !== year || probe.getUTCMonth() !== month - 1 || probe.getUTCDate() !== day) return null;
  const am = duongSangAm(day, month, year);
  return { year: am.nam, month: am.thang, day: am.ngay, isLeapMonth: am.nhuan };
}

export { amLichHopLe as laNgayAmVietHopLe, thangNhuanCuaNamAm as thangNhuanCuaNamAmViet };
