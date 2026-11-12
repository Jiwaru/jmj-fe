# jmj-fe

Aplikasi web (PWA) untuk manajemen insiden dan pemeliharaan aset jalan tol — Grup Jasa Marga (JMJ, JMTO, JMTM). Menggantikan pencatatan manual berbasis kertas untuk proses ganti rugi kerusakan jalan tol dan pemeliharaan aset.

## Tentang Proyek

### Latar Belakang

Ruas Tol Solo–Yogyakarta–NYIA Kulon Progo memiliki aturan resmi terkait ganti rugi kerusakan jalan tol, yaitu Keputusan Direksi PT Jasamarga Jogja Solo Nomor 40/KPTS-JMJ/XI/2025 (ditetapkan 5 November 2025). Aturan ini mencakup jenis aset yang dilindungi, mekanisme pelaporan, perhitungan nilai kerugian, proses keringanan pembayaran, hingga kewajiban pelaporan berkala ke Direksi.

Proses tersebut sebelumnya dilakukan secara manual: laporan ditulis tangan di lokasi kejadian, Berita Acara dicetak dan ditandatangani fisik, perhitungan kerugian dicek manual dari daftar harga lampiran keputusan direksi, dan laporan ke Direksi disusun manual setiap enam bulan. Hal ini menyebabkan keterlambatan pencatatan, riwayat kasus yang sulit ditelusuri, dan status yang sulit dipantau.

Aplikasi ini mendigitalkan alur kerja tersebut tanpa mengubah aturan bisnis yang sudah ditetapkan — sistem mengikuti aturan yang ada, bukan menciptakan aturan baru.

### Pengguna Sistem

| Pengguna | Peran |
|---|---|
| **Petugas Layanan Jalan Tol (JMTO)** | Melaporkan kejadian di lokasi, mengisi data kerusakan dan data pengguna jalan bila teridentifikasi. |
| **MCS Supervisor (JMTO)** | Memvalidasi laporan, menandatangani Berita Acara, menindaklanjuti proses ganti rugi. |
| **Petugas Lapangan Pemeliharaan (JMTM)** | Menerima dan mengerjakan perintah perbaikan, mendokumentasikan hasil dengan foto. |
| **Unit Pemeliharaan (JMJ/JMTM)** | Menerbitkan perintah perbaikan, meninjau dan menyetujui hasil pekerjaan. |

Pejabat struktural JMJ (Manager Dalop, GM Teknik, GM Keuangan, Direktur) dan Deputy AM Traffic Management **tidak mengoperasikan sistem secara langsung** — keputusan dan tanda tangan mereka tetap dilakukan secara konvensional di luar sistem; sistem hanya mencatat status dan nama. Pengguna jalan tol dan rekanan perbaikan juga bukan pengguna sistem; mereka berinteraksi melalui petugas lapangan.

### Modul Utama

- **Modul Ganti Rugi:** Laporan kejadian, dua jenis Berita Acara (Kejadian untuk semua insiden, Kerusakan untuk kasus dengan kerusakan dan pelaku teridentifikasi), perhitungan kerugian dari daftar harga resmi, keringanan berjenjang, dan penyelesaian melalui pembayaran atau perbaikan oleh rekanan.
- **Modul Pemeliharaan Aset:** Perintah kerja perbaikan (dari kejadian maupun temuan patroli/preventif), pelaksanaan dengan dokumentasi foto *before–during–after*, serta peninjauan dan persetujuan hasil.

### Prinsip Kunci: Perbaikan dan Penagihan Terpisah

Pasal 3 ayat 4 Keputusan Direksi 40/KPTS-JMJ/XI/2025 mengatur bahwa perbaikan yang berpotensi mengganggu operasional harus segera dilaksanakan, tanpa menunggu proses ganti rugi selesai. Karena itu, status perbaikan fisik (umumnya selesai dalam hitungan jam–hari) dan status penagihan (dapat memakan waktu hingga satu tahun untuk kasus yang berselisih) sengaja dipisah — perbaikan tidak pernah menunggu status pembayaran, dan sebaliknya.

Sistem ini bukan sistem akuntansi — hanya mencatat status dan menerbitkan dokumen resmi; rekonsiliasi keuangan tetap dilakukan secara manual.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **PWA / Service Worker:** Serwist
- **Database lokal (offline):** WatermelonDB (belum aktif — mengacu pada batasan proyek)
- **Auth:** Laravel Sanctum (token, SPA mode)
- **Deployment:** Docker & Docker Compose, server NAS jaringan lokal

## Prasyarat

- Node.js 20.x atau lebih baru
- npm

## Menjalankan di Lokal

```bash
# clone repo
git clone <url-repo>
cd jmj-fe

# install dependency
npm install

# salin environment variable
cp .env.example .env.local
# isi .env.local sesuai kebutuhan lokal — lihat bagian Environment Variables

# jalankan development server
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`.

## Environment Variables

| Variabel | Keterangan |
|---|---|
| `<isi>` | `<isi>` |

> Lengkapi tabel ini setiap kali terdapat pembaruan *environment variable* — pastikan README tidak tertinggal dari `.env.example`.

## Scripts

| Perintah | Fungsi |
|---|---|
| `dev` | Menjalankan *development server* |
| `build` | *Build* untuk lingkungan *production* |
| `lint` | Menjalankan linter |

## Struktur Folder

Proyek ini menggunakan struktur *feature-based* (satu folder fitur, satu penanggung jawab).

```text
.
├── app
│   ├── (auth)
│   ├── (field-officer)
│   ├── (maintenance-officer)
│   ├── (maintenance-unit)
│   └── (mcs-supervisor)
├── components
│   ├── domain
│   ├── layout
│   └── ui
├── docs
├── features
├── lib
│   ├── api
│   ├── mock
│   ├── types
│   └── utils
├── model
└── public
```

- `app/` — *Routing* utama (Next.js App Router), dikelompokkan dalam *route group* berdasarkan peran: `(auth)`, `(field-officer)`, `(maintenance-officer)`, `(maintenance-unit)`, `(mcs-supervisor)`.
- `features/` — Logika dan UI per fitur bisnis, bersifat privat per folder.
- `components/` 
  - `ui/` (komponen bawaan *shadcn/ui*, dilarang mengedit secara manual).
  - `domain/` (*wrapper* komponen spesifik bisnis).
  - `layout/` (tata letak halaman).
- `lib/` — Menyimpan *types* (entitas backend), *mock* (data tiruan), *api* (*client fetch*), dan *utils* (utilitas umum).
- `model/` — Konfigurasi WatermelonDB (skema belum diisi).
- `docs/` — PRD (*Product Requirements Document*) dan dokumen sumber referensi.
- `public/` — Aset statis.

*(Catatan: `.next/` dan `node_modules/` tidak dicantumkan karena dihasilkan secara otomatis dan tidak dimasukkan ke dalam version control).*

## Dokumentasi Lengkap

- `docs/prd-full.md` — PRD lengkap (berisi fitur, arsitektur, model data, dan pertanyaan terbuka).
- `docs/progress-tracker.md` — Rekapitulasi progres pekerjaan dan pembagian tugas.

---
*Repository internal Grup Jasa Marga — tidak untuk didistribusikan ke luar organisasi.*