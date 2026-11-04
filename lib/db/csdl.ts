import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Cơ sở dữ liệu SQLite cục bộ (tệp), dùng module `node:sqlite` có sẵn của Node 22.5 trở lên.
 * Đường dẫn mặc định: data/ung-dung.sqlite trong thư mục dự án; đổi bằng biến DATABASE_FILE.
 */
const LUOC_DO = `
CREATE TABLE IF NOT EXISTS nguoi_dung (
  id TEXT PRIMARY KEY,
  google_sub TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  ten TEXT,
  anh TEXT,
  tao_luc INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS phien (
  ma_bam TEXT PRIMARY KEY,
  nguoi_dung_id TEXT NOT NULL REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  het_han INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS chi_muc_phien_nguoi_dung ON phien(nguoi_dung_id);
CREATE TABLE IF NOT EXISTS la_so (
  id TEXT PRIMARY KEY,
  nguoi_dung_id TEXT NOT NULL REFERENCES nguoi_dung(id) ON DELETE CASCADE,
  ten TEXT NOT NULL,
  bieu_mau TEXT NOT NULL,
  tao_luc INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS chi_muc_la_so_nguoi_dung ON la_so(nguoi_dung_id, tao_luc DESC);
CREATE TABLE IF NOT EXISTS hoi_dap (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  la_so_id TEXT NOT NULL REFERENCES la_so(id) ON DELETE CASCADE,
  vai_tro TEXT NOT NULL CHECK (vai_tro IN ('user', 'assistant')),
  noi_dung TEXT NOT NULL,
  an INTEGER NOT NULL DEFAULT 0,
  tao_luc INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS chi_muc_hoi_dap_la_so ON hoi_dap(la_so_id, id);
`;

// Giữ một kết nối duy nhất dù mô-đun bị nạp lại nhiều lần khi chạy chế độ phát triển
const kho = globalThis as unknown as { __csdlUngDung?: { duongDan: string; db: DatabaseSync } };

export function layCsdl(): DatabaseSync {
  const duongDan = process.env.DATABASE_FILE || path.join(process.cwd(), 'data', 'ung-dung.sqlite');
  if (kho.__csdlUngDung && kho.__csdlUngDung.duongDan === duongDan) return kho.__csdlUngDung.db;
  fs.mkdirSync(path.dirname(duongDan), { recursive: true });
  const db = new DatabaseSync(duongDan);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  db.exec(LUOC_DO);
  kho.__csdlUngDung = { duongDan, db };
  return db;
}
