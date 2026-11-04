import Link from 'next/link';
import { layNguoiDungHienTai } from '@/lib/auth/phien';
import { lietKeLaSo } from '@/lib/db/du-lieu';
import NutXoaLaSo from './NutXoaLaSo';
import NutXoaTaiKhoan from './NutXoaTaiKhoan';

export const metadata = {
  title: 'Tài khoản · Lá số Tử Vi',
  description: 'Đăng nhập, xem các lá số và hỏi đáp đã lưu',
};

// Trang đọc cookie đăng nhập nên luôn dựng theo từng yêu cầu
export const dynamic = 'force-dynamic';

const THONG_BAO_LOI: Record<string, string> = {
  'chua-cau-hinh': 'Chưa cấu hình đăng nhập Google. Hãy làm theo hướng dẫn bên dưới.',
  'tu-choi': 'Bạn đã từ chối cấp quyền đăng nhập.',
  'trang-thai': 'Phiên đăng nhập hết hạn hoặc không hợp lệ, vui lòng thử lại.',
  'google': 'Google từ chối hoặc không phản hồi, vui lòng thử lại.',
  'email': 'Tài khoản Google này chưa xác minh địa chỉ thư điện tử.',
};

const hai = (n: number) => String(n).padStart(2, '0');
function dinhDangNgay(ms: number): string {
  const d = new Date(ms);
  return `${hai(d.getDate())}/${hai(d.getMonth() + 1)}/${d.getFullYear()} ${hai(d.getHours())}:${hai(d.getMinutes())}`;
}

const khungThe = { padding: 20, borderRadius: 12, border: '1px solid var(--bdr-med)', background: 'var(--bg-card)' } as const;

function DanhSachLaSo({ nguoiDungId }: { nguoiDungId: string }) {
  const laSo = lietKeLaSo(nguoiDungId);
  if (laSo.length === 0) {
    return (
      <p style={{ ...khungThe, lineHeight: 1.7 }}>
        Chưa có lá số nào. Hãy <Link href="/chart" style={{ color: 'var(--ac)' }}>lập lá số</Link> rồi bấm &quot;Lưu lá số&quot;.
      </p>
    );
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
      {laSo.map((l) => (
        <li key={l.id} style={{ ...khungThe, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 17 }}>{l.ten}</div>
            <div style={{ fontSize: 14, color: 'var(--tx-3)' }}>Lưu lúc {dinhDangNgay(l.taoLuc)}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href={`/chart?mo=${l.id}`} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 14, textDecoration: 'none', border: '1px solid var(--ac)', color: 'var(--ac)' }}>Mở lá số</Link>
            <Link href={`/chart?mo=${l.id}&the=ai`} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 14, textDecoration: 'none', border: '1px solid var(--bdr-heavy)', color: 'var(--tx-1)' }}>Hỏi đáp AI</Link>
            <NutXoaLaSo laSoId={l.id} ten={l.ten} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function TrangTaiKhoan({ searchParams }: { searchParams: Promise<{ loi?: string }> }) {
  const { loi } = await searchParams;
  const nguoiDung = await layNguoiDungHienTai();
  const daCauHinh = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
  const thongBaoLoi = loi ? THONG_BAO_LOI[loi] : undefined;

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '40px 16px 64px', color: 'var(--tx-1)' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Tài khoản</h1>

      {thongBaoLoi && (
        <p role="alert" style={{ margin: '16px 0', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--bdr-heavy)' }}>{thongBaoLoi}</p>
      )}

      {!nguoiDung ? (
        <section style={{ ...khungThe, marginTop: 16 }}>
          <p style={{ marginBottom: 16, lineHeight: 1.7 }}>
            Đăng nhập để lưu lá số và lịch sử hỏi đáp AI, rồi mở lại bất cứ lúc nào. Chúng tôi chỉ dùng tên, địa chỉ thư điện tử và ảnh từ tài khoản Google; không lưu mật khẩu.
          </p>
          {daCauHinh ? (
            <a
              href="/api/auth/google?quay-lai=/tai-khoan"
              style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 999, fontWeight: 600, textDecoration: 'none', background: 'var(--tx-0)', color: 'var(--bg-0)' }}
            >
              Đăng nhập bằng Google
            </a>
          ) : (
            <div style={{ lineHeight: 1.8, fontSize: 15 }}>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>Cấu hình đăng nhập Google (làm một lần):</p>
              <ol style={{ paddingLeft: 22 }}>
                <li>Vào Google Cloud Console, tạo một dự án rồi tạo <em>OAuth client ID</em> loại <em>Web application</em>.</li>
                <li>Ở mục <em>Authorized redirect URIs</em>, thêm <code>http://localhost:8081/api/auth/google/callback</code> (đổi cổng nếu bạn chạy ở cổng khác).</li>
                <li>Chép <em>Client ID</em> và <em>Client secret</em> vào tệp <code>.env.local</code>: <code>GOOGLE_CLIENT_ID=...</code> và <code>GOOGLE_CLIENT_SECRET=...</code>.</li>
                <li>Khởi động lại máy chủ (<code>npm run dev</code>) rồi tải lại trang này.</li>
              </ol>
            </div>
          )}
        </section>
      ) : (
        <>
          <p style={{ margin: '8px 0 24px', color: 'var(--tx-2)' }}>Đang đăng nhập: <strong>{nguoiDung.ten || nguoiDung.email}</strong> ({nguoiDung.email})</p>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Lá số đã lưu</h2>
          <DanhSachLaSo nguoiDungId={nguoiDung.id} />
          <NutXoaTaiKhoan email={nguoiDung.email} />
        </>
      )}
    </main>
  );
}
