# 17. Đặc tả API

Mọi yêu cầu ghi kiểm tra nguồn gốc (Origin). Điểm cuối cần đăng nhập dùng cookie phiên.

| Điểm cuối | Phương thức | Nội dung |
|---|---|---|
| `/api/auth/google`, `/api/auth/google/callback` | GET | Bắt đầu và hoàn tất đăng nhập Google |
| `/api/auth/toi` | GET | Thông tin người dùng hiện tại |
| `/api/auth/dang-xuat` | POST | Đăng xuất |
| `/api/la-so`, `/api/la-so/[id]` | GET, POST, DELETE | Lá số đã lưu |
| `/api/la-so/[id]/hoi-dap` | GET, POST | Hỏi đáp theo lá số |
| `/api/interpret` | POST | Luận giải AI (SSE) |
| `/api/van-han` | POST {chart, ngay, thang, nam, tang} | Vận hạn và luận giải AI |
| `/api/tu-vi-nam` | POST {nam, chi} | Bài tử vi năm, sinh một lần rồi lưu đệm |
| `/api/tai-khoan` | DELETE | Xóa tài khoản và toàn bộ dữ liệu |

Cần xác nhận: phương thức và mã lỗi chi tiết của từng điểm cuối (hiện nằm trong mã nguồn; bảng trên suy ra từ tên và công dụng).
