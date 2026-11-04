/**
 * Lá số theo âm lịch Việt Nam (GMT+7).
 *
 * Trước đây engine dùng âm lịch Trung Quốc (GMT+8) nên khoảng 5% ngày bị an sao theo ngày âm lịch lệch một ngày
 * so với lịch Việt Nam. Bài này giữ cho lá số luôn theo ngày âm lịch Việt Nam.
 */
import assert from 'node:assert/strict';
import { Solar } from 'lunar-javascript';
import { generateChart, resolveEffectiveLunarDate, timNgayDuongThayThe } from '../../lib/ziwei/algorithm';
import { duongSangAm, ngayTuSoJulius, soNgayJulius } from '../../lib/lich/am-lich-viet';

// 1. Một ngày mà lịch Việt Nam và lịch Trung Quốc khác nhau: 13/8/1950 là mùng 1 tháng 7 ở Việt Nam, 30/6 ở Trung Quốc
const trungQuoc = Solar.fromYmd(1950, 8, 13).getLunar();
assert.equal(trungQuoc.getDay(), 30, 'lịch Trung Quốc ghi ngày 30');
assert.equal(Math.abs(trungQuoc.getMonth()), 6, 'lịch Trung Quốc ghi tháng 6');
const la = generateChart({ year: 1950, month: 8, day: 13, hour: 6, gender: 'male' });
assert.equal(la.lunarInfo.lunarMonth, 7, 'lá số phải theo tháng 7 của lịch Việt Nam');
assert.equal(la.lunarInfo.lunarDay, 1, 'lá số phải theo mùng 1 của lịch Việt Nam');
assert.equal(la.lunarInfo.lunarYear, 1950);

// Cùng lá số với ngày dương lịch kế bên theo lịch Việt Nam: mùng 2 tháng 7 phải khác mùng 1 (an Tử Vi theo ngày)
const ngayKe = generateChart({ year: 1950, month: 8, day: 14, hour: 6, gender: 'male' });
assert.equal(ngayKe.lunarInfo.lunarDay, 2);

// 2a. Quét thưa 1950–2040: lá số luôn lập được, ngày âm lịch trong lá số luôn là của lịch Việt Nam
let soLaSo = 0;
for (let jd = soNgayJulius(1, 1, 1950); jd <= soNgayJulius(31, 12, 2040); jd += 101) {
  const [d, m, y] = ngayTuSoJulius(jd);
  const am = duongSangAm(d, m, y);
  if (am.nhuan) continue;
  soLaSo++;
  const chart = generateChart({ year: y, month: m, day: d, hour: (jd % 12 + 12) % 12, gender: jd % 2 ? 'male' : 'female' });
  assert.equal(chart.lunarInfo.lunarMonth, am.thang, `tháng âm lịch ${d}/${m}/${y}`);
  assert.equal(chart.lunarInfo.lunarDay, am.ngay, `ngày âm lịch ${d}/${m}/${y}`);
  assert.equal(chart.lunarInfo.lunarYear, am.nam, `năm âm lịch ${d}/${m}/${y}`);
}

// 2b. Quét dày (cách 3 ngày): ngày âm lịch Việt Nam không có trong lịch Trung Quốc phải rất hiếm (chỉ ngày 30 của vài tháng)
let tong = 0;
let khongBieuDienDuoc = 0;
for (let jd = soNgayJulius(1, 1, 1950); jd <= soNgayJulius(31, 12, 2040); jd += 3) {
  const [d, m, y] = ngayTuSoJulius(jd);
  tong++;
  const eff = resolveEffectiveLunarDate(y, m, d, 'split');
  const thay = timNgayDuongThayThe(eff, { year: y, month: m, day: d });
  const lich = Solar.fromYmd(thay.year, thay.month, thay.day).getLunar();
  if (lich.getDay() !== eff.lunarDay || Math.abs(lich.getMonth()) !== eff.lunarMonth) khongBieuDienDuoc++;
}
assert.ok(khongBieuDienDuoc / tong < 0.005, `quá nhiều ngày âm lịch Việt không biểu diễn được bằng lịch Trung Quốc: ${khongBieuDienDuoc}/${tong}`);

// 3. Mọi chính sách tháng nhuận vẫn lập được lá số ở một tháng nhuận Việt Nam (nhuận tháng 6 năm 2025)
for (const leapMonth of ['split', 'next-month', 'prev-month', 'origin-month'] as const) {
  const chart = generateChart({ year: 2025, month: 8, day: 1, hour: 3, gender: 'female' }, { leapMonth });
  assert.ok(chart.palaces.length === 12, `chính sách ${leapMonth}`);
}

console.log(`✓ Lá số theo âm lịch Việt Nam: ${soLaSo} lá số mẫu đúng ngày âm lịch Việt, ${khongBieuDienDuoc}/${tong} ngày phải xấp xỉ vì lịch Trung Quốc không có ngày âm lịch tương ứng`);
