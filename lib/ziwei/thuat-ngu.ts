/**
 * Bảng thuật ngữ Tử Vi Đẩu Số: chữ Hán dùng làm khóa xử lý → tên Hán Việt hiển thị.
 * Khóa xử lý trong engine giữ nguyên chữ Hán; chỉ lớp hiển thị gọi các hàm ở đây.
 */

const SAO_CHINH_TINH: Record<string, string> = {
  '紫微': 'Tử Vi', '天机': 'Thiên Cơ', '太阳': 'Thái Dương', '武曲': 'Vũ Khúc',
  '天同': 'Thiên Đồng', '廉贞': 'Liêm Trinh', '天府': 'Thiên Phủ', '太阴': 'Thái Âm',
  '贪狼': 'Tham Lang', '巨门': 'Cự Môn', '天相': 'Thiên Tướng', '天梁': 'Thiên Lương',
  '七杀': 'Thất Sát', '破军': 'Phá Quân',
};

const SAO_PHU_TINH: Record<string, string> = {
  '左辅': 'Tả Phù', '右弼': 'Hữu Bật', '文昌': 'Văn Xương', '文曲': 'Văn Khúc',
  '天魁': 'Thiên Khôi', '天钺': 'Thiên Việt', '禄存': 'Lộc Tồn', '天马': 'Thiên Mã',
  '擎羊': 'Kình Dương', '陀罗': 'Đà La', '火星': 'Hỏa Tinh', '铃星': 'Linh Tinh',
  '地空': 'Địa Không', '地劫': 'Địa Kiếp', '天空': 'Thiên Không',
  '旬空': 'Tuần Không', '截空': 'Triệt Không', '副旬': 'Phó Tuần', '副截': 'Phó Triệt',
  '截路': 'Triệt Lộ', '空亡': 'Không Vong',
  '红鸾': 'Hồng Loan', '天喜': 'Thiên Hỷ', '天刑': 'Thiên Hình', '天姚': 'Thiên Diêu',
  '解神': 'Giải Thần', '天巫': 'Thiên Vu', '天月': 'Thiên Nguyệt', '阴煞': 'Âm Sát',
  '台辅': 'Thai Phụ', '封诰': 'Phong Cáo', '三台': 'Tam Thai', '八座': 'Bát Tọa',
  '恩光': 'Ân Quang', '天贵': 'Thiên Quý', '龙池': 'Long Trì', '凤阁': 'Phượng Các',
  '天才': 'Thiên Tài', '天寿': 'Thiên Thọ', '天哭': 'Thiên Khốc', '天虚': 'Thiên Hư',
  '孤辰': 'Cô Thần', '寡宿': 'Quả Tú', '蜚廉': 'Phỉ Liêm', '破碎': 'Phá Toái',
  '华盖': 'Hoa Cái', '咸池': 'Hàm Trì', '天德': 'Thiên Đức', '月德': 'Nguyệt Đức',
  '天官': 'Thiên Quan', '天福': 'Thiên Phúc', '天厨': 'Thiên Trù', '年解': 'Niên Giải',
  '天伤': 'Thiên Thương', '天使': 'Thiên Sứ', '大耗': 'Đại Hao', '小耗': 'Tiểu Hao',
};

const THAN_SAT: Record<string, string> = {
  // Tướng tiền thập nhị thần
  '将星': 'Tướng Tinh', '攀鞍': 'Phan Yên', '岁驿': 'Tuế Dịch', '息神': 'Tức Thần',
  '劫煞': 'Kiếp Sát', '灾煞': 'Tai Sát', '天煞': 'Thiên Sát', '指背': 'Chỉ Bối',
  '月煞': 'Nguyệt Sát', '亡神': 'Vong Thần',
  // Tuế tiền thập nhị thần
  '岁建': 'Tuế Kiến', '晦气': 'Hối Khí', '丧门': 'Tang Môn', '贯索': 'Quán Sách',
  '官符': 'Quan Phù', '岁破': 'Tuế Phá', '龙德': 'Long Đức', '白虎': 'Bạch Hổ',
  '吊客': 'Điếu Khách', '病符': 'Bệnh Phù',
  // Bác sĩ thập nhị thần
  '博士': 'Bác Sĩ', '力士': 'Lực Sĩ', '青龙': 'Thanh Long', '将军': 'Tướng Quân',
  '奏书': 'Tấu Thư', '飞廉': 'Phi Liêm', '喜神': 'Hỷ Thần', '伏兵': 'Phục Binh',
  '官府': 'Quan Phủ',
  // Trường sinh thập nhị cung
  '长生': 'Trường Sinh', '沐浴': 'Mộc Dục', '冠带': 'Quan Đới', '临官': 'Lâm Quan',
  '帝旺': 'Đế Vượng', '衰': 'Suy', '病': 'Bệnh', '死': 'Tử', '墓': 'Mộ',
  '绝': 'Tuyệt', '胎': 'Thai', '养': 'Dưỡng',
};

const TEN_CUNG: Record<string, string> = {
  '命': 'Mệnh', '兄弟': 'Huynh Đệ', '夫妻': 'Phu Thê', '子女': 'Tử Nữ',
  '财帛': 'Tài Bạch', '疾厄': 'Tật Ách', '迁移': 'Thiên Di', '仆役': 'Nô Bộc',
  '交友': 'Giao Hữu', '官禄': 'Quan Lộc', '田宅': 'Điền Trạch', '福德': 'Phúc Đức',
  '父母': 'Phụ Mẫu',
};

const TU_HOA: Record<string, string> = {
  '禄': 'Hóa Lộc', '权': 'Hóa Quyền', '科': 'Hóa Khoa', '忌': 'Hóa Kỵ',
};

const THIEN_CAN: readonly string[] = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const DIA_CHI: readonly string[] = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const CHU_CAN = '甲乙丙丁戊己庚辛壬癸';
const CHU_CHI = '子丑寅卯辰巳午未申酉戌亥';

const NGU_HANH: Record<string, string> = {
  '金': 'Kim', '木': 'Mộc', '水': 'Thủy', '火': 'Hỏa', '土': 'Thổ',
};

const SO_CUC: Record<string, string> = { '二': 'nhị', '三': 'tam', '四': 'tứ', '五': 'ngũ', '六': 'lục' };

const DO_SANG: Record<string, string> = {
  '庙': 'Miếu', '旺': 'Vượng', '得': 'Đắc', '利': 'Lợi', '平': 'Bình',
  '不': 'Bất', '闲': 'Nhàn', '陷': 'Hãm', '地': 'Địa',
};

const TAT_CA_SAO: Record<string, string> = { ...SAO_CHINH_TINH, ...SAO_PHU_TINH, ...THAN_SAT };

export interface TuyChonThuatNgu {
  /** Có kèm chữ Hán trong ngoặc đơn hay không. Mặc định: có. */
  kemChuHan?: boolean;
}

function ghepChuHan(tenViet: string, chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  return tuyChon?.kemChuHan === false ? tenViet : `${tenViet} (${chuHan})`;
}

/** Tên sao hoặc thần sát. Không có trong bảng thì trả lại nguyên chữ gốc. */
export function tenSao(chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  const tenViet = TAT_CA_SAO[chuHan];
  return tenViet ? ghepChuHan(tenViet, chuHan, tuyChon) : chuHan;
}

/** Tên cung gọn (không kèm chữ "cung"), chấp nhận cả dạng có và không có chữ 宫. Ví dụ 夫妻宫 → Phu Thê. */
export function tenCung(chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  const goc = chuHan.endsWith('宫') ? chuHan.slice(0, -1) : chuHan;
  const tenViet = TEN_CUNG[goc];
  return tenViet ? ghepChuHan(tenViet, chuHan, tuyChon) : chuHan;
}

/** Tứ Hóa: 禄 → Hóa Lộc (禄). */
export function tenTuHoa(chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  const tenViet = TU_HOA[chuHan.replace(/^化/, '')];
  return tenViet ? ghepChuHan(tenViet, chuHan, tuyChon) : chuHan;
}

/** Nhãn Tứ Hóa ngắn để đặt trong ô nhỏ: 禄 → Lộc. */
export function tenTuHoaNgan(chuHan: string): string {
  const tenViet = TU_HOA[chuHan.replace(/^化/, "")];
  return tenViet ? tenViet.replace("Hóa ", "") : chuHan;
}

/** Độ sáng của sao: 庙 → Miếu (庙). */
export function tenDoSang(chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  const tenViet = DO_SANG[chuHan];
  return tenViet ? ghepChuHan(tenViet, chuHan, tuyChon) : chuHan;
}

/** Thiên can theo chỉ số 0–9. */
export function tenThienCan(chiSo: number): string {
  return THIEN_CAN[chiSo] ?? '';
}

/** Địa chi theo chỉ số 0–11. */
export function tenDiaChi(chiSo: number): string {
  return DIA_CHI[chiSo] ?? '';
}

/** Can chi dạng chữ Hán, ví dụ 壬午 → Nhâm Ngọ (壬午). */
export function tenCanChi(chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  if (chuHan.length !== 2) return chuHan;
  const chiSoCan = CHU_CAN.indexOf(chuHan[0]);
  const chiSoChi = CHU_CHI.indexOf(chuHan[1]);
  if (chiSoCan < 0 || chiSoChi < 0) return chuHan;
  return ghepChuHan(`${THIEN_CAN[chiSoCan]} ${DIA_CHI[chiSoChi]}`, chuHan, tuyChon);
}

/** Ngũ hành cục, ví dụ 水二局 → Thủy nhị cục (水二局). */
export function tenCuc(chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  const khop = /^([金木水火土])([二三四五六])局$/.exec(chuHan);
  if (!khop) return chuHan;
  return ghepChuHan(`${NGU_HANH[khop[1]]} ${SO_CUC[khop[2]]} cục`, chuHan, tuyChon);
}

/** Ngũ hành đơn: 水 → Thủy (水). */
export function tenNguHanh(chuHan: string, tuyChon?: TuyChonThuatNgu): string {
  const tenViet = NGU_HANH[chuHan];
  return tenViet ? ghepChuHan(tenViet, chuHan, tuyChon) : chuHan;
}

/** Mười hai con giáp theo cách gọi của Việt Nam (khác Trung Quốc: Sửu là Trâu, Mão là Mèo). */
const CON_GIAP: readonly string[] = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Lợn'];

/** Con giáp theo chỉ số địa chi 0–11, ví dụ 3 (Mão) → Mèo. */
export function tenConGiap(chiSoDiaChi: number): string {
  return CON_GIAP[chiSoDiaChi] ?? '';
}

/** Năm âm lịch dạng "Kỷ Mão (Mèo)". Năm dương lịch 4 sau Công nguyên là Giáp Tý. */
export function tenNamAmLich(namAmLich: number): string {
  const chiSoCan = (((namAmLich - 4) % 10) + 10) % 10;
  const chiSoChi = (((namAmLich - 4) % 12) + 12) % 12;
  return `${THIEN_CAN[chiSoCan]} ${DIA_CHI[chiSoChi]} (${CON_GIAP[chiSoChi]})`;
}
