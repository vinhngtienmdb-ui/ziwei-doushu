# 13. Công nghệ sử dụng

- Next.js 16.4.3, React 19, TypeScript. Next.js khác bản đã biết: đọc `node_modules/next/dist/docs/` trước khi viết mã.
- `iztro` (lập lá số), `lunar-javascript` (lịch âm Trung Quốc, dùng cho phần chưa chuyển sang lịch Việt Nam).
- `node:sqlite` có sẵn của Node 22.5 trở lên.
- `@anthropic-ai/sdk`, mô hình mặc định `claude-sonnet-5-5`.

## Biến môi trường (đặt trong `.env.local`, không commit)
`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (tùy chọn), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_ORIGIN` (tùy chọn), `DATABASE_FILE` (tùy chọn), `NEXT_PUBLIC_SITE_URL`.
