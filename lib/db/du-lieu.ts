import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { layCsdl } from './csdl';

/** Các hàm đọc ghi dữ liệu. Mọi truy vấn lá số và hỏi đáp đều kèm mã người dùng để không đọc nhầm dữ liệu của người khác. */

export const THOI_HAN_PHIEN_MS = 30 * 24 * 60 * 60 * 1000;
export const SO_LA_SO_TOI_DA = 50;
export const SO_HOI_DAP_TOI_DA = 500;
export const DO_DAI_HOI_DAP_TOI_DA = 20000;
export const DO_DAI_BIEU_MAU_TOI_DA = 4000;

export interface NguoiDung {
  id: string;
  email: string;
  ten: string | null;
  anh: string | null;
}

export interface LaSoDaLuu {
  id: string;
  ten: string;
  bieuMau: Record<string, unknown>;
  taoLuc: number;
}

export interface TinNhanDaLuu {
  vaiTro: 'user' | 'assistant';
  noiDung: string;
  an: boolean;
}

const bamMaPhien = (maPhien: string) => createHash('sha256').update(maPhien).digest('hex');

// ─── Người dùng và phiên ───────────────────────────────────────────

export function luuHoacCapNhatNguoiDung(thongTin: { googleSub: string; email: string; ten?: string | null; anh?: string | null }): NguoiDung {
  const db = layCsdl();
  const co = db.prepare('SELECT id FROM nguoi_dung WHERE google_sub = ?').get(thongTin.googleSub) as { id: string } | undefined;
  if (co) {
    db.prepare('UPDATE nguoi_dung SET email = ?, ten = ?, anh = ? WHERE id = ?')
      .run(thongTin.email, thongTin.ten ?? null, thongTin.anh ?? null, co.id);
    return { id: co.id, email: thongTin.email, ten: thongTin.ten ?? null, anh: thongTin.anh ?? null };
  }
  const id = randomUUID();
  db.prepare('INSERT INTO nguoi_dung (id, google_sub, email, ten, anh, tao_luc) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, thongTin.googleSub, thongTin.email, thongTin.ten ?? null, thongTin.anh ?? null, Date.now());
  return { id, email: thongTin.email, ten: thongTin.ten ?? null, anh: thongTin.anh ?? null };
}

/** Tạo phiên mới, trả về mã phiên gốc để đặt vào cookie. Cơ sở dữ liệu chỉ giữ giá trị băm của mã này. */
export function taoPhien(nguoiDungId: string, bayGio = Date.now()): string {
  const maPhien = randomBytes(32).toString('base64url');
  layCsdl().prepare('INSERT INTO phien (ma_bam, nguoi_dung_id, het_han) VALUES (?, ?, ?)')
    .run(bamMaPhien(maPhien), nguoiDungId, bayGio + THOI_HAN_PHIEN_MS);
  return maPhien;
}

export function layNguoiDungTheoPhien(maPhien: string | undefined, bayGio = Date.now()): NguoiDung | null {
  if (!maPhien) return null;
  const db = layCsdl();
  const dong = db.prepare(
    `SELECT n.id, n.email, n.ten, n.anh, p.het_han AS hetHan, p.ma_bam AS maBam
     FROM phien p JOIN nguoi_dung n ON n.id = p.nguoi_dung_id WHERE p.ma_bam = ?`,
  ).get(bamMaPhien(maPhien)) as { id: string; email: string; ten: string | null; anh: string | null; hetHan: number; maBam: string } | undefined;
  if (!dong) return null;
  if (dong.hetHan <= bayGio) {
    db.prepare('DELETE FROM phien WHERE ma_bam = ?').run(dong.maBam);
    return null;
  }
  return { id: dong.id, email: dong.email, ten: dong.ten, anh: dong.anh };
}

export function huyPhien(maPhien: string | undefined): void {
  if (!maPhien) return;
  layCsdl().prepare('DELETE FROM phien WHERE ma_bam = ?').run(bamMaPhien(maPhien));
}

export function donPhienHetHan(bayGio = Date.now()): void {
  layCsdl().prepare('DELETE FROM phien WHERE het_han <= ?').run(bayGio);
}

// ─── Lá số ─────────────────────────────────────────────────────────

export function lietKeLaSo(nguoiDungId: string): LaSoDaLuu[] {
  const dong = layCsdl().prepare('SELECT id, ten, bieu_mau AS bieuMau, tao_luc AS taoLuc FROM la_so WHERE nguoi_dung_id = ? ORDER BY tao_luc DESC')
    .all(nguoiDungId) as { id: string; ten: string; bieuMau: string; taoLuc: number }[];
  return dong.map((d) => ({ id: d.id, ten: d.ten, bieuMau: JSON.parse(d.bieuMau), taoLuc: d.taoLuc }));
}

export function layLaSo(nguoiDungId: string, laSoId: string): LaSoDaLuu | null {
  const d = layCsdl().prepare('SELECT id, ten, bieu_mau AS bieuMau, tao_luc AS taoLuc FROM la_so WHERE id = ? AND nguoi_dung_id = ?')
    .get(laSoId, nguoiDungId) as { id: string; ten: string; bieuMau: string; taoLuc: number } | undefined;
  return d ? { id: d.id, ten: d.ten, bieuMau: JSON.parse(d.bieuMau), taoLuc: d.taoLuc } : null;
}

/** Lưu lá số mới. Trả về mã lá số, hoặc 'day' khi đã đạt số lượng tối đa của mỗi người dùng. */
export function luuLaSo(nguoiDungId: string, ten: string, bieuMau: Record<string, unknown>): string | 'day' {
  const db = layCsdl();
  const dem = (db.prepare('SELECT COUNT(*) AS n FROM la_so WHERE nguoi_dung_id = ?').get(nguoiDungId) as { n: number }).n;
  if (dem >= SO_LA_SO_TOI_DA) return 'day';
  const id = randomUUID();
  db.prepare('INSERT INTO la_so (id, nguoi_dung_id, ten, bieu_mau, tao_luc) VALUES (?, ?, ?, ?, ?)')
    .run(id, nguoiDungId, ten, JSON.stringify(bieuMau), Date.now());
  return id;
}

export function xoaLaSo(nguoiDungId: string, laSoId: string): boolean {
  const kq = layCsdl().prepare('DELETE FROM la_so WHERE id = ? AND nguoi_dung_id = ?').run(laSoId, nguoiDungId);
  return Number(kq.changes) > 0;
}

// ─── Hỏi đáp ───────────────────────────────────────────────────────

export function lietKeHoiDap(nguoiDungId: string, laSoId: string): TinNhanDaLuu[] | null {
  if (!layLaSo(nguoiDungId, laSoId)) return null;
  const dong = layCsdl().prepare('SELECT vai_tro AS vaiTro, noi_dung AS noiDung, an FROM hoi_dap WHERE la_so_id = ? ORDER BY id')
    .all(laSoId) as { vaiTro: 'user' | 'assistant'; noiDung: string; an: number }[];
  return dong.map((d) => ({ vaiTro: d.vaiTro, noiDung: d.noiDung, an: d.an === 1 }));
}

/** Thêm các tin nhắn vào lịch sử. Trả về false khi lá số không thuộc người dùng hoặc lịch sử đã quá dài. */
export function themHoiDap(nguoiDungId: string, laSoId: string, tinNhan: TinNhanDaLuu[]): boolean {
  if (!layLaSo(nguoiDungId, laSoId)) return false;
  const db = layCsdl();
  const dem = (db.prepare('SELECT COUNT(*) AS n FROM hoi_dap WHERE la_so_id = ?').get(laSoId) as { n: number }).n;
  if (dem + tinNhan.length > SO_HOI_DAP_TOI_DA) return false;
  const chen = db.prepare('INSERT INTO hoi_dap (la_so_id, vai_tro, noi_dung, an, tao_luc) VALUES (?, ?, ?, ?, ?)');
  const bayGio = Date.now();
  for (const t of tinNhan) chen.run(laSoId, t.vaiTro, t.noiDung.slice(0, DO_DAI_HOI_DAP_TOI_DA), t.an ? 1 : 0, bayGio);
  return true;
}

// ─── Tử vi chung theo năm (dùng chung cho mọi người, sinh một lần rồi lưu đệm) ──────────

/** Số lần sinh mới tối đa trong 24 giờ trên toàn hệ thống, để chi phí gọi AI không vượt tầm kiểm soát. */
export const SO_LAN_SINH_TOI_DA_MOI_NGAY = 24;

export function layTuViNam(nam: number): Record<number, string> {
  const dong = layCsdl().prepare('SELECT chi, noi_dung AS noiDung FROM tu_vi_nam WHERE nam = ?').all(nam) as { chi: number; noiDung: string }[];
  return Object.fromEntries(dong.map((d) => [d.chi, d.noiDung]));
}

/** Lưu nội dung; nếu con giáp của năm đó đã có thì giữ bản cũ. Trả về true nếu bản này được lưu. */
export function luuTuViNam(nam: number, chi: number, noiDung: string, bayGio = Date.now()): boolean {
  const kq = layCsdl().prepare('INSERT OR IGNORE INTO tu_vi_nam (nam, chi, noi_dung, tao_luc) VALUES (?, ?, ?, ?)').run(nam, chi, noiDung.slice(0, 20000), bayGio);
  return Number(kq.changes) > 0;
}

export function demLanSinhGanDay(bayGio = Date.now()): number {
  const d = layCsdl().prepare('SELECT COUNT(*) AS n FROM tu_vi_nam WHERE tao_luc > ?').get(bayGio - 24 * 60 * 60 * 1000) as { n: number };
  return d.n;
}
