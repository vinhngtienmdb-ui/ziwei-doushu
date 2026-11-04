/**
 * Kiểm thử lớp dữ liệu tài khoản: người dùng, phiên đăng nhập, lá số đã lưu, hỏi đáp.
 * Dùng tệp SQLite tạm, không đụng tới dữ liệu thật.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const thuMucTam = fs.mkdtempSync(path.join(os.tmpdir(), 'ziwei-tai-khoan-'));
process.env.DATABASE_FILE = path.join(thuMucTam, 'thu.sqlite');

async function chay() {
  const du = await import('../../lib/db/du-lieu');
  const { layCsdl } = await import('../../lib/db/csdl');

  // 1. Người dùng: cùng tài khoản Google đăng nhập lại thì không tạo bản ghi mới
  const a = du.luuHoacCapNhatNguoiDung({ googleSub: 'g-a', email: 'a@example.com', ten: 'An' });
  const aLai = du.luuHoacCapNhatNguoiDung({ googleSub: 'g-a', email: 'a2@example.com', ten: 'An Mới' });
  assert.equal(aLai.id, a.id, 'cùng googleSub phải trùng mã người dùng');
  assert.equal(aLai.email, 'a2@example.com', 'thông tin được cập nhật khi đăng nhập lại');
  const b = du.luuHoacCapNhatNguoiDung({ googleSub: 'g-b', email: 'b@example.com' });
  assert.notEqual(a.id, b.id);

  // 2. Phiên: mã gốc không được lưu nguyên văn, hết hạn thì bị xóa
  const goc = 1_700_000_000_000;
  const maPhien = du.taoPhien(a.id, goc);
  const luuTru = layCsdl().prepare('SELECT ma_bam FROM phien').all() as { ma_bam: string }[];
  assert.ok(luuTru.every((d) => d.ma_bam !== maPhien), 'cơ sở dữ liệu chỉ giữ giá trị băm của mã phiên');
  assert.equal(du.layNguoiDungTheoPhien(maPhien, goc + 1000)?.id, a.id, 'phiên còn hạn trả về đúng người dùng');
  assert.equal(du.layNguoiDungTheoPhien('ma-gia', goc), null, 'mã phiên lạ bị từ chối');
  assert.equal(du.layNguoiDungTheoPhien(undefined, goc), null);
  assert.equal(du.layNguoiDungTheoPhien(maPhien, goc + du.THOI_HAN_PHIEN_MS + 1), null, 'phiên quá hạn bị từ chối');
  assert.equal(du.layNguoiDungTheoPhien(maPhien, goc + 1000), null, 'phiên quá hạn đã bị xóa khỏi cơ sở dữ liệu');
  const maPhien2 = du.taoPhien(a.id);
  du.huyPhien(maPhien2);
  assert.equal(du.layNguoiDungTheoPhien(maPhien2), null, 'đăng xuất hủy phiên');

  // 3. Lá số: mỗi người chỉ thấy lá số của mình
  const id1 = du.luuLaSo(a.id, 'Lá số của An', { year: '1990', month: '5', day: '20' });
  assert.notEqual(id1, 'day');
  assert.equal(du.lietKeLaSo(a.id).length, 1);
  assert.equal(du.lietKeLaSo(b.id).length, 0, 'người dùng khác không thấy lá số');
  assert.equal(du.layLaSo(b.id, id1 as string), null, 'người dùng khác không đọc được lá số theo mã');
  assert.equal(du.xoaLaSo(b.id, id1 as string), false, 'người dùng khác không xóa được lá số');
  assert.deepEqual(du.layLaSo(a.id, id1 as string)?.bieuMau, { year: '1990', month: '5', day: '20' });

  // 4. Hỏi đáp: ghi, đọc đúng thứ tự, chặn người khác
  assert.equal(du.themHoiDap(b.id, id1 as string, [{ vaiTro: 'user', noiDung: 'x', an: false }]), false, 'người khác không ghi được vào lịch sử');
  assert.equal(du.themHoiDap(a.id, id1 as string, [
    { vaiTro: 'user', noiDung: 'Sự nghiệp?', an: true },
    { vaiTro: 'assistant', noiDung: 'Trả lời', an: false },
  ]), true);
  const lichSu = du.lietKeHoiDap(a.id, id1 as string);
  assert.deepEqual(lichSu, [
    { vaiTro: 'user', noiDung: 'Sự nghiệp?', an: true },
    { vaiTro: 'assistant', noiDung: 'Trả lời', an: false },
  ]);
  assert.equal(du.lietKeHoiDap(b.id, id1 as string), null, 'người khác không đọc được lịch sử');

  // 5. Giới hạn số lá số
  for (let i = 1; i < du.SO_LA_SO_TOI_DA; i++) assert.notEqual(du.luuLaSo(a.id, `Lá số ${i}`, {}), 'day');
  assert.equal(du.luuLaSo(a.id, 'Thừa', {}), 'day', 'vượt số lá số tối đa thì bị từ chối');

  // 6. Xóa lá số kéo theo xóa hỏi đáp
  assert.equal(du.xoaLaSo(a.id, id1 as string), true);
  const con = (layCsdl().prepare('SELECT COUNT(*) AS n FROM hoi_dap').get() as { n: number }).n;
  assert.equal(con, 0, 'xóa lá số xóa luôn hỏi đáp của nó');

  console.log('✓ Lớp dữ liệu tài khoản: người dùng, phiên, lá số, hỏi đáp, giới hạn và cách ly dữ liệu đều đúng');
}

chay()
  .catch((loi) => { console.error(loi); process.exitCode = 1; })
  .finally(async () => {
    // Windows không xóa được tệp khi kết nối còn mở
    try { (await import('../../lib/db/csdl')).layCsdl().close(); } catch { /* đã đóng */ }
    try { fs.rmSync(thuMucTam, { recursive: true, force: true, maxRetries: 3 }); } catch { /* thư mục tạm, hệ điều hành sẽ dọn */ }
  });
