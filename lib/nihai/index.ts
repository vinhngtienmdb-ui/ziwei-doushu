/**
 * Nghê Hải Hạ (倪海厦) — Thiên Kỷ / Địa Kỷ / Nhân Kỷ — xuất dữ liệu thống nhất
 *
 * Nghê Hải Hạ (1954-2012), người sáng lập Học viện Trung y Hán Đường (汉唐中医学院) tại Hoa Kỳ,
 * một kỳ nhân hiếm có của thời nay, thông thạo đủ năm thuật «Mệnh, Tướng, Bốc, Sơn, Y».
 *
 * Hệ thống Tam Kỷ:
 *   Thiên Kỷ — trên biết thiên văn (Tử Vi Đẩu Số, Kinh Dịch, Kham Dư, suy mệnh, nhân tướng, trắc tự)
 *   Địa Kỷ — dưới biết địa lý (địa lý chí các nước, phong thủy và vận nước)
 *   Nhân Kỷ — giữa biết nhân sự (châm cứu, Hoàng Đế Nội Kinh, Thần Nông Bản Thảo Kinh, Thương Hàn Luận, Kim Quỹ Yếu Lược)
 */

export * from './types';
export { TIANJI_MODULES, HEXAGRAMS, FENGSHUI_ENTRIES, TIANJI_EPISODES, TIANJI_QUOTES, TIANJI_STATS } from './tianji';
export { RENJI_MODULES, ACU_EXPERIENCES, TRANS_NEEDLING, HANTANG_FORMULAS, CLASSIC_FORMULAS, RENJI_STATS } from './renji';
export { DIJI_MODULES, DIJI_STATS } from './diji';

/** Tiểu sử đầy đủ của Nghê Hải Hạ */
export const NI_HAIXIA_BIO = {
  name: 'Nghê Hải Hạ (倪海厦)',
  nameVariant: 'Nghê Hải Hạ (倪海夏)',
  alias: 'Phạm Vũ Long (梵宇龙)',
  birth: 'Ngày 1 tháng 1 năm 1954',
  death: 'Ngày 31 tháng 1 năm 2012',
  birthPlace: 'Đài Bắc (台北市)',
  ancestry: 'Thụy An, Chiết Giang (浙江瑞安)',
  family: 'Bảy anh chị em, đứng thứ năm',
  education: 'Khoa Chính trị, Đại học Đông Ngô (东吴大学)',
  title: 'Người sáng lập Học viện Trung y Hán Đường tại Hoa Kỳ',
  titles: [
    'Kỳ nhân hiếm có, thông thạo đủ năm thuật Mệnh, Tướng, Bốc, Sơn, Y',
    'Viện trưởng Học viện Trung y Hán Đường tại Hoa Kỳ',
    'Giáo sư hướng dẫn tiến sĩ của Đại học Trung y dược California (Hoa Kỳ)',
    'Ủy viên cao nhất của Hội đồng Trung y thuộc Sở Y tế bang Florida (2000-2003)',
    'Ủy viên và Phó chủ tịch Hội đồng Châm cứu bang Florida',
    'Người kế thừa hiện đại của phái Kinh Phương (经方)',
    'Người sáng lập hệ thống giảng dạy Thiên Kỷ và Nhân Kỷ',
    'Người nhận giải Người Hoa xuất sắc ở hải ngoại',
  ],
  /** Quan hệ thầy trò */
  teachers: [
    { name: 'Chu Tả Vũ (周左宇)', background: 'Danh y gia truyền bốn đời ở Bắc Kinh, sau năm 1949 chuyển sang Đài Loan', subject: 'Châm cứu', period: '1977-1981' },
    { name: 'Từ Tế Dân (徐济民)', background: 'Danh y Thượng Hải, quê Giang Tô', subject: 'Châm cứu', period: 'Thập niên 1970' },
    { name: 'Truyền thừa Khương Tá Cảnh (姜佐景)', background: 'Kinh phương gia thuộc dòng Tào Dĩnh Phủ (曹颖甫)', subject: 'Kinh phương', period: 'Thời làm học việc ở hiệu thuốc Đông y tại Cơ Long' },
  ],
  /** Quan niệm cốt lõi */
  corePhilosophy: [
    'Đại đạo chí giản — phi tinh bay qua bay lại quá phức tạp, không làm',
    'Mệnh cung là gốc, tam phương là dụng',
    'Nỗ lực nhân sự cộng điều chỉnh địa lý lớn hơn mệnh tiên thiên (2/3 so với 1/3)',
    'Trung y là y học vật lý, phân tích cơ thể người từ góc độ vật lý',
    'Biện chứng không biện bệnh — Trung y xem chứng hình chứ không xem tên bệnh',
    'Kinh phương: một thang biết, hai thang khỏi',
    'Không muốn văn hóa Trung Hoa thất truyền, nên đã dạy rất nhiều học trò',
    'Xem mệnh là một triết học bàn về quả',
    'Chữ nghĩa chỉ là con thuyền, chân lý mới là bờ bên kia',
  ],
  /** Các mốc lớn trong đời */
  timeline: [
    { year: '1954', event: 'Sinh ra tại Đài Bắc, quê gốc Thụy An, Chiết Giang' },
    { year: '1970s', event: 'Thời trung học, dùng «Y Tông Kim Giám» (医宗金鉴) chữa khỏi chứng đau bụng kinh của người chị thứ hai, từ đó lập chí học y' },
    { year: '1977-1981', event: 'Theo thầy Chu Tả Vũ học châm cứu' },
    { year: '1978', event: 'Nhập ngũ tại phòng quân y đảo Mã Tổ, được tặng danh hiệu «Thần y Mã Tổ», khi mới 24 tuổi' },
    { year: '1979', event: 'Sau khi xuất ngũ, lấy bút danh «Phạm Vũ Long» (梵宇龙) bắt đầu nghề xem mệnh, xem tướng' },
    { year: '1980', event: 'Di cư sang Hoa Kỳ' },
    { year: '1988', event: 'Mở «Lớp Thiên văn Địa lý» ở đường Kim Sơn Nam, Đài Bắc, dạy Tử Vi Đẩu Số và phong thủy dương trạch' },
    { year: '1991', event: 'Trở thành thầy châm cứu có đăng ký của bang Florida, Hoa Kỳ' },
    { year: '1993', event: 'Chọn khu đất cho Học viện Trung y Hán Đường tại Merritt Island, bang Florida' },
    { year: '1994', event: 'Hoàn thành thu bộ «Thiên Kỷ», gồm 24 tập' },
    { year: '1995', event: 'Sáng lập Học viện Trung y Hán Đường' },
    { year: '2000-2003', event: 'Giữ chức ủy viên cao nhất của Hội đồng Trung y thuộc Sở Y tế bang Florida' },
    { year: '2004', event: 'Mở lớp dạy Trung y «Nhân Kỷ» tại Đài Bắc' },
    { year: '2005', event: 'Phát hành bộ DVD giảng dạy «Nhân Kỷ»' },
    { year: '2007', event: 'Bắt đầu viết «Địa Kỷ»' },
    { year: '2010', event: 'Thành lập phòng khám Kinh phương Trung y Hán Đường tại Đài Bắc; được mời diễn thuyết cả ngày tại Diễn đàn Phù Dương lần thứ ba' },
    { year: '2011', event: 'Thành lập y quán Kinh phương Trung y Hán Đường tại Thâm Quyến' },
    { year: '2012', event: 'Ngày 31 tháng 1 qua đời tại Đài Bắc do suy tim phổi, thọ 59 tuổi' },
  ],
  /** Hệ thống tác phẩm */
  publications: {
    originalBooks8: ['Hoàng Đế Nội Kinh Tố Vấn (黄帝内经素问)', 'Hoàng Đế Nội Kinh (黄帝内经)', 'Thần Nông Bản Thảo Kinh (神农本草经)', 'Châm cứu (针灸)', 'Thương Hàn Luận (伤寒论)', 'Kim Quỹ (金匮)', 'Nhân Gian Đạo (人间道)', 'Thiên Cơ Đạo · Địa Mạch Đạo (天机道·地脉道)'],
    totalBooks: '26-44 cuốn (gồm giáo trình có chú giải, toàn tập y án, giải nghĩa chi tiết huyệt vị…)',
    hantangFormulas: '100 bài thuốc Hán Đường',
    classicFormulas: '259 bài thuốc kinh điển',
    medicalCases: '7 cuốn toàn tập y án',
    totalVideoHours: 'Hơn 200 giờ',
  },
  /** Hệ thống Tam Kỷ */
  sanJi: {
    tianji: {
      name: 'Thiên Kỷ (天纪)',
      meaning: 'Trên biết thiên văn',
      content: 'Tử Vi Đẩu Số, 64 quẻ Kinh Dịch, Kham Dư học, Suy mệnh học, Nhân tướng học, Trắc tự thuật',
      recordYear: 1994,
      episodes: 24,
      hdEpisodes: 83,
      hoursPerEpisode: 2,
      totalHours: 48,
      books: ['Thiên Cơ Đạo (天机道)', 'Nhân Gian Đạo (人间道)', 'Địa Mạch Đạo (地脉道)', 'Đồ Dịch 64 quẻ (64卦易图)'],
      schools: ['Phái Tam Hợp (Tử Vi Đẩu Số)', 'Phái Tượng Số (Kinh Dịch)', 'Phái Cửu Tinh (Kham Dư)', 'Phái Hà Lạc Số Lý (suy mệnh)'],
      structure: 'Một giờ đầu giảng mệnh học, một giờ sau giảng Kinh Dịch',
    },
    renji: {
      name: 'Nhân Kỷ (人纪)',
      meaning: 'Giữa biết nhân sự',
      content: 'Châm Cứu Đại Thành (44 tập), Hoàng Đế Nội Kinh (20 tập), Thần Nông Bản Thảo Kinh (46 tập), Thương Hàn Luận, Kim Quỹ Yếu Lược (20 tập)',
      completionYear: '2004-2005',
      totalLessons: 'Hơn 150 tập',
      learningOrder: 'Châm cứu → Hoàng Đế Nội Kinh → Thần Nông Bản Thảo Kinh → Thương Hàn Luận → Kim Quỹ Yếu Lược',
      acuExperience: 215,
      transNeedling: 31,
      hantangFormulas: 100,
    },
    diji: {
      name: 'Địa Kỷ (地纪)',
      meaning: 'Dưới biết địa lý',
      content: 'Địa lý chí các nước (chưa hoàn thành)',
      status: 'Sự nghiệp dang dở của Nghê sư',
      note: 'Dự định viết sau tuổi 60, nhưng ông qua đời năm 2012',
      startYear: 2007,
      existingContent: 'Phần Kham Dư học trong khóa Thiên Kỷ cộng với di cảo do hậu học chỉnh lý',
    },
  },
  /** Đặc điểm tính cách */
  personality: {
    算命风格: 'Đoán thẳng thừng, không chừa đường lui',
    音乐爱好: 'Thích nhất bài «Hotel California» của ban nhạc Eagles',
    生活技能: 'Nấu ăn, giặt giũ việc gì cũng thành thạo, tài làm bột mì ai cũng khen',
    工作态度: 'Nhiều năm để giấy bút đầu giường, gặp bệnh nan y thì khấn nguyện tiên sư',
    睡眠: 'Nhiều năm ngủ ban đêm chưa đến ba giờ',
    患者评价: 'Thường được bệnh nhân Mỹ gọi là «niềm hy vọng cuối cùng (The last hope)»',
  },
  /** Tiêu chuẩn chọn người nối nghiệp */
  discipleStandards: [
    'Tâm tính tốt',
    'Cá tính mạnh',
    'Chính kiến vững',
    'Quan sát nhạy bén',
    'Dám phê phán lý thuyết sai',
  ],
};

/** Điều hướng Tam Kỷ */
export const SANJI_CATEGORIES = [
  { key: 'tianji' as const, name: 'Thiên Kỷ (天纪)', nameEn: 'Tian Ji', icon: '⊙', meaning: 'Trên biết thiên văn', color: '#d4a843', href: '/tianji' },
  { key: 'diji' as const, name: 'Địa Kỷ (地纪)', nameEn: 'Di Ji', icon: '⊞', meaning: 'Dưới biết địa lý', color: '#6b8a5e', href: '/diji' },
  { key: 'renji' as const, name: 'Nhân Kỷ (人纪)', nameEn: 'Ren Ji', icon: '⊕', meaning: 'Giữa biết nhân sự', color: '#8b6b9e', href: '/renji' },
] as const;
