/**
 * 《骨髓赋》— 紫微斗数核心口诀
 *
 * 公版（明代刊本）。是紫微斗数最权威、最浓缩的口诀，长约 1500 字。
 * 倪师在《天纪》中多次援引此赋。
 */

import type { Book } from '../types';

export const guSuiFu: Book = {
  title: '骨髓赋',
  slug: 'gusuifu',
  dynasty: '明代',
  author: 'Khuyết danh (紫微斗数古籍传承)',
  intro: 'Bài phú cô đọng nhất của Tử Vi Đẩu Số, toàn văn khoảng 1.500 chữ. Nghê Hải Hạ nhiều lần dẫn bài phú này trong «Thiên Kỷ»; đây là kinh điển người học Tử Vi phải đọc.',
  wordCount: 1500,
  chapters: [
    {
      title: 'Tổng luận (总论篇)',
      subtitle: 'Lập luận cơ bản của Tử Vi Đẩu Số',
      paragraphs: [
        {
          id: 'gsf-1-1',
          idx: 1,
          text: '太极星曜，乃群星之主。紫微帝座，为众星之尊。天府令星，南北斗化禄、化权、令星；左辅右弼，主祭祀之星。',
          translation: 'Các sao Thái Cực là chủ của muôn sao. Tử Vi ở ngôi đế, được tôn là bậc cao nhất trong các sao. Thiên Phủ là lệnh tinh; các sao Nam Đẩu, Bắc Đẩu hóa Lộc, hóa Quyền cũng là lệnh tinh; Tả Phù, Hữu Bật là sao chủ việc tế tự.',
        },
        {
          id: 'gsf-1-2',
          idx: 2,
          text: '紫微为君，以左辅右弼为相。天府为臣，以禄存为府库。天机为善，天梁为荫，遇之则吉；廉贞为囚，破军为耗，逢之则凶。',
          translation: 'Tử Vi là vua, lấy Tả Phù, Hữu Bật làm tể tướng. Thiên Phủ là bề tôi, lấy Lộc Tồn làm kho tàng. Thiên Cơ là thiện, Thiên Lương là che chở, gặp thì tốt; Liêm Trinh là giam cầm, Phá Quân là hao tổn, gặp thì xấu.',
        },
        {
          id: 'gsf-1-3',
          idx: 3,
          text: '看命之要，先看命宫。命宫主星定其格局，三方四正定其用武。次看身宫，身宫定其晚景与依归。再看大限流年，定其一生进退之节。',
          translation: 'Điều cốt yếu khi xem mệnh là xem Mệnh cung trước. Chính tinh ở Mệnh cung định cách cục, tam phương tứ chính định chỗ phát huy. Kế đó xem Thân cung, Thân cung định cảnh về già và nơi nương tựa. Sau cùng xem đại hạn, lưu niên để định nhịp tiến lui cả đời.',
        },
      ],
    },
    {
      title: 'Luận về sao Tử Vi (紫微星论)',
      subtitle: 'Ngôi đế tôn quý, được phụ tá thì thành quý',
      paragraphs: [
        {
          id: 'gsf-2-1',
          idx: 1,
          text: '紫微为帝座之星，得辅弼则贵，得昌曲则秀，得魁钺则贵人扶持。紫微独坐无辅，纵贵不久；得三方四正之吉星会照，方为正宗大格。',
          translation: 'Tử Vi là sao ngôi đế; gặp Tả Phù, Hữu Bật thì quý, gặp Văn Xương, Văn Khúc thì tú khí, gặp Thiên Khôi, Thiên Việt thì được quý nhân nâng đỡ. Tử Vi tọa thủ một mình, không có phụ tá thì dù quý cũng không lâu; được các cát tinh ở tam phương tứ chính chiếu hội mới là đại cách chính tông.',
        },
        {
          id: 'gsf-2-2',
          idx: 2,
          text: '紫微在子午为「面南背北」之贵，主大富大贵；紫微在丑未与破军同宫，主刚毅果决；紫微在寅申与天府同宫，称「紫府同宫」格，主品端衣食丰足。',
          translation: 'Tử Vi ở Tý, Ngọ là cái quý của thế "ngồi hướng nam, quay lưng về bắc", chủ đại phú đại quý; Tử Vi ở Sửu, Mùi đồng cung với Phá Quân, chủ cương nghị quyết đoán; Tử Vi ở Dần, Thân đồng cung với Thiên Phủ gọi là cách "Tử Phủ đồng cung", chủ phẩm hạnh ngay thẳng, cơm áo đầy đủ.',
        },
        {
          id: 'gsf-2-3',
          idx: 3,
          text: '紫微居官禄，无煞冲破，必为高官；紫微居田宅，主有祖业，又能自置；紫微居夫妻，主配偶端庄，气质不凡，但宜迟婚不宜早。',
          translation: 'Tử Vi ở cung Quan Lộc, không bị sát tinh xung phá, ắt làm quan cao; Tử Vi ở cung Điền Trạch, chủ có cơ nghiệp của tổ tiên và còn tự gây dựng thêm; Tử Vi ở cung Phu Thê, chủ người phối ngẫu đoan trang, khí chất khác thường, nhưng nên kết hôn muộn, không nên sớm.',
        },
        {
          id: 'gsf-2-4',
          idx: 4,
          text: '紫微忌空劫，主有位无禄。紫微忌孤君无辅，主孤峰独峙，难成大事。紫微化权主独断，紫微化科主名声，紫微化忌主受制于人。',
          translation: 'Tử Vi kỵ Địa Không, Địa Kiếp, chủ có vị mà không có lộc. Tử Vi kỵ làm vua cô độc không có phụ tá, chủ như đỉnh núi đứng một mình, khó nên việc lớn. Tử Vi hóa Quyền chủ độc đoán, Tử Vi hóa Khoa chủ danh tiếng, Tử Vi hóa Kỵ chủ bị người khác khống chế.',
        },
      ],
    },
    {
      title: 'Luận về sao Thất Sát (七杀星论)',
      subtitle: 'Tướng tinh cô độc, hợp võ nghiệp',
      paragraphs: [
        {
          id: 'gsf-3-1',
          idx: 1,
          text: '七杀为将星，性刚毅果决。七杀守命，不喜与诸吉同宫，独行其道方为本格。七杀逢空劫，主孤独漂泊，事业难成。',
          translation: 'Thất Sát là tướng tinh, tính cương nghị quyết đoán. Thất Sát thủ Mệnh, không thích đồng cung với các cát tinh, tự đi con đường riêng mới đúng bản cách. Thất Sát gặp Địa Không, Địa Kiếp, chủ cô độc phiêu bạt, sự nghiệp khó thành.',
        },
        {
          id: 'gsf-3-2',
          idx: 2,
          text: '七杀朝斗格：七杀居子午、寅申，对宫紫微天府相照，主爵禄荣昌。最宜军警武职、开疆拓土。一生贵气难挡，但需经磨炼方成大器。',
          translation: 'Cách Thất Sát triều đẩu: Thất Sát ở Tý, Ngọ hoặc Dần, Thân, đối cung có Tử Vi, Thiên Phủ, Thiên Tướng chiếu, chủ tước lộc hưng thịnh. Hợp nhất với quân đội, cảnh sát, võ nghiệp, mở mang bờ cõi. Khí quý cả đời khó cản, nhưng phải qua tôi luyện mới thành đại khí.',
        },
        {
          id: 'gsf-3-3',
          idx: 3,
          text: '七杀逢羊陀，主刑伤血光；七杀逢火铃，主威武刚烈；七杀逢化禄，主一身武贵；七杀逢化忌，反主消沉，事业多败。',
          translation: 'Thất Sát gặp Kình Dương, Đà La, chủ hình thương, đổ máu; Thất Sát gặp Hỏa Tinh, Linh Tinh, chủ uy vũ cương liệt; Thất Sát gặp hóa Lộc, chủ cả đời quý về võ; Thất Sát gặp hóa Kỵ, ngược lại chủ suy sụp, sự nghiệp nhiều thất bại.',
        },
      ],
    },
    {
      title: 'Cách Sát Phá Lang (杀破狼格)',
      subtitle: 'Mệnh khai sáng, xông pha, nhiều biến động',
      paragraphs: [
        {
          id: 'gsf-4-1',
          idx: 1,
          text: '七杀、破军、贪狼三星会命迁财官，称「杀破狼格」。主一生变动多、不甘平凡，宜创业、军警、业务。年轻易冲动失利，中年后方能稳定守成。',
          translation: 'Ba sao Thất Sát, Phá Quân, Tham Lang hội ở Mệnh, Thiên Di, Tài Bạch, Quan Lộc gọi là "cách Sát Phá Lang". Chủ cả đời nhiều biến động, không cam chịu tầm thường; hợp khởi nghiệp, quân đội, cảnh sát, kinh doanh bán hàng. Thời trẻ dễ bốc đồng thất lợi, sau trung niên mới ổn định giữ nghiệp.',
        },
        {
          id: 'gsf-4-2',
          idx: 2,
          text: '杀破狼三方有化禄或化权，主动得有力，可成大事；若三方煞星过重（羊陀火铃齐照），主动而无成，宜静守。',
          translation: 'Sát Phá Lang có hóa Lộc hoặc hóa Quyền ở tam phương, chủ động mà có sức, có thể làm nên việc lớn; nếu sát tinh ở tam phương quá nặng (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh cùng chiếu), chủ động mà không thành, nên tĩnh thủ.',
        },
      ],
    },
    {
      title: 'Cơ Nguyệt Đồng Lương (机月同梁)',
      subtitle: 'Ổn định tích lũy, hợp công chức',
      paragraphs: [
        {
          id: 'gsf-5-1',
          idx: 1,
          text: '天机、太阴、天同、天梁四星齐入命迁财官，称「机月同梁格」。主文质彬彬、聪慧善谋。最适合公职、学术、文艺、医疗、服务等需稳定累积的行业，不宜大冒险大投机。',
          translation: 'Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc gọi là "cách Cơ Nguyệt Đồng Lương". Chủ nhã nhặn lịch thiệp, thông minh khéo mưu tính. Rất hợp công chức, học thuật, văn nghệ, y tế, dịch vụ và các ngành cần ổn định tích lũy; không nên mạo hiểm lớn hay đầu cơ lớn.',
        },
        {
          id: 'gsf-5-2',
          idx: 2,
          text: '机月同梁作吏人——古云此格者宜担任公职、行政文书工作，安稳一生。再会昌曲化科，主名声远播。最忌煞星过多，则反主多变难安。',
          translation: 'Cơ Nguyệt Đồng Lương làm lại nhân: người xưa nói người có cách này hợp làm công chức, công việc hành chính văn thư, an ổn cả đời. Lại hội Văn Xương, Văn Khúc, hóa Khoa thì danh tiếng vang xa. Kỵ nhất sát tinh quá nhiều, khi đó ngược lại chủ nhiều biến động, khó yên.',
        },
      ],
    },
    {
      title: 'Luận về Tứ Hóa (四化星论)',
      subtitle: 'Cát hung của Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ',
      paragraphs: [
        {
          id: 'gsf-6-1',
          idx: 1,
          text: '化禄主财、主缘、主能力变现；化权主权、主决断、主独当一面；化科主名、主贵人、主文书；化忌主病、主煞、主深刻功课。',
          translation: 'Hóa Lộc chủ tiền của, chủ duyên, chủ năng lực biến thành thu hoạch thực; hóa Quyền chủ quyền lực, chủ quyết đoán, chủ tự đảm đương một mình; hóa Khoa chủ danh tiếng, chủ quý nhân, chủ văn thư; hóa Kỵ chủ bệnh, chủ sát, chủ bài học sâu sắc.',
        },
        {
          id: 'gsf-6-2',
          idx: 2,
          text: '化禄入命，财源广进；化权入命，能担大任；化科入命，名声远播；化忌入命，须经磨炼方能成器。',
          translation: 'Hóa Lộc nhập Mệnh, nguồn tiền rộng mở; hóa Quyền nhập Mệnh, gánh được trọng trách; hóa Khoa nhập Mệnh, danh tiếng vang xa; hóa Kỵ nhập Mệnh, phải qua tôi luyện mới thành người có tài.',
        },
        {
          id: 'gsf-6-3',
          idx: 3,
          text: '化忌入财，主财来财去；化忌入官，主事业受挫；化忌入夫妻，主婚姻多波折；化忌入子女，主子女缘薄或亲子摩擦。',
          translation: 'Hóa Kỵ nhập Tài Bạch, chủ tiền đến rồi đi; hóa Kỵ nhập Quan Lộc, chủ sự nghiệp bị trắc trở; hóa Kỵ nhập Phu Thê, chủ hôn nhân nhiều sóng gió; hóa Kỵ nhập Tử Nữ, chủ duyên con cái mỏng hoặc cha mẹ và con cái va chạm.',
        },
        {
          id: 'gsf-6-4',
          idx: 4,
          text: '禄存与化禄同会命三方，称「双禄朝垣」，主富比陶朱；化科与化权同会，称「科权双会」，主名权双美。',
          translation: 'Lộc Tồn và hóa Lộc cùng hội ở tam phương của Mệnh gọi là "Song Lộc triều viên", chủ giàu sánh Đào Chu; hóa Khoa và hóa Quyền cùng hội gọi là "Khoa Quyền song hội", chủ danh và quyền đều đẹp.',
        },
      ],
    },
    {
      title: 'Luận về Phụ, Bật, Khôi, Việt (辅弼魁钺论)',
      subtitle: 'Sự quý của sáu cát tinh',
      paragraphs: [
        {
          id: 'gsf-7-1',
          idx: 1,
          text: '左辅右弼为「相星」，主助力贵人；文昌文曲为「文星」，主聪明俊秀；天魁天钺为「贵人星」，主关键时刻有人扶持。',
          translation: 'Tả Phù, Hữu Bật là "tương tinh" (sao phò tá), chủ trợ lực, quý nhân; Văn Xương, Văn Khúc là "văn tinh", chủ thông minh tuấn tú; Thiên Khôi, Thiên Việt là "quý nhân tinh", chủ lúc then chốt có người nâng đỡ.',
        },
        {
          id: 'gsf-7-2',
          idx: 2,
          text: '六吉星齐会命宫三方四正，主一生贵人不绝、人缘极佳。即使命格平常，亦能借六吉之力达成不凡之业。',
          translation: 'Sáu cát tinh cùng hội ở tam phương tứ chính của Mệnh cung, chủ cả đời quý nhân không dứt, nhân duyên rất tốt. Dù mệnh cách bình thường cũng có thể nhờ sức sáu cát tinh mà làm nên sự nghiệp khác thường.',
        },
        {
          id: 'gsf-7-3',
          idx: 3,
          text: '辅弼夹命：左辅右弼夹于命宫前后两宫，主一生贵人扶持，遇困有助。最宜与紫微同宫，称「君臣庆会」格。',
          translation: 'Phụ Bật giáp Mệnh: Tả Phù, Hữu Bật kẹp ở hai cung trước sau Mệnh cung, chủ cả đời được quý nhân nâng đỡ, gặp khó có người giúp. Hợp nhất là đồng cung với Tử Vi, gọi là cách "Quân Thần Khánh Hội".',
        },
      ],
    },
    {
      title: 'Luận về sáu sát tinh (六煞星论)',
      subtitle: 'Hung của Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp',
      paragraphs: [
        {
          id: 'gsf-8-1',
          idx: 1,
          text: '擎羊陀罗为「煞星」，主血光、是非、阻碍；火星铃星为「燥星」，主冲动、急躁、伤灾；地空地劫为「空亡」，主财耗、虚名、不实。',
          translation: 'Kình Dương, Đà La là "sát tinh", chủ đổ máu, thị phi, cản trở; Hỏa Tinh, Linh Tinh là "táo tinh" (sao nóng nảy), chủ bốc đồng, nóng vội, tai họa thương tổn; Địa Không, Địa Kiếp là "không vong", chủ hao tài, hư danh, không thực.',
        },
        {
          id: 'gsf-8-2',
          idx: 2,
          text: '煞星不全是凶——煞星犹如磨刀石，能炼出常人没有的破局力。年轻时易冲动伤己，中年后方能化煞为权。',
          translation: 'Sát tinh không phải toàn là hung: sát tinh như đá mài dao, có thể rèn ra sức phá cục mà người thường không có. Thời trẻ dễ bốc đồng tự làm hại mình, sau trung niên mới có thể hóa sát thành quyền.',
        },
        {
          id: 'gsf-8-3',
          idx: 3,
          text: '羊陀夹忌：擎羊陀罗夹于化忌星所在宫，主大凶。其年其大限须特别警觉血光、官非、重大变故。',
          translation: 'Dương Đà giáp Kỵ: Kình Dương, Đà La kẹp cung có sao hóa Kỵ, chủ đại hung. Năm đó, đại hạn đó cần đặc biệt cảnh giác chuyện đổ máu, kiện tụng, biến cố lớn.',
        },
        {
          id: 'gsf-8-4',
          idx: 4,
          text: '空劫夹命：地空地劫夹于命宫前后两宫，主一生宜务虚不务实，宜从事文艺、宗教、玄学等"非实"行业，不宜经商投资。',
          translation: 'Không Kiếp giáp Mệnh: Địa Không, Địa Kiếp kẹp ở hai cung trước sau Mệnh cung, chủ cả đời hợp làm việc hư không làm việc thực, hợp theo văn nghệ, tôn giáo, huyền học và các nghề "phi thực", không nên kinh doanh, đầu tư.',
        },
      ],
    },
    {
      title: 'Luận về mười hai cung (十二宫论)',
      subtitle: 'Chủ tượng và cát hung của từng cung',
      paragraphs: [
        {
          id: 'gsf-9-1',
          idx: 1,
          text: '命宫为本，三方为用：财帛主财源、官禄主事业、迁移主外缘。三方四正吉星会照，命格方能完整发用。',
          translation: 'Mệnh cung là gốc, tam phương là dụng: Tài Bạch chủ nguồn tiền, Quan Lộc chủ sự nghiệp, Thiên Di chủ duyên bên ngoài. Cát tinh ở tam phương tứ chính chiếu hội thì mệnh cách mới đầy đủ và phát huy được.',
        },
        {
          id: 'gsf-9-2',
          idx: 2,
          text: '夫妻宫看配偶气质，子女宫看子女缘分，疾厄宫看身体罩门，迁移宫看外出运势。各宫主星与四化决定该领域之吉凶进退。',
          translation: 'Cung Phu Thê xem khí chất người phối ngẫu, cung Tử Nữ xem duyên con cái, cung Tật Ách xem chỗ yếu của thân thể, cung Thiên Di xem vận khi ra ngoài. Chính tinh và tứ hóa của mỗi cung quyết định cát hung, tiến lui của lĩnh vực đó.',
        },
        {
          id: 'gsf-9-3',
          idx: 3,
          text: '田宅宫为命盘财库，正财能否守住看此宫；福德宫为精神享受，心安与否看此宫；父母宫为长辈关系，亦主文书契约。',
          translation: 'Cung Điền Trạch là kho của lá số, khoản tiền chính đáng có giữ được hay không thì xem cung này; cung Phúc Đức là hưởng thụ tinh thần, tâm có an hay không thì xem cung này; cung Phụ Mẫu là quan hệ với bậc trưởng bối, cũng chủ văn thư, khế ước.',
        },
        {
          id: 'gsf-9-4',
          idx: 4,
          text: '空宫借对宫论事——某宫无主星时，借其对宫主星论该宫之事。如命宫空宫，借迁移宫主星定命格。',
          translation: 'Cung trống mượn đối cung để luận việc: khi một cung không có chính tinh, mượn chính tinh của đối cung để luận việc của cung đó. Ví dụ Mệnh cung trống thì mượn chính tinh cung Thiên Di để định mệnh cách.',
        },
      ],
    },
  ],
};
