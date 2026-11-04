# 02. Nhật ký dự án

## 2026-11-04
### Công việc đã thực hiện
- Giai đoạn C: vận hạn cá nhân theo năm, tháng, ngày kèm luận giải AI.
- Giai đoạn D: tử vi chung 12 con giáp theo năm, AI viết một lần rồi lưu đệm (commit f997e80).
- Bảng chọn nhanh năm, tháng âm lịch, ngày âm lịch ở trang Vận hạn (commit b5acc67).
- Người dùng tự xóa tài khoản cùng toàn bộ lá số và hỏi đáp (commit 65c2c01).
- Đẩy nhánh lên bản sao của người dùng và mở pull request số 1.
### Quyết định
- Kho gốc chỉ cho đọc nên dùng bản sao qua remote `fork`.
- Giữ cơ sở dữ liệu mặc định tại `data/ung-dung.sqlite`.
### Thay đổi
Xem lịch sử commit của nhánh `viet-hoa/giao-dien`.
### Vấn đề tồn đọng
- Chưa bấm thử trên giao diện: bảng chọn nhanh, nút xóa tài khoản, hiển thị mới của tử vi năm.
- Khung trình duyệt tích hợp tự tải lại liên tục ở trang truy cập cơ sở dữ liệu.
- Thư mục thừa `~/.ziwei-doushu` chưa xóa được (tệp đang được dùng).
