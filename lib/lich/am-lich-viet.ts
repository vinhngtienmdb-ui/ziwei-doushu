/**
 * Âm lịch Việt Nam: tính theo múi giờ GMT+7 (khác lịch Trung Quốc tính theo GMT+8 ở vài ngày hiếm).
 *
 * Thuật toán thiên văn công khai của Hồ Ngọc Đức (xác định ngày sóc và kinh độ Mặt Trời), có tham số múi giờ.
 * Mọi hàm ở đây là hàm thuần, không phụ thuộc thư viện lịch bên ngoài.
 */

export const MUI_GIO_VIET_NAM = 7;

const lamTron = (x: number) => Math.floor(x);

/** Số ngày Julius (JDN) của một ngày dương lịch. */
export function soNgayJulius(ngay: number, thang: number, nam: number): number {
  const a = lamTron((14 - thang) / 12);
  const y = nam + 4800 - a;
  const m = thang + 12 * a - 3;
  let jd = ngay + lamTron((153 * m + 2) / 5) + 365 * y + lamTron(y / 4) - lamTron(y / 100) + lamTron(y / 400) - 32045;
  if (jd < 2299161) jd = ngay + lamTron((153 * m + 2) / 5) + 365 * y + lamTron(y / 4) - 32083;
  return jd;
}

/** Đổi số ngày Julius về ngày dương lịch [ngày, tháng, năm]. */
export function ngayTuSoJulius(jd: number): [number, number, number] {
  let b: number;
  let c: number;
  if (jd > 2299160) {
    const a = jd + 32044;
    b = lamTron((4 * a + 3) / 146097);
    c = a - lamTron((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = lamTron((4 * c + 3) / 1461);
  const e = c - lamTron((1461 * d) / 4);
  const m = lamTron((5 * e + 2) / 153);
  const ngay = e - lamTron((153 * m + 2) / 5) + 1;
  const thang = m + 3 - 12 * lamTron(m / 10);
  const nam = b * 100 + d - 4800 + lamTron(m / 10);
  return [ngay, thang, nam];
}

/** Thời điểm sóc (trăng mới) thứ k, tính theo số ngày Julius. */
function thoiDiemSoc(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) - 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) - 0.0004 * Math.sin(dr * (2 * F + M));
  C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) + 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat = T < -11
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return Jd1 + C1 - deltat;
}

/** Kinh độ Mặt Trời (radian) tại thời điểm Julius jdn. */
function kinhDoMatTroi(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L -= Math.PI * 2 * lamTron(L / (Math.PI * 2));
  return L;
}

/** Kinh độ Mặt Trời tính bằng độ (0 đến 360) vào cuối ngày địa phương (24 giờ) của ngày Julius đã cho. */
export function kinhDoMatTroiCuoiNgay(soJulius: number, muiGio = MUI_GIO_VIET_NAM): number {
  return (kinhDoMatTroi(soJulius + 0.5 - muiGio / 24) * 180) / Math.PI;
}

/** Cung 30 độ của Mặt Trời (0 đến 11) vào đầu ngày địa phương, dùng để xác định tháng âm lịch. */
function cungMatTroi(soJulius: number, muiGio: number): number {
  return lamTron((kinhDoMatTroi(soJulius - 0.5 - muiGio / 24) / Math.PI) * 6);
}

function ngaySocDia(k: number, muiGio: number): number {
  return lamTron(thoiDiemSoc(k) + 0.5 + muiGio / 24);
}

function thangMuoiMot(nam: number, muiGio: number): number {
  const off = soNgayJulius(31, 12, nam) - 2415021;
  const k = lamTron(off / 29.530588853);
  let nm = ngaySocDia(k, muiGio);
  if (cungMatTroi(nm, muiGio) >= 9) nm = ngaySocDia(k - 1, muiGio);
  return nm;
}

function viTriThangNhuan(a11: number, muiGio: number): number {
  const k = lamTron((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let i = 1;
  let arc = cungMatTroi(ngaySocDia(k + i, muiGio), muiGio);
  let last: number;
  do {
    last = arc;
    i++;
    arc = cungMatTroi(ngaySocDia(k + i, muiGio), muiGio);
  } while (arc !== last && i < 14);
  return i - 1;
}

export interface NgayAm {
  ngay: number;
  thang: number;
  nam: number;
  nhuan: boolean;
}

/** Dương lịch sang âm lịch Việt Nam. */
export function duongSangAm(ngay: number, thang: number, nam: number, muiGio = MUI_GIO_VIET_NAM): NgayAm {
  const soNgay = soNgayJulius(ngay, thang, nam);
  const k = lamTron((soNgay - 2415021.076998695) / 29.530588853);
  let dauThang = ngaySocDia(k + 1, muiGio);
  if (dauThang > soNgay) dauThang = ngaySocDia(k, muiGio);
  let a11 = thangMuoiMot(nam, muiGio);
  let b11 = a11;
  let namAm: number;
  if (a11 >= dauThang) {
    namAm = nam;
    a11 = thangMuoiMot(nam - 1, muiGio);
  } else {
    namAm = nam + 1;
    b11 = thangMuoiMot(nam + 1, muiGio);
  }
  const ngayAm = soNgay - dauThang + 1;
  const diff = lamTron((dauThang - a11) / 29);
  let nhuan = false;
  let thangAm = diff + 11;
  if (b11 - a11 > 365) {
    const viTriNhuan = viTriThangNhuan(a11, muiGio);
    if (diff >= viTriNhuan) {
      thangAm = diff + 10;
      if (diff === viTriNhuan) nhuan = true;
    }
  }
  if (thangAm > 12) thangAm -= 12;
  if (thangAm >= 11 && diff < 4) namAm -= 1;
  return { ngay: ngayAm, thang: thangAm, nam: namAm, nhuan };
}

/** Âm lịch Việt Nam sang dương lịch [ngày, tháng, năm]. Trả về null nếu tháng nhuận không tồn tại. */
export function amSangDuong(ngay: number, thang: number, nam: number, nhuan: boolean, muiGio = MUI_GIO_VIET_NAM): [number, number, number] | null {
  let a11: number;
  let b11: number;
  if (thang < 11) {
    a11 = thangMuoiMot(nam - 1, muiGio);
    b11 = thangMuoiMot(nam, muiGio);
  } else {
    a11 = thangMuoiMot(nam, muiGio);
    b11 = thangMuoiMot(nam + 1, muiGio);
  }
  const k = lamTron(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = thang - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const viTriNhuan = viTriThangNhuan(a11, muiGio);
    let thangNhuan = viTriNhuan - 2;
    if (thangNhuan < 0) thangNhuan += 12;
    if (nhuan && thang !== thangNhuan) return null;
    if (nhuan || off >= viTriNhuan) off += 1;
  } else if (nhuan) {
    return null;
  }
  const dauThang = ngaySocDia(k + off, muiGio);
  return ngayTuSoJulius(dauThang + ngay - 1);
}

/** Ngày âm lịch có thật không (đổi sang dương lịch rồi đổi ngược lại phải ra đúng ngày đã nhập). */
export function amLichHopLe(ngay: number, thang: number, nam: number, nhuan: boolean, muiGio = MUI_GIO_VIET_NAM): boolean {
  if (!Number.isInteger(ngay) || ngay < 1 || ngay > 30 || thang < 1 || thang > 12) return false;
  const duong = amSangDuong(ngay, thang, nam, nhuan, muiGio);
  if (!duong) return false;
  const veLai = duongSangAm(duong[0], duong[1], duong[2], muiGio);
  return veLai.ngay === ngay && veLai.thang === thang && veLai.nam === nam && veLai.nhuan === nhuan;
}

/** Số ngày (29 hoặc 30) của một tháng âm lịch, 0 nếu tháng đó không tồn tại. */
export function soNgayTrongThangAm(thang: number, nam: number, nhuan: boolean, muiGio = MUI_GIO_VIET_NAM): number {
  if (!amLichHopLe(1, thang, nam, nhuan, muiGio)) return 0;
  return amLichHopLe(30, thang, nam, nhuan, muiGio) ? 30 : 29;
}

/** Tháng nhuận (1 đến 12) của một năm âm lịch, 0 nếu năm đó không có tháng nhuận. */
export function thangNhuanCuaNamAm(nam: number, muiGio = MUI_GIO_VIET_NAM): number {
  for (let thang = 1; thang <= 12; thang++) {
    if (amLichHopLe(1, thang, nam, true, muiGio)) return thang;
  }
  return 0;
}
