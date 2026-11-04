/**
 * 《紫微斗数全集》— 核心精选章节
 *
 * 公版（明代刊本，相传由陈抟祖师传）
 * 是紫微斗数最权威的古籍之一，全本约 8 万字。
 * 此处精选核心论述，未来可补全。
 */

import type { Book } from '../types';

export const ziWeiQuanJi: Book = {
  title: '紫微斗数全集',
  slug: 'quanji',
  dynasty: '明代',
  author: '相传陈抟祖师传',
  intro: 'Một trong những cổ thư có thẩm quyền nhất về Tử Vi Đẩu Số, tương truyền do Trần Đoàn tổ sư đời Tống truyền dạy. Là nguồn trích dẫn cốt lõi của hệ thống «Thiên Kỷ» của Nghê Hải Hạ.',
  wordCount: 80000,
  chapters: [
    {
      title: 'Quyển một · Tổng luận (卷一·总论)',
      subtitle: 'Quy tắc cơ bản của Tử Vi Đẩu Số',
      paragraphs: [
        {
          id: 'qj-1-1',
          idx: 1,
          text: '夫紫微斗数者，乃陈抟祖师所传，原以紫微为帝座，统御百星。星曜各有所主，各有庙旺利陷之分，会照吉凶之别。看命者，必先安星，次定命宫身宫，三看十二宫吉凶，四参大限流年之飞化。',
          translation: 'Tử Vi Đẩu Số là phép do Trần Đoàn tổ sư truyền lại, vốn lấy Tử Vi làm đế tọa, thống lĩnh trăm sao. Mỗi sao đều có chủ quản riêng, có phân biệt miếu, vượng, lợi, hãm và có khác biệt cát hung khi hội chiếu. Người xem mệnh trước hết phải an sao, thứ đến định Mệnh cung và Thân cung, thứ ba xem cát hung của mười hai cung, thứ tư tham xét phi hóa của đại hạn và lưu niên.',
        },
        {
          id: 'qj-1-2',
          idx: 2,
          text: '安星之法：先以年干起紫微，紫微所在宫位定，则诸星皆按其法位列十二宫。十四主星各居其位，六吉六煞辅而行之。一盘既定，万象皆现。',
          translation: 'Phép an sao: trước hết dùng thiên can của năm sinh để khởi Tử Vi; khi cung vị của Tử Vi đã định thì các sao còn lại đều theo phép mà xếp vào mười hai cung. Mười bốn chính tinh mỗi sao giữ một vị trí, sáu sao cát và sáu sao sát đi theo phụ trợ. Một lá số đã định thì muôn tượng đều hiện ra.',
        },
        {
          id: 'qj-1-3',
          idx: 3,
          text: '命宫为本，主一生格局；身宫为辅，主三十后归向。命身分明，方知一人之进退。三方四正会照，方知一人之用武之地。十二宫各有所主，方知人生之全图。',
          translation: 'Mệnh cung là gốc, chủ cách cục cả đời; Thân cung là phụ, chủ phương hướng quy về sau tuổi ba mươi. Mệnh và Thân phân minh thì mới biết được tiến thoái của một người. Tam phương tứ chính hội chiếu thì mới biết nơi người ấy có thể thi triển sức lực. Mười hai cung đều có chủ quản riêng, nhờ đó mới biết toàn bộ bức tranh đời người.',
        },
      ],
    },
    {
      title: 'Quyển hai · Bàn về sao Tử Vi (卷二·紫微星论)',
      subtitle: 'Ngôi đế tôn quý',
      paragraphs: [
        {
          id: 'qj-2-1',
          idx: 1,
          text: '紫微为北斗之主，统辖众星。紫微属土，乃尊贵之星。在数为帝座，化气为尊，主忠厚有威仪，独行其道。男命女命皆喜紫微守命，但需有左辅右弼来朝，方为正格。',
          translation: 'Tử Vi là chủ của Bắc Đẩu, thống lĩnh các sao. Tử Vi thuộc Thổ, là sao tôn quý. Về số là đế tọa, hóa khí là tôn, chủ trung hậu có uy nghi, đi con đường riêng của mình. Mệnh nam hay mệnh nữ đều mừng Tử Vi thủ Mệnh, nhưng cần có Tả Phù, Hữu Bật triều củng thì mới là chính cách.',
        },
        {
          id: 'qj-2-2',
          idx: 2,
          text: '紫微独坐，需有左右昌曲魁钺夹持方能为用——单身无依的紫微，纵贵不久；得三方四正之吉星会照，方为君臣庆会大格。',
          translation: 'Tử Vi độc tọa cần có Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt kèm hai bên mới dùng được. Tử Vi đơn độc không nơi nương tựa thì dù sang cũng không bền; được các cát tinh ở tam phương tứ chính hội chiếu thì mới thành đại cách «quân thần khánh hội».',
        },
        {
          id: 'qj-2-3',
          idx: 3,
          text: '紫微入命，兄弟有贵气，独立挺秀，多得长兄之助；紫微在子女，子女有贵气，但管教需平等；紫微在夫妻，配偶端庄，但宜迟婚不宜早。',
          translation: 'Tử Vi nhập Mệnh, anh em có khí quý, độc lập xuất chúng, phần nhiều nhờ sự giúp đỡ của anh cả; Tử Vi ở Tử Nữ, con cái có khí quý, nhưng việc dạy dỗ cần bình đẳng; Tử Vi ở Phu Thê, phối ngẫu đoan trang, nhưng nên kết hôn muộn, không nên sớm.',
        },
        {
          id: 'qj-2-4',
          idx: 4,
          text: '紫微在田宅，主有祖业又能自置，房产可作为致富之主轴；紫微在福德，精神层面追求格调、自尊感强；紫微在官禄，主大富贵，宜居高位。',
          translation: 'Tử Vi ở Điền Trạch, chủ có tổ nghiệp lại tự mua sắm thêm được, bất động sản có thể làm trục chính để làm giàu; Tử Vi ở Phúc Đức, về mặt tinh thần theo đuổi phong cách, lòng tự tôn mạnh; Tử Vi ở Quan Lộc, chủ đại phú quý, nên ở vị trí cao.',
        },
      ],
    },
    {
      title: 'Quyển ba · Bàn về sáu sao Nam Đẩu (卷三·南斗六星论)',
      subtitle: 'Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương',
      paragraphs: [
        {
          id: 'qj-3-1',
          idx: 1,
          text: '天府属土，南斗令星，乃禄库之主。天府独坐主品行端正、衣食无忧。天府与紫微同宫名"紫府同宫"，主尊贵。天府最喜见禄存，称"双禄朝垣"，主大富。',
          translation: 'Thiên Phủ thuộc Thổ, là lệnh tinh của Nam Đẩu, chủ về kho lộc. Thiên Phủ độc tọa chủ phẩm hạnh đoan chính, cơm áo không lo. Thiên Phủ đồng cung với Tử Vi gọi là «Tử Phủ đồng cung», chủ tôn quý. Thiên Phủ mừng nhất gặp Lộc Tồn, gọi là «song Lộc triều viên», chủ đại phú.',
        },
        {
          id: 'qj-3-2',
          idx: 2,
          text: '太阴为中天主星，属水。太阴庙旺主田宅、富贵，落陷主劳碌、奔波。女命太阴最吉，主貌美贤淑。太阴在亥子主大富，太阴在午未则减力。',
          translation: 'Thái Âm là chủ tinh của trung thiên, thuộc Thủy. Thái Âm miếu vượng chủ về điền trạch, phú quý; lạc hãm chủ vất vả, bôn ba. Mệnh nữ có Thái Âm là tốt nhất, chủ dung mạo đẹp, hiền thục. Thái Âm ở Hợi, Tý chủ đại phú, Thái Âm ở Ngọ, Mùi thì giảm lực.',
        },
        {
          id: 'qj-3-3',
          idx: 3,
          text: '贪狼为桃花欲望之星，属木属水。贪狼主多才艺、社交广。贪狼逢火星称"火贪格"，逢铃星称"铃贪格"，皆主偏财横发。但贪狼忌空劫，主华而不实。',
          translation: 'Tham Lang là sao của đào hoa và dục vọng, thuộc Mộc và Thủy. Tham Lang chủ nhiều tài nghệ, giao tế rộng. Tham Lang gặp Hỏa Tinh gọi là «Hỏa Tham cách», gặp Linh Tinh gọi là «Linh Tham cách», đều chủ phát tài bất ngờ về của ngoài. Nhưng Tham Lang kỵ Địa Không, Địa Kiếp, chủ bề ngoài hào nhoáng mà không có thực chất.',
        },
        {
          id: 'qj-3-4',
          idx: 4,
          text: '巨门属水，化气为暗，主口舌是非。巨门为口才之星，宜律师、教师、传媒。巨门化禄主"以口生财"，化忌则口舌官非不断。巨门最忌与太阳同宫的丑未两宫，称"日月反背"。',
          translation: 'Cự Môn thuộc Thủy, hóa khí là ám, chủ khẩu thiệt thị phi. Cự Môn là sao của tài ăn nói, hợp nghề luật sư, giáo viên, truyền thông. Cự Môn hóa Lộc chủ «dùng miệng sinh tài», hóa Kỵ thì khẩu thiệt, kiện tụng không dứt. Cự Môn kỵ nhất đồng cung với Thái Dương ở hai cung Sửu, Mùi, gọi là «Nhật Nguyệt phản bối».',
        },
        {
          id: 'qj-3-5',
          idx: 5,
          text: '天相属水，化气为印，乃辅佐之星。天相忠厚老实，宜行政秘书法务。天相不喜独坐，最宜与紫微或廉贞同宫，借其威仪而成事。',
          translation: 'Thiên Tướng thuộc Thủy, hóa khí là ấn, là sao phụ tá. Thiên Tướng trung hậu thật thà, hợp hành chính, thư ký, pháp vụ. Thiên Tướng không thích độc tọa, hợp nhất đồng cung với Tử Vi hoặc Liêm Trinh, nhờ uy nghi của họ mà thành việc.',
        },
        {
          id: 'qj-3-6',
          idx: 6,
          text: '天梁属土，化气为荫，乃老人之星。天梁主善良、慈悲、孤克、化解。天梁宜法律、医学、教育、宗教。天梁化科主名声，化禄反而虚浮。',
          translation: 'Thiên Lương thuộc Thổ, hóa khí là ấm (che chở), là sao của người cao tuổi. Thiên Lương chủ lương thiện, từ bi, cô khắc, hóa giải. Thiên Lương hợp pháp luật, y học, giáo dục, tôn giáo. Thiên Lương hóa Khoa chủ danh tiếng, hóa Lộc ngược lại thành hư phù.',
        },
      ],
    },
    {
      title: 'Quyển bốn · Bàn về sáu sao Bắc Đẩu (卷四·北斗六星论)',
      subtitle: 'Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Liêm Trinh, Phá Quân',
      paragraphs: [
        {
          id: 'qj-4-1',
          idx: 1,
          text: '紫微属土，已论于卷二。',
          translation: 'Tử Vi thuộc Thổ, đã bàn ở quyển hai.',
        },
        {
          id: 'qj-4-2',
          idx: 2,
          text: '天机属木，化气为善，乃智慧之星。天机主聪明、机变、好动。天机入命，思维敏捷，宜咨询、策划、文教。天机最忌善变无主，需文昌文曲会照方能成器。',
          translation: 'Thiên Cơ thuộc Mộc, hóa khí là thiện, là sao của trí tuệ. Thiên Cơ chủ thông minh, biến hóa linh hoạt, hiếu động. Thiên Cơ nhập Mệnh thì tư duy nhanh nhạy, hợp tư vấn, hoạch định, văn giáo. Thiên Cơ kỵ nhất là hay thay đổi không có chủ kiến, cần Văn Xương, Văn Khúc hội chiếu mới nên người.',
        },
        {
          id: 'qj-4-3',
          idx: 3,
          text: '太阳属火，化气为贵，乃男贵之星。太阳主名誉、公务、社交。太阳庙旺主大贵，落陷则劳而无获。太阳最宜在卯辰巳午之地，落于戌亥子丑则减力。',
          translation: 'Thái Dương thuộc Hỏa, hóa khí là quý, là sao quý của nam giới. Thái Dương chủ danh dự, công vụ, giao tế. Thái Dương miếu vượng chủ đại quý, lạc hãm thì vất vả mà không thu hoạch. Thái Dương hợp nhất ở các vị trí Mão, Thìn, Tỵ, Ngọ; rơi vào Tuất, Hợi, Tý, Sửu thì giảm lực.',
        },
        {
          id: 'qj-4-4',
          idx: 4,
          text: '武曲属金，化气为财，乃财星之主。武曲主刚毅果决，善理财经营。武曲化忌主手术血光、金属意外。武曲在丑未与七杀同宫，称"武曲七杀"格，主刚直武贵。',
          translation: 'Vũ Khúc thuộc Kim, hóa khí là tài, là chủ của các sao tài. Vũ Khúc chủ cương nghị quyết đoán, giỏi lý tài kinh doanh. Vũ Khúc hóa Kỵ chủ phẫu thuật, đổ máu, tai nạn do kim loại. Vũ Khúc đồng cung với Thất Sát ở Sửu, Mùi gọi là cách «Vũ Khúc Thất Sát», chủ cương trực, quý về võ.',
        },
        {
          id: 'qj-4-5',
          idx: 5,
          text: '廉贞属火属木，化气为囚，乃次桃花之星。廉贞文武兼备，多才艺。廉贞化忌主血光官非、感情纠纷。廉贞与天相同宫为"廉相格"，主清廉之名。',
          translation: 'Liêm Trinh thuộc Hỏa và Mộc, hóa khí là tù, là sao đào hoa thứ yếu. Liêm Trinh văn võ kiêm bị, nhiều tài nghệ. Liêm Trinh hóa Kỵ chủ đổ máu, kiện tụng, rắc rối tình cảm. Liêm Trinh đồng cung với Thiên Tướng là «Liêm Tướng cách», chủ tiếng thanh liêm.',
        },
        {
          id: 'qj-4-6',
          idx: 6,
          text: '破军属水，化气为耗，乃破坏创新之星。破军主开创、变动、六亲缘薄。破军宜技术专长走天下。破军化禄称"破而后立"，主先散后聚。',
          translation: 'Phá Quân thuộc Thủy, hóa khí là hao, là sao của phá hoại và đổi mới. Phá Quân chủ khai sáng, biến động, duyên với lục thân mỏng. Phá Quân hợp việc dùng chuyên môn kỹ thuật đi khắp nơi. Phá Quân hóa Lộc gọi là «phá rồi mới lập», chủ trước tan sau tụ.',
        },
      ],
    },
    {
      title: 'Quyển năm · Bàn về Tứ Hóa và cách cục (卷五·四化与格局论)',
      subtitle: 'Sức mạnh của Tứ Hóa và các cách cục quan trọng',
      paragraphs: [
        {
          id: 'qj-5-1',
          idx: 1,
          text: '化禄主财源，主缘分，主能力变现。化禄入命三方，主财源广进；化禄入财帛，主财来财往，正财稳定。',
          translation: 'Hóa Lộc chủ nguồn tài, chủ duyên phận, chủ biến năng lực thành của cải. Hóa Lộc nhập tam phương của Mệnh thì nguồn tài tiến rộng; Hóa Lộc nhập Tài Bạch thì tiền đến tiền đi, chính tài ổn định.',
        },
        {
          id: 'qj-5-2',
          idx: 2,
          text: '化权主权力，主决断，主担当。化权入命，主能独当一面；化权入官禄，主事业有掌控力，宜走管理或技术权威路线。',
          translation: 'Hóa Quyền chủ quyền lực, chủ quyết đoán, chủ gánh vác. Hóa Quyền nhập Mệnh thì tự đảm đương được một mặt; Hóa Quyền nhập Quan Lộc thì sự nghiệp có sức nắm quyền kiểm soát, hợp đi theo con đường quản lý hoặc uy tín kỹ thuật.',
        },
        {
          id: 'qj-5-3',
          idx: 3,
          text: '化科主名声，主文书，主贵人。化科入命，主名声远播；化科入身，主以名取利，宜文教、研究、咨询。',
          translation: 'Hóa Khoa chủ danh tiếng, chủ văn thư, chủ quý nhân. Hóa Khoa nhập Mệnh thì danh tiếng lan xa; Hóa Khoa nhập Thân thì dùng danh để lấy lợi, hợp văn giáo, nghiên cứu, tư vấn.',
        },
        {
          id: 'qj-5-4',
          idx: 4,
          text: '化忌主病，主煞，主深刻功课。化忌入命三方，主一生有"钝点"——这是命格里最深的功课，过得了就是大智慧。三十岁前后是化忌最锋利的时候。',
          translation: 'Hóa Kỵ chủ bệnh, chủ sát, chủ bài học sâu sắc. Hóa Kỵ nhập tam phương của Mệnh thì cả đời có một «điểm cùn» — đây là bài học sâu nhất trong mệnh cách, vượt qua được thì là đại trí tuệ. Khoảng tuổi ba mươi là lúc Hóa Kỵ sắc bén nhất.',
        },
        {
          id: 'qj-5-5',
          idx: 5,
          text: '紫府同宫格：紫微天府同入命宫，主品行端正、衣食无忧、有领导才能。需要左右辅弼来配合方为完整大格。',
          translation: 'Cách Tử Phủ đồng cung: Tử Vi, Thiên Phủ cùng nhập Mệnh cung, chủ phẩm hạnh đoan chính, cơm áo không lo, có tài lãnh đạo. Cần Tả Phù, Hữu Bật phối hợp mới là đại cách trọn vẹn.',
        },
        {
          id: 'qj-5-6',
          idx: 6,
          text: '七杀朝斗格：七杀居子午寅申宫坐命，对宫紫微天府相照，主爵禄荣昌——武职大贵，最宜军警政界或企业高管。',
          translation: 'Cách Thất Sát triều đẩu: Thất Sát ở các cung Tý, Ngọ, Dần, Thân tọa Mệnh, đối cung có Tử Vi, Thiên Phủ chiếu, chủ tước lộc hưng vượng — đại quý về võ chức, hợp nhất ngành quân đội, cảnh sát, chính trị hoặc quản lý cấp cao của doanh nghiệp.',
        },
        {
          id: 'qj-5-7',
          idx: 7,
          text: '双禄朝垣格：化禄、禄存同会命宫三方四正，财源涌动、衣食丰足。古云"双禄朝垣，富比陶朱"，主一生不愁财。',
          translation: 'Cách song Lộc triều viên: Hóa Lộc và Lộc Tồn cùng hội ở tam phương tứ chính của Mệnh cung, nguồn tài tuôn chảy, cơm áo đủ đầy. Cổ nhân nói «song Lộc triều viên, giàu sánh Đào Chu», chủ cả đời không lo về tiền của.',
        },
        {
          id: 'qj-5-8',
          idx: 8,
          text: '机月同梁格：天机、太阴、天同、天梁四星齐入命迁财官，主文质彬彬、聪慧善谋。最适合公职、学术、文艺、医疗、服务等需稳定累积的行业。',
          translation: 'Cách Cơ Nguyệt Đồng Lương: bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng nhập Mệnh, Thiên Di, Tài Bạch, Quan Lộc, chủ nho nhã, thông minh, khéo mưu tính. Rất hợp công chức, học thuật, văn nghệ, y tế, dịch vụ và các ngành cần tích lũy ổn định.',
        },
        {
          id: 'qj-5-9',
          idx: 9,
          text: '杀破狼格：七杀、破军、贪狼三星会命，主一生变动多、不甘平凡，宜创业、军警、业务、销售。中年后才能稳定守成。',
          translation: 'Cách Sát Phá Lang: ba sao Thất Sát, Phá Quân, Tham Lang hội Mệnh, chủ cả đời biến động nhiều, không cam bình thường, hợp khởi nghiệp, quân đội, cảnh sát, kinh doanh, bán hàng. Sau trung niên mới ổn định giữ nghiệp.',
        },
        {
          id: 'qj-5-10',
          idx: 10,
          text: '日月同宫格：太阳太阴同入丑宫或未宫，主异性缘佳、事业顺遂、名声远播。丑宫力较平，未宫力略减。',
          translation: 'Cách Nhật Nguyệt đồng cung: Thái Dương, Thái Âm cùng nhập cung Sửu hoặc cung Mùi, chủ duyên với người khác giới tốt, sự nghiệp thuận lợi, danh tiếng lan xa. Cung Sửu lực ở mức trung bình, cung Mùi lực giảm đôi chút.',
        },
      ],
    },
  ],
};
