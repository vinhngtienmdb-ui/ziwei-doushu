/**
 * Bảng nhãn hiển thị cho trang cổ thư và trang tri thức: khóa là chữ Hán lấy từ dữ liệu, giá trị là tên tiếng Việt.
 * Dữ liệu gốc không đổi; chỉ lớp hiển thị gọi các hàm ở đây.
 */

const TEN_SACH: Record<string, string> = {
  '骨髓赋': 'Cốt Tuỷ Phú',
  '紫微斗数全集': 'Tử Vi Đẩu Số Toàn Tập',
  '紫微斗数全书': 'Tử Vi Đẩu Số Toàn Thư',
};

const TEN_TRIEU_DAI: Record<string, string> = {
  '明代': 'Nhà Minh',
  '清代': 'Nhà Thanh',
  '宋代': 'Nhà Tống',
};

const TEN_CHU_DE: Record<string, string> = {
  '命格总览': 'Tổng quan mệnh cách',
  '性格特质': 'Đặc điểm tính cách',
  '感情婚姻': 'Tình cảm, hôn nhân',
  '事业职业': 'Sự nghiệp, nghề nghiệp',
  '财富运势': 'Tài vận',
  '健康状况': 'Tình trạng sức khỏe',
  '兄弟合伙': 'Anh em, hợp tác',
  '子女缘分': 'Duyên con cái',
  '迁移外出': 'Di chuyển, đi xa',
  '人际贵人': 'Quan hệ, quý nhân',
  '田宅不动产': 'Điền trạch, bất động sản',
  '精神福德': 'Tinh thần, phúc đức',
  '父母长辈': 'Cha mẹ, bậc trưởng bối',
};

/** Tên sách dạng Hán Việt kèm chữ Hán, ví dụ: Cốt Tuỷ Phú (骨髓赋). Không có trong bảng thì trả lại chữ gốc. */
export function tenSach(chuHan: string): string {
  const tenViet = TEN_SACH[chuHan];
  return tenViet ? `${tenViet} (${chuHan})` : chuHan;
}

export function tenTrieuDai(chuHan: string): string {
  return TEN_TRIEU_DAI[chuHan] ?? chuHan;
}

/** Nhãn chủ đề của trang tri thức, ví dụ 感情婚姻 → Tình cảm, hôn nhân. */
export function tenChuDe(chuHan: string): string {
  return TEN_CHU_DE[chuHan] ?? chuHan;
}
