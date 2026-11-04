/** Tử vi chung theo năm: quan hệ hợp xung của tuổi, giới hạn năm, và bộ nhớ đệm trong SQLite (mỗi năm tối đa 12 bài, không ghi đè). */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const thuMucTam = fs.mkdtempSync(path.join(os.tmpdir(), 'ziwei-tu-vi-nam-'));
process.env.DATABASE_FILE = path.join(thuMucTam, 'thu.sqlite');

async function chay() {
  const { quanHeVoiNam, khoangNamHopLe, chiCuaNamAm, canCuaNamAm, loiYeuCauTuViNam } = await import('../../lib/ziwei/tu-vi-nam');
  const du = await import('../../lib/db/du-lieu');

  // Năm Bính Ngọ 2026: Ngọ = 6, Bính = 2
  assert.equal(chiCuaNamAm(2026), 6);
  assert.equal(canCuaNamAm(2026), 2);
  assert.equal(quanHeVoiNam(6, 6), 'thai-tue');
  assert.equal(quanHeVoiNam(0, 6), 'xung'); // Tý xung Ngọ
  assert.equal(quanHeVoiNam(7, 6), 'luc-hop'); // Mùi hợp Ngọ
  assert.equal(quanHeVoiNam(2, 6), 'tam-hop'); // Dần Ngọ Tuất
  assert.equal(quanHeVoiNam(3, 6), 'khong'); // Mão
  for (let chi = 0; chi < 12; chi++) {
    assert.equal(quanHeVoiNam(chi, 6) === 'xung', chi === 0);
    assert.ok(loiYeuCauTuViNam(2026, chi).includes('Bính Ngọ'));
  }
  assert.ok(loiYeuCauTuViNam(2026, 3).includes('con Mèo'), 'tuổi Mão là con Mèo');
  assert.deepEqual(khoangNamHopLe(2026), [2025, 2027]);

  // Bộ nhớ đệm: ghi một lần, không ghi đè, đếm theo 24 giờ
  const goc = 1_700_000_000_000;
  assert.equal(du.layTuViNam(2026)[3], undefined);
  assert.equal(du.luuTuViNam(2026, 3, 'bài đầu', goc), true);
  assert.equal(du.luuTuViNam(2026, 3, 'bài thứ hai', goc + 1), false, 'không ghi đè bài đã có');
  assert.equal(du.layTuViNam(2026)[3], 'bài đầu');
  assert.equal(du.luuTuViNam(2027, 3, 'năm khác', goc), true, 'năm khác lưu riêng');
  assert.equal(du.demLanSinhGanDay(goc + 1000), 2);
  assert.equal(du.demLanSinhGanDay(goc + 25 * 3600 * 1000), 0, 'quá 24 giờ thì không tính');
  for (let chi = 0; chi < 12; chi++) du.luuTuViNam(2026, chi, `bài ${chi}`, goc);
  assert.equal(Object.keys(du.layTuViNam(2026)).length, 12, 'mỗi năm tối đa 12 con giáp');

  console.log('✓ Tử vi năm: quan hệ hợp xung, giới hạn năm, bộ nhớ đệm không ghi đè, tối đa 12 bài mỗi năm');
}
chay().then(() => { try { fs.rmSync(thuMucTam, { recursive: true, force: true }); } catch { /* Windows còn giữ tệp cơ sở dữ liệu đang mở: để hệ điều hành dọn thư mục tạm */ } process.exit(0); }, (e) => { console.error(e); process.exit(1); });
