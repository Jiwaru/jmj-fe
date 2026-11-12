import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

import schema from './schema';
import migrations from './migrations';

const adapter = new LokiJSAdapter({
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,

  onQuotaExceededError: (error) => {
    // TODO: browser kehabisan storage — tawarkan reload/logout ke user.
  },
  onSetUpError: (error) => {
    // TODO: database gagal di-load sama sekali — tawarkan reload/logout ke user.
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
      // TODO: tab lain dari app yang sama menimpa data di tab ini.
      // Idealnya trigger sync sekarang dan peringatkan user kalau offline.
    },
    onversionchange: () => {
      // TODO: database dihapus di tab lain (mis. user logout) — reload halaman ini.
    },
  },
});

// TODO: isi modelClasses setelah model per tabel dibuat.
// Database instance ini belum bisa dipakai selama masih kosong.
export const database = new Database({
  adapter,
  modelClasses: [],
});
