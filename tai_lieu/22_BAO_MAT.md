# 22. Bảo mật

## 1. Dữ liệu nhạy cảm
Email, tên, ảnh Google; ngày giờ sinh trong lá số; nội dung hỏi đáp.

## 2. Điểm tiếp nhận dữ liệu từ bên ngoài
Các điểm cuối API ở tài liệu `17`. Máy chủ tính lại vận hạn, không tin dữ liệu tính sẵn từ trình duyệt.

## 3. Xác thực và phiên đăng nhập
Đăng nhập Google; cookie phiên httpOnly, SameSite=Lax; chỉ lưu mã băm của mã phiên.

## 4. Ma trận phân quyền
Người dùng chỉ đọc, ghi, xóa lá số và hỏi đáp của chính mình. Bài tử vi năm dùng chung, chỉ đọc; sinh mới bị giới hạn 24 bài mỗi 24 giờ toàn hệ thống và trong khoảng năm hiện tại trừ 1 đến cộng 1.

## 5. Quản lý khóa bí mật
Khóa chỉ nằm trong `.env.local`, không đưa vào chat hoặc mã nguồn.

## 8. Rủi ro đã chấp nhận
Chưa có giới hạn tần suất theo người dùng cho `/api/interpret` và `/api/van-han`. Cần xác nhận có bổ sung không.
