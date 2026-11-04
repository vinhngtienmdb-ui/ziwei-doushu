import { Solar } from 'lunar-javascript';
import { duongSangAm, kinhDoMatTroiCuoiNgay, soNgayJulius, type NgayAm } from './am-lich-viet';
import {
  CON_GIAP, DIA_CHI, MUOI_HAI_THAN, MUOI_HAI_TRUC, NHI_THAP_BAT_TU, THIEN_CAN, THU_TRONG_TUAN, TU_TOT,
  dichCatThan, dichHungThan, dichViec,
} from './thuat-ngu-lich';

/** Thông tin một ngày theo lịch Việt Nam (âm lịch, tiết khí tính theo GMT+7). */

const HAI_MUOI_BON_TIET_KHI = [
  'Xuân phân', 'Thanh minh', 'Cốc vũ', 'Lập hạ', 'Tiểu mãn', 'Mang chủng', 'Hạ chí', 'Tiểu thử', 'Đại thử', 'Lập thu', 'Xử thử', 'Bạch lộ',
  'Thu phân', 'Hàn lộ', 'Sương giáng', 'Lập đông', 'Tiểu tuyết', 'Đại tuyết', 'Đông chí', 'Tiểu hàn', 'Đại hàn', 'Lập xuân', 'Vũ thủy', 'Kinh trập',
] as const;

export interface ChiTietGio {
  chi: string;
  khungGio: string;
  than: string;
  hoangDao: boolean;
}

export interface ThongTinNgay {
  duong: { ngay: number; thang: number; nam: number };
  thuTrongTuan: string;
  am: NgayAm;
  canChiNgay: string;
  canChiThang: string;
  canChiNam: string;
  chiNgay: number;
  tietKhi: string | null;
  truc: { ten: string; tinh: 'tot' | 'trung' | 'xau' };
  tu: { ten: string; tot: boolean };
  than: { ten: string; hoangDao: boolean };
  gio: ChiTietGio[];
  viecNen: string[];
  viecKy: string[];
  catThan: string[];
  hungThan: string[];
  ngayDacBiet: string[];
  conGiapXung: string;
  /** Mã thô của việc nên, kỵ theo chữ Hán, dùng để chấm điểm theo mục đích. */
  nenGoc: string[];
  kyGoc: string[];
}

const hai = (n: number) => String(n).padStart(2, '0');
export const canChi = (can: number, chi: number) => `${THIEN_CAN[((can % 10) + 10) % 10]} ${DIA_CHI[((chi % 12) + 12) % 12]}`;

/** Chi của ngày: chi của ngày (0 = Tý). Ngày Giáp Tý ứng với số ngày Julius chia 60 dư 11. */
function canChiTuSoNgay(soNgay: number) {
  return { can: (soNgay + 9) % 10, chi: (soNgay + 1) % 12 };
}

// Thanh Long khởi ở chi nào, theo chi của tháng tiết khí khi tìm thần của ngày, và theo chi của ngày khi tìm thần của giờ:
// Dần, Thân: Tý; Mão, Dậu: Dần; Thìn, Tuất: Thìn; Tỵ, Hợi: Ngọ; Ngọ, Tý: Thân; Mùi, Sửu: Tuất

const KHOI_THANH_LONG: Record<number, number> = { 2: 0, 8: 0, 3: 2, 9: 2, 4: 4, 10: 4, 5: 6, 11: 6, 6: 8, 0: 8, 7: 10, 1: 10 };
const NGAY_TAM_NUONG = new Set([3, 7, 13, 18, 22, 27]);
const NGAY_NGUYET_KY = new Set([5, 14, 23]);

function khungGio(chi: number): string {
  const dau = (chi * 2 + 23) % 24;
  return `${hai(dau)}:00–${hai((dau + 2) % 24)}:00`;
}

/** Chi của tháng theo tiết khí (Dần = 2) ứng với một ngày, tính theo kinh độ Mặt Trời cuối ngày GMT+7. */
function chiThangTietKhi(soNgay: number): number {
  const kinhDo = kinhDoMatTroiCuoiNgay(soNgay);
  const chiSo = Math.floor((((kinhDo - 315) % 360) + 360) % 360 / 30);
  return (2 + chiSo) % 12;
}

/** Tên tiết khí nếu ngày này là ngày Mặt Trời qua một mốc 15 độ, ngược lại null. */
function tietKhiTrongNgay(soNgay: number): string | null {
  const nay = Math.floor(kinhDoMatTroiCuoiNgay(soNgay) / 15);
  const truoc = Math.floor(kinhDoMatTroiCuoiNgay(soNgay - 1) / 15);
  return nay !== truoc ? HAI_MUOI_BON_TIET_KHI[nay % 24] : null;
}

export function thongTinNgay(ngay: number, thang: number, nam: number): ThongTinNgay {
  const soNgay = soNgayJulius(ngay, thang, nam);
  const am = duongSangAm(ngay, thang, nam);
  const { can, chi } = canChiTuSoNgay(soNgay);
  const chiThang = chiThangTietKhi(soNgay);

  // Can của tháng theo can của năm: tháng Dần của năm Giáp, Kỷ là Bính, và cứ thế
  // Năm của tháng tiết khí: sau Lập xuân thì thuộc năm dương lịch (hoặc năm âm lịch nếu tính theo Tết). Dùng năm âm lịch, nhất quán với Tết Việt Nam.
  const canNam = (am.nam + 6) % 10;
  const chiNam = (am.nam + 8) % 12;
  // Tháng tiết khí Tý, Sửu thuộc về năm trước khi tính từ Lập xuân; điều chỉnh can của năm cho đúng
  const namTietKhi = (chiThang === 0 || chiThang === 1) && thang <= 2 ? nam - 1 : nam;
  const canNamTietKhi = (namTietKhi + 6) % 10;
  const canThang = (canNamTietKhi * 2 + ((chiThang - 2 + 12) % 12) + 2) % 10;

  const truc = MUOI_HAI_TRUC[(chi - chiThang + 12) % 12];
  const viTriTu = (soNgay + 12) % 28;
  const tenTu = NHI_THAP_BAT_TU[viTriTu];
  const than = MUOI_HAI_THAN[(chi - KHOI_THANH_LONG[chiThang] + 12) % 12];

  const gio: ChiTietGio[] = [];
  const khoiGio = KHOI_THANH_LONG[chi];
  for (let g = 0; g < 12; g++) {
    const t = MUOI_HAI_THAN[(g - khoiGio + 12) % 12];
    gio.push({ chi: DIA_CHI[g], khungGio: khungGio(g), than: t.ten, hoangDao: t.hoangDao });
  }

  // Việc nên, kỵ, cát thần, hung thần lấy từ bảng lịch vạn niên truyền thống của thư viện lịch
  const lich = Solar.fromYmd(nam, thang, ngay).getLunar();
  const nenGoc: string[] = lich.getDayYi();
  const kyGoc: string[] = lich.getDayJi();
  const ngayDacBiet: string[] = [];
  if (NGAY_TAM_NUONG.has(am.ngay)) ngayDacBiet.push('Ngày Tam Nương');
  if (NGAY_NGUYET_KY.has(am.ngay)) ngayDacBiet.push('Ngày Nguyệt kỵ');

  return {
    duong: { ngay, thang, nam },
    thuTrongTuan: THU_TRONG_TUAN[new Date(Date.UTC(nam, thang - 1, ngay)).getUTCDay()],
    am,
    canChiNgay: canChi(can, chi),
    canChiThang: canChi(canThang, chiThang),
    canChiNam: canChi(canNam, chiNam),
    chiNgay: chi,
    tietKhi: tietKhiTrongNgay(soNgay),
    truc: { ten: truc.ten, tinh: truc.tinh },
    tu: { ten: tenTu, tot: TU_TOT.has(tenTu) },
    than: { ten: than.ten, hoangDao: than.hoangDao },
    gio,
    viecNen: nenGoc.map(dichViec),
    viecKy: kyGoc.map(dichViec),
    catThan: lich.getDayJiShen().map(dichCatThan),
    hungThan: lich.getDayXiongSha().map(dichHungThan),
    ngayDacBiet,
    conGiapXung: CON_GIAP[(chi + 6) % 12],
    nenGoc,
    kyGoc,
  };
}

// ─── Hợp xung với tuổi ──────────────────────────────────────────────

export type QuanHeTuoi = 'xung' | 'hai' | 'luc-hop' | 'tam-hop' | 'khong';

const LUC_HOP: Record<number, number> = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 };
const LUC_HAI: Record<number, number> = { 0: 7, 7: 0, 1: 6, 6: 1, 2: 5, 5: 2, 3: 4, 4: 3, 8: 11, 11: 8, 9: 10, 10: 9 };

/** Quan hệ giữa chi của ngày và chi năm sinh của người dùng. */
export function quanHeVoiTuoi(chiNgay: number, chiNamSinh: number): QuanHeTuoi {
  if ((chiNgay + 6) % 12 === chiNamSinh) return 'xung';
  if (LUC_HAI[chiNgay] === chiNamSinh) return 'hai';
  if (LUC_HOP[chiNgay] === chiNamSinh) return 'luc-hop';
  if (chiNgay % 4 === chiNamSinh % 4 && chiNgay !== chiNamSinh) return 'tam-hop';
  return 'khong';
}

/** Chi của năm sinh (dương lịch). Năm sinh theo năm âm lịch nên người sinh đầu năm dương lịch trước Tết cần nhập năm âm lịch. */
export const chiCuaNam = (nam: number) => (((nam + 8) % 12) + 12) % 12;

// ─── Mục đích và chấm điểm ──────────────────────────────────────────

export const MUC_DICH = [
  { khoa: 'cuoi-hoi', ten: 'Cưới hỏi', viec: ['嫁娶', '纳采', '订盟', '问名'] },
  { khoa: 'khai-truong', ten: 'Khai trương, mở cửa hàng', viec: ['开市', '交易', '立券', '挂匾'] },
  { khoa: 'dong-tho', ten: 'Động thổ, xây dựng', viec: ['动土', '破土', '起基', '修造', '上梁', '竖柱', '盖屋'] },
  { khoa: 'nhap-trach', ten: 'Nhập trạch, chuyển nhà', viec: ['入宅', '移徙', '安床', '安香'] },
  { khoa: 'xuat-hanh', ten: 'Xuất hành, đi xa', viec: ['出行', '乘船'] },
  { khoa: 'an-tang', ten: 'An táng, tang lễ', viec: ['安葬', '入殓', '移柩', '破土', '启钻'] },
  { khoa: 'ky-ket', ten: 'Ký kết, giao dịch', viec: ['立券', '交易', '纳财'] },
  { khoa: 'cau-phuc', ten: 'Cúng tế, cầu phúc', viec: ['祭祀', '祈福', '斋醮', '酬神'] },
  { khoa: 'chua-benh', ten: 'Chữa bệnh', viec: ['求医', '治病', '针灸'] },
] as const;

export type KhoaMucDich = (typeof MUC_DICH)[number]['khoa'];

export type NhanDiem = 'Rất tốt' | 'Tốt' | 'Bình thường' | 'Xấu' | 'Nên tránh';

export interface DanhGia {
  diem: number;
  nhan: NhanDiem;
  lyDo: string[];
}

export function nhanTuDiem(diem: number): NhanDiem {
  if (diem >= 5) return 'Rất tốt';
  if (diem >= 2) return 'Tốt';
  if (diem >= 0) return 'Bình thường';
  if (diem >= -3) return 'Xấu';
  return 'Nên tránh';
}

/**
 * Chấm điểm một ngày. Điểm chỉ mang tính tham khảo theo quy tắc cổ truyền:
 * Hoàng đạo/Hắc đạo, trực, nhị thập bát tú, ngày kỵ của Việt Nam (Tam Nương, Nguyệt kỵ),
 * việc nên/kỵ theo mục đích, và hợp xung với tuổi người dùng.
 */
export function danhGiaNgay(tt: ThongTinNgay, mucDich?: KhoaMucDich, chiNamSinh?: number): DanhGia {
  let diem = 0;
  const lyDo: string[] = [];
  const cong = (d: number, ly: string) => { diem += d; lyDo.push(`${d > 0 ? '+' : ''}${d} ${ly}`); };

  cong(tt.than.hoangDao ? 2 : -2, tt.than.hoangDao ? `Ngày Hoàng đạo (${tt.than.ten})` : `Ngày Hắc đạo (${tt.than.ten})`);
  if (tt.truc.tinh === 'tot') cong(1, `Trực ${tt.truc.ten} tốt`);
  else if (tt.truc.tinh === 'xau') cong(-1, `Trực ${tt.truc.ten} xấu`);
  cong(tt.tu.tot ? 1 : -1, tt.tu.tot ? `Sao ${tt.tu.ten} tốt` : `Sao ${tt.tu.ten} xấu`);
  for (const d of tt.ngayDacBiet) cong(-2, d);

  if (mucDich) {
    const md = MUC_DICH.find((m) => m.khoa === mucDich)!;
    const nenTrung = md.viec.filter((v) => tt.nenGoc.includes(v));
    const kyTrung = md.viec.filter((v) => tt.kyGoc.includes(v));
    if (nenTrung.length > 0) cong(3, `Việc "${md.ten}" thuộc nhóm nên làm`);
    if (kyTrung.length > 0) cong(-5, `Việc "${md.ten}" thuộc nhóm kiêng kỵ`);
    if (tt.kyGoc.includes('诸事不宜')) cong(-5, 'Lịch ghi mọi việc đều không nên');
  }

  if (chiNamSinh !== undefined) {
    const qh = quanHeVoiTuoi(tt.chiNgay, chiNamSinh);
    if (qh === 'xung') cong(-4, `Ngày xung với tuổi (${DIA_CHI[(tt.chiNgay + 6) % 12]} xung ${DIA_CHI[tt.chiNgay]})`);
    else if (qh === 'hai') cong(-2, 'Ngày lục hại với tuổi');
    else if (qh === 'luc-hop') cong(2, 'Ngày lục hợp với tuổi');
    else if (qh === 'tam-hop') cong(1, 'Ngày tam hợp với tuổi');
  }

  return { diem, nhan: nhanTuDiem(diem), lyDo };
}
