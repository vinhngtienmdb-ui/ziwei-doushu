# 26. Kế hoạch triển khai (đề xuất, chưa phê duyệt, chưa triển khai)

## 1. Ràng buộc từ mã nguồn
- Cơ sở dữ liệu là một tệp SQLite ghi trực tiếp: nơi chạy phải có đĩa lưu trữ bền vững và chỉ một bản chạy ứng dụng (không chạy nhiều bản song song trên cùng tệp).
- Cần Node 22.5 trở lên (`node:sqlite`); môi trường phát triển đang dùng 24.14.1.
- Máy chủ phải chạy liên tục (`next start`); nền tảng chỉ có hàm không trạng thái (kiểu serverless, ví dụ Vercel) không phù hợp trừ khi đổi sang cơ sở dữ liệu ngoài.
- Luồng SSE của luận giải AI cần máy chủ không cắt kết nối sớm.

## 2. Phương án đề xuất
Một dịch vụ web chạy Node có gắn đĩa bền vững (Render, Railway hoặc máy ảo riêng), một bản chạy duy nhất.
1. Lệnh dựng: `npm ci` rồi `npm run build`. Lệnh chạy: `npm start`.
2. Gắn đĩa, đặt `DATABASE_FILE` trỏ vào đường dẫn trên đĩa đó.
3. Đặt biến môi trường: `ANTHROPIC_API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_SITE_URL` (địa chỉ gốc thật), `AUTH_ORIGIN` nếu chạy sau máy chủ trung gian. Giá trị nhập trực tiếp trên bảng điều khiển của nền tảng, không đưa vào mã nguồn hay chat.
4. Google Cloud Console: thêm địa chỉ chuyển hướng `<địa chỉ gốc>/api/auth/google/callback` vào OAuth client.
5. Tên miền và HTTPS do nền tảng cấp; cookie phiên cần chạy trên HTTPS.
6. Sao lưu: sao chép tệp SQLite theo lịch (dùng sao lưu của đĩa hoặc `VACUUM INTO`), thử khôi phục ít nhất một lần.

## 3. Kiểm tra trước khi triển khai
- `npm run typecheck` và `npm test` đều qua trên nhánh sẽ phát hành.
- Merge PR vào nhánh chính. Cần xác nhận: triển khai từ bản sao của bạn hay từ kho gốc.

## 4. Kiểm tra sau khi triển khai
- Đăng nhập Google, lưu lá số, hỏi đáp, vận hạn, tử vi năm một con giáp, xóa tài khoản thử.
- Khởi động lại dịch vụ, xác nhận dữ liệu còn.
- Theo dõi chi phí gọi AI trong vài ngày đầu (tử vi năm tối đa 24 bài mới mỗi 24 giờ; luận giải và vận hạn giới hạn theo giờ).

## 5. Cần xác nhận trước khi làm
- Nền tảng đích và tên miền.
- Giới hạn tần suất gọi AI đã được thêm (tài liệu `22`, mục 8); cần bảo đảm nền tảng chuyển tiếp tiêu đề X-Forwarded-For đúng.
- Phê duyệt từng lần triển khai lên môi trường thật.

## 6. Thu hồi
Triển khai lại bản trước từ nền tảng; dữ liệu nằm trên đĩa riêng nên không mất. Nếu lược đồ đã nâng phiên bản, không hạ phiên bản cơ sở dữ liệu: khôi phục từ bản sao lưu.
