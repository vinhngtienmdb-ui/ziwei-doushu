import assert from 'node:assert/strict';
import { kiemTraGioiHan, THOI_GIAN_CUA_SO_MS } from '../../lib/ai/gioi-han';

const so = new Map<string, number[]>();
const t0 = 1_000_000;

for (let i = 0; i < 3; i++) assert.equal(kiemTraGioiHan('a', 3, t0 + i, so).duoc, true);
const bi = kiemTraGioiHan('a', 3, t0 + 10, so);
assert.equal(bi.duoc, false);
assert.ok(bi.choGiay >= 1);

// Khóa khác không bị ảnh hưởng
assert.equal(kiemTraGioiHan('b', 3, t0 + 10, so).duoc, true);

// Lần bị chặn không làm kéo dài thời gian chờ
assert.equal(kiemTraGioiHan('a', 3, t0 + THOI_GIAN_CUA_SO_MS - 1, so).duoc, false);
// Hết cửa sổ thì được gọi lại
assert.equal(kiemTraGioiHan('a', 3, t0 + THOI_GIAN_CUA_SO_MS + 3, so).duoc, true);

console.log('gioi-han-ai: OK');
