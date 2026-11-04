# 01. Kế hoạch tổng thể

## 1. Mục tiêu dự án
Việt hóa ứng dụng Tử Vi Đẩu Số: giao diện, thuật ngữ, cổ thư, múi giờ GMT+7, lịch âm Việt Nam, địa danh Việt Nam; bổ sung luận giải bằng AI, tài khoản, lịch ngày tốt xấu, vận hạn cá nhân và tử vi năm theo con giáp.

## 2. Phạm vi phiên bản hiện tại
Nhánh `viet-hoa/giao-dien`, đã gửi lên pull request số 1 trong bản sao của người dùng (vinhngtienmdb-ui/ziwei-doushu). Chưa triển khai lên môi trường thật.

## 3. Tiến độ theo giai đoạn
Chưa áp dụng đầy đủ các giai đoạn 01 đến 08 của quy trình; tài liệu này lập bổ sung từ hiện trạng. Cần xác nhận: có lập tiếp các tài liệu 05 đến 11 không.

## 4. Danh sách module
- MODULE_01: Lá số và lịch âm Việt Nam (`lib/ziwei`, `lib/lich`)
- MODULE_02: Tài khoản, lá số đã lưu, hỏi đáp (`lib/auth`, `lib/db`, `app/tai-khoan`)
- MODULE_03: Luận giải AI (`lib/ai`, `app/api/interpret`)
- MODULE_04: Lịch ngày tốt xấu (`app/lich`)
- MODULE_05: Vận hạn cá nhân (`app/van-han`)
- MODULE_06: Tử vi năm theo con giáp (`app/tu-vi-nam`)

## 5. Mốc phát hành
Chưa có phiên bản phát hành. Cần xác nhận mốc và đích triển khai.

## 6. Rủi ro và phương án xử lý
- Bản dịch thuật ngữ chưa được chuyên gia rà soát: nhờ người am hiểu Tử Vi kiểm tra.
- Khoảng 0,1% ngày 30 âm lịch trong lá số được xấp xỉ: đã ghi nhận, chưa xử lý.
- Trụ tiết khí của tứ trụ còn tính theo GMT+8.
- SQLite dạng tệp: khi triển khai cần đĩa lưu trữ bền vững và sao lưu.
- Khung trình duyệt tích hợp tự tải lại ở trang có truy cập cơ sở dữ liệu: chưa rõ nguyên nhân, chỉ xảy ra trong khung đó.
