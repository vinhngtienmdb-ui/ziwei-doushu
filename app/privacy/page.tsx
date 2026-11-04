export const metadata = { title: 'Chính sách quyền riêng tư · Lá số Tử Vi', description: 'Chính sách quyền riêng tư của Lá số Tử Vi' };

export default function PrivacyPage() {
  return (
    <>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Chính sách quyền riêng tư</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: tháng 4 năm 2026</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>1. Thông tin chúng tôi thu thập</h2>
      <p>Để cung cấp dịch vụ lập lá số và luận giải Tử Vi, chúng tôi có thể thu thập các thông tin sau:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Thông tin cần thiết để lập lá số</strong>: họ tên (không bắt buộc), ngày tháng năm sinh dương lịch, giờ sinh, giới tính, kinh độ nơi sinh</li>
        <li><strong>Thông tin tài khoản (sau khi đăng ký)</strong>: số điện thoại (dùng để xác minh qua tin nhắn và dịch vụ hội viên)</li>
        <li><strong>Thông tin tương tác</strong>: thao tác nhấp chuột, lượt xem và lịch sử lá số của bạn trên trang</li>
        <li><strong>Thông tin phản hồi</strong>: điểm "đúng / không đúng" và góp ý bằng chữ của bạn về nội dung luận giải</li>
        <li><strong>Thông tin thanh toán</strong>: khi mua hội viên hoặc dịch vụ riêng lẻ, giao dịch được xử lý qua bên thanh toán thứ ba (Alipay / WeChat Pay); nền tảng không lưu số thẻ đầy đủ hay mật khẩu</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>2. Chúng tôi sử dụng thông tin như thế nào</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li>Thông tin lá số chỉ dùng cho lần luận giải này và lịch sử lá số trong tài khoản của bạn</li>
        <li>Số điện thoại dùng để đăng ký, đăng nhập và thông báo đơn hàng</li>
        <li>Thông tin phản hồi dùng để liên tục cải thiện chất lượng nội dung mệnh lý (phân tích tổng hợp sau khi đã ẩn danh)</li>
        <li>Dữ liệu tổng hợp có thể dùng cho nghiên cứu ngành và tối ưu nền tảng</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>3. Chia sẻ thông tin và bên thứ ba</h2>
      <p>Ngoài các trường hợp sau, chúng tôi không chia sẻ thông tin cá nhân của bạn cho bên thứ ba:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li>Nhà cung cấp thanh toán (Alipay / WeChat Pay): xử lý quyết toán đơn hàng</li>
        <li>Nhà cung cấp tin nhắn (như tin nhắn Alibaba Cloud): gửi mã xác minh</li>
        <li>Nhà cung cấp đám mây (như Vercel / Cloudflare / Alibaba Cloud): làm nơi lưu trữ kỹ thuật</li>
        <li>Dịch vụ luận giải AI (như Anthropic Claude): xử lý cuộc trò chuyện "hỏi tự do" của bạn (đã ẩn danh)</li>
        <li>Cơ quan tư pháp hoặc cơ quan nhà nước yêu cầu hợp pháp theo quy định của pháp luật</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>4. An toàn thông tin</h2>
      <p>Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý phổ biến trong ngành để bảo vệ thông tin của bạn (mã hóa truyền tải bằng HTTPS, mã hóa lưu trữ cơ sở dữ liệu, kiểm soát quyền truy cập, v.v.). Tuy nhiên xin lưu ý, truyền tải qua Internet không thể bảo đảm an toàn tuyệt đối.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>5. Quyền của bạn</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Tra cứu</strong>: có thể xem toàn bộ lịch sử lá số và đơn hàng của bạn trong trung tâm tài khoản</li>
        <li><strong>Xóa</strong>: liên hệ chăm sóc khách hàng để xóa lá số chỉ định trong tài khoản hoặc hủy tài khoản</li>
        <li><strong>Xuất dữ liệu</strong>: có thể yêu cầu xuất toàn bộ dữ liệu cá nhân của bạn</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>6. Cookie và lưu trữ cục bộ</h2>
      <p>Trang này dùng cookie / localStorage để: lưu lựa chọn giao diện tối hoặc sáng, lịch sử lá số gần đây và trạng thái đăng nhập hội viên. Bạn có thể tắt trong phần cài đặt trình duyệt, nhưng một số chức năng có thể bị ảnh hưởng.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>7. Người chưa thành niên</h2>
      <p>Nội dung mệnh lý của nền tảng dành cho người dùng đủ 18 tuổi trở lên. Người chưa thành niên cần dùng khi có sự đồng ý của người giám hộ và không được dùng kết quả luận giải cho các quyết định lớn trong đời.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>8. Thay đổi chính sách</h2>
      <p>Chính sách này có thể được cập nhật không định kỳ. Các thay đổi quan trọng sẽ được thông báo theo cách dễ nhận thấy. Tiếp tục sử dụng đồng nghĩa với việc đồng ý với phiên bản đã cập nhật.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)' }}>Điều khoản dịch vụ</a> · <a href="/" style={{ color: 'var(--ac)' }}>Về trang chủ</a>
        </p>
      </main>
    </>
  );
}
