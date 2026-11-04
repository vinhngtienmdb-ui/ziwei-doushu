/**
 * 紫微斗数格局识别（v2 严格化版本）
 *
 * 设计原则：
 * 1. 古书条件优先：每个格局列出"必须 / 加分 / 破格"三层结构，出处可考
 * 2. 倪师立场：不使用宫干自化、大限四化、来因宫等飞星派工具
 * 3. 庙旺利陷：用 brightness 字段（bright=庙旺、normal=平、dim=陷）
 * 4. 三方四正会照：命宫 + 财帛 + 官禄 + 迁移
 * 5. 夹宫：命宫前后两宫
 *
 * 主要古籍出处：
 *  - 《紫微斗数全集》（陈抟祖师传，明代刊本）
 *  - 《紫微斗数全书》（罗洪先编，明代刊本）
 *  - 《骨髓赋》《女命骨髓赋》《十二宫诸星得地合格诀》
 *  - 倪师《天纪》紫微斗数讲义
 */

import type { ZiweiChart, Palace, Star, SiHua } from './types';
import { tenSao, tenDiaChi } from './thuat-ngu';

const KH = { kemChuHan: false } as const;

// ────────────────── 类型 ──────────────────
export interface PatternCondition {
  required: string[];   // 必须满足条件（已通过的）
  bonus?: string[];     // 加分项（已触发）
  breaking?: string[];  // 破格警示（已触发）
}

export interface Pattern {
  name: string;
  level: 'excellent' | 'good' | 'neutral' | 'caution';
  description: string;
  palaces: string[];                 // 涉及宫位
  conditions?: PatternCondition;     // 成立条件分层（v2 新增）
  source?: string;                   // 古籍出处（v2 新增）
}

// ────────────────── 常量 ──────────────────
const SHA_NAMES = ['擎羊', '陀罗', '火星', '铃星', '地空', '地劫'];
const SHA_HARD = ['擎羊', '陀罗', '火星', '铃星'];   // 四煞
const SHA_KONG = ['地空', '地劫'];                  // 空劫
const ZUO_YOU = ['左辅', '右弼'];
const CHANG_QU = ['文昌', '文曲'];
const KUI_YUE = ['天魁', '天钺'];

// ────────────────── 辅助函数 ──────────────────
function getMajorStarNames(palace: Palace): string[] {
  return palace.stars.filter(s => s.type === 'major').map(s => s.name);
}
function findStar(palace: Palace, name: string): Star | undefined {
  return palace.stars.find(s => s.name === name);
}
function hasStar(palace: Palace, name: string): boolean {
  return palace.stars.some(s => s.name === name);
}
function findStarPalace(chart: ZiweiChart, name: string): Palace | undefined {
  return chart.palaces.find(p => p.stars.some(s => s.name === name));
}
function getPalaceByBranch(chart: ZiweiChart, branch: number): Palace | undefined {
  return chart.palaces.find(p => p.branch === ((branch % 12) + 12) % 12);
}
function shaCountInPalace(palace: Palace, list: string[] = SHA_HARD): number {
  return palace.stars.filter(s => list.includes(s.name)).length;
}
function hasShaInPalace(palace: Palace, list: string[] = SHA_NAMES): boolean {
  return palace.stars.some(s => list.includes(s.name));
}
function getSanFangPalaces(chart: ZiweiChart): Palace[] {
  const m = chart.mingGongBranch;
  const branches = [m, (m + 4) % 12, (m + 8) % 12, (m + 6) % 12];
  return chart.palaces.filter(p => branches.includes(p.branch));
}
function isInSanFang(chart: ZiweiChart, branch: number): boolean {
  const m = chart.mingGongBranch;
  return [m, (m + 4) % 12, (m + 8) % 12, (m + 6) % 12].includes(branch);
}
function getDuiGong(chart: ZiweiChart, branch: number): Palace | undefined {
  return getPalaceByBranch(chart, (branch + 6) % 12);
}
function getJiaPalaces(chart: ZiweiChart, branch: number): { prev?: Palace; next?: Palace } {
  return {
    prev: getPalaceByBranch(chart, (branch + 11) % 12),
    next: getPalaceByBranch(chart, (branch + 1) % 12),
  };
}
function sanFangAllStars(chart: ZiweiChart): Set<string> {
  return new Set(getSanFangPalaces(chart).flatMap(p => p.stars.map(s => s.name)));
}
function sanFangShaCount(chart: ZiweiChart, list: string[] = SHA_HARD): number {
  return getSanFangPalaces(chart).reduce((sum, p) => sum + shaCountInPalace(p, list), 0);
}
function isBright(palace: Palace, starName: string): boolean {
  const s = findStar(palace, starName);
  return s?.brightness === 'bright';
}
function isDim(palace: Palace, starName: string): boolean {
  const s = findStar(palace, starName);
  return s?.brightness === 'dim';
}
function getStarSiHua(palace: Palace, starName: string): Star['siHua'] | undefined {
  return findStar(palace, starName)?.siHua;
}
// 四化挂在星曜的 siHua 字段上，不是独立星名——不能用 hasStar / sanFangAllStars 查「化禄」
function palaceHasSiHua(palace: Palace, hua: SiHua): boolean {
  return palace.stars.some(s => s.siHua === hua);
}
function sanFangHasSiHua(chart: ZiweiChart, hua: SiHua): boolean {
  return getSanFangPalaces(chart).some(p => palaceHasSiHua(p, hua));
}


// ────────────────── 正格识别器 ──────────────────

/** 君臣庆会：紫微入命，左辅右弼同会（同宫或三方） */
function detectJunChenQingHui(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (!hasStar(ming, '紫微')) return;
  const sanFangSet = sanFangAllStars(chart);
  const hasZuo = sanFangSet.has('左辅');
  const hasYou = sanFangSet.has('右弼');
  if (!hasZuo || !hasYou) return;

  const required = ['Tử Vi nhập Mệnh', 'Tả Phù, Hữu Bật đồng hội tam phương tứ chính'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangSet.has('文昌') || sanFangSet.has('文曲')) bonus.push('Lại hội Văn Xương hoặc Văn Khúc');
  if (sanFangSet.has('天魁') || sanFangSet.has('天钺')) bonus.push('Khôi Việt quý nhân chiếu thêm');
  if (getStarSiHua(ming, '紫微') === '权') bonus.push('Tử Vi hóa Quyền');
  if (sanFangShaCount(chart, SHA_KONG) >= 2) breaking.push('Địa Không, Địa Kiếp cùng giáp hội chiếu (Tử Vi kỵ Không Kiếp)');

  patterns.push({
    name: 'Quân Thần Khánh Hội (君臣庆会)',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Tử Vi nhập Mệnh, Tả Phù Hữu Bật đồng hội, như đế vương được hiền thần phò tá, chủ đại phú đại quý, mệnh thống lĩnh. Cả đời quý nhân không dứt, nên theo con đường chức vị cao trong chính trường, thương trường hoặc làm lãnh đạo liên ngành.',
    palaces: ['命宫'],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Quân Thần Khánh Hội cách» (紫微斗数全书·君臣庆会格)',
  });
}

/** 紫府同宫：紫微+天府于命宫（限寅、申宫） */
function detectZiFu(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const ziwei = findStarPalace(chart, '紫微');
  const tianfu = findStarPalace(chart, '天府');
  if (!ziwei || !tianfu || ziwei.branch !== tianfu.branch) return;

  const inMing = ziwei.branch === chart.mingGongBranch;
  const required = inMing
    ? ['Tử Vi, Thiên Phủ cùng nhập Mệnh cung']
    : ['Tử Vi, Thiên Phủ đồng cung (không ở Mệnh cung, hội chiếu giảm lực)'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  const sanFangSet = sanFangAllStars(chart);
  if (sanFangSet.has('左辅') && sanFangSet.has('右弼')) bonus.push('Tả Phù, Hữu Bật đồng hội');
  if (sanFangSet.has('文昌') || sanFangSet.has('文曲')) bonus.push('Lại hội Xương Khúc');
  if (hasShaInPalace(ziwei, SHA_KONG)) breaking.push('Cung Tử Phủ tọa Không Kiếp (phá quý khí của Tử Phủ)');
  if (shaCountInPalace(ziwei, SHA_HARD) >= 2) breaking.push('Cung Tử Phủ gặp hai sát tinh cùng tọa');

  patterns.push({
    name: 'Tử Phủ đồng cung (紫府同宫)',
    level: inMing && !breaking.length ? 'excellent' : 'good',
    description: inMing
      ? 'Tử Vi, Thiên Phủ cùng nhập Mệnh cung, đế và tướng cùng đến, mệnh tôn quý. Chủ phẩm hạnh đoan chính, cơm áo không lo, có tài lãnh đạo, nên đảm nhiệm chức vụ quan trọng. Cần Tả Phù Hữu Bật phối hợp mới thành đại cách trọn vẹn.'
      : 'Tử Vi, Thiên Phủ đồng cung nhưng không tọa Mệnh, chủ cả đời có quý nhân và quý khí nương tựa, nhưng bản thân chưa chắc đại phú quý, cần xem các cát sát tinh hội chiếu để định.',
    palaces: [ziwei.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tử Phủ đồng cung cách» (紫微斗数全书·紫府同宫格)',
  });
}

/** 府相朝垣：天府、天相分别坐守命宫的三方四正 */
function detectFuXiangChaoYuan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const tianfu = findStarPalace(chart, '天府');
  const tianxiang = findStarPalace(chart, '天相');
  if (!tianfu || !tianxiang) return;
  if (!isInSanFang(chart, tianfu.branch) || !isInSanFang(chart, tianxiang.branch)) return;
  if (tianfu.branch === chart.mingGongBranch && tianxiang.branch === chart.mingGongBranch) return;
  if (tianfu.branch === tianxiang.branch) return;

  const required = ['Thiên Phủ tọa tam phương của Mệnh', 'Thiên Tướng tọa tam phương của Mệnh', 'Hai sao không đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (hasStar(ming, '禄存') || palaceHasSiHua(ming, '禄')) bonus.push('Mệnh cung thấy Lộc');
  if (sanFangAllStars(chart).has('左辅')) bonus.push('Lại hội Tả Phù');
  if (hasShaInPalace(ming, SHA_HARD)) breaking.push('Mệnh cung tọa sát tinh');
  if (sanFangShaCount(chart, SHA_HARD) >= 3) breaking.push('Tam phương tứ chính quá nhiều sát tinh');

  patterns.push({
    name: 'Phủ Tướng triều viên (府相朝垣)',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thiên Phủ, Thiên Tướng phân thủ tam phương tứ chính của Mệnh cung, văn võ song toàn, quyền ấn cùng sáng, chủ cả đời cơm áo đầy đủ, địa vị cao. Sách xưa nói "Phủ Tướng triều viên, thiên chung thực lộc", thường gặp ở giới chính trị và nhà quản lý doanh nghiệp.',
    palaces: [tianfu.name, tianxiang.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Phủ Tướng triều viên cách» (紫微斗数全书·府相朝垣格)',
  });
}

/** 阳梁昌禄：太阳+天梁+文昌+禄存四星会命宫，大贵格 */
function detectYangLiangChangLu(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('太阳') || !sanFangSet.has('天梁') ||
      !sanFangSet.has('文昌') || !sanFangSet.has('禄存')) return;

  const sun = findStarPalace(chart, '太阳')!;
  const liang = findStarPalace(chart, '天梁')!;
  const required = [
    'Thái Dương hội tam phương của Mệnh',
    'Thiên Lương hội tam phương của Mệnh',
    'Văn Xương hội tam phương của Mệnh',
    'Lộc Tồn hội tam phương của Mệnh',
  ];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (isBright(sun, '太阳')) bonus.push('Thái Dương miếu vượng');
  if (isBright(liang, '天梁')) bonus.push('Thiên Lương miếu vượng');
  if (sanFangHasSiHua(chart, '科')) bonus.push('Lại hội hóa Khoa');
  if (isDim(sun, '太阳')) breaking.push('Thái Dương lạc hãm (Dương Lương mất sáng)');
  if (sanFangShaCount(chart, SHA_HARD) >= 2) breaking.push('Tam phương sát nặng');

  patterns.push({
    name: 'Dương Lương Xương Lộc (阳梁昌禄)',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thái Dương, Thiên Lương, Văn Xương, Lộc Tồn bốn sao cùng hội tam phương của Mệnh, gọi là "sao khoa cử", chủ thanh quý hiển đạt, vận thi cử rất tốt, nên theo con đường học thuật, giáo dục, nghiên cứu, chứng chỉ chuyên môn, cả đời công danh dễ thành.',
    palaces: [sun.name, liang.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Dương Lương Xương Lộc cách» (紫微斗数全书·阳梁昌禄格)',
  });
}

/** 火贪格 / 铃贪格：贪狼+火星 或 贪狼+铃星 同宫或会照 */
function detectHuoTanLingTan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const tan = findStarPalace(chart, '贪狼');
  if (!tan) return;
  const huo = findStarPalace(chart, '火星');
  const ling = findStarPalace(chart, '铃星');

  for (const [shaName, shaPalace] of [['火星', huo], ['铃星', ling]] as const) {
    if (!shaPalace) continue;
    const sameOrTrine =
      tan.branch === shaPalace.branch ||
      (tan.branch + 4) % 12 === shaPalace.branch ||
      (tan.branch + 8) % 12 === shaPalace.branch ||
      (tan.branch + 6) % 12 === shaPalace.branch;
    if (!sameOrTrine) continue;
    if (!isInSanFang(chart, tan.branch)) continue;

    const required = [`Tham Lang ${tan.branch === shaPalace.branch ? 'đồng cung' : 'hội chiếu'} ${tenSao(shaName, KH)}`, 'Tham Lang hội chiếu tam phương của Mệnh'];
    const bonus: string[] = [];
    const breaking: string[] = [];
    if (isBright(tan, '贪狼')) bonus.push('Tham Lang miếu vượng');
    if (getStarSiHua(tan, '贪狼') === '禄' || getStarSiHua(tan, '贪狼') === '权') bonus.push('Tham Lang hóa Lộc / hóa Quyền');
    if (hasShaInPalace(tan, ['擎羊', '陀罗'])) breaking.push('Cung Tham Lang lại gặp Dương Đà (phá lực hoạnh phát)');
    if (hasShaInPalace(tan, SHA_KONG)) breaking.push('Tham Lang gặp Không Kiếp (của đến rồi đi)');

    patterns.push({
      name: shaName === '火星' ? 'Hỏa Tham cách (火贪格)' : 'Linh Tham cách (铃贪格)',
      level: breaking.length ? 'good' : 'excellent',
      description: `Tham Lang gặp ${tenSao(shaName, KH)} ${tan.branch === shaPalace.branch ? 'đồng cung' : 'tam phương hội chiếu'}, chủ phát tài bất ngờ, cơ hội đến đột ngột. Sách xưa nói “Tham Lang gặp Hỏa Linh, tất phát hoạnh tài”, nhưng đến nhanh đi cũng nhanh, nên biết dừng đúng lúc. ${breaking.length ? 'Điều kiện phá cách của lá số này đã bị kích hoạt, lực phát giảm.' : ''}`,
      palaces: [tan.name, shaPalace.name],
      conditions: { required, bonus, breaking },
      source: '«Tử Vi Đẩu Số Cốt Tuỷ Phú» (紫微斗数骨髓赋)',
    });
  }
}

/** 武贪格：武曲+贪狼 同宫（丑、未） 或 对照 */
function detectWuTan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const wu = findStarPalace(chart, '武曲');
  const tan = findStarPalace(chart, '贪狼');
  if (!wu || !tan) return;
  const sameOrOppose = wu.branch === tan.branch || (wu.branch + 6) % 12 === tan.branch;
  if (!sameOrOppose) return;
  if (!isInSanFang(chart, wu.branch) && !isInSanFang(chart, tan.branch)) return;

  const required = [
    wu.branch === tan.branch ? 'Vũ Khúc, Tham Lang đồng cung (Sửu/Mùi)' : 'Vũ Khúc, Tham Lang đối cung củng chiếu',
    'Hội chiếu tam phương của Mệnh',
  ];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('火星') || sanFangAllStars(chart).has('铃星'))
    bonus.push('Lại gặp Hỏa Tinh / Linh Tinh (Hỏa Tham / Linh Tham chồng lên nhau)');
  if (getStarSiHua(wu, '武曲') === '禄') bonus.push('Vũ Khúc hóa Lộc');
  if (hasShaInPalace(wu, ['擎羊', '陀罗'])) breaking.push('Cung Vũ Tham thấy Dương Đà');
  if (hasShaInPalace(wu, SHA_KONG)) breaking.push('Cung Vũ Tham gặp Không Kiếp');

  patterns.push({
    name: 'Vũ Tham cách (武贪格)',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Vũ Khúc, Tham Lang hội Mệnh, sao tài và sao đào hoa dục vọng cùng sáng; sách xưa nói "Vũ Tham bất phát thiếu niên nhân" — sau ba mươi tuổi mới tích lũy dày rồi bùng phát. Chủ trung niên về sau đại phú đại quý, nguồn tài đến từ quan hệ, xã giao, quản lý dục vọng; hợp tài chính, đầu cơ, bán hàng, giải trí.',
    palaces: [wu.name, tan.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Cốt Tuỷ Phú» (紫微斗数骨髓赋)',
  });
}

/** 杀破狼：七杀、破军、贪狼三方齐聚 */
function detectShaPoLang(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  const has = ['七杀', '破军', '贪狼'].filter(s => sanFangSet.has(s));
  if (has.length < 3) return;

  const required = ['Thất Sát, Phá Quân, Tham Lang ba sao cùng vào tam phương tứ chính của Mệnh'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangHasSiHua(chart, '禄') || sanFangHasSiHua(chart, '权')) bonus.push('Tam phương có hóa Lộc hoặc hóa Quyền (động có sức)');
  if (sanFangSet.has('左辅') && sanFangSet.has('右弼')) bonus.push('Phụ Bật đồng hội (trong biến động gặp quý nhân)');
  if (sanFangShaCount(chart, SHA_HARD) >= 3) breaking.push('Sát tinh quá nặng (động mà không thành)');
  if (hasShaInPalace(ming, SHA_KONG)) breaking.push('Mệnh tọa Không Kiếp (động mà vất vả)');

  patterns.push({
    name: 'Sát Phá Lang (杀破狼)',
    level: breaking.length ? 'caution' : 'good',
    description: 'Thất Sát, Phá Quân, Tham Lang ba sao hội Mệnh, mệnh cách khai sáng, xông pha. Cả đời nhiều biến động, không cam bình thường, nên khởi nghiệp, quân cảnh, kinh doanh, bán hàng. Trung niên về sau mới ổn định giữ nghiệp, thuở trẻ dễ thất bại vì bốc đồng.',
    palaces: getSanFangPalaces(chart).filter(p => has.includes(getMajorStarNames(p)[0])).map(p => p.name),
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Sát Phá Lang» (紫微斗数全书·杀破狼)',
  });
}

/** 机月同梁：天机、太阴、天同、天梁四星齐入命迁财官 */
function detectJiYueTongLiang(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  const has = ['天机', '太阴', '天同', '天梁'].filter(s => sanFangSet.has(s));
  if (has.length < 4) return;

  const required = ['Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng vào tam phương tứ chính của Mệnh'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangSet.has('文昌') || sanFangSet.has('文曲')) bonus.push('Lại hội Xương Khúc');
  if (sanFangHasSiHua(chart, '科')) bonus.push('Lại hội hóa Khoa');
  if (sanFangShaCount(chart, SHA_HARD) >= 3) breaking.push('Sát tinh quá nhiều (Cơ Nguyệt Đồng Lương kỵ sát)');
  if (hasShaInPalace(ming, SHA_HARD)) breaking.push('Mệnh cung tọa sát');

  patterns.push({
    name: 'Cơ Nguyệt Đồng Lương (机月同梁)',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng vào Mệnh, Thiên Di, Tài Bạch, Quan Lộc: nho nhã, thông minh giỏi mưu tính. Hợp nhất với công chức, học thuật, văn nghệ, y tế, dịch vụ và các ngành cần tích lũy ổn định, không nên mạo hiểm hay đầu cơ lớn.',
    palaces: getSanFangPalaces(chart).filter(p => has.some(s => getMajorStarNames(p).includes(s))).map(p => p.name),
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Cơ Nguyệt Đồng Lương cách» (紫微斗数全书·机月同梁格)',
  });
}

/** 廉贞天相：同宫 */
function detectLianXiang(chart: ZiweiChart, patterns: Pattern[]) {
  const lian = findStarPalace(chart, '廉贞');
  const xiang = findStarPalace(chart, '天相');
  if (!lian || !xiang || lian.branch !== xiang.branch) return;

  const inMing = lian.branch === chart.mingGongBranch;
  const required = ['Liêm Trinh, Thiên Tướng đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (hasStar(lian, '禄存') || getStarSiHua(lian, '廉贞') === '禄') bonus.push('Thấy Lộc Tồn hoặc Liêm Trinh hóa Lộc');
  if (sanFangAllStars(chart).has('左辅')) bonus.push('Tả Phù hội chiếu');
  if (hasShaInPalace(lian, ['擎羊'])) breaking.push('Cung Liêm Tướng tọa Kình Dương (khuynh hướng Liêm Sát Dương)');
  if (getStarSiHua(lian, '廉贞') === '忌') breaking.push('Liêm Trinh hóa Kỵ');

  patterns.push({
    name: 'Liêm Trinh Thiên Tướng cách (廉贞天相格)',
    level: breaking.length ? 'caution' : (inMing ? 'good' : 'neutral'),
    description: 'Liêm Trinh, Thiên Tướng đồng cung, cách ấn thụ, chủ làm việc công bằng, nổi tiếng thanh liêm, nên làm công chức, quản lý hành chính, pháp vụ, kế hoạch. Sợ gặp Kình Dương hóa Kỵ, lúc đó lại chủ kiện tụng.',
    palaces: [lian.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 武曲七杀：同宫，将星配财星 */
function detectWuQiSha(chart: ZiweiChart, patterns: Pattern[]) {
  const wu = findStarPalace(chart, '武曲');
  const qi = findStarPalace(chart, '七杀');
  if (!wu || !qi || wu.branch !== qi.branch) return;

  const inMing = wu.branch === chart.mingGongBranch;
  const required = ['Vũ Khúc, Thất Sát đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (getStarSiHua(wu, '武曲') === '权') bonus.push('Vũ Khúc hóa Quyền');
  if (getStarSiHua(wu, '武曲') === '禄') bonus.push('Vũ Khúc hóa Lộc');
  if (getStarSiHua(wu, '武曲') === '忌') breaking.push('Vũ Khúc hóa Kỵ (Vũ Khúc hóa Kỵ là điềm bị cướp của)');
  if (hasShaInPalace(wu, ['擎羊', '陀罗', '火星', '铃星'])) breaking.push('Cung Vũ Sát quá nhiều sát tinh');

  patterns.push({
    name: 'Vũ Khúc Thất Sát (武曲七杀)',
    level: breaking.length ? 'caution' : (inMing ? 'excellent' : 'good'),
    description: 'Vũ Khúc, Thất Sát đồng cung, sao tướng phối sao tài, chủ quả quyết cương nghị, giỏi quản lý tiền bạc, hợp tài chính, quân cảnh, khởi nghiệp. Nhưng kỵ gặp hóa Kỵ và sát tinh, nếu không thì hung hiểm. Cả đời phấn đấu, tích của nhưng lao tâm.',
    palaces: [wu.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 天同天梁：同宫 */
function detectTongLiang(chart: ZiweiChart, patterns: Pattern[]) {
  const tong = findStarPalace(chart, '天同');
  const liang = findStarPalace(chart, '天梁');
  if (!tong || !liang || tong.branch !== liang.branch) return;

  const required = ['Thiên Đồng, Thiên Lương đồng cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('文昌')) bonus.push('Văn Xương hội chiếu');
  if (getStarSiHua(tong, '天同') === '禄') bonus.push('Thiên Đồng hóa Lộc');
  if (hasShaInPalace(tong, SHA_HARD)) breaking.push('Sát tinh cùng tọa');

  patterns.push({
    name: 'Thiên Đồng Thiên Lương cách (天同天梁格)',
    level: breaking.length ? 'neutral' : 'good',
    description: 'Thiên Đồng, Thiên Lương đồng cung, sao phúc cùng sao ấm, chủ rộng lượng hiền hòa, thích giúp người, nên làm y tế, giáo dục, tôn giáo, công ích xã hội. Nhưng thiên về ôn hòa bảo thủ, khó thành cục đại phú đại quý.',
    palaces: [tong.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 日月同宫：太阳太阴丑或未宫同宫 */
function detectRiYueTongGong(chart: ZiweiChart, patterns: Pattern[]) {
  const sun = findStarPalace(chart, '太阳');
  const moon = findStarPalace(chart, '太阴');
  if (!sun || !moon || sun.branch !== moon.branch) return;
  if (sun.branch !== 1 && sun.branch !== 7) return;  // 必须丑(1) 或 未(7)

  const inMing = sun.branch === chart.mingGongBranch;
  const required = [`Thái Dương, Thái Âm cùng nhập cung ${tenDiaChi(sun.branch)}`];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sun.branch === 7) bonus.push('Nhật Nguyệt đồng huy ở cung Mùi (sách xưa nói cung Mùi Nhật Nguyệt song mỹ)');
  if (sanFangAllStars(chart).has('文昌') && sanFangAllStars(chart).has('文曲')) bonus.push('Xương Khúc hội chiếu');
  if (hasShaInPalace(sun, SHA_HARD)) breaking.push('Cung Nhật Nguyệt có sát tinh cùng tọa');

  patterns.push({
    name: 'Nhật Nguyệt đồng cung (日月同宫)',
    level: breaking.length ? 'good' : (inMing ? 'excellent' : 'good'),
    description: `Thái Dương, Thái Âm đồng cung ở cung ${tenDiaChi(sun.branch)}, âm dương cân bằng, văn võ song toàn. Chủ duyên với người khác giới tốt, sự nghiệp thuận lợi, danh tiếng lan xa. ${sun.branch === 7 ? 'Cung Mùi Nhật Nguyệt song mỹ càng tốt.' : 'Cung Sửu Nhật Nguyệt đồng cung, sức mạnh tương đối bình.'}`,
    palaces: [sun.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 日月夹命：太阳太阴在命宫前后两宫 */
function detectRiYueJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const prevHasSun = hasStar(prev, '太阳');
  const prevHasMoon = hasStar(prev, '太阴');
  const nextHasSun = hasStar(next, '太阳');
  const nextHasMoon = hasStar(next, '太阴');
  const ok = (prevHasSun && nextHasMoon) || (prevHasMoon && nextHasSun);
  if (!ok) return;

  const sunPalace = prevHasSun ? prev : next;
  const moonPalace = prevHasMoon ? prev : next;
  const required = ['Thái Dương, Thái Âm phân ở hai cung trước và sau Mệnh cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (isBright(sunPalace, '太阳')) bonus.push('Thái Dương miếu vượng');
  if (isBright(moonPalace, '太阴')) bonus.push('Thái Âm miếu vượng');
  if (isDim(sunPalace, '太阳') || isDim(moonPalace, '太阴')) breaking.push('Nhật Nguyệt lạc hãm (giáp Mệnh không sáng)');

  patterns.push({
    name: 'Nhật Nguyệt giáp Mệnh (日月夹命)',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Thái Dương, Thái Âm phân ở hai bên Mệnh cung giáp chiếu, quang minh lỗi lạc, cả đời được quý nhân giúp, sự nghiệp hưng thịnh. Nam chủ quan quý, nữ chủ vượng phu hưng gia. Nhật Nguyệt phải không lạc hãm mới là giáp thật.',
    palaces: [sunPalace.name, moonPalace.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Nhật Nguyệt giáp Mệnh» (紫微斗数全书·日月夹命)',
  });
}

/** 巨日同宫：巨门太阳同入寅或申 */
function detectJuRiTongGong(chart: ZiweiChart, patterns: Pattern[]) {
  const ju = findStarPalace(chart, '巨门');
  const sun = findStarPalace(chart, '太阳');
  if (!ju || !sun || ju.branch !== sun.branch) return;
  if (ju.branch !== 2 && ju.branch !== 8) return;  // 必须寅(2) 或 申(8)

  const inMing = ju.branch === chart.mingGongBranch;
  const required = [`Cự Môn, Thái Dương cùng nhập cung ${tenDiaChi(ju.branch)}`];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (ju.branch === 2) bonus.push('Thái Dương miếu vượng ở cung Dần, Cự Môn nhờ ánh mặt trời hóa giải thị phi');
  if (getStarSiHua(ju, '巨门') === '禄' || getStarSiHua(ju, '巨门') === '权') bonus.push('Cự Môn hóa Lộc / hóa Quyền (tài ăn nói sinh tiền)');
  if (getStarSiHua(ju, '巨门') === '忌') breaking.push('Cự Môn hóa Kỵ (khẩu thiệt, kiện tụng)');
  if (ju.branch === 8) breaking.push('Thái Dương ở cung Thân đã xế tây, ám diệu của Cự Môn càng rõ');

  patterns.push({
    name: 'Cự Nhật đồng cung (巨日同宫)',
    level: breaking.length ? 'caution' : (inMing && ju.branch === 2 ? 'excellent' : 'good'),
    description: `Cự Môn, Thái Dương đồng cung ở cung ${tenDiaChi(ju.branch)}, Thái Dương hóa giải ám diệu của Cự Môn, chủ lập nghiệp bằng tài ăn nói, truyền thông, ngoại ngữ, chuyên môn. Cung Dần là tốt, cung Thân giảm lực. Sợ Cự Môn hóa Kỵ thì kiện tụng.`,
    palaces: [ju.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Cự Nhật đồng cung» (紫微斗数全书·巨日同宫)',
  });
}

/** 石中隐玉：巨门入命于子午宫 */
function detectShiZhongYinYu(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (!hasStar(ming, '巨门')) return;
  if (ming.branch !== 0 && ming.branch !== 6) return;  // 子(0) 或 午(6)

  const required = [`Cự Môn nhập Mệnh ở cung ${tenDiaChi(ming.branch)}`];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (getStarSiHua(ming, '巨门') === '禄' || getStarSiHua(ming, '巨门') === '权') bonus.push('Cự Môn hóa Lộc / hóa Quyền');
  if (sanFangAllStars(chart).has('文昌')) bonus.push('Văn Xương hội chiếu (ngọc trong đá được sáng)');
  if (getStarSiHua(ming, '巨门') === '忌') breaking.push('Cự Môn hóa Kỵ (ngọc vùi bùn sâu)');
  if (hasShaInPalace(ming, SHA_HARD)) breaking.push('Mệnh tọa sát tinh');

  patterns.push({
    name: 'Thạch Trung Ẩn Ngọc (石中隐玉)',
    level: breaking.length ? 'caution' : 'excellent',
    description: 'Cự Môn tọa Mệnh ở Tý hoặc Ngọ, bề ngoài bình thường mà bên trong chứa tài học. Thuở nhỏ âm thầm không tiếng tăm, trung niên mới lộ quý khí, nên theo chuyên môn, nghiên cứu, ăn nói, truyền thông. Cần có Lộc Quyền hoặc Văn Xương giúp mới "đục đá thấy ngọc".',
    palaces: ['命宫'],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Cốt Tuỷ Phú · Thạch Trung Ẩn Ngọc» (紫微斗数骨髓赋·石中隐玉)',
  });
}

/** 明珠出海：命宫在未空宫，对宫丑宫为太阳太阴 */
function detectMingZhuChuHai(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (ming.branch !== 7) return;   // 命在未
  if (getMajorStarNames(ming).length > 0) return;   // 命宫为空宫
  const dui = getDuiGong(chart, ming.branch);
  if (!dui) return;
  if (!hasStar(dui, '太阳') || !hasStar(dui, '太阴')) return;

  const required = ['Mệnh cung ở Mùi là cung trống', 'Đối cung Sửu có Thái Dương, Thái Âm đồng độ'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('文昌') || sanFangAllStars(chart).has('文曲')) bonus.push('Lại hội Xương Khúc');
  if (sanFangAllStars(chart).has('左辅') || sanFangAllStars(chart).has('右弼')) bonus.push('Phụ Bật giúp sức');
  if (sanFangShaCount(chart, SHA_HARD) >= 2) breaking.push('Sát tinh hội chiếu (ánh châu mờ tối)');

  patterns.push({
    name: 'Minh Châu Xuất Hải (明珠出海)',
    level: breaking.length ? 'good' : 'excellent',
    description: 'Mệnh ở Mùi là cung trống, đối cung Sửu Nhật Nguyệt cùng sáng củng chiếu, gọi là "Minh Châu Xuất Hải". Chủ xuất thân bình thường, về sau nỗ lực mà nổi bật, nên đi xa xứ, nghiên cứu học thuật hoặc giữ chức cao ở công ty lớn, chủ đại phú đại quý.',
    palaces: ['命宫', dui.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Tập · Minh Châu Xuất Hải» (紫微斗数全集·明珠出海)',
  });
}

/** 紫微独坐入命 */
function detectZiWeiInMing(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (!hasStar(ming, '紫微') || hasStar(ming, '天府')) return;

  const required = ['Tử Vi độc tọa Mệnh cung (không có Thiên Phủ cùng tọa)'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  const sanFangSet = sanFangAllStars(chart);
  if (sanFangSet.has('左辅') && sanFangSet.has('右弼')) bonus.push('Tả Phù, Hữu Bật đồng hội');
  if (sanFangSet.has('文昌') && sanFangSet.has('文曲')) bonus.push('Văn Xương, Văn Khúc đồng hội');
  if (!sanFangSet.has('左辅') && !sanFangSet.has('右弼')) breaking.push('Không có Phụ Bật (vua cô độc không bề tôi)');
  if (hasShaInPalace(ming, SHA_KONG)) breaking.push('Tử Vi gặp Không Kiếp (sách xưa kỵ nhất)');

  patterns.push({
    name: 'Tử Vi nhập Mệnh (紫微入命)',
    level: breaking.length ? 'caution' : (bonus.length ? 'excellent' : 'good'),
    description: 'Tử Vi độc tọa Mệnh cung, sao đế vương, lòng tự trọng mạnh, có sức hút lãnh đạo. Nhưng Tử Vi kỵ nhất "vua cô độc ở nơi hoang dã" — nếu không có Tả Phù Hữu Bật hội chiếu, lại thành cao ngạo tự phụ, dễ bị chê bai.',
    palaces: ['命宫'],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 辅弼夹命 */
function detectFuBiJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const prevHasZuo = hasStar(prev, '左辅');
  const prevHasYou = hasStar(prev, '右弼');
  const nextHasZuo = hasStar(next, '左辅');
  const nextHasYou = hasStar(next, '右弼');
  if (!((prevHasZuo && nextHasYou) || (prevHasYou && nextHasZuo))) return;

  const required = ['Tả Phù, Hữu Bật phân ở hai cung trước và sau Mệnh cung'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('天魁') || sanFangAllStars(chart).has('天钺')) bonus.push('Lại hội Khôi Việt');

  patterns.push({
    name: 'Phụ Bật giáp Mệnh (辅弼夹命)',
    level: 'excellent',
    description: 'Tả Phù Hữu Bật giáp Mệnh, lý luận truyền thống cho rằng cách này tượng trưng quý nhân giúp đỡ và phúc dày. Hợp với con đường quan trường, quản lý doanh nghiệp lớn, những hướng phát huy được tài tổ chức. Sách xưa nói "Tả Phù Hữu Bật, chung thân phúc hậu" — nhấn mạnh ưu thế của cách này trong việc phối hợp tổ chức.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required, bonus, breaking },
    source: '«Tử Vi Đẩu Số Toàn Thư · Phụ Bật giáp Mệnh» (紫微斗数全书·辅弼夹命)',
  });
}

/** 昌曲夹命 */
function detectChangQuJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const prevHasChang = hasStar(prev, '文昌');
  const prevHasQu = hasStar(prev, '文曲');
  const nextHasChang = hasStar(next, '文昌');
  const nextHasQu = hasStar(next, '文曲');
  if (!((prevHasChang && nextHasQu) || (prevHasQu && nextHasChang))) return;

  patterns.push({
    name: 'Xương Khúc giáp Mệnh (昌曲夹命)',
    level: 'excellent',
    description: 'Văn Xương Văn Khúc giáp Mệnh cung, chủ thông minh tuấn tú, văn chương rực rỡ, nên theo giáo dục, học thuật, nghệ thuật, viết lách. Sách xưa nói "Xương Khúc giáp Mệnh chủ khoa giáp", lợi nhất cho vận thi cử.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Văn Xương, Văn Khúc phân ở hai cung trước và sau Mệnh cung'] },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 魁钺夹命 */
function detectKuiYueJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const okA = hasStar(prev, '天魁') && hasStar(next, '天钺');
  const okB = hasStar(prev, '天钺') && hasStar(next, '天魁');
  if (!okA && !okB) return;

  patterns.push({
    name: 'Khôi Việt giáp Mệnh (魁钺夹命)',
    level: 'good',
    description: 'Thiên Khôi Thiên Việt giáp Mệnh, nam gọi Thiên Ất, nữ gọi Ngọc Đường, cả đời có quý nhân nâng đỡ. Khi thi cử, xin việc, những lúc then chốt thường có quý nhân bất ngờ giúp đỡ.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Thiên Khôi, Thiên Việt phân ở hai cung trước và sau Mệnh cung'] },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 双禄朝垣：化禄 + 禄存 同会三方 */
function detectShuangLuChaoYuan(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFang = getSanFangPalaces(chart);
  let huaLuFound = false;
  let luCunFound = false;
  for (const p of sanFang) {
    if (p.stars.some(s => s.siHua === '禄')) huaLuFound = true;
    if (hasStar(p, '禄存')) luCunFound = true;
  }
  if (!huaLuFound || !luCunFound) return;

  patterns.push({
    name: 'Song Lộc triều viên (双禄朝垣)',
    level: 'excellent',
    description: 'Hóa Lộc và Lộc Tồn cùng hội tam phương tứ chính của Mệnh, nguồn tài tuôn chảy, cơm áo đầy đủ. Sách xưa nói "Song Lộc triều viên, giàu sánh Đào Chu", chủ cả đời không lo tiền, thường được cả chính tài lẫn hoạnh tài.',
    palaces: sanFang.map(p => p.name),
    conditions: {
      required: ['Hóa Lộc hội chiếu tam phương tứ chính', 'Lộc Tồn hội chiếu tam phương tứ chính'],
      breaking: hasShaInPalace(ming, SHA_KONG) ? ['Mệnh tọa Không Kiếp (Song Lộc gặp Không, của đến rồi đi)'] : undefined,
    },
    source: '«Tử Vi Đẩu Số Toàn Thư · Song Lộc triều viên» (紫微斗数全书·双禄朝垣)',
  });
}

/** 三奇加会：化禄 化权 化科 同会三方 */
function detectSanQiJiaHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangPalaces = getSanFangPalaces(chart);
  let lu = false, quan = false, ke = false;
  for (const p of sanFangPalaces) {
    for (const s of p.stars) {
      if (s.siHua === '禄') lu = true;
      if (s.siHua === '权') quan = true;
      if (s.siHua === '科') ke = true;
    }
  }
  if (!(lu && quan && ke)) return;

  patterns.push({
    name: 'Tam Kỳ gia hội (三奇加会)',
    level: 'excellent',
    description: 'Ba cát hóa Lộc, Quyền, Khoa cùng hội tam phương tứ chính của Mệnh, gọi là "Tam Kỳ gia hội". Chủ cả đời đủ cả công danh, của cải, quý nhân, là một trong những cát cách cao nhất của Tử Vi Đẩu Số.',
    palaces: sanFangPalaces.map(p => p.name),
    conditions: { required: ['Hóa Lộc, hóa Quyền, hóa Khoa ba cát hóa cùng hội tam phương tứ chính của Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tam Kỳ gia hội» (紫微斗数全书·三奇加会)',
  });
}

/** 化禄入命/官/财 */
function detectHuaLuRuMing(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const huaLuStar = ming.stars.find(s => s.siHua === '禄' && s.type === 'major');
  if (!huaLuStar) return;

  patterns.push({
    name: `${tenSao(huaLuStar.name, KH)} hóa Lộc nhập Mệnh`,
    level: 'good',
    description: `${tenSao(huaLuStar.name, KH)} hóa Lộc tọa Mệnh, chủ kiếm tiền thuận lợi, được lòng người, nhiều cơ duyên. ${huaLuStar.name === '武曲' ? 'Vũ Khúc hóa Lộc thuộc chính tài, nên làm thực nghiệp, tài chính.' : huaLuStar.name === '太阴' ? 'Thái Âm hóa Lộc thuộc tài âm, bất động sản.' : huaLuStar.name === '贪狼' ? 'Tham Lang hóa Lộc thuộc tài từ quan hệ, tài đào hoa.' : ''}`,
    palaces: ['命宫'],
    conditions: { required: [`${tenSao(huaLuStar.name, KH)} hóa Lộc tọa Mệnh cung`] },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

// ────────────────── 恶格识别器 ──────────────────

/** 化忌入命/迁 */
function detectHuaJiRuMingQian(chart: ZiweiChart, patterns: Pattern[]) {
  const qianBranch = (chart.mingGongBranch + 6) % 12;
  for (const palace of chart.palaces) {
    if (palace.branch !== chart.mingGongBranch && palace.branch !== qianBranch) continue;
    const jiStar = palace.stars.find(s => s.siHua === '忌' && s.type === 'major');
    if (!jiStar) continue;

    const inMing = palace.branch === chart.mingGongBranch;
    patterns.push({
      name: `${tenSao(jiStar.name, KH)} hóa Kỵ nhập ${inMing ? 'Mệnh' : 'Thiên Di'}`,
      level: 'caution',
      description: inMing
      ? `${tenSao(jiStar.name, KH)} hóa Kỵ tọa Mệnh cung, cần lưu ý sự cố chấp, rào cản tâm lý hoặc nguy cơ sức khỏe, việc gì cũng nên lùi một bước suy nghĩ. Hóa Kỵ không nhất định xấu, chỉ cho thấy năng lượng của sao này cần được đặc biệt chú ý.`
      : `${tenSao(jiStar.name, KH)} hóa Kỵ tọa Thiên Di cung, ra ngoài, đi xa, quan hệ giao tiếp dễ gặp trắc trở, nên giữ hơn là động.`,
      palaces: [palace.name],
      conditions: { required: [`${tenSao(jiStar.name, KH)} hóa Kỵ tọa ${inMing ? 'Mệnh' : 'Thiên Di'} cung`] },
      source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
    });
  }
}

/** 羊陀夹忌：化忌坐宫，左右被擎羊陀罗夹 */
function detectYangTuoJiaJi(chart: ZiweiChart, patterns: Pattern[]) {
  for (const palace of chart.palaces) {
    const jiStar = palace.stars.find(s => s.siHua === '忌');
    if (!jiStar) continue;
    if (palace.branch !== chart.mingGongBranch) continue;   // 只看命宫被夹

    const { prev, next } = getJiaPalaces(chart, palace.branch);
    if (!prev || !next) continue;
    const aPrev = hasStar(prev, '擎羊') && hasStar(next, '陀罗');
    const aNext = hasStar(prev, '陀罗') && hasStar(next, '擎羊');
    if (!aPrev && !aNext) continue;

    patterns.push({
      name: 'Dương Đà giáp Kỵ (羊陀夹忌)',
      level: 'caution',
      description: 'Hóa Kỵ tọa Mệnh, hai bên Kình Dương, Đà La giáp Mệnh, sách xưa nói "Dương Đà giáp Kỵ là bại cục", chủ cả đời lao lực bôn ba, gian truân không thuận, thân tâm mệt mỏi. Cần lấy đức hạnh tu dưỡng và việc làm tích cực để hóa giải, mọi việc nên thận trọng.',
      palaces: ['命宫', prev.name, next.name],
      conditions: { required: ['Hóa Kỵ tọa Mệnh', 'Kình Dương, Đà La phân ở hai cung trước và sau Mệnh cung'] },
      source: '«Tử Vi Đẩu Số Cốt Tuỷ Phú · Dương Đà giáp Kỵ» (紫微斗数骨髓赋·羊陀夹忌)',
    });
    return;
  }
}

/** 火铃夹命：火星铃星分居命宫前后 */
function detectHuoLingJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const okA = hasStar(prev, '火星') && hasStar(next, '铃星');
  const okB = hasStar(prev, '铃星') && hasStar(next, '火星');
  if (!okA && !okB) return;

  patterns.push({
    name: 'Hỏa Linh giáp Mệnh (火铃夹命)',
    level: 'caution',
    description: 'Hỏa Tinh, Linh Tinh phân ở hai cung trước và sau Mệnh cung giáp Mệnh, chủ tính nóng nảy, dễ bốc đồng, dễ gặp việc bất ngờ hoặc tranh chấp. Cần rèn tính kiên nhẫn, tránh quyết định bốc đồng.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Hỏa Tinh, Linh Tinh phân ở hai cung trước và sau Mệnh cung'] },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 空劫夹命：地空地劫分居命宫前后 */
function detectKongJieJiaMing(chart: ZiweiChart, patterns: Pattern[]) {
  const { prev, next } = getJiaPalaces(chart, chart.mingGongBranch);
  if (!prev || !next) return;
  const okA = hasStar(prev, '地空') && hasStar(next, '地劫');
  const okB = hasStar(prev, '地劫') && hasStar(next, '地空');
  if (!okA && !okB) return;

  patterns.push({
    name: 'Không Kiếp giáp Mệnh (空劫夹命)',
    level: 'caution',
    description: 'Địa Không, Địa Kiếp giáp Mệnh, chủ của đến rồi đi, tư tưởng thoát tục, dễ đi vào tôn giáo triết học. Sách xưa nói "Không Kiếp giáp Mệnh, tài không tụ". Nên làm nghề kỹ nghệ, tôn giáo, nghiên cứu và các nghề không coi trọng vật chất.',
    palaces: ['命宫', prev.name, next.name],
    conditions: { required: ['Địa Không, Địa Kiếp phân ở hai cung trước và sau Mệnh cung'] },
    source: '«Tử Vi Đẩu Số Toàn Thư» (紫微斗数全书)',
  });
}

/** 廉杀羊：廉贞、七杀、擎羊三星会照（流年大限最凶） */
function detectLianShaYang(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!(sanFangSet.has('廉贞') && sanFangSet.has('七杀') && sanFangSet.has('擎羊'))) return;

  patterns.push({
    name: 'Liêm Sát Dương (廉杀羊)',
    level: 'caution',
    description: 'Liêm Trinh, Thất Sát, Kình Dương ba sao hội chiếu tam phương của Mệnh, trong lý luận truyền thống được đánh dấu là tổ hợp cần đặc biệt lưu ý. Khi cách này bị kích hoạt ở đại hạn, lưu niên thì nhắc nên giữ thái độ thận trọng: an toàn khi lái xe, hòa khí trong quan hệ, quyết định y tế cần lý trí — nhấn mạnh chủ động quản lý thay vì buông xuôi theo số mệnh.',
    palaces: ['命宫'],
    conditions: { required: ['Liêm Trinh, Thất Sát, Kình Dương ba sao hội chiếu tam phương tứ chính'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Liêm Sát Dương» (紫微斗数全书·廉杀羊)',
  });
}

/** 巨火羊：巨门、火星、擎羊会照 */
function detectJuHuoYang(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!(sanFangSet.has('巨门') && sanFangSet.has('火星') && sanFangSet.has('擎羊'))) return;

  patterns.push({
    name: 'Cự Hỏa Dương (巨火羊)',
    level: 'caution',
    description: 'Cự Môn, Hỏa Tinh, Kình Dương ba sao hội chiếu, cổ thư truyền thống ghi cách này là tổ hợp cần cảnh giác (câu cổ văn "chung thân ải tử" là cách nói theo thuyết định mệnh, nay không còn phù hợp). Cách hiểu hiện đại: tổ hợp này tượng trưng việc nói thẳng dễ gây xung đột, khi cảm xúc mạnh cần tự quan sát. Hướng tu dưỡng là: luyện cách diễn đạt ôn hòa, chủ động hóa giải đối lập, rèn quản lý cảm xúc.',
    palaces: ['命宫'],
    conditions: { required: ['Cự Môn, Hỏa Tinh, Kình Dương ba sao hội chiếu tam phương tứ chính'] },
    source: '«Tử Vi Đẩu Số Cốt Tuỷ Phú · Cự Hỏa Dương» (紫微斗数骨髓赋·巨火羊)',
  });
}

/** 铃昌陀武：铃星、文昌、陀罗、武曲会照（限至投河） */
function detectLingChangTuoWu(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!(sanFangSet.has('铃星') && sanFangSet.has('文昌') && sanFangSet.has('陀罗') && sanFangSet.has('武曲'))) return;

  patterns.push({
    name: 'Linh Xương Đà Vũ (铃昌陀武)',
    level: 'caution',
    description: 'Linh Tinh, Văn Xương, Đà La, Vũ Khúc bốn sao cùng hội, cổ thư truyền thống ghi đây là tổ hợp cần đặc biệt lưu ý (câu cổ văn "hạn chí đầu hà" là cách nói theo thuyết định mệnh, không phải cách hiểu hiện đại). Khuyến nghị hiện đại: khi tổ hợp này bị kích hoạt ở đại hạn, lưu niên, nhắc nên xử lý các quyết định lớn một cách lý trí, chú ý biến động cảm xúc, giữ đời sống ổn định — nhấn mạnh chủ động quản lý thay vì chờ đợi thụ động.',
    palaces: ['命宫'],
    conditions: { required: ['Linh Tinh, Văn Xương, Đà La, Vũ Khúc bốn sao hội chiếu tam phương tứ chính'] },
    source: '«Tử Vi Đẩu Số Cốt Tuỷ Phú · Linh Xương Đà Vũ» (紫微斗数骨髓赋·铃昌陀武)',
  });
}

/** 马头带箭：擎羊在午宫坐命 */
function detectMaTouDaiJian(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  if (ming.branch !== 6) return;   // 必须午
  if (!hasStar(ming, '擎羊')) return;

  const required = ['Kình Dương tọa Mệnh ở cung Ngọ'];
  const bonus: string[] = [];
  const breaking: string[] = [];
  if (sanFangAllStars(chart).has('七杀') || sanFangAllStars(chart).has('破军')) bonus.push('Lại hội Thất Sát hoặc Phá Quân (võ chức đại quý)');
  if (sanFangAllStars(chart).has('天魁') || sanFangAllStars(chart).has('天钺')) bonus.push('Khôi Việt chiếu thêm');

  patterns.push({
    name: 'Mã Đầu Đới Tiễn (马头带箭)',
    level: bonus.length ? 'good' : 'caution',
    description: 'Kình Dương tọa Mệnh ở cung Ngọ, gọi là "Mã Đầu Đới Tiễn", sách xưa nói "uy trấn biên cương". Cách này tượng trưng sức hành động quyết đoán và tinh thần cạnh tranh, hợp với hướng nghề cần năng lực thực thi và quyết định dũng cảm. Lý luận truyền thống cũng nhắc cách này cần phối với các sao cát lợi mới phát huy tốt nhất — nhấn mạnh ảnh hưởng của tổ hợp thay vì xét riêng từng sao.',
    palaces: ['命宫'],
    conditions: { required, bonus },
    source: '«Tử Vi Đẩu Số Cốt Tuỷ Phú · Mã Đầu Đới Tiễn» (紫微斗数骨髓赋·马头带箭)',
  });
}

// ────────────────── 基础格局（提升识别覆盖率）──────────────────
// 设计：让普通命盘也能识别出 1-3 个常见格局，而不是 30+ 严格古书格局都不匹配。
// 这些都是单一条件触发的轻量识别，level 多为 neutral / good。

/** 禄存守身：禄存入身宫（或命宫与身宫同宫） */
function detectLuCunShouShen(chart: ZiweiChart, patterns: Pattern[]) {
  const luCunPalace = findStarPalace(chart, '禄存');
  if (!luCunPalace) return;
  const inMing = luCunPalace.branch === chart.mingGongBranch;
  const inShen = luCunPalace.branch === chart.shenGongBranch;
  if (!inMing && !inShen) return;
  patterns.push({
    name: inMing ? 'Lộc Tồn thủ Mệnh (禄存守命)' : 'Lộc Tồn thủ Thân (禄存守身)',
    level: 'good',
    description: inMing
      ? 'Lộc Tồn tọa Mệnh, chủ cả đời cơm áo không lo, tài lộc ổn định. Tính bảo thủ, giỏi tích lũy, nhưng Lộc bị Dương Đà giáp phải đề phòng tiểu nhân. Hợp nhất khi phối hóa Lộc, Tả Phù Hữu Bật mới thành đại cách.'
      : 'Lộc Tồn vào Thân cung, chủ sau trung niên nguồn tài ổn định, hưởng lộc tự thân. Nghê sư nói «Lộc Tồn nhập Thân, tài khí gần thân» — phối ngẫu hoặc hướng sự nghiệp có thể mang lại tài lộc ổn định.',
    palaces: [inMing ? '命宫' : '身宫'],
    conditions: { required: [inMing ? 'Lộc Tồn vào Mệnh cung' : 'Lộc Tồn vào Thân cung'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Lộc Tồn tinh» (紫微斗数全书·禄存星)',
  });
}

/** 天马入命/迁：驿马星动 */
function detectTianMaRuMing(chart: ZiweiChart, patterns: Pattern[]) {
  const tianMaPalace = findStarPalace(chart, '天马');
  if (!tianMaPalace) return;
  const inMing = tianMaPalace.branch === chart.mingGongBranch;
  const inQian = tianMaPalace.branch === ((chart.mingGongBranch + 6) % 12);
  if (!inMing && !inQian) return;
  patterns.push({
    name: inMing ? 'Thiên Mã nhập Mệnh (天马入命)' : 'Thiên Mã tại Thiên Di (天马在迁)',
    level: 'neutral',
    description: inMing
      ? 'Thiên Mã tọa Mệnh, chủ cả đời bôn ba, trong động mà được tài, nên đi theo thương mại lữ hành, công việc bên ngoài, phát triển liên ngành. Nghê sư nói «Thiên Mã nhập Mệnh, vô Lộc bất phát» — nếu lại hội Lộc Tồn hoặc hóa Lộc thì thành phú cách "Lộc Mã giao trì".'
      : 'Thiên Mã ở Thiên Di cung, chủ ra ngoài thuận lợi, đi xa được tài, nên phát triển nơi đất khách. Phối hóa Lộc chủ sinh tài nơi xa, phối sát tinh thì đường đi nhiều trắc trở.',
    palaces: [tianMaPalace.name],
    conditions: { required: [inMing ? 'Thiên Mã vào Mệnh cung' : 'Thiên Mã vào Thiên Di cung'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Thiên Mã tinh» (紫微斗数全书·天马星)',
  });
}

/** 化禄入财：财帛宫主星化禄 */
function detectHuaLuRuCai(chart: ZiweiChart, patterns: Pattern[]) {
  const cai = chart.palaces.find(p => p.name === '财帛');
  if (!cai) return;
  const luStar = cai.stars.find(s => s.type === 'major' && s.siHua === '禄');
  if (!luStar) return;
  patterns.push({
    name: 'Hóa Lộc nhập Tài (化禄入财)',
    level: 'good',
    description: `${tenSao(luStar.name, KH)} hóa Lộc vào cung Tài Bạch, chủ nguồn tài thông suốt, thu nhập ổn định. Nghê sư giảng hóa Lộc là biểu tượng của "chính tài" — năng lực mà sao hóa Lộc này đại diện (đặc chất cốt lõi của ${tenSao(luStar.name, KH)}) là trục chính để bạn kiếm tiền. Phối Lộc Tồn hoặc Thiên Mã thì nguồn tài càng rộng.`,
    palaces: ['财帛'],
    conditions: { required: [`${tenSao(luStar.name, KH)} hóa Lộc vào cung Tài Bạch`] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa luận» (紫微斗数全书·四化论)',
  });
}

/** 化权入官：官禄宫主星化权 */
function detectHuaQuanRuGuan(chart: ZiweiChart, patterns: Pattern[]) {
  const guan = chart.palaces.find(p => p.name === '官禄');
  if (!guan) return;
  const quanStar = guan.stars.find(s => s.type === 'major' && s.siHua === '权');
  if (!quanStar) return;
  patterns.push({
    name: 'Hóa Quyền nhập Quan (化权入官)',
    level: 'good',
    description: `${tenSao(quanStar.name, KH)} hóa Quyền vào cung Quan Lộc, chủ sự nghiệp có sức nắm quyền, gánh được vị trí độc đương nhất diện. Hóa Quyền đại diện quyền lực và sức thực thi — ${tenSao(quanStar.name, KH)} hóa Quyền cho thấy bạn có thể là người ra quyết định hoặc người thực thi cốt lõi trong sự nghiệp, nên theo hướng quản lý hoặc quyền uy kỹ thuật.`,
    palaces: ['官禄'],
    conditions: { required: [`${tenSao(quanStar.name, KH)} hóa Quyền vào cung Quan Lộc`] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa luận» (紫微斗数全书·四化论)',
  });
}

/** 化科入命/身：科名加身 */
function detectHuaKeRuMingShen(chart: ZiweiChart, patterns: Pattern[]) {
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  const shen = chart.palaces.find(p => p.branch === chart.shenGongBranch);
  const target = [ming, shen].filter((p): p is Palace => Boolean(p));
  for (const p of target) {
    const keStar = p.stars.find(s => s.type === 'major' && s.siHua === '科');
    if (!keStar) continue;
    const isMing = p.branch === chart.mingGongBranch;
    patterns.push({
      name: isMing ? 'Hóa Khoa nhập Mệnh (化科入命)' : 'Hóa Khoa nhập Thân (化科入身)',
      level: 'good',
      description: `${tenSao(keStar.name, KH)} hóa Khoa vào ${isMing ? 'Mệnh' : 'Thân'} cung, chủ danh tiếng, văn thư, vận học thuật. Nghê sư giảng hóa Khoa là "sao quý nhân" — ${tenSao(keStar.name, KH)} hóa Khoa mang đến đặc chất được người coi trọng, nên làm văn thư, giáo dục, nghiên cứu, tư vấn, sáng tạo văn hóa và các hướng “lấy danh để lấy lợi”.`,
      palaces: [isMing ? '命宫' : '身宫'],
      conditions: { required: [`${tenSao(keStar.name, KH)} hóa Khoa vào ${isMing ? 'Mệnh' : 'Thân'} cung`] },
      source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa luận» (紫微斗数全书·四化论)',
    });
    return; // 命和身重复时只识别一次
  }
}

/** Cơ Nguyệt Đồng Lương tam tinh hội (cách thiếu sao, không phải cách thật bốn sao): ba trong bốn sao Thiên Cơ/Thái Âm/Thiên Đồng/Thiên Lương cùng vào tam phương tứ chính */
function detectJiYueTongLiangPartial(chart: ZiweiChart, ming: Palace, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  const has = ['天机', '太阴', '天同', '天梁'].filter(s => sanFangSet.has(s));
  if (has.length !== 3) return; // 4 星齐由 detectJiYueTongLiang 处理
  // 避免和上面 detectJiYueTongLiang 重复（4 星齐的不进这里）
  const missing = ['天机', '太阴', '天同', '天梁'].filter(s => !sanFangSet.has(s));
  patterns.push({
    name: 'Cơ Nguyệt Đồng Lương tam tinh hội (机月同梁三星会)',
    level: 'neutral',
    description: `Cơ Nguyệt Đồng Lương cần Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương bốn sao cùng hội tam phương tứ chính mới là cách thật đầy đủ; lá số này chỉ hội được 3 sao (${has.map(s => tenSao(s, KH)).join(', ')}), thiếu ${missing.map(s => tenSao(s, KH)).join(', ')} chưa hội, không phải cách thật đầy đủ, lực giảm một bậc. Nho nhã có mưu, nên làm công chức, giảng dạy nghiên cứu, y tế, dịch vụ và các nghề dựa vào tích lũy và ổn định, mấu chốt là xem sao thiếu và sự phối hợp với tứ hóa.`,
    palaces: getSanFangPalaces(chart).filter(p => has.some(s => getMajorStarNames(p).includes(s))).map(p => p.name),
    conditions: { required: [`Tam phương tứ chính hội ${has.map(s => tenSao(s, KH)).join(', ')} (Cơ Nguyệt Đồng Lương thiếu ${missing.map(s => tenSao(s, KH)).join(', ')})`] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Cơ Nguyệt Đồng Lương cách» (紫微斗数全书·机月同梁格)',
  });
  void ming;
}

/** 昌曲同会：文昌+文曲都在命三方四正 */
function detectChangQuTongHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('文昌') || !sanFangSet.has('文曲')) return;
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  if (!ming) return;
  const inMing = hasStar(ming, '文昌') && hasStar(ming, '文曲');
  patterns.push({
    name: inMing ? 'Xương Khúc tọa Mệnh (昌曲坐命)' : 'Xương Khúc đồng hội (昌曲同会)',
    level: 'good',
    description: inMing
      ? 'Văn Xương Văn Khúc cùng vào Mệnh cung, chủ thông minh tuấn tú, văn chương rực rỡ, hợp văn học, giáo dục, viết lách, tư vấn. Kỵ nhất hóa Kỵ — Xương Khúc hóa Kỵ chủ văn thư, hợp đồng ngầm thua thiệt.'
      : 'Văn Xương Văn Khúc cùng hội tam phương tứ chính, chủ tài hoa tràn đầy, ăn nói và văn bút đều giỏi. Nên theo ngành cần biểu đạt và văn chương, có hóa Khoa trợ thì danh tiếng càng lớn.',
    palaces: ['命宫'],
    conditions: { required: ['Văn Xương, Văn Khúc cùng hội tam phương tứ chính của Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Văn tinh luận» (紫微斗数全书·文星论)',
  });
}

/** 辅弼同会：左辅+右弼都在命三方四正 */
function detectFuBiTongHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('左辅') || !sanFangSet.has('右弼')) return;
  patterns.push({
    name: 'Phụ Bật đồng hội (辅弼同会)',
    level: 'good',
    description: 'Tả Phù Hữu Bật cùng hội tam phương tứ chính của Mệnh, chủ cả đời quý nhân không dứt, nhân duyên rất tốt. Hợp nhất với vị trí lãnh đạo và công việc làm việc nhóm. Nghê sư nói «Phụ Bật giáp Mệnh, bình sinh quý nhân đa» — bạn không phải mệnh đơn thương độc mã, cần biết dùng mạng lưới quan hệ.',
    palaces: ['命宫'],
    conditions: { required: ['Tả Phù, Hữu Bật cùng hội tam phương tứ chính của Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Phụ Bật luận» (紫微斗数全书·辅弼论)',
  });
}

/** 魁钺同会：天魁+天钺都在命三方四正 */
function detectKuiYueTongHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sanFangSet = sanFangAllStars(chart);
  if (!sanFangSet.has('天魁') || !sanFangSet.has('天钺')) return;
  patterns.push({
    name: 'Khôi Việt đồng hội (魁钺同会)',
    level: 'good',
    description: 'Thiên Khôi Thiên Việt cùng hội tam phương tứ chính của Mệnh, chủ "Thiên Ất quý nhân" gia trì, lúc then chốt luôn có quý nhân nâng đỡ. Nghê sư nói «Khôi Việt giáp Mệnh, tất là quý nhân» — khi gặp khó khăn bên cạnh sẽ xuất hiện người đắc lực giúp đỡ, nên chủ động vun đắp quan hệ.',
    palaces: ['命宫'],
    conditions: { required: ['Thiên Khôi, Thiên Việt cùng hội tam phương tứ chính của Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Khôi Việt luận» (紫微斗数全书·魁钺论)',
  });
}

/** 科权双会：化科 + 化权 同会三方四正 */
function detectKeQuanShuangHui(chart: ZiweiChart, patterns: Pattern[]) {
  const sfPalaces = getSanFangPalaces(chart);
  let hasKe = false, hasQuan = false;
  for (const p of sfPalaces) {
    for (const s of p.stars) {
      if (s.type === 'major' && s.siHua === '科') hasKe = true;
      if (s.type === 'major' && s.siHua === '权') hasQuan = true;
    }
  }
  if (!hasKe || !hasQuan) return;
  patterns.push({
    name: 'Khoa Quyền song hội (科权双会)',
    level: 'good',
    description: 'Hóa Khoa + hóa Quyền cùng hội tam phương tứ chính, chủ danh quyền song mỹ — vừa có học thức/danh tiếng (Khoa), vừa có sức nắm quyền (Quyền), nên theo hướng "quyền uy chuyên môn" (như bác sĩ, luật sư, giáo sư, cốt cán kỹ thuật), danh lợi song thu mà nền móng vững chắc.',
    palaces: ['命宫'],
    conditions: { required: ['Hóa Khoa, hóa Quyền cùng hội tam phương tứ chính của Mệnh'] },
    source: '«Tử Vi Đẩu Số Toàn Thư · Tứ Hóa hội chiếu» (紫微斗数全书·四化会照)',
  });
}

// ────────────────── 主入口 ──────────────────
export function detectPatterns(chart: ZiweiChart): Pattern[] {
  const patterns: Pattern[] = [];
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  if (!ming) return patterns;

  // 上格
  detectJunChenQingHui(chart, ming, patterns);
  detectZiFu(chart, ming, patterns);
  detectFuXiangChaoYuan(chart, ming, patterns);
  detectYangLiangChangLu(chart, ming, patterns);
  detectHuoTanLingTan(chart, ming, patterns);
  detectWuTan(chart, ming, patterns);
  detectShaPoLang(chart, ming, patterns);
  detectJiYueTongLiang(chart, ming, patterns);

  // 中格
  detectLianXiang(chart, patterns);
  detectWuQiSha(chart, patterns);
  detectTongLiang(chart, patterns);
  detectRiYueTongGong(chart, patterns);
  detectRiYueJiaMing(chart, patterns);
  detectJuRiTongGong(chart, patterns);
  detectShiZhongYinYu(chart, ming, patterns);
  detectMingZhuChuHai(chart, ming, patterns);
  detectZiWeiInMing(chart, ming, patterns);

  // 助力格
  detectFuBiJiaMing(chart, patterns);
  detectChangQuJiaMing(chart, patterns);
  detectKuiYueJiaMing(chart, patterns);
  detectShuangLuChaoYuan(chart, ming, patterns);
  detectSanQiJiaHui(chart, patterns);
  detectHuaLuRuMing(chart, ming, patterns);

  // 恶格
  detectHuaJiRuMingQian(chart, patterns);
  detectYangTuoJiaJi(chart, patterns);
  detectHuoLingJiaMing(chart, patterns);
  detectKongJieJiaMing(chart, patterns);
  detectLianShaYang(chart, patterns);
  detectJuHuoYang(chart, patterns);
  detectLingChangTuoWu(chart, patterns);
  detectMaTouDaiJian(chart, ming, patterns);

  // 基础格局（提升识别覆盖率，让普通命盘也能识别 1-3 个）
  detectLuCunShouShen(chart, patterns);
  detectTianMaRuMing(chart, patterns);
  detectHuaLuRuCai(chart, patterns);
  detectHuaQuanRuGuan(chart, patterns);
  detectHuaKeRuMingShen(chart, patterns);
  detectJiYueTongLiangPartial(chart, ming, patterns);
  detectChangQuTongHui(chart, patterns);
  detectFuBiTongHui(chart, patterns);
  detectKuiYueTongHui(chart, patterns);
  detectKeQuanShuangHui(chart, patterns);

  return patterns;
}

// ────────────────── 命宫摘要（保持向后兼容）──────────────────
export function getMingGongSummary(chart: ZiweiChart): {
  stars: string[];
  keywords: string[];
  nature: string;
} {
  const mingPalace = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  if (!mingPalace) return { stars: [], keywords: [], nature: '' };

  const majorStars = mingPalace.stars.filter(s => s.type === 'major');
  const starNames = majorStars.map(s => s.name);

  const keywordMap: Record<string, string[]> = {
    '紫微': ['Tôn quý', 'Độc lập', 'Lãnh đạo'],
    '天机': ['Trí tuệ', 'Linh hoạt', 'Giỏi mưu tính'],
    '太阳': ['Dương cương', 'Quan quý', 'Hào phóng'],
    '武曲': ['Tài phú', 'Cương nghị', 'Quả quyết'],
    '天同': ['Ôn hòa', 'Hưởng phúc', 'Thuận duyên'],
    '廉贞': ['Tài nghệ', 'Đào hoa', 'Hay thay đổi'],
    '天府': ['Kho tài', 'Vững vàng', 'Bảo thủ'],
    '太阴': ['Dịu dàng', 'Tài phú', 'Tinh tế'],
    '贪狼': ['Dục vọng', 'Đào hoa', 'Đa tài'],
    '巨门': ['Giỏi biện luận', 'Hay suy nghĩ', 'Tài ăn nói'],
    '天相': ['Phụ tá', 'Hành chính', 'Vững chãi'],
    '天梁': ['Che chở', 'Y dược', 'Bậc trưởng bối'],
    '七杀': ['Tướng tinh', 'Quyết đoán', 'Cô khắc'],
    '破军': ['Khai sáng', 'Biến động', 'Phá cũ'],
  };

  const natureMap: Record<string, string> = {
    '紫微': 'Sao đế vương', '天机': 'Sao trí tuệ', '太阳': 'Sao quý nhân',
    '武曲': 'Sao tài bạch', '天同': 'Sao phúc đức', '廉贞': 'Sao đào hoa',
    '天府': 'Sao kho tài', '太阴': 'Sao tài phú', '贪狼': 'Sao đào hoa',
    '巨门': 'Sao thị phi', '天相': 'Sao ấn thụ', '天梁': 'Sao ấm phúc',
    '七杀': 'Sao tướng soái', '破军': 'Sao biến động',
  };

  const keywords = starNames.flatMap(n => keywordMap[n] ?? []).slice(0, 5);
  const nature = starNames.length > 0 ? (natureMap[starNames[0]] ?? '') : 'Cung trống';

  return { stars: starNames, keywords, nature };
}
