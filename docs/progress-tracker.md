# Progress Tracker & Pembagian Tugas (jmj-fe)

Dokumen ini adalah rekapitulasi dari *backlog* kerja untuk sinkronisasi via Git. Centang kotak `[x]` jika Anda sudah menyelesaikan sebuah kartu dan lakukan `git commit`.

---

## 1. Fondasi Bersama (Dikerjakan Bareng)
*Blocking: Track Aulia dan Icha belum boleh berpisah sebelum ini tuntas.*

- [x] **K1.** Cek struktur default & WatermelonDB placeholder
- [x] **K2.** Setup struktur folder (features, components, dll)
- [x] **K2b.** Install & init shadcn/ui CLI
- [x] **K3.** Ekstrak design tokens dari Figma ke Tailwind
- [x] **K11.** Halaman login & guard routing (tersambung ke `POST /api/v1/login` sungguhan)
- [ ] **K4.** Generate shadcn dasar (Card, Dialog, Badge)
- [ ] **K5.** Komponen StatusBadge.tsx
- [ ] **K6.** Komponen CurrencyDisplay.tsx
- [ ] **K7.** Komponen KmDisplay.tsx
- [ ] **K8.** Setup `lib/types/enums.ts`
- [x] **K9.** Layout shell mobile-first
- [x] **K10.** Layout shell web
- [ ] **K12.** Setup PWA `manifest.json`
- [ ] **K13.** Setup Serwist (Service Worker)
- [ ] **K14.** Cek instalasi PWA di HP sungguhan

---

## 2. Track Aulia (Field Officer & Maintenance Officer)
*Fokus: Mobile-first, Offline-first, Pelaporan Insiden & Eksekusi WO di jalan tol.*

**Insiden & Kerusakan:**
- [x] **AULIA-K1.** Form lapor insiden dasar (waktu, KM, lajur)
- [x] **AULIA-K2.** Percabangan "ada kerusakan aset?"
- [x] **AULIA-K3.** Form pilih aset dari katalog
- [x] **AULIA-K4.** Form isi quantity kerusakan
- [ ] **AULIA-K5.** Percabangan "pengguna jalan teridentifikasi?"
- [x] **AULIA-K6.** Form data pelaku (Pihak Kesatu)
- [ ] **AULIA-K7.** Preview BA Kejadian
- [ ] **AULIA-K8.** Preview BA Kerusakan (dengan pelaku)
- [ ] **AULIA-K9.** Preview BA Kerusakan (tabrak lari)
- [ ] **AULIA-K10.** UI tanda tangan digital
- [x] **AULIA-K11.** Upload foto dari kamera
- [x] **AULIA-K12.** Upload foto dari galeri
- [x] **AULIA-K13.** Badge status sync data

**Eksekusi Work Order (WO):**
- [ ] **AULIA-K14.** List Work Order milik petugas
- [ ] **AULIA-K15.** Form terima WO
- [ ] **AULIA-K16.** Update `repair_status` berurutan
- [ ] **AULIA-K17.** Upload bukti foto before-during-after
- [ ] **AULIA-K18.** Form ajukan selesai
- [ ] **AULIA-K19.** Tampilan WO rework (dikembalikan)

---

## 3. Track Icha (MCS Supervisor & Maintenance Unit)
*Fokus: Validasi BA (Mobile), Penerbitan Surat Keuangan (Web), Manajemen Work Order (Web).*

**Dashboard & Validasi BA:**
- [x] **ICHA-K1.** Dashboard daftar insiden (Tabel/Kartu)
- [ ] **ICHA-K2.** Filter dashboard (status, KM, tanggal)
- [x] **ICHA-K3.** Validasi BA (ditolak + alasan)
- [x] **ICHA-K4.** Validasi BA (diterima, tanpa kerusakan)
- [x] **ICHA-K5.** Validasi BA (diterima, ada kerusakan)
- [ ] **ICHA-K6.** Tampilan status ditolak (di sisi petugas)
- [ ] **ICHA-K7.** Preview PDF Berita Acara

**Jalur Finansial (Penagihan):**
- [ ] **ICHA-K8.** Form terbitkan surat ganti rugi
- [ ] **ICHA-K9.** Status kesanggupan bayar (Lunas/Menunggu)
- [ ] **ICHA-K10.** Tampilan tingkat kewenangan (dari backend)
- [ ] **ICHA-K11.** Tampilan status perselisihan (7 hari musyawarah)

**Manajemen Work Order (WO):**
- [ ] **ICHA-K12.** Halaman antrean kerja kerusakan yang tervalidasi
- [ ] **ICHA-K13.** Form terbitkan Work Order (pilih aset, penanggung biaya)
- [ ] **ICHA-K14.** Form WO manual (patroli/preventif)
- [ ] **ICHA-K15.** Halaman review hasil kerja tim WO

**Laporan:**
- [ ] **ICHA-K16.** Dashboard riwayat kerusakan per KM
- [ ] **ICHA-K17.** Laporan semesteran (3 kategori)
- [ ] **ICHA-K18.** Status pembebasan kewajiban

---

## 4. Fase Selanjutnya (Belum Dibagi ke Kartu)
*Fitur-fitur ini masuk dalam Checkpoint 3 & 4 (diambil dari `prd-full.md` Bagian 9), namun belum dibuatkan kartu detailnya karena masih menunggu kesiapan backend/kontrak API.*

**Integrasi API (Online):**
- [ ] Menyambungkan Endpoint CRUD biasa (Tugas Icha - Checkpoint 3)

**Offline-First & Sinkronisasi Lokal:**
- [ ] Setup Skema WatermelonDB Asli (Tunggu kontrak API)
- [ ] Logic antrean Push Data Lokal ke Server
- [ ] Logic Pull Data dari Server ke Lokal
- [ ] Penanganan bentrok data (Conflict Resolution) bila ada (Tugas Aulia - Checkpoint 4)
