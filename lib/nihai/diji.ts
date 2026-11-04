/**
 * Địa Kỷ (地纪) — cơ sở dữ liệu hệ thống địa lý phong thủy của Nghê Hải Hạ
 *
 * «Dưới biết địa lý» — kỷ của đất, là sự nghiên cứu có hệ thống về địa lý chí.
 * Nghê Hải Hạ dự định sau tuổi 60 sẽ viết, dùng kiến thức thiên văn địa lý và nền tảng y học
 * để viết lại địa lý chí các nước, nghiên cứu mối quan hệ giữa tính người, vật sản và phong thủy địa lý của mỗi quốc gia.
 *
 * Nghê sư qua đời năm 2012, Địa Kỷ chưa hoàn thành, trở thành «sự nghiệp dang dở của Nghê sư».
 * Nội dung hiện có đến từ phần Kham Dư học trong khóa Thiên Kỷ và di cảo do hậu học chỉnh lý.
 */

import type { NiModule } from './types';

// ─── Các mô-đun Địa Kỷ ────────────────────────────────────
export const DIJI_MODULES: NiModule[] = [
  {
    id: 'dj-guojiadili',
    category: 'diji',
    name: 'Địa lý chí quốc gia (国家地理志)',
    nameEn: 'National Geography',
    subtitle: 'Sự nghiệp dang dở của Nghê sư · Nghiên đọc di cảo',
    description: 'Nghê sư dự định dùng kiến thức phong thủy địa lý để giải đọc ảnh hưởng của môi trường địa lý mỗi nước đối với tính cách quốc dân, tài nguyên vật sản và vận hưng suy của quốc gia. Đây là tâm nguyện lớn mà Nghê sư chưa kịp hoàn thành.',
    details: [
      'Địa Kỷ là phần được dự định hoàn thành sau cùng trong ba hệ thống tác phẩm lớn của Nghê Hải Hạ, dự định bắt đầu viết sau tuổi 60.',
      'Ý tưởng cốt lõi là dùng kiến thức phong thủy địa lý để viết lại địa lý chí các nước, đem Kham Dư học truyền thống áp dụng ở tầm quốc gia vĩ mô.',
      'Hướng nghiên cứu gồm: vị trí địa lý của quốc gia, tác động của núi sông đối với việc hình thành tính cách quốc dân, mối quan hệ giữa vật sản tài nguyên và cách cục phong thủy, mối liên hệ giữa hưng suy lịch sử và biến đổi địa lý.',
      'Nghê sư qua đời năm 2012, Địa Kỷ chỉ để lại ý tưởng ban đầu và nền tảng lý luận Kham Dư học trong khóa Thiên Kỷ. Những tia lửa tư tưởng quý giá này đáng để hậu bối chỉnh lý và truyền thừa.',
    ],
    references: [
      'Phần Kham Dư học trong «Thiên Kỷ» của Nghê Hải Hạ',
      'Ý tưởng về địa lý chí trong các buổi giảng của Nghê Hải Hạ',
    ],
    keywords: ['Địa Kỷ', 'Địa lý quốc gia', 'Phong thủy', 'Địa lý chí', 'Vận nước', 'Vật sản', 'Tính người', 'Kham Dư'],
    icon: '⊞',
    status: 'preview',
    order: 1,
    slug: 'geography',
    chapters: [
      {
        id: 'dj-dl-01',
        title: 'Ý tưởng Địa Kỷ',
        subtitle: 'Tâm nguyện lớn và bản thiết kế của Nghê sư',
        description: 'Ý tưởng tổng thể của Nghê sư về Địa Kỷ — dùng kiến thức phong thủy địa lý để giải đọc vận mệnh quốc gia.',
        keyPoints: [
          'Dự định viết sau tuổi 60 (Nghê sư sinh năm 1954)',
          'Kết hợp kiến thức thiên văn địa lý với nền tảng y học',
          'Viết lại địa lý chí các nước',
          'Nghiên cứu mối quan hệ giữa tính người, vật sản và phong thủy địa lý',
        ],
        quotes: ['Tôi muốn sau sáu mươi tuổi, dùng kiến thức thiên văn địa lý và nền tảng y học của mình để viết lại địa lý chí'],
        order: 1,
      },
      {
        id: 'dj-dl-02',
        title: 'Địa lý và tính người',
        subtitle: 'Một phương nước nuôi một phương người',
        description: 'Các môi trường địa lý khác nhau hình thành tính cách dân tộc và đặc trưng văn hóa khác nhau như thế nào.',
        keyPoints: [
          'Khác biệt tính cách giữa dân tộc miền núi và dân tộc đồng bằng',
          'Ảnh hưởng của hệ thống sông ngòi đối với nền văn minh nông nghiệp',
          'Quan hệ giữa đới khí hậu với thể chất và tính cách con người',
          'Nơi phong thủy tốt ắt có hiền tài xuất hiện',
        ],
        order: 2,
      },
    ],
  },
  {
    id: 'dj-kanyu-theory',
    category: 'diji',
    name: 'Nền tảng lý luận Kham Dư (堪舆理论基础)',
    nameEn: 'Feng Shui Theory',
    subtitle: 'Kham Dư học Thiên Kỷ · Chỉnh lý lý luận',
    description: 'Chỉnh lý từ phần lý luận Kham Dư học trong khóa Thiên Kỷ, làm nền tảng lý luận cho Địa Kỷ. Gồm các lý luận cốt lõi như Loan Đầu học, Lý Khí học, Dương trạch học.',
    details: [
      'Dù Địa Kỷ chưa thành sách độc lập, khóa Thiên Kỷ đã chứa nhiều nội dung lý luận Kham Dư học phong phú.',
      'Những lý luận này là khung nền của Địa Kỷ, bao quát các phương pháp phân tích phong thủy từ vi mô (nhà ở) đến vĩ mô (thành phố, quốc gia).',
      'Nghê sư theo Phái Cửu Tinh (dòng Dương Cứu Bần), coi trọng cả Loan Đầu lẫn Lý Khí.',
      'Phần này có thể xem là «dự bị lý luận» của Địa Kỷ, cung cấp phương pháp luận cho việc nghiên cứu địa lý chí quốc gia về sau.',
    ],
    school: 'Phái Cửu Tinh (dòng Dương Cứu Bần)',
    references: [
      '«Thiên Kỷ · Địa Mạch Đạo» (天纪·地脉道) của Nghê Hải Hạ',
      'Điển tịch phong thủy của Dương Cứu Bần (杨救贫)',
    ],
    keywords: ['Kham Dư', 'Lý luận phong thủy', 'Loan Đầu', 'Lý Khí', 'Phái Cửu Tinh', 'Dương Cứu Bần', 'Dương trạch', 'Âm trạch'],
    icon: '◫',
    status: 'active',
    order: 2,
    slug: 'kanyu-theory',
    chapters: [
      {
        id: 'dj-kt-01',
        title: 'Loan Đầu học (峦头学)',
        subtitle: 'Phán đoán hình núi thế nước',
        description: 'Quan sát hình dạng, hướng đi của núi và dòng chảy của nước để phán đoán cát hung phong thủy.',
        keyPoints: [
          'Long mạch: thế đi của dãy núi và khí mạch',
          'Huyệt vị: vị trí tốt nhất để tàng phong tụ khí',
          'Sa thủ: thế núi ôm bọc hai bên huyệt',
          'Thủy khẩu: phương vị nước vào ra',
        ],
        order: 1,
      },
      {
        id: 'dj-kt-02',
        title: 'Lý Khí học (理气学)',
        subtitle: 'Suy tính cát hung của phương vị',
        description: 'Dùng la bàn đo phương vị, kết hợp lý luận Cửu tinh phi bố, Bát sát Hoàng tuyền để suy tính cát hung.',
        keyPoints: [
          'Cách dùng la bàn',
          'Nguyên lý Cửu tinh phi bố',
          'Phương vị cấm kỵ của Bát sát Hoàng tuyền',
          'Phương vị cát lợi của Tam cát Lục tú',
        ],
        order: 2,
      },
      {
        id: 'dj-kt-03',
        title: 'Ứng dụng dương trạch',
        subtitle: 'Thực hành phong thủy cho môi trường cư trú',
        description: 'Phương pháp thực tế áp dụng lý luận Kham Dư vào việc chọn nhà và bố trí nhà ở.',
        keyPoints: [
          'Nguyên tắc chọn hướng ngồi của ngôi nhà',
          'Bố trí phương vị các khu chức năng trong nhà',
          'Phán đoán cát hung của môi trường xung quanh',
          'Cách hóa giải phong thủy xấu',
        ],
        order: 3,
      },
    ],
  },
  {
    id: 'dj-yigao',
    category: 'diji',
    name: 'Di cảo và hậu học (遗稿与后学)',
    nameEn: 'Legacy & Continuation',
    subtitle: 'Hậu bối bổ chú · Lửa truyền đời đời',
    description: 'Chỉnh lý những lời giảng rời rạc của Nghê sư về Địa Kỷ, phần nghiên cứu bổ chú của học trò hậu bối, và sự mở rộng hiện đại của tư tưởng Địa Kỷ.',
    details: [
      'Dù Nghê sư chưa hoàn thành chuyên khảo Địa Kỷ, nhiều lần trong khóa Thiên Kỷ và các dịp khác ông đã nhắc đến ý tưởng và điểm cốt yếu của Địa Kỷ.',
      'Học trò hậu bối và các nhà nghiên cứu đã chỉnh lý và bổ chú ở mức độ nhất định dựa trên lời giảng và di cảo của Nghê sư.',
      'Tư tưởng Địa Kỷ có giá trị tham khảo quan trọng trong nghiên cứu phong thủy hiện đại, quy hoạch đô thị, khoa học môi trường và các lĩnh vực khác.',
      'Mô-đun này nhằm thu thập, chỉnh lý mọi tư liệu rải rác liên quan đến Địa Kỷ, làm nền tảng cho nghiên cứu về sau.',
    ],
    references: [
      'Ghi chép thực tế các buổi giảng của Nghê Hải Hạ',
      'Ghi chép và nghiên cứu của học trò hậu bối',
    ],
    keywords: ['Di cảo', 'Hậu học', 'Bổ chú', 'Truyền thừa', 'Ứng dụng hiện đại'],
    icon: '⊟',
    status: 'coming',
    order: 3,
    slug: 'legacy',
    chapters: [
      {
        id: 'dj-yg-01',
        title: 'Ngữ lục Địa Kỷ của Nghê sư',
        subtitle: 'Tư tưởng Địa Kỷ rải rác trong các khóa học',
        description: 'Trích những luận thuật quan trọng của Nghê sư về Địa Kỷ từ các khóa Thiên Kỷ, Nhân Kỷ và các khóa khác.',
        keyPoints: [
          'Động cơ sáng tác và kế hoạch của Địa Kỷ',
          'Quan sát về môi trường địa lý các nước',
          'Luận thuật về quan hệ giữa phong thủy và vận nước',
          'Mối liên hệ giữa Địa Kỷ với Thiên Kỷ và Nhân Kỷ',
        ],
        quotes: [
          'Nỗ lực của nhân sự cộng với điều chỉnh về địa lý, nhất định lớn hơn mệnh tiên thiên',
          '2/3 lớn hơn 1/3 — nhân sự cộng địa lý là 2/3, mệnh tiên thiên là 1/3',
        ],
        order: 1,
      },
    ],
  },
];

// ─── Thống kê ────────────────────────────────────────────
export const DIJI_STATS = {
  totalModules: DIJI_MODULES.length,
  totalChapters: DIJI_MODULES.reduce((sum, m) => sum + m.chapters.length, 0),
  status: 'Sự nghiệp dang dở của Nghê sư · Hậu bối đang tiếp tục chỉnh lý',
  note: 'Nghê Hải Hạ dự định viết Địa Kỷ sau tuổi 60, nhưng qua đời năm 2012; Địa Kỷ chỉ để lại ý tưởng và nền tảng lý luận',
};
