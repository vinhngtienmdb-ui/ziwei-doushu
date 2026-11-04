/** Tử vi chung của một năm âm lịch cho từng con giáp: dữ kiện đưa cho AI và các giới hạn hợp lệ. */
import { getSiHuaByStem } from './sihua';
import { tenSao, tenTuHoa, tenThienCan, tenDiaChi, tenConGiap } from './thuat-ngu';

/** Chỉ cho xem và sinh trong khoảng năm trước đến năm sau năm hiện tại. */
export function khoangNamHopLe(namHienTai: number): [number, number] {
  return [namHienTai - 1, namHienTai + 1];
}

export const canCuaNamAm = (nam: number) => (((nam - 4) % 10) + 10) % 10;
export const chiCuaNamAm = (nam: number) => (((nam - 4) % 12) + 12) % 12;

/** Quan hệ của tuổi (địa chi) với chi của năm: Thái Tuế, xung, lục hợp, tam hợp hoặc không có quan hệ đặc biệt. */
export function quanHeVoiNam(chiTuoi: number, chiNam: number): 'thai-tue' | 'xung' | 'luc-hop' | 'tam-hop' | 'khong' {
  if (chiTuoi === chiNam) return 'thai-tue';
  if ((chiTuoi + 6) % 12 === chiNam) return 'xung';
  if ((chiTuoi + chiNam) % 12 === 1) return 'luc-hop';
  if (chiTuoi % 4 === chiNam % 4) return 'tam-hop';
  return 'khong';
}

const MO_TA_QUAN_HE = {
  'thai-tue': 'Tuổi trùng với năm (phạm Thái Tuế)',
  'xung': 'Tuổi xung với năm (lục xung)',
  'luc-hop': 'Tuổi lục hợp với năm',
  'tam-hop': 'Tuổi tam hợp với năm',
  'khong': 'Tuổi không có quan hệ hợp xung đặc biệt với năm',
} as const;

export const LOI_DAN_TU_VI_NAM = `Bạn viết bài tử vi chung theo năm cho từng con giáp, theo truyền thống Tử Vi Đẩu Số và lịch Việt Nam.
Quy tắc:
- Viết tiếng Việt, giọng điềm đạm, thực tế, dùng thuật ngữ Hán Việt kèm chữ Hán trong ngoặc ở lần đầu nhắc.
- Chỉ dựa trên dữ kiện được cung cấp (can chi của năm, Tứ Hóa lưu niên, quan hệ hợp xung của tuổi). Không bịa sao hay sự kiện cụ thể.
- Đây là xu hướng chung cho mọi người cùng tuổi, không phải lá số cá nhân; nói rõ điều này ở phần Lời nhắn.
- Không khẳng định chắc chắn về tương lai, không đưa lời khuyên y tế, đầu tư hay pháp lý.
- Chỉ viết văn bản thuần: không Markdown, không dấu *, không dòng tiêu đề chung cho bài.
- Mỗi mục bắt đầu trên một dòng mới bằng đúng tiêu đề 【 】 rồi đến nội dung ngay sau đó, mỗi mục hai đến bốn câu: 【Tổng quan】 【Sự nghiệp】 【Tài lộc】 【Tình cảm】 【Sức khỏe】 【Lời khuyên】 【Lời nhắn】.
- Toàn bài khoảng 350 đến 500 từ.`;

export function loiYeuCauTuViNam(nam: number, chiTuoi: number): string {
  const can = canCuaNamAm(nam);
  const chi = chiCuaNamAm(nam);
  const hoa = getSiHuaByStem(can);
  const tuHoa = (['禄', '权', '科', '忌'] as const).map((l) => `${tenTuHoa(l, { kemChuHan: false })} ${tenSao(hoa[l], { kemChuHan: false })}`).join('; ');
  return `Viết tử vi chung năm ${tenThienCan(can)} ${tenDiaChi(chi)} (${nam}) cho người tuổi ${tenDiaChi(chiTuoi)} (con ${tenConGiap(chiTuoi)}).
Dữ kiện: năm ${tenThienCan(can)} ${tenDiaChi(chi)}, Tứ Hóa lưu niên: ${tuHoa}. ${MO_TA_QUAN_HE[quanHeVoiNam(chiTuoi, chi)]}.`;
}
