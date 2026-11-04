export const metadata = { title: 'Điều khoản dịch vụ · Lá số Tử Vi', description: 'Điều khoản dịch vụ và thỏa thuận người dùng của Lá số Tử Vi' };

export default function TermsPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>Về trang chủ</span>
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.05em' }}>Lá số Tử Vi</span>
      </header>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Điều khoản dịch vụ</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: tháng 4 năm 2026</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>1. Tổng quan dịch vụ</h2>
      <p>Lá số Tử Vi (sau đây gọi là "nền tảng") cung cấp dịch vụ lập lá số và luận giải dựa trên hệ thống Tử Vi Đẩu Số trong «Thiên Kỷ» của Nghê Hải Hạ. Mọi nội dung mệnh lý trên nền tảng chỉ để tham khảo, <strong>không phải lời khuyên về y tế, đầu tư, pháp luật, tư vấn tâm lý hay các quyết định lớn trong đời</strong>.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>2. Quy tắc ứng xử của người dùng</h2>
      <p>Khi sử dụng nền tảng, bạn đồng ý:</p>
      <ul style={{ paddingLeft: 24 }}>
        <li>Chỉ sử dụng nền tảng cho mục đích hợp pháp và tham khảo cá nhân</li>
        <li>Không phát tán nội dung của nền tảng để bán, đăng lại hoặc công bố công khai vì mục đích thương mại</li>
        <li>Không có hành vi làm gián đoạn hoạt động bình thường của nền tảng</li>
        <li>Thông tin ngày giờ sinh đã gửi là chính xác; nền tảng không chịu trách nhiệm về sai lệch luận giải do thông tin sai</li>
      </ul>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>3. Quyền sở hữu trí tuệ và điều khoản cấm · Chống thu thập dữ liệu và chống huấn luyện</h2>
      <p style={{ background: 'rgba(168,50,40,0.06)', border: '1px solid rgba(168,50,40,0.2)', padding: 16, borderRadius: 8 }}>
        <strong>Toàn bộ nội dung mệnh lý, kho tri thức (gồm mọi văn bản luận giải của 14 chính tinh × 12 cung × nam nữ × tứ hóa × đại hạn lưu niên), thiết kế giao diện, phương án tích hợp thuật toán và kho ví dụ của nền tảng là do nền tảng tự biên soạn hoặc được chỉnh lý hợp pháp.</strong><br/><br/>
        Nghiêm cấm các hành vi sau; người vi phạm sẽ bị bảo lưu quyền yêu cầu bồi thường dân sự và truy cứu trách nhiệm hình sự:<br/>
        ① Dùng trình thu thập, tập lệnh tự động, gọi API hàng loạt hoặc bất kỳ biện pháp kỹ thuật nào để lấy nội dung của nền tảng;<br/>
        ② **Dùng để huấn luyện bất kỳ mô hình học máy nào** các luận giải lá số, văn bản và dữ liệu phản hồi API do nền tảng tạo ra (gồm nhưng không giới hạn mô hình ngôn ngữ lớn, mô hình sinh nội dung mệnh lý, mô hình sinh văn bản);<br/>
        ③ Bán lại hoặc đăng nội dung do nền tảng tạo ra lên các trang web, ứng dụng, tài khoản truyền thông khác;<br/>
        ④ Dịch ngược, sao chép, sửa đổi mã giao diện hoặc mã máy chủ của nền tảng để cung cấp dịch vụ tương tự dưới danh nghĩa "tự vận hành".<br/><br/>
        Văn bản do nền tảng xuất ra được nhúng dấu vân tay truy vết; kết quả đầu ra phát sinh từ việc sao chép hoặc huấn luyện trái phép có thể bị phát hiện và truy nguyên. Nếu phát hiện vi phạm, nền tảng có quyền yêu cầu <strong>bồi thường 1 triệu nhân dân tệ cho mỗi trường hợp vi phạm</strong>, đồng thời bảo lưu quyền khởi kiện ra tòa và phối hợp với cơ quan công an điều tra.
      </p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>4. Miễn trừ trách nhiệm</h2>
      <p>Nội dung mệnh lý của nền tảng được chỉnh lý từ tri thức Tử Vi Đẩu Số truyền thống và hệ thống của Nghê Hải Hạ, <strong>không bảo đảm chính xác 100%</strong>. Vận mệnh chịu ảnh hưởng chung của ba tài thiên, địa, nhân; kết quả nền tảng đưa ra chỉ để tham khảo khi tìm hiểu bản thân, người dùng cần nhìn nhận lý trí và không nên quá lệ thuộc vào bất kỳ phán đoán mệnh lý đơn lẻ nào.</p>
      <p>Nền tảng không chịu trách nhiệm pháp lý về mọi hậu quả phát sinh do sử dụng nội dung của nền tảng (gồm nhưng không giới hạn quyết định sai lầm, tác động tâm lý, thay đổi trong các mối quan hệ).</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>5. Thay đổi và chấm dứt dịch vụ</h2>
      <p>Nền tảng bảo lưu quyền điều chỉnh, tạm dừng hoặc chấm dứt một phần hay toàn bộ dịch vụ bất cứ lúc nào. Các thay đổi quan trọng sẽ được thông báo cho người dùng bằng thông báo trên trang hoặc thư điện tử.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>6. Pháp luật áp dụng và giải quyết tranh chấp</h2>
      <p>Điều khoản này áp dụng pháp luật của nước Cộng hòa Nhân dân Trung Hoa. Nếu phát sinh tranh chấp, hai bên cần thương lượng thiện chí; nếu thương lượng không thành, đưa ra tòa án nhân dân có thẩm quyền tại nơi đặt trụ sở của đơn vị vận hành nền tảng để giải quyết.</p>

      <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>7. Thông tin liên hệ</h2>
      <p>Nếu có thắc mắc, vui lòng liên hệ qua WeChat chăm sóc khách hàng hoặc thư điện tử do nền tảng công bố.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/privacy" style={{ color: 'var(--ac)' }}>Chính sách quyền riêng tư</a> · <a href="/" style={{ color: 'var(--ac)' }}>Về trang chủ</a>
        </p>
      </main>
    </>
  );
}
