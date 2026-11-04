import type { ZiweiChart } from './types';
import { tenSao, tenCung, tenTuHoa, tenDiaChi, tenThienCan, tenNamAmLich } from './thuat-ngu';
import type { TangVan, TangVanKetQua, TuHoaVan, VanHanKetQua } from './van-han';

const hoaVan = (h: TuHoaVan) =>
  `${tenTuHoa(h.loai, { kemChuHan: false })} ${tenSao(h.sao, { kemChuHan: false })}${h.tenCungGoc ? ` (đang ở cung ${tenCung(h.tenCungGoc, { kemChuHan: false })})` : ''}`;

function moTaTang(ten: string, t: TangVanKetQua): string[] {
  const dong = [`${ten}: Mệnh vận ở ${tenThienCan(t.canIndex)} ${tenDiaChi(t.chiIndex)}, trùng cung ${tenCung(t.cungGocTaiMenh, { kemChuHan: false })} của lá số gốc`];
  dong.push(`  Tứ Hóa: ${t.tuHoa.map(hoaVan).join('; ')}`);
  dong.push(`  Vòng cung vận: ${t.muoiHaiCung.map((c) => `${tenCung(c.tenCungVan, { kemChuHan: false })} vận tại ${tenCung(c.tenCungGoc, { kemChuHan: false })}`).join(', ')}`);
  return dong;
}

/** Mô tả vận hạn của một ngày bằng chữ để đưa cho mô hình, kèm tầng đang cần luận giải. */
export function dungNguCanhVanHan(vh: VanHanKetQua, tang: TangVan): string {
  const dong: string[] = [];
  dong.push(`Ngày xem: ${vh.duong.ngay}/${vh.duong.thang}/${vh.duong.nam} dương lịch, tức ngày ${vh.am.ngay} tháng ${vh.am.nhuan ? 'nhuận ' : ''}${vh.am.thang} năm ${tenNamAmLich(vh.am.nam)} âm lịch Việt Nam`);
  dong.push(`Tuổi mụ: ${vh.tuoiMu}`);
  if (vh.daiHan) {
    dong.push(`Đại hạn ${vh.daiHan.tuoiTu}–${vh.daiHan.tuoiDen} tuổi tại cung ${tenCung(vh.daiHan.tenCungGoc, { kemChuHan: false })}; Tứ Hóa đại hạn: ${vh.daiHan.tuHoa.map(hoaVan).join('; ')}`);
  }
  dong.push(...moTaTang('Lưu niên', vh.nam));
  if (tang !== 'nam') dong.push(...moTaTang('Lưu nguyệt', vh.thang));
  if (tang === 'ngay') dong.push(...moTaTang('Lưu nhật', vh.ngay));
  return dong.join('\n');
}

export function loiYeuCauVanHan(tang: TangVan): string {
  const pham = tang === 'nam' ? 'cả năm' : tang === 'thang' ? 'tháng này' : 'ngày này';
  return `Hãy luận giải vận hạn ${pham} của lá số theo thông tin vận hạn đã cho. Trả lời tiếng Việt, ngắn gọn, theo bố cục:
【Tổng quan】 một đến hai câu về khí vận chung.
【Điểm thuận lợi】 các lĩnh vực thuận, nêu cung và Tứ Hóa làm căn cứ.
【Điểm cần cẩn trọng】 các lĩnh vực dễ gặp trở ngại, nêu cung và Tứ Hóa làm căn cứ.
【Lời khuyên】 hai đến ba gợi ý thực tế.
Chỉ dựa trên dữ kiện đã cho, không khẳng định chắc chắn về tương lai.`;
}

export function nguCanhDayDu(chart: ZiweiChart, vh: VanHanKetQua, tang: TangVan, dungLaSo: (c: ZiweiChart) => string): string {
  return `${dungLaSo(chart)}\n\nVẬN HẠN:\n${dungNguCanhVanHan(vh, tang)}`;
}
