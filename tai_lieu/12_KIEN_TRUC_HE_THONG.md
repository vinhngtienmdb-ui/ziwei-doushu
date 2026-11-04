# 12. Kiến trúc hệ thống

Ứng dụng Next.js 16 (App Router) chạy một tiến trình, gồm trang giao diện, điểm cuối API và cơ sở dữ liệu SQLite dạng tệp.

| Thư mục | Vai trò |
|---|---|
| `app/` | Trang và điểm cuối API |
| `components/` | Thành phần giao diện dùng chung |
| `lib/ziwei/` | Lập lá số, vận hạn, tử vi năm (dựa trên iztro) |
| `lib/lich/` | Lịch âm Việt Nam GMT+7, ngày tốt xấu |
| `lib/ai/` | Gọi Claude, truyền luồng SSE |
| `lib/auth/` | Đăng nhập Google, phiên |
| `lib/db/` | Kết nối và truy vấn SQLite |
| `scripts/regression/` | Kiểm thử hồi quy |

Luồng luận giải AI: trang gửi lá số tới điểm cuối API; máy chủ tính lại dữ liệu, dựng ngữ cảnh, gọi Claude, trả về luồng SSE. Bài tử vi năm gọi một lần, lưu vào bảng `tu_vi_nam` để mọi người dùng chung.
