/**
 * 紫微斗数合盘知识库
 * 基于倪海厦《天纪》体系 + 《紫微斗数全书》古典断语 + 全网专业资料整合
 * 供合盘 AI 分析使用
 *
 * Nội dung hiển thị và nội dung lời nhắc bên dưới đã được Việt hóa; khóa (tên sao, tên tứ hóa) giữ nguyên chữ Hán.
 */

// ─── 十四主星在夫妻宫的完整断语 ──────────────────────────

export const STAR_IN_FUQI_GU: Record<string, {
  summary: string;       // 一句话核心
  good: string;          // 吉象条件/表现
  bad: string;           // 凶象/注意事项
  spouse_traits: string; // 配偶外形性格
  timing: string;        // 婚期建议
  ni_quote?: string;     // 倪海厦原话
}> = {
  '紫微': {
    summary: 'Người phối ngẫu kiêu hãnh, giỏi giang; nên kết hôn muộn, tình cảm lấy sự tôn trọng làm nền tảng',
    good: 'Tam phương có Tả Phù, Hữu Bật (辅弼) kẹp cung: người phối ngẫu hiền tài, sau hôn nhân được quý nhân giúp đỡ; tam hợp gặp Lộc là tài lộc song toàn',
    bad: 'Đế tinh cô độc không có phụ tá: người phối ngẫu mạnh thế, khó trao đổi; ở cung Thìn, Tuất thì tình nghĩa vợ chồng nhạt; gặp Phá Quân: trước hôn nhân có nhiều trở ngại',
    spouse_traits: 'Người phối ngẫu khí chất kiêu hãnh, có chính kiến, lòng tự trọng cao, năng lực mạnh nhưng không dễ bày tỏ tình cảm',
    timing: 'Nên kết hôn muộn (nam từ 30 tuổi trở lên, nữ từ 27 tuổi trở lên); kết hôn sớm thường nhiều trắc trở',
    ni_quote: 'Tử Vi ở cung Phu Thê thì cô khắc, nên kết hôn muộn; tình cảm tốt nhưng chi phí để hiểu nhau rất cao',
  },
  '天机': {
    summary: 'Hôn nhân nhiều biến động, hợp với người phối ngẫu chênh lệch tuổi khá lớn',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: tình cảm tạm duy trì được; gặp Thái Âm: thêm phần tinh tế, dịu dàng',
    bad: 'Hóa Kỵ hoặc gặp sát tinh: tình cảm biến động lớn, dễ chia ly; Thiên Cơ hay thay đổi, người phối ngẫu còn do dự trong tình cảm',
    spouse_traits: 'Người phối ngẫu thông minh, hay thay đổi, tâm tư tinh tế, có duyên với tôn giáo và triết học, hơi nhạy cảm thái quá',
    timing: 'Nên chênh lệch tuổi khá lớn (trên 6 tuổi) để giảm xung đột do biến động của hai bên',
    ni_quote: 'Thiên Cơ hay thay đổi, không nên độc tọa; hôn nhân đầy biến động',
  },
  '太阳': {
    summary: 'Mệnh nam giúp vợ, mệnh nữ vượng phu; hãm địa hóa Kỵ thì lại chủ hình khắc',
    good: 'Miếu vượng (cung Mão đến cung Thân): người phối ngẫu giỏi giang, mệnh nam có vợ hiền; mệnh nữ lấy chồng vượng phu, hôn nhân mỹ mãn',
    bad: 'Hãm địa (cung Dậu đến cung Dần): mệnh nam có vợ yếu bệnh, mệnh nữ lấy chồng tầm thường; Hóa Kỵ: mệnh nữ “trên không thấy cha, dưới không thấy con, giữa không thấy chồng”, mười năm đó chồng gặp tai nạn lớn',
    spouse_traits: 'Người phối ngẫu cởi mở, phóng khoáng, có ý thức về hình ảnh trước công chúng, hào phóng nhưng đôi khi quá áp đặt',
    timing: 'Tình cảm diễn tiến lúc đầu nóng về sau lạnh, nên giữ khoảng cách vừa phải để duy trì sự mới mẻ',
    ni_quote: 'Thái Dương hóa Kỵ, trên không thấy cha, dưới không thấy con, giữa không thấy chồng — mệnh nữ mười năm đó người chồng ắt có tai họa lớn',
  },
  '武曲': {
    summary: 'Sao cô quả, hôn nhân hình khắc, nhất loạt nên kết hôn muộn',
    good: 'Vũ Khúc hóa Lộc: người phối ngẫu có năng lực kiếm tiền, nhưng mệnh nam lại chê vợ quá giỏi; gặp Lộc Tồn kẹp cung có Phụ Bật: hôn nhân vững chắc, có tiền của',
    bad: 'Hóa Kỵ: cô quả, khó kết hôn, hoặc người phối ngẫu có tật nguyền; Vũ Khúc Thất Sát (cung Mão, Dậu): điềm hôn nhân xấu; gặp bất kỳ tứ sát nào: chủ ly hôn; Vũ Khúc Phá Quân: gặp sát, kỵ, hình tinh thì hôn nhân ắt bất lợi',
    spouse_traits: 'Người phối ngẫu cương liệt, độc lập, nói thẳng, không giỏi bày tỏ tình cảm, năng lực kinh tế mạnh nhưng tính cách khá cô khắc',
    timing: 'Hệ Vũ Khúc nhất loạt nên kết hôn sau 30 tuổi; kết hôn sớm thì chia tay sớm',
    ni_quote: 'Vũ Khúc hóa Kỵ là sao hình tù, hệ Vũ Khúc hôn nhân nên muộn',
  },
  '天同': {
    summary: 'Người phối ngẫu ôn hòa, thích hưởng thụ, nên chênh lệch tuổi khá lớn, kết hôn muộn là tốt',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: người phối ngẫu ôn hòa có của, gia đình yên ổn; đồng cung với Thái Âm: tình cảm dịu dàng ngọt ngào',
    bad: 'Hóa Kỵ: lúc đầu tình cảm còn tạm ổn, dần nhạt đi, do phối hợp kém sinh oán trách; gặp nhiều sát: sự lười nhác trở thành gánh nặng',
    spouse_traits: 'Người phối ngẫu ôn hòa, lương thiện, lạc quan dễ chịu, nhưng có thể lười nhác, nghiêng về chủ nghĩa hưởng thụ',
    timing: 'Nam cưới người nhỏ tuổi hơn, nữ gả người lớn tuổi hơn; chênh lệch từ 8 tuổi trở lên là kết duyên tốt nhất',
  },
  '廉贞': {
    summary: 'Chính tinh bất ổn nhất ở cung Phu Thê, nguy cơ sinh ly tử biệt cao',
    good: 'Liêm Trinh Thiên Phủ (Tý, Ngọ): người phối ngẫu ôn hòa thanh tú, tình cảm tạm được, người phối ngẫu phần nhiều là người làm công ăn lương',
    bad: 'Liêm Trinh Tham Lang: không sinh ly thì cũng tử biệt; Liêm Trinh Phá Quân: đắp mộ giữa dòng nước; Liêm Trinh Thất Sát: chôn xác giữa đường; Hóa Kỵ: tình cảm quấy nhiễu không dứt, hòa rồi lại vỡ theo vòng lặp; đồng cung với Hỏa Tinh: dù có cát tinh cũng phải ở riêng',
    spouse_traits: 'Người phối ngẫu ngoại hình nổi bật, khéo giao thiệp, giá trị cảm xúc cao nhưng không ổn định; có thể xa nhiều gần ít',
    timing: 'Mệnh nam nên lấy vợ trẻ (nhỏ hơn 6 đến 12 tuổi), mệnh nữ nên lấy chồng lớn tuổi hơn',
    ni_quote: 'Liêm Trinh Tham Lang hoặc Liêm Trinh Phá Quân ở cung Phu Thê, bất kể mệnh nam hay mệnh nữ, không sinh ly thì cũng tử biệt; Liêm Trinh Thất Sát — chôn xác giữa đường; Liêm Trinh Phá Quân — đắp mộ giữa dòng nước; Liêm Trinh Tham Lang — chết yểu',
  },
  '天府': {
    summary: 'Cát tinh, chủ sinh ly chứ không tử biệt, tình cảm bình ổn nhưng nhạt',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: tài lộc song toàn, tình cảm ổn định; tam phương không có sát: vợ chồng yên hòa',
    bad: 'Chỉ một sao Phụ hoặc Bật: dễ có lần hôn nhân thứ hai; gặp tứ sát: tình cảm lạnh nhạt, khả năng sinh ly tăng',
    spouse_traits: 'Người phối ngẫu nhã nhặn, sở thích rộng, giữ của có nguyên tắc, năng lực công việc mạnh nhưng thiên về bảo thủ',
    timing: 'Mệnh nam người phối ngẫu lớn tuổi hơn, mệnh nữ người phối ngẫu nhỏ tuổi hơn; tình cảm ổn định nhưng cần chủ động vun đắp',
  },
  '太阴': {
    summary: 'Thích người phối ngẫu thanh tú dịu dàng; hãm địa gặp sát thì tình cảm nhiều thay đổi',
    good: 'Miếu vượng (Tý đến Ngọ) gặp cát: người phối ngẫu thanh tú có thành tựu, mệnh nam vợ đẹp; mệnh nữ: bản thân đẹp, có khí chất',
    bad: 'Hãm địa (Mùi đến Hợi): tình cảm dễ đổi, sức khỏe người phối ngẫu kém; Hóa Kỵ (mệnh nam đặc biệt kỵ): mẹ chồng nàng dâu bất hòa, vợ với mẹ ắt xung khắc; gặp Hỏa Linh: tình cảm có biến cố lớn',
    spouse_traits: 'Người phối ngẫu dịu dàng thanh tú, tinh tế nhạy cảm, trọng tình cảm, nhưng đôi khi dễ xúc động',
    timing: 'Không có ràng buộc đặc biệt, nhưng khi hãm địa nên kết hôn muộn',
    ni_quote: 'Mệnh đàn ông, sợ nhất Thái Âm hóa Kỵ, mẹ chồng nàng dâu bất hòa, vợ với mẹ nhất định không hợp nhau',
  },
  '贪狼': {
    summary: 'Đào hoa vượng nhất, hôn nhân bất ổn, nguy cơ ngoại tình cao',
    good: 'Hóa Lộc: người phối ngẫu tài nghệ giỏi, phong tình muôn vẻ, tình cảm ngọt ngào (nhưng nguy cơ ngoại tình không giảm); gặp Hóa Khoa: giảm ngoại tình',
    bad: 'Hóa Kỵ: nhiều lần hôn nhân; Tử Vi Tham Lang (Mão, Dậu): người phối ngẫu hay đi xa, có điềm ngoại tình; gặp tứ sát: ắt sinh ly; Tham Lang ở cung Ngọ (sao võ quan): lại chủ người phối ngẫu làm nghề võ, khá ổn định',
    spouse_traits: 'Người phối ngẫu tài nghệ xuất chúng, giao tế giỏi, duyên với người khác giới rất tốt, nhưng dục vọng mạnh, khó ràng buộc',
    timing: 'Kết hôn sớm thì tình cảm nhiều biến động, nên kết hôn muộn; trước hôn nhân nhất định phải tìm hiểu quan hệ với người khác giới của đối phương',
    ni_quote: 'Tham Lang ngoài chỉ sao đào hoa, còn chỉ rượu, sắc, tài, khí, cờ bạc — tất cả đều nằm trong Tham Lang; Tham Lang ở cung Ngọ là sao võ quan, đừng tùy tiện luận là đào hoa',
  },
  '巨门': {
    summary: 'Khẩu thiệt thị phi nhiều, vợ chồng dễ cãi vã, cần Thái Dương hóa giải',
    good: 'Thái Dương miếu vượng tương hội: lại chủ hôn nhân hòa mỹ, tài ăn nói trở thành công cụ giao tiếp; hóa Lộc: vợ hiền giỏi, đường tài lộc mở nhờ vợ',
    bad: 'Hóa Kỵ: người phối ngẫu hay cằn nhằn, thị phi không dứt; đồng độ với Đà La: vợ chồng tự chuốc phiền; độc thủ không có cát: tình cảm bị dồn nén, nhiều mâu thuẫn sâu xa',
    spouse_traits: 'Người phối ngẫu ăn nói giỏi, hay ghen, coi trọng thể diện, đôi khi quá khắt khe, nhưng trong lòng sâu nặng tình cảm',
    timing: 'Không có ràng buộc đặc biệt, nhưng cần chuẩn bị tâm lý cho việc trao đổi và mài giũa lâu dài',
  },
  '天相': {
    summary: 'Duyên lành “thân càng thêm thân”, phu xướng phụ tùy, hôn nhân kiểu hợp tác',
    good: 'Gặp đủ Tả Phù, Hữu Bật: tình cảm trung thành, hôn nhân vững chắc; người phối ngẫu ngay thẳng chắc chắn; Thiên Tướng tam hợp gặp Lộc: tài lộc có thể trông đợi',
    bad: 'Chỉ một sao Phụ hoặc Bật: có thể báo hiệu tái hôn; gặp nhiều sát: trong tình cảm bị đè nén, tủi thân, không giỏi bày tỏ',
    spouse_traits: 'Người phối ngẫu ngay thẳng chắc chắn, giữ chữ tín, không thích xung đột, giỏi điều hòa, là người bạn đời lý tưởng',
    timing: 'Phần nhiều phát triển từ quan hệ quen biết như bạn học, đồng nghiệp, hàng xóm; hợp với vợ chồng cùng làm việc',
  },
  '天梁': {
    summary: 'Thích người phối ngẫu có trách nhiệm hoặc lớn tuổi hơn, trước hôn nhân nhiều trắc trở',
    good: 'Gặp Lộc: người phối ngẫu có phúc đức, tình cảm chắc chắn; tam hợp phương có cát: vun đắp tình cảm vững vàng, lý trí',
    bad: 'Hóa Kỵ hoặc gặp sát: hay cằn nhằn, cậy lý thuyết phục, tình cảm xa cách; Thiên Lương đi cùng Thiên Mã: vợ chồng vì hoàn cảnh mà phân tán; trước hôn nhân dễ thất bại ở mối tình đầu',
    spouse_traits: 'Người phối ngẫu có trách nhiệm, chín chắn, giỏi nói lý lẽ, nhưng đôi khi có khuynh hướng giảng đạo',
    timing: 'Trước hôn nhân nhiều trắc trở là chuyện thường, một khi kết hôn lại vững; không có sát thì tình duyên sau hôn nhân càng sâu',
  },
  '七杀': {
    summary: '“Chăn uyên ương lạnh một nửa” — gần ít xa nhiều, nên kết hôn muộn sau 30 tuổi',
    good: 'Miếu vượng (cung Dần, Thân): người phối ngẫu tuy cương cường nhưng trung thành, một khi đã dấn thân thì dốc hết sức; có Hóa Lộc giúp: giảm cô khắc',
    bad: 'Gặp sát: bề ngoài tình cảm hòa thuận, bên trong bất mãn, mệnh nam chủ cưới hai lần; mệnh nữ nên làm vợ lẽ hoặc vợ kế; cung Mão, Dậu (Vũ Khúc Thất Sát): vận hôn nhân kém nhất',
    spouse_traits: 'Người phối ngẫu cương cường cô độc, yêu say đắm nhanh, rời đi cũng nhanh, tình yêu nóng lạnh đều nhanh',
    timing: 'Nhất loạt nên kết hôn muộn, sau 30 tuổi hôn nhân vững hơn; kết hôn sớm phần nhiều hình khắc',
    ni_quote: 'Thất Sát ở cung vợ chồng thì chăn uyên ương lạnh một nửa (cổ phú); nếu bạn cưới vợ có Thất Sát nhập mệnh, thì coi như hỏng một nửa rồi, rất mệt, cỏ cây đều là địch',
  },
  '破军': {
    summary: 'Sao hao tán hôn nhân, không ai hơn được, theo đuổi tình cảm không ràng buộc',
    good: 'Hóa Lộc: phá rồi mới lập, tình cảm trải qua trắc trở lại có thể đi đến cuối cùng; Anh tinh nhập miếu: người phối ngẫu khôi ngô có cá tính',
    bad: 'Hóa Kỵ: phá hoại hết sạch, nhiều lần hôn nhân hoặc không kết hôn; Tử Vi Phá Quân (Sửu, Mùi): không thêm sát cũng khắc, thêm sát ắt ly; đi với Liêm Trinh: đắp mộ giữa dòng nước; sau trung niên có điềm ngủ riêng, ở riêng',
    spouse_traits: 'Người phối ngẫu theo đuổi tự do, không thích ràng buộc, dám đột phá, nhưng quan niệm hôn nhân mỏng, cả đời biến động lớn',
    timing: 'Trước hôn nhân dễ yêu sét đánh hoặc kết hôn vội vàng, nên kéo dài thời gian tìm hiểu rồi mới quyết định',
    ni_quote: 'Liêm Trinh Phá Quân ở cung Phu Thê, đắp mộ giữa dòng nước; Phá Quân là sao có sức phá hoại hôn nhân mạnh nhất',
  },
};

// ─── 四化在夫妻宫的完整断语 ──────────────────────────────

export const SIHUA_IN_FUQI_GU = {
  '化禄': 'Có duyên phận bẩm sinh với người phối ngẫu, người phối ngẫu tính tình lạc quan, sau hôn nhân tình cảm càng tốt, người phối ngẫu ngày càng biết kiếm tiền, duyên sâu đậm; tự hóa Lộc thì tiền đến tiền đi, có tình cảm nhưng khó giữ',
  '化权': 'Hôn nhân phần nhiều do chủ động giành lấy, người phối ngẫu nắm quyền quyết định, đa số việc do người phối ngẫu tự quyết, cần học cách buông tay; hôn nhân kiểu giành giật, càng cưỡng cầu càng khó được',
  '化科': 'Xem như tiểu Lộc, có thể sống hòa hợp với người phối ngẫu, có duyên quý nhân, thuận lợi cho yêu đương và kết hôn; Khoa ở cung Phu Thê chủ người phối ngẫu có danh tiếng hoặc kỹ năng chuyên môn',
  '化忌': 'Nợ nần hôn nhân, kết hôn sớm thì chia tay sớm, nên kết hôn muộn hoặc không kết hôn; người phối ngẫu có oán trách đối với bản thân; Hóa Kỵ xung cung Phu Thê càng hung — điềm sinh ly tử biệt',
};

// ─── 合盘核心方法论 ─────────────────────────────────────────

export const HEMING_METHODOLOGY = `
## Khung phân tích hợp bàn cốt lõi (hệ Nghê Hải Hạ kết hợp 《Tử Vi Đẩu Số Toàn Thư》)

### 1. Nguyên tắc xem song cung (cách đoán hôn nhân quan trọng nhất của Nghê Hải Hạ)

**Khẩu quyết cốt lõi: “Xem hôn nhân mà chỉ xem cung Phu Thê là sai lớn, nhất định phải xem đồng thời cung Phúc Đức.”**

- **Cung Phu Thê (夫妻宫)**: xem tính chất sao, ngoại hình, tính cách của người phối ngẫu và cách hai người tương tác
- **Cung Phúc Đức (福德宫)**: đại diện cho tình cảm sâu xa của vợ chồng, hôn nhân có bền lâu hay không
- **Ví dụ của Nghê sư**: “Có người cung Phu Thê rất tốt, cung Phúc Đức rất tệ, thế là tan! Vợ chồng sẽ tan.”

**Vì vậy khi hợp bàn bắt buộc phải phân tích đồng thời của cả hai bên: Mệnh cung + Phu Thê cung + Phúc Đức cung**

---

### 2. Tiêu chuẩn đánh giá “thiên tác chi hợp”

**Mức tương hợp cao nhất (thiên tác chi hợp)**:
- Chính tinh cung Phu Thê của bên A = chính tinh Mệnh cung của bên B
- Chính tinh cung Phu Thê của bên B = chính tinh Mệnh cung của bên A
- Hai bên tương ứng với nhau thì là đôi trời định

**Mức hợp tốt thứ nhì**:
- Chính tinh cung Phu Thê của một bên = chính tinh Mệnh cung của đối phương (tương ứng một chiều)
- Ngũ hành tính sao Mệnh cung của hai bên tương sinh (như Mộc mệnh hợp Thổ mệnh, Thổ mệnh hợp Thủy mệnh)
- Đại hạn của hai bên cùng đi vận vượng

**Tổ hợp điềm hung**:
- Hai bên hóa Kỵ xung Mệnh cung của nhau (oan gia của nhau)
- Một bên hóa Kỵ phi nhập cung Phu Thê của bên kia (gây tổn hại hôn nhân cho đối phương)
- Cung Phu Thê của cả hai đều có sát nặng, không có cát tinh

---

### 3. Năm bước hợp bàn đầy đủ

**Bước 1: Đánh giá nền tảng mệnh cách của hai bên**
- Cách cục Mệnh cung của hai bên có xứng đôi không (cùng loại hay bổ sung cho nhau)
- Trọng điểm: sự phối hợp tính sao của Mệnh cung, Thân cung và Phúc Đức cung
- Cảnh giới: cả hai đều là cách Sát Phá Lang (hai hổ tranh nhau); hoặc một mạnh một yếu chênh lệch quá lớn

**Bước 2: Đối chiếu cung Phu Thê**
- Chính tinh cung Phu Thê của bên A có tương ứng với Mệnh cung hoặc sao tam hợp của bên B không?
- Chính tinh cung Phu Thê của bên B có tương ứng với Mệnh cung hoặc sao tam hợp của bên A không?
- Trạng thái tứ hóa riêng của cung Phu Thê mỗi bên (Hóa Lộc, Hóa Kỵ ảnh hưởng lớn nhất)

**Bước 3: Phân tích tinh tượng Thái Dương, Thái Âm**
- Mệnh nữ: Thái Dương đại diện cho chồng; Thái Dương miếu vượng = vượng phu, hãm địa hóa Kỵ = khắc phu
- Mệnh nam: Thái Âm đại diện cho vợ; Thái Âm miếu vượng = vợ đẹp hiền, hóa Kỵ = mẹ chồng nàng dâu bất hòa
- Trạng thái của hai sao này trong lá số của hai bên ảnh hưởng trực tiếp đến chất lượng hôn nhân

**Bước 4: Đối chiếu phi hóa tứ hóa (kỹ thuật nâng cao)**
- Thiên can năm sinh của bên A → tìm các sao tứ hóa → những sao này rơi vào cung nào trong lá số của bên B
  - Hóa Lộc phi nhập Mệnh cung hoặc Tài Bạch cung của bên B: có lợi tích cực cho bên B
  - Hóa Kỵ phi nhập cung Phu Thê của bên B: gây tổn hại hôn nhân cho bên B
  - Hóa Kỵ phi nhập Mệnh cung của bên B: tự mình gây áp lực cho đối phương
- Thiên can năm sinh của bên B → phân tích phi hóa ngược lại cho bên A
- Hình thành “phi hóa đối chiếu” để phán đoán “loại duyên phận” hai chiều

**Bước 5: Phân tích đại hạn đồng bộ**
- Đại hạn hiện tại của hai bên có cùng đi vận vượng không: cùng vượng = thời cơ tốt nhất, cùng suy = cùng thử thách
- Một bên vượng một bên suy: cần chủ động cân bằng trạng thái hai bên
- Tam hợp phương lưu niên có nhiều đào hoa tinh tụ tập: năm đó là thời điểm tốt để kết hôn

---

### 4. Phán đoán loại duyên phận

| Loại hóa duyên | Đặc trưng |
|---------|---------|
| Hóa Lộc dẫn động | Chính duyên, tình yêu thật, tình cảm ngọt ngào thuận lợi |
| Hóa Quyền dẫn động | Tình cảm chủ động giành lấy, có sức căng, có bên làm chủ |
| Hóa Khoa dẫn động | Duyên sống hòa hợp, tôn trọng lẫn nhau, kiểu đầu bạc răng long |
| Hóa Kỵ dẫn động | Nghịch duyên, oan gia, hai bên giày vò nhau nhưng khó chia lìa, cần tu hành mới hóa giải được |
| Hai bên cùng hóa Kỵ cho nhau | Kiểu “oan gia ngõ hẹp”, tình cảm mãnh liệt nhưng khổ đau song hành, kiểu nợ kiếp trước |

---

### 5. Ba tầng phán đoán thời điểm kết hôn

**Tầng 1: Cách cục bản mệnh**
- Cung Phu Thê không có sát: nên kết hôn sớm
- Cung Phu Thê có sát không có cát: nên kết hôn muộn (nam từ 30 tuổi trở lên, nữ từ 27 tuổi trở lên)
- Vũ Khúc, Liêm Trinh, Thất Sát, Phá Quân ở cung Phu Thê: nhất loạt khuyên nên kết hôn muộn

**Tầng 2: Đại hạn**
- Cung Phu Thê của đại hạn có nhiều cát tinh: mười năm đó có cơ hội kết hôn
- Cung Phu Thê của đại hạn hóa Kỵ: mười năm đó tình cảm bị cản trở

**Tầng 3: Lưu niên**
- Hồng Loan, Thiên Hỷ nhập Mệnh cung hoặc cung Phu Thê: năm đó chuyện yêu đương, hôn nhân có động
- Cung vị lưu niên rơi vào cung Phu Thê: năm đó hôn nhân là trọng điểm
- Tam hợp phương lưu niên tụ nhiều đào hoa tinh: năm đó nhiều cơ hội tình cảm

---

### 6. Tình huống kết hôn theo từng cung

| Cung vị lưu niên | Tình huống kết hôn |
|---------|---------|
| Cung Phu Thê | Tình cảm phát triển bình thường rồi kết hôn |
| Mệnh cung | Chính mình chủ động ra tay để kết hôn |
| Cung Tử Nữ | Cưới vì có con (lên xe trước, mua vé sau) |
| Cung Điền Trạch | Kết hôn vì lý do gia đình, nhà đất |
| Cung Phụ Mẫu | Theo lệnh cha mẹ, do bậc trưởng bối giới thiệu |

---

### 7. Dấu hiệu cụ thể của khắc phu, khắc thê

**Mệnh khắc phu (không theo nghĩa truyền thống) theo định nghĩa của Nghê sư**:
> “Cô gái khắc phu là người vợ đi phía trước, người chồng đi phía sau mồ hôi nhễ nhại xách đủ thứ túi to túi nhỏ và trả tiền, khó khăn lắm mới đợi được xe, người chồng còn phải mở cửa xe cho vợ. Đó gọi là khắc phu.”
> “Vượng phu là người vợ khiến chồng hoàn toàn không phải lo lắng gì phía sau.”

**Dấu hiệu cụ thể**:
- Cung Phu Thê có Liêm Trinh kèm Tham Lang, Phá Quân hoặc Thất Sát (tổ hợp tam hung)
- Thái Dương hãm địa hóa Kỵ (mệnh nữ)
- Thái Âm hóa Kỵ (mệnh nam)
- Cung Phu Thê có đủ tứ sát, không có cát tinh
- Quả Tú, Cô Thần nhập Mệnh cung hoặc cung Phu Thê
- Cung Phúc Đức có Phá Quân hãm địa kèm Liêm Trinh bình (cách đắp mộ giữa dòng nước)

---

### 8. Phán đoán hợp bàn cho hợp tác sự nghiệp

**Cung vị tham khảo chính**:
- Cung Quan Lộc: tính sao cung sự nghiệp của hai bên có tương thích không
- Cung Huynh Đệ (cung Nô Bộc): đại diện cho quan hệ hùn vốn
- Cung Phúc Đức: có thể chia ngọt sẻ bùi hay không

**Điềm tốt khi hợp tác sự nghiệp**:
- Mệnh cung hai bên bổ sung cho nhau (một người mưu, một người làm)
- Cung Quan Lộc của một bên hóa Lộc phi nhập cung Quan Lộc của bên kia
- Cung Huynh Đệ có Lộc Tồn, không bị Hóa Kỵ xung

**Điềm xấu khi hợp tác sự nghiệp**:
- Hai bên hóa Kỵ xung nhau vào cung Quan Lộc
- Mệnh cung đối phương hóa Kỵ phi nhập cung Tài Bạch của mình (đối phương tiêu hao tiền của mình)
- Cự Môn ở cung Huynh Đệ hoặc Nô Bộc: Nghê sư nói: “Cự Môn ở cung bạn bè, nghĩa là hùn vốn với bạn thì bạn thành thù”

---

### 9. Các loại tương vị tình cảm (phán đoán nhanh tính tương hợp của mệnh cách)

| Tổ hợp hai bên | Tương hợp | Giải thích |
|---------|-------|------|
| Tử Vi + Thiên Phủ | ★★★★★ | Đế tinh gặp kho tài, thành toàn cho nhau, ổn định nhất |
| Thiên Tướng + sao bất kỳ | ★★★★ | Ấn tinh phụ tá, Thiên Tướng thích ứng mạnh |
| Thiên Lương + Thiên Đồng | ★★★★ | Chín chắn và ôn hòa bổ sung nhau, kiểu đầu bạc răng long |
| Thái Dương + Thái Âm | ★★★★ | Nhật Nguyệt tịnh minh, bổ sung kinh điển, âm dương điều hòa |
| Thất Sát + Thất Sát | ★★ | Hai hổ tranh nhau, tia lửa lớn, mâu thuẫn nhiều |
| Phá Quân + Phá Quân | ★★ | Song phá, phá hoại lẫn nhau, hôn nhân bất ổn |
| Liêm Trinh + Thất Sát hoặc Phá Quân | ★ | Hai trong ba tổ hợp tam hung, nguy cơ sinh ly tử biệt cao nhất |
| Sát Phá Lang + Cơ Nguyệt Đồng Lương | ★★★ | Động tĩnh bổ sung, nhưng cần mài giũa, một bên khai phá một bên giữ thành |
| Tử Vi Phá Quân + Liêm Trinh Thiên Phủ | ★★★★ | Cách cục tương đương, hút nhau |
| Vũ Khúc + Thiên Đồng | ★★★ | Cương nhu tương tế, Vũ Khúc thu liễm gặp Thiên Đồng ôn hòa, bổ sung được cho nhau |

---

### 10. Tổng hợp những câu nói cốt lõi về hợp bàn của Nghê Hải Hạ

1. **“Xem hôn nhân mà chỉ xem cung Phu Thê là sai lớn, nhất định phải xem đồng thời cung Phúc Đức.”**
2. **“Liêm Trinh Tham Lang hoặc Liêm Trinh Phá Quân ở cung Phu Thê, bất kể mệnh nam hay mệnh nữ, không sinh ly thì cũng tử biệt.”**
3. **“Liêm Trinh Thất Sát — chôn xác giữa đường; Liêm Trinh Phá Quân — đắp mộ giữa dòng nước; Liêm Trinh Tham Lang — chết yểu.”**
4. **“Thái Dương hóa Kỵ, trên không thấy cha, dưới không thấy con, giữa không thấy chồng.” (mười năm đó mệnh nữ người phối ngẫu gặp tai họa lớn)**
5. **“Mệnh đàn ông, sợ nhất Thái Âm hóa Kỵ, mẹ chồng nàng dâu bất hòa, vợ với mẹ nhất định không hợp nhau.”**
6. **“Vượng phu là người vợ khiến chồng hoàn toàn không phải lo lắng gì phía sau; khắc phu là tình cảm quá tốt, hoàn toàn lấy đối phương làm trung tâm.”**
7. **“Cự Môn ở cung bạn bè, hùn vốn với bạn thì bạn thành thù.”**
8. **“Nếu bạn cưới vợ có Thất Sát nhập mệnh, thì coi như hỏng gần một nửa rồi, rất mệt, cỏ cây đều là địch.”**
`;

// ─── 婚姻判断辅助表 ───────────────────────────────────────

export const MARRIAGE_STARS_BRIEF: Record<string, string> = {
  '红鸾': 'Chính duyên yêu đương, nhập Mệnh hoặc Thân thì chủ động kết hôn; lưu niên gặp Hồng Loan thì năm đó chuyện yêu đương, hôn nhân có động',
  '天喜': 'Hỷ sự hôn nhân, cùng Hồng Loan dẫn động lẫn nhau, chủ tin vui đến',
  '天姚': 'Đào hoa tài nghệ, cơ hội tình cảm; trong yêu đương gặp Thiên Diêu dễ có cuộc gặp gỡ lãng mạn',
  '咸池': 'Đào hoa mạnh, cẩn thận rối rắm tình cảm; gặp Tham Lang thì đào hoa vượng nhất',
  '孤辰': 'Sao cô khắc, mệnh nam nhập Mệnh cung chủ độc lập tốt, nhưng nhập cung Phu Thê chủ duyên mỏng',
  '寡宿': 'Sao cô khắc, mệnh nữ nhập Mệnh hoặc cung Phu Thê, chủ hôn nhân không thuận, gần ít xa nhiều',
  '天哭': 'Cô khắc hình thương, nhập cung Phu Thê chủ người phối ngẫu gặp tai họa lớn',
  '天虚': 'Sao hao hụt, nhập cung Phu Thê chủ tình cảm hao hụt',
  '天巫': 'Kết hôn muộn, di sản, tôn giáo; nhập cung Phu Thê chủ kết hôn muộn là tốt, kết hôn sớm nhiều trắc trở',
};

export const HEMING_SCORE_CRITERIA = {
  '五星': 'Cung Phu Thê của hai bên chiếu nhau thành thiên tác chi hợp, tứ hóa bổ ích lẫn nhau, đại hạn cùng đi vận vượng, cung Phúc Đức hai bên đều cát',
  '四星': 'Cung Phu Thê của một bên tương ứng Mệnh cung của đối phương, tứ hóa chủ yếu là Lộc và Khoa, nền tảng tình cảm vững chắc',
  '三星': 'Mệnh cách xứng nhau nhưng mỗi bên có góc cạnh, cần mài giũa, về lâu dài thì ổn định',
  '二星': 'Cung Phu Thê mỗi bên có sát tinh, hóa Kỵ có xung, tình cảm thăng trầm lớn, cần hai bên chủ động vun đắp',
  '一星': 'Hung tinh hội tụ ở cung Phu Thê, hoặc tổ hợp tam hung của Liêm Trinh, nguy cơ sinh ly tử biệt cao',
};
