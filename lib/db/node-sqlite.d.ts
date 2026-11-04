/**
 * Khai báo kiểu tối thiểu cho module `node:sqlite` (Node 22.5 trở lên).
 * Gói @types/node đang dùng (phiên bản 20) chưa có module này.
 */
declare module 'node:sqlite' {
  export interface KetQuaGhi {
    changes: number | bigint;
    lastInsertRowid: number | bigint;
  }

  export class StatementSync {
    run(...thamSo: unknown[]): KetQuaGhi;
    get(...thamSo: unknown[]): unknown;
    all(...thamSo: unknown[]): unknown[];
  }

  export class DatabaseSync {
    constructor(duongDan: string);
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
