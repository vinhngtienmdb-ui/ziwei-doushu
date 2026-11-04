/**
 * Thuật ngữ lịch vạn niên: Hán Việt cho việc nên làm, kiêng kỵ, cát thần, hung thần, trực, nhị thập bát tú.
 * Khóa là chữ Hán (như thư viện lịch trả về); không có trong bảng thì hiển thị nguyên chữ gốc.
 */

export const THIEN_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'] as const;
export const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;
export const CON_GIAP = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Lợn'] as const;
export const THU_TRONG_TUAN = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'] as const;

/** Mười hai trực (kiến trừ), theo thứ tự từ Kiến. */
export const MUOI_HAI_TRUC = [
  { ten: 'Kiến', tinh: 'trung' }, { ten: 'Trừ', tinh: 'tot' }, { ten: 'Mãn', tinh: 'tot' }, { ten: 'Bình', tinh: 'trung' },
  { ten: 'Định', tinh: 'tot' }, { ten: 'Chấp', tinh: 'trung' }, { ten: 'Phá', tinh: 'xau' }, { ten: 'Nguy', tinh: 'xau' },
  { ten: 'Thành', tinh: 'tot' }, { ten: 'Thu', tinh: 'trung' }, { ten: 'Khai', tinh: 'tot' }, { ten: 'Bế', tinh: 'xau' },
] as const;

/** Mười hai thần theo thứ tự bắt đầu từ Thanh Long; Hoàng đạo là tốt, Hắc đạo là xấu. */
export const MUOI_HAI_THAN = [
  { ten: 'Thanh Long', hoangDao: true }, { ten: 'Minh Đường', hoangDao: true }, { ten: 'Thiên Hình', hoangDao: false },
  { ten: 'Chu Tước', hoangDao: false }, { ten: 'Kim Quỹ', hoangDao: true }, { ten: 'Thiên Đức (Bảo Quang)', hoangDao: true },
  { ten: 'Bạch Hổ', hoangDao: false }, { ten: 'Ngọc Đường', hoangDao: true }, { ten: 'Thiên Lao', hoangDao: false },
  { ten: 'Huyền Vũ', hoangDao: false }, { ten: 'Tư Mệnh', hoangDao: true }, { ten: 'Câu Trận', hoangDao: false },
] as const;

/** Nhị thập bát tú, thứ tự theo chu kỳ 28 ngày bắt đầu từ Chẩn. */
export const NHI_THAP_BAT_TU = [
  'Chẩn', 'Giác', 'Cang', 'Đê', 'Phòng', 'Tâm', 'Vĩ', 'Cơ', 'Đẩu', 'Ngưu', 'Nữ', 'Hư', 'Nguy', 'Thất',
  'Bích', 'Khuê', 'Lâu', 'Vị', 'Mão', 'Tất', 'Chủy', 'Sâm', 'Tỉnh', 'Quỷ', 'Liễu', 'Tinh', 'Trương', 'Dực',
] as const;

/** Tú tốt theo truyền thống (các tú còn lại xếp là xấu). */
export const TU_TOT = new Set(['Giác', 'Phòng', 'Tâm', 'Cơ', 'Đẩu', 'Thất', 'Bích', 'Khuê', 'Vị', 'Tất', 'Tham', 'Sâm', 'Tỉnh', 'Trương', 'Dực', 'Nữ', 'Chủy']);

/** Việc nên làm hoặc nên kiêng. */
export const VIEC: Record<string, string> = {
  '交易': 'Giao dịch', '进人口': 'Nhận thêm người vào nhà', '祭祀': 'Cúng tế', '沐浴': 'Tắm gội', '捕捉': 'Săn bắt',
  '入殓': 'Nhập liệm', '除服': 'Mãn tang', '成服': 'Mặc tang phục', '安葬': 'An táng', '谢土': 'Tạ thổ',
  '启钻': 'Cải táng (khai quan)', '修坟': 'Sửa mộ', '斋醮': 'Làm lễ trai tiếu', '入宅': 'Nhập trạch (vào nhà mới)',
  '修造': 'Sửa chữa, xây dựng', '动土': 'Động thổ', '破土': 'Phá thổ', '嫁娶': 'Cưới hỏi', '纳采': 'Nạp thái (dạm ngõ)',
  '订盟': 'Đính ước', '造车器': 'Làm xe cộ, nông cụ', '祈福': 'Cầu phúc', '造庙': 'Dựng miếu', '安香': 'An hương (lập bàn thờ)',
  '出火': 'Xuất hỏa (dời bếp, chuyển bàn thờ)', '出行': 'Xuất hành', '归宁': 'Quy ninh (cô dâu về thăm nhà mẹ)',
  '入学': 'Nhập học', '立券': 'Lập khế ước, ký giấy tờ', '求医': 'Tìm thầy thuốc', '治病': 'Chữa bệnh',
  '竖柱': 'Dựng cột', '上梁': 'Thượng lương', '盖屋': 'Lợp nhà', '起基': 'Khởi móng', '安门': 'Lắp cửa', '伐木': 'Chặt cây lấy gỗ',
  '作梁': 'Làm xà, dầm', '行丧': 'Cử hành tang lễ', '开市': 'Khai trương', '会亲友': 'Họp mặt thân hữu', '安机械': 'Lắp đặt máy móc',
  '平治道涂': 'San sửa đường', '拆卸': 'Tháo dỡ', '安床': 'Đặt giường', '解除': 'Giải trừ (cúng giải hạn)', '立碑': 'Dựng bia',
  '移柩': 'Dời quan tài', '馀事勿取': 'Các việc khác không nên làm', '掘井': 'Đào giếng', '开光': 'Khai quang',
  '定磉': 'Kê đá tảng móng', '移徙': 'Chuyển nhà', '造桥': 'Làm cầu', '造船': 'Đóng thuyền', '置产': 'Mua sắm tài sản',
  '塑绘': 'Tô tượng, vẽ tranh', '纳畜': 'Mua gia súc', '赴任': 'Nhậm chức', '裁衣': 'May áo', '栽种': 'Trồng trọt',
  '作灶': 'Dựng bếp', '破屋': 'Phá nhà', '坏垣': 'Phá tường', '诸事不宜': 'Mọi việc đều không nên', '纳婿': 'Ở rể',
  '畋猎': 'Săn bắn', '纳财': 'Thu tài lộc', '开仓': 'Mở kho', '安碓磑': 'Lắp cối xay', '合帐': 'Làm màn, mùng',
  '经络': 'Mắc khung dệt', '扫舍': 'Quét dọn nhà', '教牛马': 'Dạy trâu bò, ngựa', '无': 'Không có việc riêng',
  '挂匾': 'Treo biển', '开池': 'Đào ao', '补垣': 'Vá tường', '取渔': 'Đánh bắt cá', '探病': 'Thăm bệnh',
  '修饰垣墙': 'Sửa tường rào', '求嗣': 'Cầu con', '造仓': 'Làm kho', '牧养': 'Chăn nuôi', '开厕': 'Làm nhà vệ sinh',
  '造畜稠': 'Làm chuồng gia súc', '理发': 'Cắt tóc', '针灸': 'Châm cứu', '放水': 'Tháo nước', '出货财': 'Xuất hàng, chi tiền',
  '词讼': 'Kiện tụng', '酬神': 'Tạ thần', '冠笄': 'Lễ cập kê, lễ đội mũ', '结网': 'Đan lưới', '开渠': 'Đào mương',
  '分居': 'Ra ở riêng', '雇佣': 'Thuê người', '开生坟': 'Làm mộ sống (sinh phần)', '合寿木': 'Đóng quan tài',
  '塞穴': 'Lấp hang', '开柱眼': 'Đục lỗ cột', '习艺': 'Học nghề', '筑堤': 'Đắp đê', '架马': 'Dựng giá, gác khung',
  '整手足甲': 'Cắt móng tay, móng chân', '问名': 'Vấn danh (nghi lễ cưới)', '修门': 'Sửa cửa', '断蚁': 'Diệt kiến',
  '割蜜': 'Lấy mật', '雕刻': 'Chạm khắc', '普渡': 'Phổ độ (cúng chúng sinh)', '合脊': 'Hợp nóc mái', '乘船': 'Đi thuyền',
  '归岫': 'Quy tụ (归岫)',
};

/** Cát thần. */
export const CAT_THAN: Record<string, string> = {
  '天恩': 'Thiên ân', '天赦': 'Thiên xá', '月恩': 'Nguyệt ân', '四相': 'Tứ tướng', '官日': 'Quan nhật', '敬安': 'Kính an',
  '金匮': 'Kim quỹ', '阴德': 'Âm đức', '守日': 'Thủ nhật', '吉期': 'Cát kỳ', '六合': 'Lục hợp', '普护': 'Phổ hộ',
  '宝光': 'Bảo quang', '月空': 'Nguyệt không', '时德': 'Thời đức', '相日': 'Tướng nhật', '驿马': 'Dịch mã', '天后': 'Thiên hậu',
  '天马': 'Thiên mã', '天巫': 'Thiên vu', '福德': 'Phúc đức', '福生': 'Phúc sinh', '五合': 'Ngũ hợp', '鸣吠对': 'Minh phệ đối',
  '月德合': 'Nguyệt đức hợp', '民日': 'Dân nhật', '不将': 'Bất tương', '玉堂': 'Ngọc đường', '三合': 'Tam hợp', '临日': 'Lâm nhật',
  '时阴': 'Thời âm', '天仓': 'Thiên thương', '圣心': 'Thánh tâm', '六仪': 'Lục nghi', '天德': 'Thiên đức', '月德': 'Nguyệt đức',
  '解神': 'Giải thần', '鸣吠': 'Minh phệ', '母仓': 'Mẫu thương', '阳德': 'Dương đức', '五富': 'Ngũ phú', '除神': 'Trừ thần',
  '司命': 'Tư mệnh', '天喜': 'Thiên hỷ', '天医': 'Thiên y', '青龙': 'Thanh long', '天德合': 'Thiên đức hợp', '王日': 'Vương nhật',
  '时阳': 'Thời dương', '生气': 'Sinh khí', '益后': 'Ích hậu', '明堂': 'Minh đường', '续世': 'Tục thế', '要安': 'Yếu an',
  '金堂': 'Kim đường', '玉宇': 'Ngọc vũ', '天愿': 'Thiên nguyện', '天符': 'Thiên phù', '阴神': 'Âm thần', '解除': 'Giải trừ', '无': 'Không có',
};

/** Hung thần. */
export const HUNG_THAN: Record<string, string> = {
  '月建': 'Nguyệt kiến', '小时': 'Tiểu thời', '土府': 'Thổ phủ', '月厌': 'Nguyệt yếm', '地火': 'Địa hỏa', '三丧': 'Tam tang',
  '鬼哭': 'Quỷ khốc', '五虚': 'Ngũ hư', '归忌': 'Quy kỵ', '白虎': 'Bạch hổ', '天罡': 'Thiên cương', '死神': 'Tử thần',
  '致死': 'Trí tử', '天贼': 'Thiên tặc', '死气': 'Tử khí', '天牢': 'Thiên lao', '厌对': 'Yếm đối', '招摇': 'Chiêu dao',
  '九坎': 'Cửu khảm', '九焦': 'Cửu tiêu', '复日': 'Phục nhật', '重日': 'Trùng nhật', '月害': 'Nguyệt hại', '大时': 'Đại thời',
  '大败': 'Đại bại', '咸池': 'Hàm trì', '小耗': 'Tiểu hao', '月破': 'Nguyệt phá', '大耗': 'Đại hao', '四击': 'Tứ kích',
  '九空': 'Cửu không', '元武': 'Huyền vũ', '游祸': 'Du họa', '五离': 'Ngũ ly', '地囊': 'Địa nang', '大煞': 'Đại sát',
  '勾陈': 'Câu trận', '月刑': 'Nguyệt hình', '八风': 'Bát phong', '天吏': 'Thiên lại', '血支': 'Huyết chi', '土符': 'Thổ phù',
  '血忌': 'Huyết kỵ', '触水龙': 'Xúc thủy long', '天刑': 'Thiên hình', '往亡': 'Vãng vong', '朱雀': 'Chu tước', '劫煞': 'Kiếp sát',
  '灾煞': 'Tai sát', '天火': 'Thiên hỏa', '河魁': 'Hà khôi', '月煞': 'Nguyệt sát', '月虚': 'Nguyệt hư', '逐阵': 'Trục trận',
  '八专': 'Bát chuyên', '阴错': 'Âm thác', '四耗': 'Tứ hao', '阳错': 'Dương thác', '四废': 'Tứ phế', '三阴': 'Tam âm',
  '四忌': 'Tứ kỵ', '八龙': 'Bát long', '四穷': 'Tứ cùng', '小会': 'Tiểu hội', '五墓': 'Ngũ mộ', '孤辰': 'Cô thần',
  '单阴': 'Đơn âm', '纯阳': 'Thuần dương', '七鸟': 'Thất điểu', '行狠': 'Hành ngận', '大会': 'Đại hội', '阴阳俱错': 'Âm dương câu thác',
  '阴阳击冲': 'Âm dương kích xung', '天狗': 'Thiên cẩu', '九虎': 'Cửu hổ', '七符': 'Thất phù', '阴道冲阳': 'Âm đạo xung dương',
  '阴位': 'Âm vị', '岁薄': 'Tuế bạc', '绝阳': 'Tuyệt dương', '纯阴': 'Thuần âm', '六蛇': 'Lục xà', '大退': 'Đại thoái',
  '阳破阴冲': 'Dương phá âm xung', '了戾': 'Liễu lệ', '阳错阴冲': 'Dương thác âm xung', '阴阳交破': 'Âm dương giao phá',
  '四离': 'Tứ ly', '成日': 'Thành nhật', '孤阳': 'Cô dương', '绝阴': 'Tuyệt âm', '无': 'Không có',
};

const dich = (bang: Record<string, string>, chuHan: string) => bang[chuHan] ?? chuHan;
export const dichViec = (chuHan: string) => dich(VIEC, chuHan);
export const dichCatThan = (chuHan: string) => dich(CAT_THAN, chuHan);
export const dichHungThan = (chuHan: string) => dich(HUNG_THAN, chuHan);
