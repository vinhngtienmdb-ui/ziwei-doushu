# 16. Cơ sở dữ liệu

SQLite, tệp mặc định `data/ung-dung.sqlite` (đổi bằng `DATABASE_FILE`), chế độ WAL, khóa ngoại bật, phiên bản lược đồ lưu bằng `PRAGMA user_version` (hiện là 2).

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `nguoi_dung` | id, google_sub (duy nhất), email, ten, anh, tao_luc | |
| `phien` | ma_bam (khóa), nguoi_dung_id, het_han | Lưu mã băm; xóa theo người dùng |
| `la_so` | id, nguoi_dung_id, ten, bieu_mau, tao_luc | Xóa theo người dùng |
| `hoi_dap` | id, la_so_id, vai_tro, noi_dung, an, tao_luc | Xóa theo lá số |
| `tu_vi_nam` | (nam, chi) khóa, noi_dung, tao_luc | Dùng chung, không gắn người dùng |

Thay đổi lược đồ: tăng `PHIEN_BAN_LUOC_DO` trong `lib/db/csdl.ts`.
