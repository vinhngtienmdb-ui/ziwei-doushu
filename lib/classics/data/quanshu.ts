/**
 * 《紫微斗数全书》— 核心精选
 *
 * 公版（明代罗洪先编）
 * 是紫微斗数最系统的古籍，强调宫位关系与四化，全本约 10 万字。
 */

import type { Book } from '../types';

export const ziWeiQuanShu: Book = {
  title: '紫微斗数全书',
  slug: 'quanshu',
  dynasty: '明代',
  author: '罗洪先 编',
  intro: 'Bộ cổ thư có hệ thống nhất về Tử Vi Đẩu Số, nhấn mạnh quan hệ giữa mười hai cung và Tứ Hóa. Là giáo trình chính của các học giả Tử Vi từ đời Thanh trở về sau.',
  wordCount: 100000,
  chapters: [
    {
      title: 'Thập nhị cung luận · Mệnh cung (十二宫论·命宫)',
      subtitle: 'Căn bản để xem mệnh',
      paragraphs: [
        {
          id: 'qs-1-1',
          idx: 1,
          text: '命宫者，一身之根本，万事之枢纽。命宫定，则一生格局定。看命宫先看主星，次看辅煞，再看四化与三方四正之会照。',
          translation: 'Mệnh cung là gốc rễ của cả một đời người, là then chốt của mọi việc. Mệnh cung đã định thì cách cục cả đời đã định. Xem Mệnh cung, trước hết xem chính tinh, kế đến xem các phụ tinh và sát tinh, sau cùng xem sự hội chiếu của Tứ Hóa và tam phương tứ chính.',
        },
        {
          id: 'qs-1-2',
          idx: 2,
          text: '命宫主星庙旺，主先天优势，做事事半功倍；落陷则主先天劣势，但反主大成——落陷之人有"不甘"二字推动，反能爆发出庙旺命格做不到的逆袭。',
          translation: 'Chính tinh ở Mệnh cung miếu, vượng thì chủ về lợi thế bẩm sinh, làm việc công ít mà hiệu quả nhiều. Chính tinh lạc hãm thì chủ về bất lợi bẩm sinh, nhưng ngược lại có thể thành tựu lớn: người có sao lạc hãm bị hai chữ "không cam lòng" thúc đẩy, nên có thể bùng nổ, vươn lên theo cách mà mệnh cách miếu, vượng không làm được.',
        },
        {
          id: 'qs-1-3',
          idx: 3,
          text: '命宫见六吉星（左辅右弼文昌文曲天魁天钺），主一生贵人不绝；命宫见六煞星（擎羊陀罗火星铃星地空地劫），主多波折磨砺，但若能忍过，反成大器。',
          translation: 'Mệnh cung gặp sáu cát tinh (Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt) thì chủ về cả đời quý nhân không dứt. Mệnh cung gặp sáu sát tinh (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp) thì chủ về nhiều trắc trở, rèn luyện; nhưng nếu chịu đựng vượt qua được thì ngược lại nên người tài giỏi.',
        },
      ],
    },
    {
      title: 'Thập nhị cung luận · Tài Bạch cung (十二宫论·财帛宫)',
      subtitle: 'Nơi nguồn tài lộc',
      paragraphs: [
        {
          id: 'qs-2-1',
          idx: 1,
          text: '财帛宫主一生之财源、收入、理财方式。财帛宫主星不同，赚钱方式各异：紫微在财主官财，武曲在财主商财，太阴在财主田宅财，巨门在财主口才财。',
          translation: 'Tài Bạch cung chủ về nguồn tài lộc, thu nhập và cách quản lý tiền bạc của cả đời. Chính tinh ở Tài Bạch cung khác nhau thì cách kiếm tiền khác nhau: Tử Vi ở cung Tài chủ về tiền từ chức quyền, Vũ Khúc ở cung Tài chủ về tiền từ kinh doanh, Thái Âm ở cung Tài chủ về tiền từ nhà đất, Cự Môn ở cung Tài chủ về tiền từ tài ăn nói.',
        },
        {
          id: 'qs-2-2',
          idx: 2,
          text: '财帛宫化禄入命，主财源广进；财帛宫化忌，主财来财去；财帛宫见禄存，主稳定积累；财帛宫遇空劫，主财耗虚名。',
          translation: 'Tài Bạch cung hóa Lộc nhập Mệnh thì chủ nguồn tài rộng mở. Tài Bạch cung hóa Kỵ thì chủ tiền đến rồi đi. Tài Bạch cung gặp Lộc Tồn thì chủ tích lũy ổn định. Tài Bạch cung gặp Không, Kiếp thì chủ tiền hao tổn, chỉ còn hư danh.',
        },
      ],
    },
    {
      title: 'Thập nhị cung luận · Quan Lộc cung (十二宫论·官禄宫)',
      subtitle: 'Gốc của sự nghiệp',
      paragraphs: [
        {
          id: 'qs-3-1',
          idx: 1,
          text: '官禄宫主事业、地位、社会成就。官禄宫主星不同，事业方向各异：紫微在官宜大平台高位，太阳在官宜公务名声，武曲在官宜金融实业，廉贞在官宜文武兼备。',
          translation: 'Quan Lộc cung chủ về sự nghiệp, địa vị và thành tựu xã hội. Chính tinh ở Quan Lộc cung khác nhau thì hướng sự nghiệp khác nhau: Tử Vi ở cung Quan nên làm ở nền tảng lớn, vị trí cao; Thái Dương ở cung Quan nên làm công vụ, được danh tiếng; Vũ Khúc ở cung Quan nên làm tài chính, thực nghiệp; Liêm Trinh ở cung Quan nên làm việc văn võ kiêm toàn.',
        },
        {
          id: 'qs-3-2',
          idx: 2,
          text: '官禄宫化权入命，主能独当一面；化禄入官，主财从职业来；化忌入官，主职场波折。',
          translation: 'Quan Lộc cung hóa Quyền nhập Mệnh thì chủ có thể một mình đảm đương một phương. Hóa Lộc nhập cung Quan thì chủ tiền của đến từ nghề nghiệp. Hóa Kỵ nhập cung Quan thì chủ chốn làm việc nhiều trắc trở.',
        },
      ],
    },
    {
      title: 'Thập nhị cung luận · Phu Thê cung (十二宫论·夫妻宫)',
      subtitle: 'Khí chất của người phối ngẫu',
      paragraphs: [
        {
          id: 'qs-4-1',
          idx: 1,
          text: '夫妻宫主配偶气质、婚姻状态。夫妻宫紫微主配偶端庄威权，宜迟婚；夫妻宫贪狼主配偶多情，桃花重；夫妻宫天梁主配偶成熟稳重，年长。',
          translation: 'Phu Thê cung chủ về khí chất của người phối ngẫu và tình trạng hôn nhân. Phu Thê cung có Tử Vi thì chủ người phối ngẫu đoan trang, có uy quyền, nên kết hôn muộn. Phu Thê cung có Tham Lang thì chủ người phối ngẫu đa tình, đào hoa nặng. Phu Thê cung có Thiên Lương thì chủ người phối ngẫu chín chắn, vững vàng, lớn tuổi hơn.',
        },
        {
          id: 'qs-4-2',
          idx: 2,
          text: '夫妻宫化忌冲命，主婚姻多波折。夫妻宫见六煞，需特别注意感情之磨砺。夫妻宫见六吉，主配偶贵人。',
          translation: 'Phu Thê cung hóa Kỵ xung Mệnh thì chủ hôn nhân nhiều trắc trở. Phu Thê cung gặp sáu sát tinh thì cần đặc biệt chú ý sự thử thách, rèn luyện trong tình cảm. Phu Thê cung gặp sáu cát tinh thì chủ người phối ngẫu là quý nhân.',
        },
      ],
    },
    {
      title: 'Tứ Hóa luận (四化论)',
      subtitle: 'Hóa Lộc, hóa Quyền, hóa Khoa, hóa Kỵ',
      paragraphs: [
        {
          id: 'qs-5-1',
          idx: 1,
          text: '四化为命盘之精华——化禄主财、化权主势、化科主名、化忌主病。四化所在宫位，决定一生重大事件之节点。',
          translation: 'Tứ Hóa là tinh hoa của lá số: hóa Lộc chủ về tiền của, hóa Quyền chủ về quyền thế, hóa Khoa chủ về danh tiếng, hóa Kỵ chủ về bệnh tật. Cung vị nơi Tứ Hóa tọa lạc quyết định các mốc của những sự kiện trọng đại trong đời.',
        },
        {
          id: 'qs-5-2',
          idx: 2,
          text: '生年四化为本命四化，永远固定；倪师强调四化星不动，只看大限流年走到何处。北派飞星派之自化、宫干飞化、来因宫等，倪师不主张使用。',
          translation: 'Tứ Hóa theo năm sinh là Tứ Hóa bản mệnh, mãi mãi cố định. Nghê sư nhấn mạnh sao Tứ Hóa không di chuyển, chỉ xem đại hạn và lưu niên đi tới đâu. Các phép của phái Phi Tinh phương Bắc như tự hóa, cung can phi hóa, lai nhân cung, Nghê sư không chủ trương sử dụng.',
        },
        {
          id: 'qs-5-3',
          idx: 3,
          text: '化禄入命三方四正：财源稳定，缘分广，能力可变现。化禄入夫妻：婚姻甜蜜。化禄入官禄：事业财源相应。',
          translation: 'Hóa Lộc nhập tam phương tứ chính của Mệnh: nguồn tài ổn định, duyên phận rộng, năng lực có thể biến thành tiền. Hóa Lộc nhập Phu Thê: hôn nhân ngọt ngào. Hóa Lộc nhập Quan Lộc: sự nghiệp và nguồn tài tương ứng với nhau.',
        },
        {
          id: 'qs-5-4',
          idx: 4,
          text: '化忌入命三方四正：一生有深刻功课，宜面对而非逃避。化忌入夫妻：婚姻多磨砺。化忌入官禄：事业多波折，但磨练后反成专业人才。',
          translation: 'Hóa Kỵ nhập tam phương tứ chính của Mệnh: cả đời có bài học sâu sắc, nên đối diện chứ không nên trốn tránh. Hóa Kỵ nhập Phu Thê: hôn nhân nhiều thử thách. Hóa Kỵ nhập Quan Lộc: sự nghiệp nhiều trắc trở, nhưng sau khi tôi luyện ngược lại trở thành nhân tài chuyên môn.',
        },
      ],
    },
    {
      title: 'Cách Cơ Nguyệt Đồng Lương (机月同梁格)',
      subtitle: 'Mệnh của sự ổn định và tích lũy',
      paragraphs: [
        {
          id: 'qs-6-1',
          idx: 1,
          text: '天机太阴天同天梁四星齐入命三方四正，称机月同梁格。文质彬彬、聪慧善谋，最适合公职、学术、文艺、医疗、服务等需稳定累积的行业。',
          translation: 'Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng hội vào tam phương tứ chính của Mệnh thì gọi là cách Cơ Nguyệt Đồng Lương. Người này văn nhã lịch thiệp, thông minh giỏi mưu tính, thích hợp nhất với công chức, học thuật, văn nghệ, y tế, dịch vụ và các ngành cần tích lũy ổn định.',
        },
        {
          id: 'qs-6-2',
          idx: 2,
          text: '机月同梁作吏人——古云此格者宜担任公职、行政文书工作，安稳一生。再会昌曲化科，主名声远播。最忌煞星过多，则反主多变难安。',
          translation: 'Cơ Nguyệt Đồng Lương làm lại nhân: người xưa nói người có cách này nên đảm nhiệm công vụ, công việc hành chính văn thư, ổn định cả đời. Lại hội Xương, Khúc, hóa Khoa thì chủ danh tiếng truyền xa. Kỵ nhất là sát tinh quá nhiều, khi đó ngược lại chủ nhiều biến động, khó an.',
        },
      ],
    },
    {
      title: 'Cách Song Lộc triều viên (双禄朝垣格)',
      subtitle: 'Giàu sánh Đào Chu',
      paragraphs: [
        {
          id: 'qs-7-1',
          idx: 1,
          text: '化禄与禄存同会命宫三方四正，称双禄朝垣格。古云"双禄朝垣，富比陶朱"，主一生不愁财，多有正财横财兼得。',
          translation: 'Hóa Lộc cùng Lộc Tồn hội ở tam phương tứ chính của Mệnh cung thì gọi là cách Song Lộc triều viên. Người xưa nói "Song Lộc triều viên, giàu sánh Đào Chu", chủ cả đời không lo tiền bạc, thường được cả chính tài lẫn hoạnh tài.',
        },
        {
          id: 'qs-7-2',
          idx: 2,
          text: '双禄朝垣最忌空劫——空劫一冲，则双禄成虚名。需见左辅右弼或文昌文曲，方为正格。',
          translation: 'Song Lộc triều viên kỵ nhất Không, Kiếp: Không, Kiếp một khi xung thì Song Lộc chỉ còn hư danh. Cần thấy Tả Phù, Hữu Bật hoặc Văn Xương, Văn Khúc thì mới là chính cách.',
        },
      ],
    },
  ],
};
