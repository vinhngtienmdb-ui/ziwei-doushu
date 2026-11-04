'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Star } from '@/lib/ziwei/types';
import { STAR_DESCRIPTIONS } from '@/lib/ziwei/constants';
import { tenSao, tenCung, tenTuHoa, tenNguHanh } from '@/lib/ziwei/thuat-ngu';

interface StarDetailPanelProps {
  star: Star | null;
  palaceName?: string;
  onClose: () => void;
}

// Bản dịch tiếng Việt cho lớp hiển thị; khóa vẫn là tên sao chữ Hán để khớp với dữ liệu của engine.
const KEYWORDS_VI: Record<string, string> = {
  '紫微': 'Đế vương · Tôn quý · Độc lập',
  '天机': 'Trí tuệ · Linh hoạt · Mưu lược',
  '太阳': 'Dương cương · Quan quý · Hào phóng',
  '武曲': 'Tài phú · Cương nghị · Quả quyết',
  '天同': 'Ôn hòa · Hưởng phúc · Thuận duyên',
  '廉贞': 'Tài nghệ · Hình tù · Đào hoa',
  '天府': 'Kho tài · Vững vàng · Bảo thủ',
  '太阴': 'Dịu dàng · Tài phú · Âm nhu',
  '贪狼': 'Dục vọng · Đào hoa · Đa tài',
  '巨门': 'Khẩu thiệt · Thị phi · Hùng biện',
  '天相': 'Phụ tá · Hành chính · Ấn tín',
  '天梁': 'Che chở · Y dược · Bậc trưởng bối',
  '七杀': 'Tướng tinh · Quyết đoán · Cô khắc',
  '破军': 'Khai sáng · Biến động · Phá hoại',
};

const NATURE_VI: Record<string, string> = {
  '中性偏吉': 'Trung tính, nghiêng về cát',
  '吉星': 'Cát tinh',
  '中性': 'Trung tính',
  '凶中带吉': 'Hung mà có cát',
  '凶星': 'Hung tinh',
};

// Giải thích từng sao theo hệ thống Nghê Hải Hạ (tham khảo «Phi Tinh Tử Vi Đẩu Số Toàn Thư» của Cố Tường Hoằng và «Tử Vi Đẩu Số Toàn Thư» của Nam Bắc Sơn Nhân)
const STAR_DETAIL: Record<string, {
  niHaixia: string;
  classical: string;
  bestPalace: string;
  worstPalace: string;
  career: string;
  relationship: string;
  wealth: string;
  health: string;
}> = {
  '紫微': {
    niHaixia: 'Nghê sư cho rằng Tử Vi là sao hoàng đế. Người có Tử Vi tọa Mệnh cung mang khí cao ngạo, thích ở một mình, không thích bị người khác quản. Tử Vi cần có Tả Phù, Hữu Bật giáp hai bên mới phát huy được khí chất đế vương, nếu không chỉ là vị vua cô độc, giàu mà không quý. Tử Vi ở cung Thìn, Tuất là tốt nhất, hợp với Thiên Phủ thành cách song tinh, tài quan song mỹ, có thể ra tướng vào tướng. Tử Vi sợ nhất Hỏa Tinh, Linh Tinh, Kình Dương, Đà La đồng cung; gặp sát thì cô quý, có quyền mà không có tài.',
    classical: 'Cổ quyết: «Tử Vi đế tọa lâm Mệnh chủ tôn quý, thống lĩnh các sao, người tọa Mệnh chủ quyền uy hiển đạt.» Nam Bắc Sơn Nhân chú: «Tử Vi thủ Mệnh ở vị trí Thìn, tài quan song mỹ, ra tướng vào tướng, địa vị đến tam công; an Mệnh ở cung Tý thì phú quý không bền, về sau không đẹp.»',
    bestPalace: 'Mệnh cung (Thìn, Tuất), Quan Lộc cung',
    worstPalace: 'Tật Ách cung, Phu Thê cung',
    career: 'Chính giới, quản lý cấp cao, tự khởi nghiệp; sinh ra đã có khí chất đế vương, hợp vị trí lãnh đạo tự đứng một mình',
    relationship: 'Tình cảm bị động, lòng tự trọng cao, cần đối phương chủ động, có khuynh hướng cô độc; kết hôn muộn thì tốt',
    wealth: 'Tài vận ổn định, giữ của mạnh hơn tiến công; ở vị trí Thìn, Tuất tài quan song mỹ, hợp nhất với đầu tư tích lũy',
    health: 'Thuộc hành Thổ, chú ý tỳ vị và hệ tiêu hóa. Kỵ làm việc quá sức, nên giữ sinh hoạt điều độ',
  },
  '天机': {
    niHaixia: 'Nghê sư nói Thiên Cơ là sao tham mưu, sao thông minh nhất, nhưng thông minh lộ ra ngoài thì hại thân. Thiên Cơ hóa Kỵ phiền phức nhất, nghĩa là khôn quá hóa dại. Thiên Cơ thuộc Mộc, hay biến đổi, linh hoạt; người có Thiên Cơ ở Mệnh cung tư duy nhanh nhạy nhưng thường nhiều mưu thiếu quyết, cần rời quê đi xa mới phát triển; ứng biến linh hoạt là đặc điểm lớn nhất.',
    classical: 'Cổ quyết: «Sinh ra tinh ranh, thích kinh doanh; Thiên Cơ thuộc Mộc, buôn bán đều nhiều cơ hội; rời tổ tất đi xa, mưu cơ ắt xa người thân.» Nam Bắc Sơn Nhân chú: «Thiên Cơ ở đất miếu vượng, chủ người tinh minh, giỏi trù hoạch; ở đất hãm thì ảm đạm, người người đều làm nghề buôn bán.»',
    bestPalace: 'Mệnh cung (vị trí Mão), Quan Lộc cung',
    worstPalace: 'Phu Thê cung',
    career: 'Chuyên gia kỹ thuật, quân sư, nhà nghiên cứu, CNTT, hoạch định; dùng đầu óc hơn tay chân, hợp phát triển xa quê',
    relationship: 'Tình cảm hay thay đổi, suy nghĩ quá nhiều, khó chuyên nhất; nên kết hôn muộn, sau hôn nhân cần học cách buông bớt lo nghĩ',
    wealth: 'Kiếm tiền bằng trí tuệ và kỹ năng, không giỏi giữ của; làm nghề kỹ thuật chuyên môn thì tài vận ổn định',
    health: 'Thuộc hành Mộc, chú ý gan mật và hệ thần kinh. Nghĩ ngợi quá nhiều dễ mất ngủ, nên tập tĩnh tâm thiền định',
  },
  '太阳': {
    niHaixia: 'Nghê sư cho rằng Thái Dương là sao của người đàn ông trụ cột, vào miếu ở các vị trí từ Mão đến Ngọ, quang minh chính đại; sau Ngọ dần rơi vào hãm. Người có Thái Dương tọa Mệnh hào phóng, sĩ diện; Mệnh nam thì hợp, Mệnh nữ thì quá mạnh mẽ. Thái Dương đại diện cho cha và bậc trưởng bối; ở Mệnh cung chủ tính cách cởi mở hướng ngoại, thích được mọi người nhìn thấy, hợp nhất với công chức hoặc sự nghiệp công chúng. Người hãm địa thì trước siêng sau lười, cô quả vất vả.',
    classical: 'Cổ quyết: «Thái Dương ở Ngọ là vào miếu, ánh sáng rực rỡ, chủ quý hiển, Mệnh nam tốt nhất; hãm địa thì cô quả vất vả, trước siêng sau lười.» Nam Bắc Sơn Nhân chú: «Thái Dương ở cung Ngọ thủ Mệnh, tài quan song mỹ, ra tướng vào tướng; an Mệnh ở vị trí Thìn, trung niên tài quan trở nên đẹp, người sinh năm Ất gặp hung cũng rất lợi.»',
    bestPalace: 'Mệnh cung (Mão đến Ngọ), Quan Lộc cung',
    worstPalace: 'Phu Thê cung (Mệnh nữ), Tật Ách cung',
    career: 'Công chức, chính giới, quản lý, quan hệ công chúng, giáo dục, truyền thông; thích đứng trước đám đông, hợp sự nghiệp công chúng',
    relationship: 'Mệnh nam có duyên tốt nhưng đa tình, Mệnh nữ độc lập mạnh mẽ; hôn nhân cần mài giũa, nên tìm người bạn đời dịu dàng chu đáo',
    wealth: 'Tài vận dựa vào nỗ lực, hào phóng, không giỏi tích lũy; vào miếu tài vận vượng, hãm địa tài vận lên xuống',
    health: 'Thuộc hành Hỏa, chú ý tim và mắt. Ở vị trí hãm dễ làm việc quá sức, cần chú ý nghỉ ngơi đầy đủ',
  },
  '武曲': {
    niHaixia: 'Nghê sư xem Vũ Khúc là sao chủ về tài bạch, cứng rắn bất khuất, sợ nhất cô khắc. Người có Vũ Khúc tọa Mệnh ý chí kiên định, hợp tài chính và quản lý tiền bạc, nhưng chuyện tình cảm quá thẳng, dễ làm tổn thương người khác. Vũ Khúc hóa Kỵ phải cẩn thận tai nạn đổ máu. Vũ Khúc ở Thìn, Tuất, Sửu, Mùi được đất vượng, đồng cung với Thất Sát thành cách Tướng Tài, là cách cục tài phú rất tốt.',
    classical: 'Cổ quyết: «Vũ Khúc thuộc Kim, tính cương cường, cả đời nhiều hình khắc; thủ Mệnh ở đất vượng thì ra tướng vào tướng.» Nam Bắc Sơn Nhân chú: «Vũ Khúc thủ Mệnh, tam phương tứ chính đều cát, tài quan song mỹ; võ chức gặp Phụ Bật Xương Khúc cũng chủ đại quý; đồng cung với Thất Sát là cách Tướng Tài, chủ đại phú.»',
    bestPalace: 'Mệnh cung (Thìn, Tuất, Sửu, Mùi), Tài Bạch cung, Quan Lộc cung',
    worstPalace: 'Phu Thê cung',
    career: 'Tài chính, quân đội và công an, kế toán, kỹ thuật công trình; năng lực thực thi rất mạnh, hợp lĩnh vực cần khí phách và quyết đoán',
    relationship: 'Tình cảm thẳng thắn, thiếu lãng mạn, cần người bạn đời dịu dàng bổ sung; kỵ tình cảm cô khắc',
    wealth: 'Tài tinh bản mệnh, tài vận rất mạnh, quản lý tiền xuất chúng; ở vị trí Thìn, Tuất tài quan song mỹ',
    health: 'Thuộc hành Kim, chú ý phổi, hệ hô hấp, răng. Khi hóa Kỵ cần đề phòng tai họa đổ máu bất ngờ',
  },
  '天同': {
    niHaixia: 'Nghê sư nói Thiên Đồng là phúc tinh, sao lười nhất. Thiên Đồng tọa Mệnh thích hưởng phúc, không thích cạnh tranh, hợp công việc ổn định. Thiên Đồng đồng cung với Thiên Lương là tốt nhất, vừa hưởng phúc vừa có bảo đảm. Thiên Đồng hóa Lộc là hóa Lộc đẹp nhất, chủ cả đời cơm áo không lo, vui vẻ thong dong. Thiên Đồng kỵ hãm địa, hãm thì phúc giảm, cần có hung tinh hóa giải.',
    classical: 'Cổ quyết: «Thiên Đồng là sao của Phúc Đức, người tọa Mệnh hưởng phúc có thừa, chủ cả đời tiêu dao tự tại, không phải lao khổ.» Nam Bắc Sơn Nhân chú: «Thiên Đồng thủ Mệnh, tam phương không có sát, cả đời vui vẻ, cơm áo đầy đủ; gặp cát tinh thì phú quý song toàn, tính tình ôn hòa, nhiều nhân duyên.»',
    bestPalace: 'Mệnh cung, Phúc Đức cung',
    worstPalace: 'Quan Lộc cung',
    career: 'Dịch vụ, giải trí, ẩm thực, văn nghệ; môi trường thoải mái vui vẻ là hợp nhất, kỵ cạnh tranh áp lực cao',
    relationship: 'Tình cảm ôn hòa, không chủ động, dễ chấp nhận một cách bị động, hôn nhân khá ổn định; tính tình dễ chịu, gần gũi',
    wealth: 'Tài vận không nổi bật, dựa vào lương ổn định, không giỏi đầu cơ, cơm áo không lo nhưng khó đại phú',
    health: 'Thuộc hành Thủy, chú ý thận và bàng quang. Thể chất khá yếu, nên vận động vừa phải, giữ tâm thái thoải mái',
  },
  '廉贞': {
    niHaixia: 'Nghê sư cho rằng Liêm Trinh là sao thứ đào hoa, tài hoa hơn người nhưng tình cảm phức tạp. Liêm Trinh hóa Kỵ rất hung, chủ kiện tụng, tù tội, tai nạn. Liêm Trinh đồng cung với Thiên Tướng thì hóa hung thành cát, thành cách hành chính ấn thụ. Liêm Trinh ngũ hành thuộc Hỏa, tính cách cương liệt, cả đời nhiều thăng trầm, tài nghệ xuất chúng; nếu giữ chính không tà thì có thể thành người lớn.',
    classical: 'Cổ quyết: «Liêm Trinh là thứ đào hoa, tài hoa hơn người, tình cảm nhiều sóng gió; Liêm Tướng đồng cung, hóa hung thành cát, thành cách hành chính ấn thụ, có thể nắm quyền bính.» Nam Bắc Sơn Nhân chú: «Liêm Trinh thủ Mệnh, gặp cát tinh thì tài hoa xuất chúng, hóa Kỵ thì kiện tụng đeo bám, chủ tai họa đổ máu, phải đề phòng.»',
    bestPalace: 'Quan Lộc cung (đi cùng Thiên Tướng), Mệnh cung (khi hóa Lộc)',
    worstPalace: 'Mệnh cung (khi hóa Kỵ), Phu Thê cung',
    career: 'Nghệ thuật, giải trí, pháp luật, công chức (đi cùng Thiên Tướng); tài nghệ xuất chúng, giữ nghề chính đáng mới lâu dài',
    relationship: 'Nhiều đào hoa, tình cảm phức tạp, dễ gặp rắc rối tình cảm; nên kết hôn muộn, chọn người bạn đời vững vàng',
    wealth: 'Tài vận lên xuống, dựa tài nghệ mưu sinh; khi hóa Kỵ đề phòng tranh chấp tài chính và rủi ro pháp lý',
    health: 'Thuộc hành Hỏa, chú ý tim, máu, gan. Khi hóa Kỵ đề phòng tai nạn và phẫu thuật, lưu ý đổ máu',
  },
  '天府': {
    niHaixia: 'Nghê sư nói Thiên Phủ là sao kho tài, sao thủ thành, không chủ động làm giàu nhưng giữ được tài sản. Người Thiên Phủ tọa Mệnh vững vàng bảo thủ, Mệnh nữ là tốt nhất, có thể vượng phu hưng gia. Thiên Phủ thích nhất đồng cung hoặc đối chiếu với Tử Vi, thành cách song tinh, tài quan song mỹ. Thiên Phủ sợ Không Kiếp giáp, gặp Không Kiếp thì kho tài cạn đáy, không giữ được tiền.',
    classical: 'Cổ quyết: «Thiên Phủ là sao kho tài, người thủ Mệnh vững vàng bảo thủ, chủ tích tài vượng gia; Mệnh nữ gặp thì có thể vượng phu ích tử, gia đạo hưng long.» Nam Bắc Sơn Nhân chú: «Thiên Phủ thủ Mệnh, tam phương cát tụ, tài quan song mỹ, phú quý an khang; gặp Không Kiếp thì kho tài rò rỉ, khó tích tài.»',
    bestPalace: 'Mệnh cung, Tài Bạch cung, Điền Trạch cung',
    worstPalace: 'Thiên Di cung',
    career: 'Quản lý hành chính, tài vụ, bảo hiểm, bất động sản; cầu ổn không mạo hiểm, hợp nghề thiên về giữ thành quả',
    relationship: 'Tình cảm ổn định, chăm lo gia đình, là người bạn đời tốt, coi trọng cảm giác an toàn gia đình và đảm bảo kinh tế',
    wealth: 'Tài vận rất tốt, khả năng giữ của mạnh, hợp nhất đầu tư tích lũy và mua bất động sản',
    health: 'Thuộc hành Thổ, chú ý tỳ vị, tiêu hóa. Thể chất vững, nên giữ ăn uống và sinh hoạt điều độ',
  },
  '太阴': {
    niHaixia: 'Nghê sư cho rằng Thái Âm là tài tinh, lợi cho Mệnh nữ, cũng là sao đại diện cho mẹ và vợ của Mệnh nam. Thái Âm vào miếu thì tài vận rất tốt, hãm địa thì tài vận bị cản trở. Thái Âm hóa Kỵ cần chú ý các vấn đề với người thân nữ. Thái Âm ở vị trí Hợi, Tý vào miếu, ánh sáng chiếu khắp, đại diện cho sự thanh nhã tinh tế, tình cảm phong phú, coi trọng thế giới nội tâm và đời sống tinh thần.',
    classical: 'Cổ quyết: «Thái Âm là tài tinh, lợi Mệnh nữ; Hợi, Tý vào miếu, ánh sáng chiếu khắp, tài vận rất vượng; vị trí Ngọ rơi vào hãm, u sầu đa tình, tài vận bình thường.» Nam Bắc Sơn Nhân chú: «Thái Âm thủ Mệnh, người vào miếu của cải dồi dào, Mệnh nữ càng tốt; người hãm địa cần nỗ lực mới giàu, tình cảm tinh tế.»',
    bestPalace: 'Mệnh cung (Hợi, Tý), Tài Bạch cung',
    worstPalace: 'Mệnh cung (vị trí Ngọ hãm địa)',
    career: 'Tài vụ, tài chính, bất động sản, nghệ thuật, giáo dục; tinh tế kiên nhẫn, hợp nghề cần thẩm mỹ và sự dịu dàng',
    relationship: 'Tình cảm dịu dàng tinh tế, coi trọng cảm nhận nội tâm, cần mối quan hệ ổn định có cảm giác an toàn',
    wealth: 'Vào miếu tài vận rất vượng, hãm địa thì cần nỗ lực; quản lý tiền cẩn thận, giỏi tích lũy, không giỏi mạo hiểm',
    health: 'Thuộc hành Thủy, chú ý thận, tử cung (Mệnh nữ). Cảm xúc dao động ảnh hưởng sức khỏe, nên giữ tâm trạng thư thái',
  },
  '贪狼': {
    niHaixia: 'Nghê sư nói Tham Lang là sao đa tài đa nghệ nhất, đào hoa nặng nhất. Tham Lang hóa Lộc nhập Mệnh thì sức hút rực rỡ, ai gặp cũng mến. Tham Lang là sao phát muộn, sau trung niên mới thật sự phát đạt. Tham Lang ở vị trí Dần, Thân vào miếu là tốt nhất, đào hoa vượng, tài nghệ siêu quần; hóa Lộc xong tài vận phát lớn, nhưng nếu gặp Không Kiếp thì cả đời nhiều trắc trở, khó tụ tài.',
    classical: 'Cổ quyết: «Tham Lang phát phúc hanh thông, đa tài đa nghệ, đào hoa nặng nhất; nhưng khó qua ba mươi tuổi, nhiều người phát muộn. Hãm địa gặp sát lại cát, đó là lý của Tham Lang hãm địa.» Nam Bắc Sơn Nhân chú: «Tham Lang thủ Mệnh, gặp cát thì phúc lộc thọ nhiều, phát phúc hanh thông; nhưng về sau khó được chết lành, nên cần tu thân dưỡng đức mới được chết lành.»',
    bestPalace: 'Mệnh cung (hóa Lộc), Phúc Đức cung, Thiên Di cung',
    worstPalace: 'Tật Ách cung',
    career: 'Nghệ thuật, giải trí, quan hệ công chúng, bán hàng, ngũ thuật phong thủy; dựa vào quan hệ và tài nghệ, kiểu đa tài đa nghệ',
    relationship: 'Đào hoa rất vượng, tình cảm đa dạng, nên kết hôn muộn; sau hôn nhân cần kiềm chế đào hoa mới bạc đầu giai lão',
    wealth: 'Kiếm tiền nhờ quan hệ và tài nghệ, tài vận đến trung và cuối đời mới vững; hóa Lộc thì nguồn tài rộng mở, thuở trẻ nên giữ vững',
    health: 'Thuộc hành Mộc (kèm Thủy), chú ý gan và thận. Đào hoa quá vượng dễ hao tổn tinh lực, nên điều tiết dưỡng sinh',
  },
  '巨门': {
    niHaixia: 'Nghê sư cho rằng Cự Môn là sao khẩu thiệt thị phi, nhưng hóa Lộc hóa Quyền thì chuyển cát, thành cách kiếm tiền bằng tài ăn nói. Cự Môn tọa Mệnh đa nghi, giỏi tranh biện, hợp luật sư, giáo viên, bán hàng. Cự Môn kỵ nhất hóa Kỵ, chủ khẩu thiệt thị phi không dứt, thậm chí dẫn đến kiện tụng. Cự Môn ở vị trí Tý, Ngọ khá tốt, tài ăn nói giỏi, chủ lập thân bằng lời nói.',
    classical: 'Cổ quyết: «Cự Môn là ám diệu, chủ khẩu thiệt thị phi; hóa Lộc Quyền thì chuyển thành mưu sinh bằng tài ăn nói, chủ phú quý.» Nam Bắc Sơn Nhân chú: «Cự Môn thủ Mệnh, gặp hóa Lộc Quyền, người làm nghề bằng lời nói thì đại cát; hóa Kỵ thì khẩu thiệt liên lụy, kiện tụng đeo bám, cần thận trọng lời nói.»',
    bestPalace: 'Quan Lộc cung (hóa Lộc Quyền), Mệnh cung (Tý, Ngọ)',
    worstPalace: 'Phu Thê cung, Tật Ách cung (hóa Kỵ)',
    career: 'Luật sư, giáo viên, bán hàng, người dẫn chương trình, chuyên gia đàm phán; tài ăn nói là năng lực cạnh tranh cốt lõi',
    relationship: 'Đa nghi đa lự, dễ nghĩ quá nhiều, giao tiếp là chìa khóa của hôn nhân, cần chọn người bạn đời kiên nhẫn',
    wealth: 'Kiếm tiền bằng tài ăn nói và chuyên môn, hóa Lộc thì tài vận khá tốt; hóa Kỵ đề phòng tranh chấp tài chính và khẩu thiệt liên lụy',
    health: 'Thuộc hành Thủy, chú ý thận, tai, khoang miệng. Nghĩ nhiều lo nhiều dễ hại thân, nên học cách thư giãn giảm căng thẳng',
  },
  '天相': {
    niHaixia: 'Nghê sư nói Thiên Tướng là sao ấn thụ, phụ trách hành chính sự vụ. Người Thiên Tướng tọa Mệnh trung quy trung củ, hợp công chức hành chính. Thiên Tướng cần có sao mạnh đi cùng mới phát huy được, đơn độc tọa Mệnh thì khá bình đạm. Thiên Tướng thích nhất có Liêm Trinh đi cùng, thành cách Liêm Tướng, có thể chủ đại quyền hành chính; sợ nhất Phá Quân đồng cung, thành cách Hình Kỵ giáp Ấn, chủ hung hiểm.',
    classical: 'Cổ quyết: «Thiên Tướng là sao ấn thụ, chủ hành chính sự vụ; Liêm Tướng đồng cung, hóa hung thành cát, nắm đại quyền hành chính.» Nam Bắc Sơn Nhân chú: «Thiên Tướng thủ Mệnh, trung quy trung củ, hợp công chức; được Liêm Trinh đi cùng thì có thể thành trụ cột quốc gia; Phá Quân cùng thủ thì khó tránh hình khắc.»',
    bestPalace: 'Quan Lộc cung, Mệnh cung (đi cùng Liêm Trinh)',
    worstPalace: 'Tài Bạch cung, Mệnh cung (đi cùng Phá Quân thành cách Hình Kỵ giáp Ấn)',
    career: 'Công chức, quản lý hành chính, thư ký, trợ lý; giỏi vai trò phụ trợ hỗ trợ, cần sao mạnh dẫn đường',
    relationship: 'Tình cảm ổn định, trung hậu thật thà, là người bạn đời tốt, nhưng cần đối phương định hướng',
    wealth: 'Tài vận bình ổn, tích lũy từ lương, không hợp đầu tư mạo hiểm, quản lý tiền kiểu giữ thành quả là hợp nhất',
    health: 'Thuộc hành Thủy, chú ý thận, hệ bạch huyết. Thể chất trung bình, nên giữ thói quen sinh hoạt điều độ',
  },
  '天梁': {
    niHaixia: 'Nghê sư cho rằng Thiên Lương là sao ấm che chở, có thể bảo vệ người khác, cũng đại diện cho y dược và tôn giáo. Người Thiên Lương tọa Mệnh có duyên với bậc trưởng bối, thuở trẻ nhiều gian truân, về già hưởng phúc. Thiên Lương sợ nhất hóa Kỵ, nghĩa là bậc trưởng bối hoặc sức khỏe có vấn đề. Thiên Lương đồng cung với Thái Dương là tốt nhất, nhật nguyệt tịnh minh, quý nhân che chở, cả đời có quý nhân giúp đỡ, cuối cùng được bình an.',
    classical: 'Cổ quyết: «Thiên Lương là sao ấm che chở, chủ che chở bảo vệ; người tọa Mệnh có duyên với bậc trưởng bối, thuở trẻ chịu rèn luyện, về già hưởng thanh phúc.» Nam Bắc Sơn Nhân chú: «Thiên Lương thủ Mệnh, phải gặp cát tinh mới phát đạt; gặp Thái Dương đồng cung, nhật nguyệt tịnh minh, chủ quý hiển, cả đời nhiều quý nhân giúp đỡ.»',
    bestPalace: 'Mệnh cung, Phụ Mẫu cung, Phúc Đức cung',
    worstPalace: 'Mệnh cung (khi hóa Kỵ), Tài Bạch cung',
    career: 'Y tế, tôn giáo, pháp luật, công tác xã hội, từ thiện; thích giúp người, có lòng che chở mọi người',
    relationship: 'Tình cảm thường với người chênh lệch tuổi khá lớn, hoặc duyên đến muộn, cần kiên nhẫn chờ đợi mới có lương duyên',
    wealth: 'Tài vận dựa vào quý nhân giúp đỡ, thuở trẻ tài vận không tốt, về già tài vận mới vững; nên giữ không nên xông pha',
    health: 'Thuộc hành Thổ, chú ý tỳ vị, xương cốt. Cần coi trọng chăm sóc sức khỏe tuổi già, nên phòng ngừa điều dưỡng sớm',
  },
  '七杀': {
    niHaixia: 'Nghê sư nói Thất Sát là sao tướng quân, quyết đoán xung kích mạnh, nhưng mang tính cô khắc. Thất Sát tọa Mệnh phải có phụ tinh hóa giải tính cô độc, nếu không duyên lục thân mỏng. Thất Sát đồng cung với Vũ Khúc là cách Tướng Tài, rất tốt. Thất Sát sợ nhất Trúc La tam hạn (Kình, Đà, Hỏa, Linh cùng chiếu), chủ đại hung, phải đề phòng tai nạn bất ngờ. Thất Sát hóa Lộc ngược lại thành cát, có thể thành bậc đại tướng.',
    classical: 'Cổ quyết: «Thất Sát là sao tướng quân, quyết đoán xung kích mạnh; người thủ Mệnh tính cô khắc nặng, duyên lục thân mỏng.» Nam Bắc Sơn Nhân chú: «Thất Sát thủ Mệnh, tam hợp cát tụ thì đại quý; gặp Trúc La tam hạn (Kình, Đà, Hỏa, Linh), chủ đại hung, đề phòng tai họa bất ngờ, đề phòng hình khắc.»',
    bestPalace: 'Mệnh cung (có phụ tinh), Quan Lộc cung',
    worstPalace: 'Phu Thê cung, Phụ Mẫu cung',
    career: 'Quân đội và công an, khởi nghiệp, giao dịch tài chính, các lĩnh vực tự đứng một mình; cần quyết đoán nhanh và khí phách',
    relationship: 'Tình cảm cô khắc, khó tìm bạn đời phù hợp, cần người bao dung được cá tính mạnh, nên kết hôn muộn',
    wealth: 'Tài vận biến động lớn, có cơ hội đại phú, cũng có lúc lên xuống thất thường; đồng cung Vũ Khúc có thể thành cách Tướng Tài đại quý',
    health: 'Thuộc hành Kim, chú ý phổi, đại tràng. Tính nóng nảy dễ hại thân, nên học cách kiềm chế cảm xúc và tu thân',
  },
  '破军': {
    niHaixia: 'Nghê sư nói Phá Quân là sao phá cũ lập mới nhất, cũng là một trong những sao cô khắc nhất. Phá Quân hóa Lộc mới trở nên tốt, nghĩa là phá rồi mới lập. Phá Quân tọa Mệnh duyên lục thân mỏng, nhưng năng lực khai sáng rất mạnh. Phá Quân hợp nhất với cải cách, đổi mới; khi hóa Lộc tài vận chuyển vượng, một phá một lập, cuối cùng thành tựu sự nghiệp.',
    classical: 'Cổ quyết: «Phá Quân là sao phá cũ lập mới nhất, người tọa Mệnh cô khắc, duyên lục thân mỏng, nhưng năng lực khai sáng siêu cường; hóa Lộc thì phá rồi lập, có thể thành đại nghiệp.» Nam Bắc Sơn Nhân chú: «Phá Quân thủ Mệnh, cả đời nhiều trắc trở; người hóa Lộc, phá tài xong mới có thể xây dựng lại, tài vận cuối cùng chuyển tốt, chủ thành tựu lúc về già.»',
    bestPalace: 'Quan Lộc cung (hóa Lộc), Thiên Di cung',
    worstPalace: 'Phu Thê cung, Phụ Mẫu cung',
    career: 'Sự nghiệp khai sáng, quân đội và công an, cải cách, quản lý đổi mới; hợp công việc tiên phong không ngừng mở lĩnh vực mới',
    relationship: 'Tình cảm nhiều trắc trở, tan hợp bất định, duyên lục thân mỏng, cần chọn bạn đời độc lập và bao dung mạnh',
    wealth: 'Tài vận lên xuống lớn, hóa Lộc thì tài vận chuyển tốt; giữ thành quả thì tài suy, cần không ngừng khai sáng cục diện mới mới tích được tài',
    health: 'Thuộc hành Thủy, chú ý thận, bàng quang, hệ sinh dục. Thể chất thăng trầm, nên giữ thói quen vận động điều độ',
  },
};

const levelConfig = {
  major: { label: 'Chính tinh', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  lucky: { label: 'Cát tinh', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
  sha:   { label: 'Sát tinh', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  minor: { label: 'Tạp tinh', color: 'text-slate-400 border-slate-500/25 bg-slate-500/10' },
};

const siHuaColors: Record<string, string> = {
  '禄': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  '权': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  '科': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  '忌': 'text-red-400 bg-red-500/10 border-red-500/30',
};

const NHAN_MIEU_VUONG = 'Miếu vượng';
const NHAN_HAM = 'Hãm địa';
const NHAN_BINH_HOA = 'Bình hòa';

export default function StarDetailPanel({ star, palaceName, onClose }: StarDetailPanelProps) {
  const desc = star ? STAR_DESCRIPTIONS[star.name] : null;
  const detail = star ? STAR_DETAIL[star.name] : null;
  const typeConfig = star ? levelConfig[star.type] : null;

  return (
    <AnimatePresence>
      {star && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="card-glass rounded-xl overflow-hidden"
        >
          {/* 标题栏 */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--t-border)' }}>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: 'var(--t-gold)' }}>{tenSao(star.name)}</span>
              {typeConfig && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${typeConfig.color}`}>
                  {typeConfig.label}
                </span>
              )}
              {star.siHua && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${siHuaColors[star.siHua] || ''}`}>
                  {tenTuHoa(star.siHua)}
                </span>
              )}
            </div>
            <button onClick={onClose} aria-label="Đóng" className="transition-colors text-lg leading-none" style={{ color: 'var(--t-faint)' }}>×</button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[560px]">
            {/* 基本信息 */}
            {desc && (
              <div className="flex flex-wrap gap-1.5">
                {[
                  `Ngũ hành · ${tenNguHanh(desc.element)}`,
                  `Tính chất · ${NATURE_VI[desc.nature] ?? desc.nature}`,
                  ...(palaceName ? [`Vị trí · ${tenCung(palaceName)}`] : []),
                  ...(star.brightness ? [star.brightness === 'bright' ? NHAN_MIEU_VUONG : star.brightness === 'dim' ? NHAN_HAM : NHAN_BINH_HOA] : []),
                ].map(tag => (
                  <div key={tag} className="text-[10px] px-2 py-1 rounded-full"
                    style={{
                      border: '1px solid var(--t-border)',
                      color: tag.includes(NHAN_MIEU_VUONG) ? '#eab308' : tag.includes(NHAN_HAM) ? '#ef4444' : 'var(--t-text2)',
                    }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* 关键词 */}
            {desc && (
              <div>
                <div className="text-[10px] tracking-wide mb-1.5" style={{ color: 'var(--t-faint)' }}>Đặc chất của sao</div>
                <div className="flex flex-wrap gap-1.5">
                  {(KEYWORDS_VI[star.name] ?? desc.keywords).split('·').map(k => (
                    <span key={k} className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--t-gold)', border: '1px solid rgba(212,168,67,0.2)', background: 'rgba(212,168,67,0.06)' }}>
                      {k.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 古书原文 */}
            {detail && (
              <div className="rounded-xl p-3" style={{ background: 'rgba(212,168,67,0.04)', border: '1px solid rgba(212,168,67,0.12)' }}>
                <div className="text-[10px] tracking-wide mb-1.5 flex items-center gap-1" style={{ color: 'var(--t-gold)', opacity: 0.7 }}>
                  Trích dẫn cổ thư
                </div>
                <p className="text-[11px] leading-relaxed italic" style={{ color: 'var(--t-gold)', opacity: 0.8 }}>{detail.classical}</p>
              </div>
            )}

            {/* 倪海厦解读 */}
            {detail && (
              <>
                <div>
                  <div className="text-[10px] tracking-wide mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--t-faint)' }}>
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                    Nghê Hải Hạ luận giải
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>{detail.niHaixia}</p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Hướng sự nghiệp', value: detail.career, icon: '◈' },
                    { label: 'Đặc chất tình cảm', value: detail.relationship, icon: '♡' },
                    { label: 'Phân tích tài vận', value: detail.wealth, icon: '◆' },
                    { label: 'Lưu ý sức khỏe', value: detail.health, icon: '☯' },
                  ].map(item => (
                    <div key={item.label} className="card-inner rounded-lg p-3">
                      <div className="text-[10px] mb-1 flex items-center gap-1" style={{ color: 'var(--t-faint)' }}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(74,222,128,0.15)', background: 'rgba(74,222,128,0.05)' }}>
                    <div className="text-emerald-500 mb-0.5 font-medium">Cung tốt nhất</div>
                    <div className="text-emerald-500/70">{detail.bestPalace}</div>
                  </div>
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(248,113,113,0.15)', background: 'rgba(248,113,113,0.05)' }}>
                    <div className="text-red-500 mb-0.5 font-medium">Cung cần lưu ý</div>
                    <div className="text-red-500/70">{detail.worstPalace}</div>
                  </div>
                </div>
              </>
            )}

            {/* 辅星/煞星说明 */}
            {!detail && star.type !== 'major' && (
              <div className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>
                {star.type === 'lucky' && (
                  <>
                    {star.name === '文昌' && 'Văn Xương nhập cung, chủ học hành thi cử thuận lợi, văn thư ấn tín có lợi, hợp làm công việc liên quan đến chữ nghĩa. Cổ quyết: «Văn Xương khoa giáp, chủ văn chương hiển đạt, gặp thi ắt đỗ.»'}
                    {star.name === '文曲' && 'Văn Khúc nhập cung, chủ tài nghệ xuất chúng, ăn nói giỏi, khéo biểu đạt, thiên phú nghệ thuật mạnh. Cổ quyết: «Văn Khúc là sao tài nghệ, giỏi văn giỏi võ, tài ăn nói hơn người.»'}
                    {star.name === '左辅' && 'Tả Phù nhập cung, chủ quý nhân giúp đỡ, có người nâng đỡ, việc của cung này nhận được sự hỗ trợ thiện ý. Cổ quyết: «Tả Phù là sao trợ lực, tọa Mệnh thì nhiều quý nhân, gặp hung hóa cát.»'}
                    {star.name === '右弼' && 'Hữu Bật nhập cung, chủ quý nhân giúp đỡ, phần nhiều là quý nhân nữ, việc của cung này có người hỗ trợ. Cổ quyết: «Hữu Bật là sao âm trợ, nhiều quý nhân nữ, hóa nguy thành an.»'}
                    {star.name === '天魁' && 'Thiên Khôi nhập cung, chủ quý nhân sinh ban ngày, nhiều quý nhân nam, có sức gặp hung hóa cát. Cổ quyết: «Thiên Khôi là Thiên Ất quý nhân, gặp ắt có quý nhân nâng đỡ.»'}
                    {star.name === '天钺' && 'Thiên Việt nhập cung, chủ quý nhân sinh ban đêm, nhiều quý nhân nữ, thêm khí cát tường. Cổ quyết: «Thiên Việt là Ngọc Đường quý nhân, chủ âm trợ, nhiều quý nhân nữ.»'}
                    {star.name === '禄存' && 'Lộc Tồn nhập cung, chủ tài lộc giữ thành quả, cung này có khí tài, nhưng thuộc loại tài vận bảo thủ. Cổ quyết: «Lộc Tồn là sao tài lộc, chủ giữ của có thừa, tiến tài vững vàng.»'}
                    {star.name === '天马' && 'Thiên Mã nhập cung, chủ bôn ba dao động, trong động tìm tài, nên chủ động xuất kích, không nên ôm cây đợi thỏ. Cổ quyết: «Thiên Mã chủ động, gặp Lộc thì tài lộc song toàn, trong động sinh tài.»'}
                  </>
                )}
                {star.type === 'sha' && (
                  <>
                    {star.name === '地空' && 'Địa Không nhập cung, chủ việc của cung này có cảm giác trống rỗng, tinh thần hao tán, nên chú ý sức khỏe tâm lý. Cổ quyết: «Địa Không chủ hư hao, người nhập Mệnh cung phần nhiều tinh thần mơ hồ, phải đề phòng mộng tưởng hão huyền.»'}
                    {star.name === '地劫' && 'Địa Kiếp nhập cung, chủ việc của cung này có tổn thất bất ngờ, của cải cần thận trọng, đề phòng tiểu nhân. Cổ quyết: «Địa Kiếp chủ kiếp tài, người nhập Mệnh cung tài vận bị tổn, đề phòng mất mát bất ngờ.»'}
                    {star.name === '火星' && 'Hỏa Tinh nhập cung, chủ việc của cung này nóng nảy xung động, cảm xúc dao động, nhưng nếu gặp Tham Lang thì lại cát. Cổ quyết: «Hỏa Tinh chủ nóng nảy, nhưng gặp Tham Lang đồng cung thì thành cách Hỏa Tham, chủ bạo phát.»'}
                    {star.name === '铃星' && 'Linh Tinh nhập cung, chủ việc của cung này có trở ngại ngầm, đề phòng tiểu nhân sau lưng, mọi việc nên khiêm tốn. Cổ quyết: «Linh Tinh chủ ám sát, người nhập Mệnh phần nhiều bị ngầm chống đối, phải đề phòng thị phi sau lưng.»'}
                    {star.name === '擎羊' && 'Kình Dương nhập cung, chủ hình khắc, việc của cung này nhiều trắc trở, có tai họa đổ máu hoặc bất ngờ. Cổ quyết: «Kình Dương là sao hình khắc, người nhập Mệnh cung phần nhiều hình khắc, phải đề phòng tai nạn đổ máu.»'}
                    {star.name === '陀罗' && 'Đà La nhập cung, chủ thị phi đeo bám, việc của cung này trì hoãn chưa quyết, mọi việc nên chuẩn bị sớm. Cổ quyết: «Đà La chủ thị phi trì hoãn, người nhập Mệnh cung làm việc chậm chạp, phải đề phòng vướng víu không dứt.»'}
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
