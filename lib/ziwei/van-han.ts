/**
 * Vận hạn cá nhân: lưu niên, lưu nguyệt, lưu nhật của một lá số, tính theo âm lịch Việt Nam (GMT+7).
 *
 * Cách an (theo công thức của iztro, đổi sang địa chi để khỏi phụ thuộc thứ tự cung trong thư viện):
 *   - Lưu niên: cung Mệnh lưu niên nằm ở cung có địa chi trùng chi của năm.
 *   - Lưu nguyệt: từ cung lưu niên, đếm ngược về tháng sinh, rồi đếm xuôi tới giờ sinh, đó là tháng Giêng; mỗi tháng sau một cung.
 *     Tháng nhuận từ ngày 16 trở đi tính như tháng kế tiếp.
 *   - Lưu nhật: từ cung lưu nguyệt, mùng một ở đúng cung đó, mỗi ngày sau một cung.
 * Thiên can: năm theo năm âm lịch Việt, tháng theo ngũ hổ độn, ngày theo số ngày Julius (không dùng lịch Trung Quốc).
 * Tứ Hóa của mỗi tầng vận lấy từ thiên can của tầng đó, rồi chỉ ra sao hóa ấy đang nằm ở cung nào trong lá số gốc.
 */
import type { SiHua, ZiweiChart } from './types';
import { STEMS } from './constants';
import { getLiuYueStemIndex, getSiHuaByStem } from './sihua';
import { duongSangAm, soNgayJulius, ngayTuSoJulius, soNgayTrongThangAm } from '../lich/am-lich-viet';
import { getDaXianIndexForYear } from './yunxian-context';

export type TangVan = 'nam' | 'thang' | 'ngay';

export interface TuHoaVan {
  loai: SiHua;
  /** Tên sao chữ Hán, khớp với tên sao trong lá số */
  sao: string;
  /** Địa chi của cung gốc mà sao này đang ở; null nếu không tìm thấy sao */
  chiCungGoc: number | null;
  /** Tên cung gốc (chữ Hán, như trong lá số) */
  tenCungGoc: string | null;
}

export interface TangVanKetQua {
  /** Địa chi của cung mang Mệnh của tầng vận này */
  chiMenh: number;
  /** Tên cung gốc của lá số nằm ở chỗ Mệnh của tầng vận này */
  cungGocTaiMenh: string;
  canIndex: number;
  chiIndex: number;
  tuHoa: TuHoaVan[];
  /** 12 cung của tầng vận: địa chi và tên cung (chữ Hán) theo vòng xoay Mệnh vận hạn */
  muoiHaiCung: { chi: number; tenCungVan: string; tenCungGoc: string }[];
}

export interface VanHanKetQua {
  duong: { ngay: number; thang: number; nam: number };
  am: { ngay: number; thang: number; nam: number; nhuan: boolean };
  tuoiMu: number;
  daiHan: { chiMenh: number; tenCungGoc: string; tuoiTu: number; tuoiDen: number; canIndex: number; tuHoa: TuHoaVan[] } | null;
  nam: TangVanKetQua;
  thang: TangVanKetQua;
  ngay: TangVanKetQua;
}

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Tên cung theo vòng xoay: Mệnh nằm ở chiMenh, các cung kế tiếp đi ngược chiều địa chi (như lá số gốc) */
function tenCungTheoMenh(chart: ZiweiChart, chiMenh: number): { chi: number; tenCungVan: string; tenCungGoc: string }[] {
  const tenGocTheoThuTu = Array.from({ length: 12 }, (_, k) => chart.palaces.find((p) => p.branch === mod(chart.mingGongBranch - k, 12))?.name ?? '');
  return Array.from({ length: 12 }, (_, k) => {
    const chi = mod(chiMenh - k, 12);
    const cungGoc = chart.palaces.find((p) => p.branch === chi);
    return { chi, tenCungVan: tenGocTheoThuTu[k], tenCungGoc: cungGoc?.name ?? '' };
  });
}

function tuHoaTheoCan(chart: ZiweiChart, canIndex: number): TuHoaVan[] {
  const bang = getSiHuaByStem(canIndex);
  return (['禄', '权', '科', '忌'] as SiHua[]).map((loai) => {
    const sao = bang[loai];
    const cung = chart.palaces.find((p) => p.stars.some((s) => s.name === sao));
    return { loai, sao, chiCungGoc: cung ? cung.branch : null, tenCungGoc: cung ? cung.name : null };
  });
}

function dungTang(chart: ZiweiChart, chiMenh: number, canIndex: number): TangVanKetQua {
  const cungTaiMenh = chart.palaces.find((p) => p.branch === chiMenh);
  return {
    chiMenh,
    cungGocTaiMenh: cungTaiMenh?.name ?? '',
    canIndex,
    chiIndex: chiMenh,
    tuHoa: tuHoaTheoCan(chart, canIndex),
    muoiHaiCung: tenCungTheoMenh(chart, chiMenh),
  };
}

/** Số ngày Julius của ngày dương lịch → thiên can của ngày (0 = Giáp) */
export function canCuaNgay(ngay: number, thang: number, nam: number): number {
  return mod(soNgayJulius(ngay, thang, nam) + 9, 10);
}

/**
 * Vận hạn tại một ngày dương lịch. Dùng ngày âm lịch Việt Nam của ngày đó để xác định năm, tháng, ngày vận.
 * Trả về null nếu ngày dương lịch không có thật.
 */
export function tinhVanHan(chart: ZiweiChart, ngay: number, thang: number, nam: number): VanHanKetQua | null {
  const kiemTra = new Date(Date.UTC(nam, thang - 1, ngay));
  if (kiemTra.getUTCFullYear() !== nam || kiemTra.getUTCMonth() !== thang - 1 || kiemTra.getUTCDate() !== ngay) return null;
  const am = duongSangAm(ngay, thang, nam);

  // Năm vận: năm âm lịch Việt Nam, can chi theo năm 4 = Giáp Tý
  const canNam = mod(am.nam - 4, 10);
  const chiNam = mod(am.nam - 4, 12);

  // Tháng sinh: tháng nhuận từ ngày 16 tính như tháng kế tiếp
  const sinhNhuan = chart.lunarInfo.isLeapMonth && chart.lunarInfo.lunarDay > 15 ? 1 : 0;
  const thangSinh = Math.abs(chart.lunarInfo.lunarMonth) + sinhNhuan;
  const nhuanVan = am.nhuan && am.ngay > 15 ? 1 : 0;
  const thangVan = am.thang + nhuanVan;
  const chiGioSinh = chart.birthInfo.hour;

  const chiMenhThang = mod(chiNam - thangSinh + chiGioSinh + thangVan, 12);
  const chiMenhNgay = mod(chiMenhThang + am.ngay - 1, 12);

  // Tháng vận để tính thiên can: tháng có hiệu lực (sau khi cộng nhuận), quay vòng 1–12
  const thangCan = thangVan > 12 ? thangVan - 12 : thangVan;
  const canThang = getLiuYueStemIndex(canNam, thangCan);
  const canNgay = canCuaNgay(ngay, thang, nam);

  // Đại hạn theo tuổi mụ của năm âm lịch
  const tuoiMu = am.nam - chart.lunarInfo.lunarYear + 1;
  const chiSoDaiHan = getDaXianIndexForYear(chart, am.nam);
  const dx = chiSoDaiHan >= 0 ? chart.daXians[chiSoDaiHan] : undefined;
  const cungDaiHan = dx ? chart.palaces.find((p) => p.branch === dx.palaceBranch) : undefined;
  const daiHan = dx && cungDaiHan
    ? { chiMenh: dx.palaceBranch, tenCungGoc: cungDaiHan.name, tuoiTu: dx.startAge, tuoiDen: dx.endAge, canIndex: cungDaiHan.stem, tuHoa: tuHoaTheoCan(chart, cungDaiHan.stem) }
    : null;

  return {
    duong: { ngay, thang, nam },
    am: { ngay: am.ngay, thang: am.thang, nam: am.nam, nhuan: am.nhuan },
    tuoiMu,
    daiHan,
    nam: dungTang(chart, chiNam, canNam),
    thang: dungTang(chart, chiMenhThang, canThang),
    ngay: dungTang(chart, chiMenhNgay, canNgay),
  };
}

/** Các tháng âm lịch của một năm âm lịch (kể cả tháng nhuận) với ngày dương lịch của mùng một, để chọn xem từng tháng vận */
export interface ThangAm { thang: number; nhuan: boolean; mungMot: { ngay: number; thang: number; nam: number }; soNgay: number }

export function lietKeThangCuaNamAm(namAm: number): ThangAm[] {
  const ketQua: ThangAm[] = [];
  for (let thang = 1; thang <= 12; thang++) {
    for (const nhuan of [false, true]) {
      const soNgay = soNgayTrongThangAm(thang, namAm, nhuan);
      if (soNgay === 0) continue;
      // Tìm ngày dương lịch của mùng một bằng cách dò quanh ngày 1/1 đến 31/12 dương lịch năm đó
      ketQua.push({ thang, nhuan, mungMot: { ngay: 0, thang: 0, nam: 0 }, soNgay });
    }
  }
  // Điền ngày dương lịch bằng cách quét một lượt các ngày dương lịch từ đầu năm đến hết tháng 2 năm sau
  const batDau = soNgayJulius(1, 1, namAm);
  const cuoi = soNgayJulius(28, 2, namAm + 1);
  for (let jd = batDau; jd <= cuoi; jd++) {
    const [d, m, y] = ngayTuSoJulius(jd);
    const am = duongSangAm(d, m, y);
    if (am.ngay !== 1 || am.nam !== namAm) continue;
    const muc = ketQua.find((k) => k.thang === am.thang && k.nhuan === am.nhuan);
    if (muc) muc.mungMot = { ngay: d, thang: m, nam: y };
  }
  return ketQua.filter((k) => k.mungMot.nam !== 0);
}
