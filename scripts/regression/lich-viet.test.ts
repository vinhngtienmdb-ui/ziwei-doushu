/**
 * Kiểm thử lịch Việt Nam: âm lịch theo GMT+7, can chi, tiết khí, trực, hợp xung tuổi, chấm điểm ngày.
 * Đối chiếu với thư viện lunar-javascript (lịch Trung Quốc, GMT+8): can chi ngày phải trùng hoàn toàn;
 * ngày âm lịch được phép lệch ở những tháng mà ngày sóc rơi vào khoảng 23:00–24:00 giờ Việt Nam.
 */
import assert from 'node:assert/strict';
import { Solar } from 'lunar-javascript';
import { amSangDuong, duongSangAm, ngayTuSoJulius, soNgayJulius } from '../../lib/lich/am-lich-viet';
import { MUC_DICH, danhGiaNgay, nhanTuDiem, quanHeVoiTuoi, thongTinNgay, chiCuaNam } from '../../lib/lich/ngay';
import { VIEC, CAT_THAN, HUNG_THAN } from '../../lib/lich/thuat-ngu-lich';

// 1. Mùng một Tết các năm đã biết (lịch Việt Nam)
const tet = (nam: number) => amSangDuong(1, 1, nam, false)!.join('/');
assert.equal(tet(2023), '22/1/2023');
assert.equal(tet(2024), '10/2/2024');
assert.equal(tet(2025), '29/1/2025');
assert.equal(tet(2026), '17/2/2026');
assert.equal(tet(2027), '6/2/2027');
assert.equal(tet(1968), '29/1/1968', 'Tết Mậu Thân 1968 ở Việt Nam là ngày 29/1 (lịch Trung Quốc là 30/1)');

// 2. Ngày đã biết
assert.deepEqual(duongSangAm(20, 5, 1990), { ngay: 26, thang: 4, nam: 1990, nhuan: false });
assert.deepEqual(duongSangAm(8, 10, 1988), { ngay: 28, thang: 8, nam: 1988, nhuan: false });
assert.equal(duongSangAm(20, 4, 2023).nhuan, false);
assert.equal(duongSangAm(1, 4, 2023).thang, 2, 'năm 2023 có tháng 2 nhuận bắt đầu cuối tháng 3 dương lịch');

// 3. Đi và về 1950–2060, can chi ngày trùng thư viện, can chi tháng trùng ở mọi ngày không sát mốc tiết khí
let ngayLechAm = 0;
let ngayLechCanChiThang = 0;
let tong = 0;
const CAN = '甲乙丙丁戊己庚辛壬癸';
const CHI = '子丑寅卯辰巳午未申酉戌亥';
const VN_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const VN_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const sangVn = (cc: string) => `${VN_CAN[CAN.indexOf(cc[0])]} ${VN_CHI[CHI.indexOf(cc[1])]}`;
for (let jd = soNgayJulius(1, 1, 1950); jd <= soNgayJulius(31, 12, 2060); jd++) {
  const [d, m, y] = ngayTuSoJulius(jd);
  tong++;
  const am = duongSangAm(d, m, y);
  const veLai = amSangDuong(am.ngay, am.thang, am.nam, am.nhuan);
  assert.deepEqual(veLai, [d, m, y], `đi và về phải khớp: ${d}/${m}/${y}`);
  const lich = Solar.fromYmd(y, m, d).getLunar();
  const lm = lich.getMonth();
  if (am.ngay !== lich.getDay() || am.thang !== Math.abs(lm) || am.nhuan !== lm < 0) ngayLechAm++;
  const tt = thongTinNgay(d, m, y);
  assert.equal(tt.canChiNgay, sangVn(lich.getDayInGanZhi()), `can chi ngày ${d}/${m}/${y}`);
  if (tt.canChiThang !== sangVn(lich.getMonthInGanZhi())) ngayLechCanChiThang++;
}
// Khoảng 1/24 số tháng có ngày sóc rơi vào giờ lệch giữa GMT+7 và GMT+8, nên ngày âm lịch lệch ở khoảng 4% số ngày
assert.ok(ngayLechAm / tong < 0.08, `tỉ lệ ngày âm lịch lệch lịch Trung Quốc bất thường: ${(ngayLechAm / tong * 100).toFixed(2)}%`);
assert.ok(ngayLechAm > 0, 'lịch Việt Nam và Trung Quốc phải khác nhau ở một số ngày');
assert.ok(ngayLechCanChiThang / tong < 0.005, `can chi tháng lệch quá nhiều: ${ngayLechCanChiThang}`);

// 4. Một ngày cụ thể
const t = thongTinNgay(5, 11, 2026);
assert.equal(t.canChiNgay, 'Quý Mùi');
assert.equal(t.thuTrongTuan, 'Thứ năm');
assert.equal(t.tu.ten, 'Tỉnh');
assert.equal(t.truc.ten, 'Thu');
assert.equal(t.than.ten, 'Chu Tước');
assert.equal(t.than.hoangDao, false);
assert.equal(t.conGiapXung, 'Trâu');
assert.equal(t.gio.length, 12);
assert.equal(t.gio.filter((g) => g.hoangDao).length, 6, 'mỗi ngày có đúng 6 giờ hoàng đạo');

// 4b. Giờ Hoàng đạo và thần của ngày trùng bảng của thư viện (sai khác chỉ được xảy ra ở ngày giao tiết khí)
let ngayLechThan = 0;
let gioLech = 0;
const NGAY_KIEM_TRA = 4000;
for (let n = 0; n < NGAY_KIEM_TRA; n++) {
  const dt = new Date(Date.UTC(2005, 0, 1) + n * 86400000);
  const [y, m, d] = [dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()];
  const tt = thongTinNgay(d, m, y);
  const lich = Solar.fromYmd(y, m, d).getLunar();
  const lib = lich as unknown as { getDayTianShenLuck(): string; getTimes(): { getZhi(): string; getTianShenLuck(): string }[] };
  if ((lib.getDayTianShenLuck() === '吉') !== tt.than.hoangDao) ngayLechThan++;
  // Thư viện trả 13 giờ, giờ cuối là giờ Tý muộn thuộc về ngày kế tiếp nên chỉ so 12 giờ đầu
  for (const gio of lib.getTimes().slice(0, 12)) {
    const chi = CHI.indexOf(gio.getZhi());
    if (chi >= 0 && (gio.getTianShenLuck() === '吉') !== tt.gio[chi].hoangDao) { gioLech++; break; }
  }
}
assert.ok(ngayLechThan / NGAY_KIEM_TRA < 0.01, `Hoàng đạo, Hắc đạo lệch thư viện ${ngayLechThan}/${NGAY_KIEM_TRA} ngày`);
assert.equal(gioLech, 0, `giờ Hoàng đạo phải trùng thư viện, lệch ${gioLech} ngày`);

// 5. Hợp xung tuổi
assert.equal(quanHeVoiTuoi(0, 6), 'xung', 'Tý xung Ngọ');
assert.equal(quanHeVoiTuoi(0, 1), 'luc-hop', 'Tý hợp Sửu');
assert.equal(quanHeVoiTuoi(0, 7), 'hai', 'Tý hại Mùi');
assert.equal(quanHeVoiTuoi(0, 4), 'tam-hop', 'Tý, Thìn, Thân tam hợp');
assert.equal(quanHeVoiTuoi(0, 2), 'khong');
assert.equal(chiCuaNam(1990), 6, 'năm Canh Ngọ');
assert.equal(chiCuaNam(2023), 3, 'năm Quý Mão');

// 6. Chấm điểm
assert.equal(nhanTuDiem(5), 'Rất tốt');
assert.equal(nhanTuDiem(0), 'Bình thường');
assert.equal(nhanTuDiem(-4), 'Nên tránh');
const danhGia = danhGiaNgay(t, 'dong-tho');
assert.ok(danhGia.lyDo.some((l) => l.includes('kiêng kỵ')), 'ngày 5/11/2026 kỵ động thổ nên phải bị trừ điểm');
const xungTuoi = danhGiaNgay(t, undefined, 0); // tuổi Tý, ngày Mùi: lục hại
assert.ok(xungTuoi.lyDo.some((l) => l.includes('lục hại')));

// 7. Mọi thuật ngữ việc nên kỵ, cát thần, hung thần trong 20 năm đều đã có bản Hán Việt
const thieu = new Set<string>();
for (let n = 0; n < 365 * 20; n += 1) {
  const dt = new Date(Date.UTC(2015, 0, 1) + n * 86400000);
  const l = Solar.fromYmd(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()).getLunar();
  for (const v of [...l.getDayYi(), ...l.getDayJi()]) if (!VIEC[v]) thieu.add(v);
  for (const v of l.getDayJiShen()) if (!CAT_THAN[v]) thieu.add(v);
  for (const v of l.getDayXiongSha()) if (!HUNG_THAN[v]) thieu.add(v);
}
assert.deepEqual([...thieu], [], `còn thuật ngữ chưa có bản Hán Việt: ${[...thieu].join(' ')}`);
assert.ok(MUC_DICH.length >= 8);

console.log(`✓ Lịch Việt Nam: ${tong} ngày đi và về khớp, can chi ngày trùng thư viện, ${(ngayLechAm / tong * 100).toFixed(1)}% ngày âm lịch khác lịch Trung Quốc`);
