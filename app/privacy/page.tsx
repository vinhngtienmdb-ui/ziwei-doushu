export const metadata = { title: 'Chính sách quyền riêng tư · Lá số Tử Vi', description: 'Chính sách quyền riêng tư của Lá số Tử Vi' };

const tieuDe = { fontSize: 18, marginTop: 32, marginBottom: 12 } as const;

export default function PrivacyPage() {
  return (
    <>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Chính sách quyền riêng tư</h1>
        <p style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: tháng 11 năm 2026</p>

        <h2 style={tieuDe}>1. Thông tin được thu thập</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li><strong>Khi chỉ lập lá số</strong>: ngày giờ sinh, giới tính, nơi sinh (tỉnh và xã, phường) và họ tên nếu bạn nhập. Dữ liệu này được xử lý ngay trên trình duyệt và không được lưu nếu bạn không đăng nhập.</li>
          <li><strong>Khi đăng nhập bằng Google</strong>: tên, địa chỉ thư điện tử và ảnh đại diện từ tài khoản Google của bạn. Chúng tôi không nhận và không lưu mật khẩu.</li>
          <li><strong>Khi bạn bấm &quot;Lưu lá số&quot;</strong>: thông tin biểu mẫu của lá số đó, và lịch sử câu hỏi, câu trả lời AI gắn với lá số.</li>
        </ul>

        <h2 style={tieuDe}>2. Mục đích sử dụng</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li>Nhận diện tài khoản và giữ phiên đăng nhập của bạn.</li>
          <li>Lưu để bạn mở lại lá số và lịch sử hỏi đáp ở các lần sau.</li>
          <li>Gửi lá số và câu hỏi tới dịch vụ AI để tạo phần luận giải.</li>
        </ul>

        <h2 style={tieuDe}>3. Chia sẻ với bên thứ ba</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li><strong>Google</strong>: xác thực đăng nhập.</li>
          <li><strong>Anthropic (dịch vụ Claude)</strong>: khi bạn dùng phần AI luận giải, thông tin lá số và nội dung câu hỏi được gửi tới dịch vụ này để tạo câu trả lời. Không gửi tên và địa chỉ thư điện tử của tài khoản.</li>
          <li>Cơ quan nhà nước có thẩm quyền khi có yêu cầu hợp pháp theo quy định của pháp luật.</li>
        </ul>
        <p>Ngoài các trường hợp trên, chúng tôi không bán hay chia sẻ thông tin của bạn cho bên khác.</p>

        <h2 style={tieuDe}>4. Lưu trữ và an toàn</h2>
        <p>Dữ liệu tài khoản, lá số và hỏi đáp được lưu trong cơ sở dữ liệu trên máy chủ chạy ứng dụng. Mã phiên đăng nhập được đặt trong cookie chỉ dành cho máy chủ (httpOnly) và cơ sở dữ liệu chỉ giữ giá trị băm của mã này. Mỗi người chỉ truy cập được dữ liệu của chính mình. Truyền tải qua Internet không thể bảo đảm an toàn tuyệt đối, nên hãy bảo vệ tài khoản Google của bạn.</p>

        <h2 style={tieuDe}>5. Quyền của bạn</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li><strong>Xem</strong>: các lá số đã lưu hiển thị ở trang <a href="/tai-khoan" style={{ color: 'var(--ac)' }}>Tài khoản</a>.</li>
          <li><strong>Xóa</strong>: bấm &quot;Xóa&quot; ở từng lá số, hỏi đáp của lá số đó bị xóa theo.</li>
          <li><strong>Xóa tài khoản</strong>: ở trang <a href="/tai-khoan">Tài khoản</a>, mục           <li><strong>Xóa tài khoản hoặc yêu cầu bản sao dữ liệu</strong>: liên hệ người vận hành trang.</li>quot;Xóa tài khoản          <li><strong>Xóa tài khoản hoặc yêu cầu bản sao dữ liệu</strong>: liên hệ người vận hành trang.</li>quot; xóa vĩnh viễn tài khoản cùng mọi lá số và hỏi đáp. Muốn nhận bản sao dữ liệu, hãy liên hệ người vận hành trang.</li>
        </ul>

        <h2 style={tieuDe}>6. Cookie và lưu trữ cục bộ</h2>
        <p>Trang dùng cookie phiên để giữ đăng nhập (hết hạn sau 30 ngày hoặc khi bạn đăng xuất) và bộ nhớ cục bộ của trình duyệt để nhớ lựa chọn giao diện sáng hoặc tối. Nếu tắt chúng, một số chức năng có thể không hoạt động.</p>

        <h2 style={tieuDe}>7. Người chưa thành niên</h2>
        <p>Nội dung mệnh lý dành cho người dùng đủ 18 tuổi trở lên. Người chưa thành niên cần dùng khi có sự đồng ý của người giám hộ và không dùng kết quả cho các quyết định lớn trong đời.</p>

        <h2 style={tieuDe}>8. Thay đổi chính sách</h2>
        <p>Chính sách này có thể được cập nhật. Việc tiếp tục sử dụng đồng nghĩa với việc đồng ý với phiên bản đã cập nhật.</p>

        <p style={{ marginTop: 48, fontSize: 13, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)' }}>Điều khoản dịch vụ</a> · <a href="/" style={{ color: 'var(--ac)' }}>Về trang chủ</a>
        </p>
      </main>
    </>
  );
}
