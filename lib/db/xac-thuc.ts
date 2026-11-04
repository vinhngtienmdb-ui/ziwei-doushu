import { DO_DAI_BIEU_MAU_TOI_DA } from './du-lieu';

/** Chỉ giữ các trường biểu mẫu đã biết, ép kiểu và cắt độ dài. Trả về null nếu thiếu ngày sinh. */
export function lamSachBieuMau(dauVao: unknown): Record<string, unknown> | null {
  if (!dauVao || typeof dauVao !== 'object') return null;
  const o = dauVao as Record<string, unknown>;
  const chuoi = (khoa: string, toiDa: number) => (typeof o[khoa] === 'string' ? (o[khoa] as string).slice(0, toiDa) : '');
  const kinhDo = typeof o.longitude === 'number' && Number.isFinite(o.longitude) ? Math.min(180, Math.max(-180, o.longitude)) : 105;

  const ketQua = {
    name: chuoi('name', 60),
    year: chuoi('year', 4),
    month: chuoi('month', 2),
    day: chuoi('day', 2),
    calendar: o.calendar === 'lunar' ? 'lunar' : 'solar',
    isLeapMonth: o.isLeapMonth === true,
    clockHour: chuoi('clockHour', 2),
    clockMinute: chuoi('clockMinute', 2),
    unknownTime: o.unknownTime === true,
    province: chuoi('province', 60),
    city: chuoi('city', 80),
    longitude: kinhDo,
    gender: o.gender === 'female' ? 'female' : 'male',
  };
  if (!/^\d{4}$/.test(ketQua.year) || !/^\d{1,2}$/.test(ketQua.month) || !/^\d{1,2}$/.test(ketQua.day)) return null;
  if (JSON.stringify(ketQua).length > DO_DAI_BIEU_MAU_TOI_DA) return null;
  return ketQua;
}
