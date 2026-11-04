import type { ZiweiChart } from './types';
import { detectPatterns } from './patterns';
import { tenSao, tenCung, tenCuc, tenTuHoa, tenDiaChi, tenThienCan, tenDoSang } from './thuat-ngu';

/** Lời dặn hệ thống cho mô hình: vai trò, phạm vi, văn phong. */
export const LOI_DAN_HE_THONG = `Bạn là người luận giải Tử Vi Đẩu Số theo hệ thống của Nghê Hải Hạ trong bộ «Thiên Kỷ».
Quy tắc:
- Luôn trả lời bằng tiếng Việt, dùng thuật ngữ Hán Việt kèm chữ Hán trong ngoặc ở lần đầu nhắc.
- Chỉ dựa trên lá số được cung cấp ở bên dưới. Không bịa sao hay cung không có trong lá số.
- Theo đúng cấu trúc mà người dùng yêu cầu. Nếu người dùng không nêu cấu trúc, trả lời ngắn gọn, rõ ý.
- Nội dung chỉ để tham khảo, không phải lời khuyên y tế, đầu tư hay pháp lý. Không khẳng định chắc chắn về tương lai.
- Giữ nguyên các dấu 【 】 khi người dùng dùng chúng làm tiêu đề từng phần.`;

function dongSao(cung: ZiweiChart['palaces'][number]): string {
  const sao = (cung.stars ?? []).map((s) => {
    const hoa = s.siHua ? ` ${tenTuHoa(s.siHua, { kemChuHan: false })}` : '';
    const sang = s.brightnessRaw ? ` (${tenDoSang(s.brightnessRaw, { kemChuHan: false })})` : '';
    return `${tenSao(s.name, { kemChuHan: false })}${sang}${hoa}`;
  });
  return sao.length > 0 ? sao.join(', ') : cung.isEmpty ? 'cung trống, mượn sao đối cung' : 'không có sao';
}

/** Dựng phần mô tả lá số bằng chữ để đưa cho mô hình. Chỉ đọc các trường cần thiết, cắt ngắn mọi chuỗi. */
export function dungNguCanhLaSo(chart: ZiweiChart): string {
  const thongTin = chart.birthInfo;
  const dong: string[] = [];
  dong.push(`Giới tính: ${thongTin.gender === 'male' ? 'Nam' : 'Nữ'}`);
  dong.push(`Ngày sinh dương lịch: ${thongTin.day}/${thongTin.month}/${thongTin.year}`);
  if (chart.lunarInfo) {
    dong.push(`Âm lịch: ngày ${chart.lunarInfo.lunarDay} tháng ${chart.lunarInfo.isLeapMonth ? 'nhuận ' : ''}${chart.lunarInfo.lunarMonth} năm ${tenThienCan(chart.lunarInfo.yearStem)} ${tenDiaChi(chart.lunarInfo.yearBranch)}`);
  }
  dong.push(`Giờ sinh: ${tenDiaChi(thongTin.hour)}`);
  dong.push(`Ngũ hành cục: ${tenCuc(chart.wuxingJuName ?? '')}`);
  dong.push(`Mệnh cung ở ${tenDiaChi(chart.mingGongBranch)}, Thân cung ở ${tenDiaChi(chart.shenGongBranch)}`);
  if (chart.mingZhu || chart.shenZhu) dong.push(`Mệnh chủ: ${tenSao(chart.mingZhu ?? '', { kemChuHan: false })}, Thân chủ: ${tenSao(chart.shenZhu ?? '', { kemChuHan: false })}`);
  if (chart.yinYangGender) dong.push(`Âm dương nam nữ: ${chart.yinYangGender.replace('阳', 'Dương ').replace('阴', 'Âm ').replace('男', 'nam').replace('女', 'nữ')}`);
  dong.push('', 'Mười hai cung:');
  for (const cung of chart.palaces) {
    const nhan = [cung.isMingGong ? 'Mệnh' : '', cung.isShenGong ? 'Thân' : ''].filter(Boolean).join('/');
    dong.push(`- ${tenCung(cung.name, { kemChuHan: false })} cung${nhan ? ` [${nhan}]` : ''}, ${tenThienCan(cung.stem)} ${tenDiaChi(cung.branch)}: ${dongSao(cung)}`);
  }
  if (Array.isArray(chart.daXians) && chart.daXians.length > 0) {
    dong.push('', 'Đại hạn:');
    for (const dx of chart.daXians.slice(0, 12)) {
      dong.push(`- ${dx.startAge}–${dx.endAge} tuổi: ${tenCung(dx.palaceName, { kemChuHan: false })}`);
    }
    dong.push(`Tuổi hiện tại theo lá số: ${chart.currentAge}`);
  }
  try {
    const cachCuc = detectPatterns(chart);
    if (cachCuc.length > 0) {
      dong.push('', 'Cách cục nhận diện được:');
      for (const c of cachCuc.slice(0, 12)) dong.push(`- ${c.name}: ${c.description}`);
    }
  } catch {
    // Lá số gửi lên thiếu trường: bỏ qua phần cách cục, vẫn luận giải được từ các cung.
  }
  return dong.join('\n').slice(0, 12000);
}
