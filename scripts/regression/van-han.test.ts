/**
 * Vận hạn cá nhân: đối chiếu cách an lưu niên/nguyệt/nhật với thư viện iztro trên những ngày mà lịch Việt và lịch Trung Quốc trùng nhau,
 * và kiểm tra thiên can ngày theo số ngày Julius.
 */
import assert from 'node:assert/strict';
import { astro } from 'iztro';
import { Solar } from 'lunar-javascript';
import { generateChart } from '../../lib/ziwei/algorithm';
import { canCuaNgay, tinhVanHan, lietKeThangCuaNamAm } from '../../lib/ziwei/van-han';
import { duongSangAm } from '../../lib/lich/am-lich-viet';
import { STEMS } from '../../lib/ziwei/constants';

// 1. Thiên can ngày: 1/1/2000 là ngày Mậu Ngọ
assert.equal(STEMS[canCuaNgay(1, 1, 2000)], '戊');
assert.equal(STEMS[canCuaNgay(5, 11, 2026)], Solar.fromYmd(2026, 11, 5).getLunar().getDayGan());

// 2. Đối chiếu với iztro (lịch Trung Quốc) trên những ngày hai lịch trùng nhau
const chart = generateChart({ year: 1990, month: 5, day: 17, hour: 6, gender: 'male' });
const branchOf = (idx: number) => idx; // iztro: vị trí cung theo thứ tự bắt đầu từ Dần (index 0)
const chiTuIztro = (index: number) => (index + 2) % 12;

const chinaChart = astro.bySolar('1990-5-17', 6, '男', true, 'zh-CN');
let soMau = 0;
for (let jd = 0; jd < 400; jd += 7) {
  const d0 = new Date(Date.UTC(2026, 0, 1) + jd * 86400000);
  const y = d0.getUTCFullYear();
  const m = d0.getUTCMonth() + 1;
  const d = d0.getUTCDate();
  const am = duongSangAm(d, m, y);
  const tq = Solar.fromYmd(y, m, d).getLunar();
  if (am.ngay !== tq.getDay() || am.thang !== Math.abs(tq.getMonth()) || am.nhuan !== tq.getMonth() < 0) continue; // chỉ so ngày hai lịch trùng
  const vh = tinhVanHan(chart, d, m, y)!;
  const h = chinaChart.horoscope(`${y}-${m}-${d}`, 6);
  assert.equal(vh.nam.chiMenh, chiTuIztro(h.yearly.index), `lưu niên ${d}/${m}/${y}`);
  assert.equal(vh.thang.chiMenh, chiTuIztro(h.monthly.index), `lưu nguyệt ${d}/${m}/${y}`);
  assert.equal(vh.ngay.chiMenh, chiTuIztro(h.daily.index), `lưu nhật ${d}/${m}/${y}`);
  soMau++;
}
assert.ok(soMau > 30, `quá ít ngày mẫu: ${soMau}`);
void branchOf;

// 3. Một ngày mà hai lịch lệch nhau: vận hạn phải theo lịch Việt (1/7 âm lịch Việt = 13/8/1950)
const lech = tinhVanHan(chart, 13, 8, 1950)!;
assert.equal(lech.am.thang, 7);
assert.equal(lech.am.ngay, 1);

// 4. Ngày dương lịch không có thật
assert.equal(tinhVanHan(chart, 31, 4, 2026), null);

// 5. Tứ hóa: mỗi tầng có đúng 4 hóa; tên cung vận đi đủ 12 cung
const vh = tinhVanHan(chart, 5, 11, 2026)!;
for (const tang of [vh.nam, vh.thang, vh.ngay]) {
  assert.equal(tang.tuHoa.length, 4);
  assert.equal(tang.muoiHaiCung.length, 12);
  assert.equal(new Set(tang.muoiHaiCung.map((c) => c.chi)).size, 12);
  assert.equal(tang.muoiHaiCung[0].tenCungVan, chart.palaces.find((p) => p.branch === chart.mingGongBranch)!.name);
}

// 6. Liệt kê tháng: năm 2025 có tháng 6 nhuận (13 tháng), mùng một 1/1 âm lịch 2026 là 17/2/2026
const thangCua2025 = lietKeThangCuaNamAm(2025);
assert.equal(thangCua2025.length, 13);
assert.ok(thangCua2025.some((t) => t.thang === 6 && t.nhuan));
const gieng2026 = lietKeThangCuaNamAm(2026)[0];
assert.deepEqual(gieng2026.mungMot, { ngay: 17, thang: 2, nam: 2026 });

console.log(`✓ Vận hạn: ${soMau} ngày khớp iztro, ngày lệch lịch theo lịch Việt, tứ hóa và tên cung đủ`);
