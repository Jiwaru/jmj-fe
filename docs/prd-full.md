PRD terkonsolidasi untuk **frontend `jmj-fe`** — Sistem Manajemen Insiden & Pemeliharaan Aset Jalan Tol (Grup Jasa Marga: JMJ, JMTO, JMTM). Disusun **2026-08-31** dari sumber-sumber yang sudah ada di project (lihat Bagian 0), bukan dokumen baru dari nol — tujuannya menyatukan yang tersebar jadi satu acuan yang bisa dirujuk `.agents/rules/*`.

**Scope dokumen ini: frontend saja.** Skema database, migrasi, dan implementasi backend Laravel adalah domain tim backend, sudah final terpisah di [[ERD & Skema Database - Toll Command]]. PRD ini menerjemahkan kebutuhan itu ke kebutuhan UI/UX dan kerja frontend.

---

## 0. Sumber & status tiap sumber

| Sumber | Peran | Status |
|---|---|---|
| [[SK 40-KPTS-JMJ-XI-2025 — Pedoman Ganti Rugi]] | Dasar hukum, sumber kebenaran tertinggi | Final, mengikat |
| [[Konsep Aplikasi Manajemen Insiden & Pemeliharaan Aset Jalan Tol]] | Desain sistem v4 | Diselaraskan dengan SK, beberapa bagian `[perlu konfirmasi]` |
| [[Struktur Organisasi PT Jasa Marga Persero TBK]] | Hierarki entitas | Stabil, sebagian jabatan JMJ/JMTM belum terpetakan |
| [[ERD & Skema Database - Toll Command]] | Skema database backend final | Final dari sisi backend; kontrak API sync belum ada |
| [[Decision]] | Keputusan tech stack & arsitektur | Berlaku, termasuk revisi full-web 2026-08-18 |
| [[Status]] | Pertanyaan terbuka | 15 pertanyaan belum terjawab per 2026-08-31 |
| [[Slicing & Pembagian Kerja - jmj-fe]] | Pembagian kerja Aulia/Icha | Draf awal berdasarkan 3 diagram alur |

Bila ada pertentangan antar sumber: **SK menang untuk aturan bisnis**, **ERD backend menang untuk struktur data**, **Decision.md menang untuk keputusan tech stack**.

---

## 1. Apa yang dibangun

Web app (PWA), mobile-first untuk role lapangan, dipakai **satu basis kode untuk semua role** — bukan aplikasi native terpisah. Menggantikan pencatatan manual kertas untuk dua modul:

- **Modul Ganti Rugi** — laporan insiden, dua Berita Acara (BA Kejadian + BA Kerusakan), perhitungan ganti rugi, keringanan berjenjang, dua bentuk penyelesaian (bayar / perbaikan rekanan), perselisihan.
- **Modul Pemeliharaan Aset** — Work Order (dari insiden maupun temuan patroli/preventif), bukti pengerjaan, evaluasi hasil, barang bekas.

**Prinsip inti:** jalur perbaikan fisik dan jalur penagihan keuangan **didekopling** (Pasal 3 ayat 4 SK) — perbaikan boleh jalan duluan tanpa menunggu ganti rugi selesai. Sistem ini bukan sistem akuntansi — sumber kebenaran atas *status* dan penerbit dokumen PDF saja, rekonsiliasi keuangan tetap manual.

Internal grup saja, tanpa akses publik, dioptimalkan untuk server NAS jaringan lokal.

---

## 2. Persona & role

Role sistem mengikuti enum `user_role` di ERD backend — 4 role, dipetakan ke breakpoint UI:

| Role | Entitas | Breakpoint | Deskripsi |
|---|---|---|---|
| `field_officer` | JMTO — Petugas Layanan Jalan Tol | mobile-first | Lapor insiden, pilih aset rusak, isi BA di lapangan. Sering bekerja tanpa sinyal stabil (bahu jalan tol) |
| `mcs_supervisor` | JMTO — Mobile Customer Service Supervisor | web | Validasi laporan & BA, tanda tangan BA Kerusakan sebagai Pihak Kedua, terbitkan surat ganti rugi |
| `maintenance_officer` | JMTM — Petugas Lapangan Maintenance | mobile-first | Terima Work Order, kerjakan perbaikan, unggah bukti before-during-after |
| `maintenance_unit` | JMJ/JMTM — Unit Maintenance | web | Terbitkan Work Order (dari antrean atau manual), review hasil pengerjaan |

**Role yang menandatangani tapi tidak dianggap user aktif sistem** (tanda tangan basah di luar sistem, sistem hanya cantumkan nama): Deputy Area Manager Traffic Management ("Mengetahui" di kedua BA), Manager Pengendalian Pengoperasian / GM Teknik / GM Keuangan dan Umum / Direktur (jenjang kewenangan keringanan — lihat Bagian 5).

**Pihak eksternal, bukan user sistem:** Pengguna Jalan (Pihak Kesatu di BA Kerusakan, pemohon keringanan, penunjuk rekanan), Rekanan Perbaikan (ditunjuk pengguna jalan, bukan vendor Perusahaan).

---

## 3. Batas cakupan SK — penting untuk desain UI

SK 40/KPTS-JMJ/XI/2025 hanya mengatur **kerusakan yang disebabkan pengguna jalan tol**. Alur di luar itu (temuan patroli, aus normal, preventif terjadwal) **tidak melalui BA sama sekali** — langsung masuk antrean Work Order Modul Pemeliharaan Aset. Jangan desain UI yang memaksa jalur ini melalui form BA.

---

## 4. Fitur — deskripsi naratif (Bagian 4.X, dipakai untuk referensi/diskusi)

### 4.1 Pelaporan insiden (field_officer)
Form multi-step: data insiden (waktu, KM, lajur/ramp, jenis kejadian, uraian, data kendaraan) → percabangan "ada kerusakan aset?" → kalau ya, pilih aset dari katalog + isi volume → percabangan "pengguna jalan teridentifikasi?" → kalau ya, isi data Pihak Kesatu (nama, umur, pekerjaan, alamat, No. SIM/KTP). Offline-first: ditulis ke database lokal dulu, sync belakangan.

### 4.2 BA Kejadian Operasional Pelayanan Lalin
Terbit untuk **setiap** insiden, termasuk yang tidak ada kerusakan aset. Ini jalur keluar untuk kasus paling sering (mogok, ban pecah) — tanpa ini petugas akan mengarang data kerusakan supaya laporan tersimpan. Penanda tangan: 2 Petugas Layanan Jalan Tol + MCS Supervisor, diketahui Deputy AM Traffic Management.

### 4.3 BA Kerusakan Sarana Akibat Kecelakaan
Hanya terbit bila ada kerusakan **dan** pengguna jalan teridentifikasi. Dua varian: dengan Pihak Kesatu (teridentifikasi) atau tanpa (tabrak lari — hanya BA Kejadian yang terbit, kasus ini keluar dari cakupan SK). Tabel perhitungan: Jenis Kerusakan × Volume × Harga Satuan × Jumlah Harga = TOTAL + terbilang. Penanda tangan: MCS Supervisor (Pihak Kedua) + Pihak Kesatu, diketahui Deputy AM Traffic Management.

### 4.4 Validasi BA (mcs_supervisor)
Tiga hasil, bukan sekadar accept/reject:
- `rejected` — kembali ke Petugas Lapangan dengan alasan
- `validated` tanpa kerusakan — perkara ditutup, tanpa BA Kerusakan, tanpa tagihan
- `validated` dengan kerusakan — PDF BA terbit, lanjut ke jalur finansial (kalau pelaku teridentifikasi) dan/atau antrean Work Order

### 4.5 Dua bentuk penyelesaian ganti rugi (Pasal 4 ayat 1)
- **a. Bayar tunai/transfer** (Lampiran II) — penuh atau dengan keringanan berjenjang
- **b. Perbaikan oleh rekanan pilihan pengguna jalan** (Lampiran III) — loop evaluasi kesesuaian, bisa ditolak berulang sampai sesuai

### 4.6 Keringanan berjenjang (mcs_supervisor mengajukan, JMJ memutuskan — di luar `jmj-fe` langsung tapi statusnya perlu ditampilkan)
Sistem **menghitung** tingkat kewenangan dari total nilai kerugian, tidak dipilih manual:

| Total nilai kerugian | Yang memutuskan |
|---|---|
| ≤ Rp 250.000.000 | Manager Pengendalian Pengoperasian |
| Rp 250.000.000 – Rp 500.000.000 | GM Teknik **dan** GM Keuangan dan Umum |
| > Rp 500.000.000 | Direktur |

⚠️ Batas tepat Rp 250 juta dan Rp 500 juta tumpang tindih di teks SK — **belum ditegaskan tafsirnya** (Status.md pertanyaan #6). Jangan hardcode logic pemilihan jenjang di frontend sampai ini terjawab; tampilkan saja `tingkat_kewenangan` yang dikirim backend.

### 4.7 Perselisihan (Pasal 7)
Musyawarah 7 hari kalender → GM Teknik wajib lapor Direksi bila lewat → ≥1 tahun bisa ke Pengadilan Negeri → atau GM Teknik usulkan penghentian (dasar status `tidak tertagih`). Frontend menampilkan status dan tenggat ini, tidak menjalankan logic perhitungan tenggat (itu backend).

### 4.8 Work Order & Pemeliharaan Aset (maintenance_unit, maintenance_officer)
Empat pemicu (`wo_trigger_source`): `incident` (dari BA Kerusakan tervalidasi), `patrol`, `preventive`, `wear`. Hanya pemicu `incident` yang melalui BA — tiga lainnya masuk antrean langsung. Satu Work Order = satu titik lokasi, bisa cakup banyak `damaged_items`.

### 4.9 Evaluasi kesesuaian hasil (jalur Lampiran III)
Hasil kerja rekanan dievaluasi Unit Maintenance, **dapat ditolak berulang kali** sampai sesuai — `repair_status` harus bisa mundur (`rework`), bukan cuma maju.

### 4.10 Bukti pengerjaan (maintenance_officer)
Upload foto before-during-after via browser HP. Termasuk data offline-first (lihat Bagian 6 [[ERD & Skema Database - Toll Command]]).

### 4.11 Barang bekas
Kepemilikan ditentukan **cara pembayaran** (Pasal 6), bukan gudang — dibayar penuh → milik pengguna jalan, tenggat ambil 30 hari; dibayar dengan keringanan → milik Perusahaan.

### 4.12 Riwayat kerusakan per titik lokasi
Dashboard/laporan KM mana yang paling sering rusak — bahan analisis titik rawan, output jangka panjang yang tidak ada di proses kertas.

### 4.13 Laporan semesteran (Pasal 8) — WAJIB, bukan metrik pilihan
GM Teknik lapor ke Direksi tiap 6 bulan: ganti rugi selesai, belum selesai/dalam proses, upaya penyelesaian yang sedang berjalan.

### 4.14 Pembebasan kewajiban
Direktur Utama **dapat membebaskan** kewajiban ganti rugi bila pengguna jalan meninggal akibat kecelakaan (Pasal 5 ayat 2) — bukan dialihkan ke ahli waris. Keputusan bertanda tangan, ditampilkan sebagai status khusus, bukan sekadar label.

---

## 5. Prinsip desain kunci (dari Konsep Aplikasi Bagian 5, relevan untuk frontend)

1. **Penanggung biaya ≠ pelaksana.** Dua konsep terpisah — pengguna jalan bisa jadi penanggung biaya sementara kontraktor jadi pelaksana (kasus: aset ditabrak saat masih masa garansi). UI Work Order harus tampilkan keduanya sebagai field terpisah, jangan digabung.
2. **Dua status independen: `repair_status` dan status penagihan.** Perbaikan diukur jam-hari, penagihan bisa sampai setahun. Jangan desain UI yang membuat status WO bergantung pada status pembayaran.
3. **Nilai biaya WO boleh kosong saat dibuat.** WO dari temuan patroli belum punya nilai rupiah di awal — jangan wajibkan field ini di form create WO manual.
4. **Dua BA terpisah, bukan satu form gabungan.** Memaksa satu form akan membuat field pelaku/perhitungan wajib diisi pada kasus yang tidak butuh — dan field jadi asal isi.
5. **Keringanan naik ke JMJ, tidak pernah selesai di lapangan.** UI `mcs_supervisor` hanya *mengajukan* permohonan, bukan memutuskan.
6. **Harga satuan berversi.** Subtotal kerusakan dikunci ke versi katalog saat kejadian — jangan hitung ulang dari harga katalog terkini saat render ulang BA lama (lihat juga [[ERD & Skema Database - Toll Command#3. Aturan bisnis yang tidak kelihatan dari nama kolom]]).

---

## 6. Arsitektur & tech stack frontend

Ringkasan — detail lengkap di [[Decision#Tech stack — REVISI: full web, tanpa native app]].

| Lapisan | Pilihan |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS, mobile-first breakpoint |
| PWA/Service Worker | Serwist |
| Database lokal (offline) | WatermelonDB (web adapter, IndexedDB) — **ID generator wajib UUID v4**, lihat [[ERD & Skema Database - Toll Command#⚠️ Action item frontend: generator ID WatermelonDB harus diganti ke UUID v4]] |
| Auth | Laravel Sanctum (token, SPA mode) — sisi frontend simpan token di storage terenkripsi |

**Batas keras saat ini:** integrasi WatermelonDB/sync (`/sync/pull`, `/sync/push`) **belum boleh dimulai** — kontrak API dari backend belum ada ([[ERD & Skema Database - Toll Command#7. Status]]). Kerja UI jalan duluan pakai data dummy.

### Routing & kontrol akses per role

URL sengaja dibuat bersih (`/dashboard`, bukan `/mcs-supervisor/dashboard`) — role tidak boleh terlihat di address bar. Implikasinya:

- **Route group Next.js** (`(field-officer)`, `(maintenance-officer)`, `(mcs-supervisor)`, `(maintenance-unit)`) dipakai untuk mengelompokkan halaman per role tanpa mempengaruhi URL — bukan folder biasa, bukan dynamic segment `[role]`.
- **Kontrol akses sepenuhnya di `middleware.ts` + `lib/route-access.ts`** (tabel `ROUTE_ROLES: Record<route, UserRole[]>`), karena URL tidak lagi menyiratkan role sebagai lapisan keamanan tambahan.
- **Default saat ini: setiap role hanya akses fitur miliknya sendiri** (paling ketat) — lihat pertanyaan terbuka soal hierarki akses di Bagian 10. Perubahan kebijakan akses nanti cukup ubah isi `ROUTE_ROLES`, tidak perlu reorganisasi struktur folder.

---

## 7. Daftar fitur flat (dipakai untuk MoSCoW & backlog — Bagian 8-9)

| # | Fitur | Ref 4.X |
|---|---|---|
| 1 | Form lapor insiden (data dasar) | 4.1 |
| 2 | Percabangan ada-kerusakan-aset | 4.1 |
| 3 | Form pilih aset + volume/quantity | 4.1 |
| 4 | Percabangan pengguna-jalan-teridentifikasi | 4.1 |
| 5 | Form data Pihak Kesatu | 4.1 |
| 6 | Halaman BA Kejadian (view + tanda tangan) | 4.2 |
| 7 | Halaman BA Kerusakan (view + tanda tangan, 2 varian) | 4.3 |
| 8 | Upload foto (kamera/galeri) | 4.1 |
| 9 | Badge status sync (UI saja) | 4.1 |
| 10 | Dashboard daftar insiden + filter | 4.4 |
| 11 | Halaman validasi BA (3 hasil) | 4.4 |
| 12 | Tampilan status ditolak + alasan | 4.4 |
| 13 | Generate/preview PDF BA | 4.2, 4.3 |
| 14 | Form terbitkan surat ganti rugi | 4.5 |
| 15 | Form/status sanggup-bayar-penuh | 4.5 |
| 16 | Tampilan status jenjang kewenangan keringanan | 4.6 |
| 17 | Tampilan status perselisihan & tenggat | 4.7 |
| 18 | Antrean kerja (aset validated, belum ada WO) | 4.8 |
| 19 | Terbitkan Work Order dari antrean | 4.8 |
| 20 | Buat Work Order manual (patrol/preventive/wear) | 4.8 |
| 21 | Form terima WO + update status (sisi lapangan) | 4.8 |
| 22 | Upload bukti before-during-after | 4.10 |
| 23 | Form ajukan selesai WO | 4.8 |
| 24 | Halaman review WO (accept/rework) | 4.9 |
| 25 | Tampilan WO rework (kembali ke petugas) | 4.9 |
| 26 | Dashboard riwayat kerusakan per KM | 4.12 |
| 27 | Laporan semesteran | 4.13 |
| 28 | Tampilan status pembebasan kewajiban | 4.14 |
| 29 | Design tokens Tailwind dari Figma | — (fondasi) |
| 30 | Komponen primitif shared | — (fondasi) |
| 31 | Layout shell + navigasi | — (fondasi) |
| 32 | Halaman login/auth | — (fondasi) |

---

## 8. MoSCoW

**Must have (blocking untuk sistem bisa dipakai sama sekali):**
29, 30, 31, 32 (fondasi) — 1, 2, 3, 4, 5, 6, 7, 8 (pelaporan insiden lengkap) — 10, 11, 12, 13 (validasi BA) — 18, 19, 20, 21, 22, 23, 24, 25 (Work Order lengkap)

**Should have (nilai bisnis penuh, bisa menyusul setelah Must have jalan):**
9 (badge sync — UI dulu, logic sungguhan nunggu kontrak API), 14, 15, 16 (jalur finansial), 26 (riwayat titik rawan)

**Could have (wajib ada sebelum go-live penuh tapi tidak menghalangi testing awal):**
17 (perselisihan), 27 (laporan semesteran — wajib secara hukum tapi bisa menyusul setelah alur inti jalan), 28 (pembebasan kewajiban — kasus jarang terjadi)

**Won't have (sekarang):**
Integrasi WatermelonDB/sync sungguhan (nunggu kontrak API), logic penghitungan `tingkat_kewenangan` otomatis di frontend (tunggu tafsir batas jenjang final), apa pun yang butuh akses pejabat JMJ langsung ke sistem (belum diputuskan — Status.md Bagian 4)

---

## 9. Urutan kerja (checkpoint, bukan sprint kalender — ritme kerja magang 2 orang paralel)

- **Checkpoint 1 — Fondasi.** Item 29-32. Dikerjakan bareng/siapa duluan available, blocking untuk semua kerja berikutnya.
- **Checkpoint 2 — UI inti per track, data dummy.** Track Aulia: item 1-9, 21-23, 25. Track Icha: item 10-20, 24, 26-28. Berjalan paralel, tidak saling blocking.
- **Checkpoint 3 — Integrasi API online (Icha duluan).** Begitu backend rilis endpoint CRUD biasa (bukan sync), track Icha bisa mulai sambungkan API asli. Track Aulia tetap dummy sampai kontrak sync ada.
- **Checkpoint 4 — Integrasi WatermelonDB/sync (Aulia).** Baru dimulai setelah kontrak API `/sync/pull` `/sync/push` terbit dari backend. Sampai saat itu, track Aulia dialihkan bantu Checkpoint 2/3 track Icha atau perluasan fondasi (lihat titik re-evaluasi di [[Slicing & Pembagian Kerja - jmj-fe]]).

---

## 10. Pertanyaan terbuka — belum boleh diasumsikan di frontend

Diambil dari [[Status#3. Pertanyaan terbuka — wajib dijawab sebelum mulai coding]] — daftar lengkap 15 pertanyaan ada di sana. Yang **langsung berdampak ke keputusan UI frontend**:

| # | Pertanyaan | Dampak ke frontend |
|---|---|---|
| 4 | Harga satuan mana (min/maks) yang dipakai saat hitung kerusakan? | Form perhitungan BA Kerusakan tidak bisa difinalkan — untuk sekarang, tampilkan kedua nilai dari katalog, jangan hardcode logic pemilihan |
| 6 | Batas jenjang kewenangan tumpang tindih di Rp 250jt/500jt | Jangan hitung `tingkat_kewenangan` di client — selalu ambil dari respons backend |
| 13 | Ada petugas pakai iPhone/iOS? | Menentukan seberapa penting UI fallback "buka app manual" untuk sync — sementara asumsikan iOS ada, desain indikator sync yang jelas |
| 14 | WatermelonDB dikonfirmasi (2026-08-24) | Sudah terjawab — lihat Bagian 6 |
| 15 | Perlu SOP "buka app saat dapat sinyal"? | UI perlu tempat menampilkan reminder ini, kontennya menyusul |
| 16 (baru, 2026-08-31) | Apakah role "petinggi" (`maintenance_unit`, `mcs_supervisor`) boleh akses fitur milik role di bawahnya, atau tiap role terkunci ketat ke fiturnya sendiri? SK 40 tidak eksplisit membahas hierarki akses sistem IT | Sampai terjawab, `ROUTE_ROLES` di `lib/route-access.ts` default ke **ketat** (satu role = satu scope fitur) — lihat Bagian 6 "Routing & kontrol akses per role". Perubahan nanti cukup ubah tabel ini, tidak perlu reorganisasi struktur folder |

---

## 11. Model data — ringkasan untuk kebutuhan form (bukan pengganti ERD)

Referensi lengkap: [[ERD & Skema Database - Toll Command]]. Ringkasan yang relevan untuk desain form/validasi frontend:

**Enum yang dipakai langsung di form/filter UI:**
- `user_role`: field_officer, mcs_supervisor, maintenance_unit, maintenance_officer
- `asset_category`: road_body, road_equipment, complementary_structure, support_facility, connecting_road
- `report_status`: new, pending_verification, verified, rejected, closed
- `validation_status`: submitted, validated, rejected
- `repair_status`: new, in_progress, submitted, rework, completed
- `review_outcome`: accepted, rework, returned_to_crew
- `wo_trigger_source`: incident, patrol, preventive, wear
- `wo_priority`: high, medium, low
- `sync_status`: draft, queued, sent (dikendalikan client, lihat ERD Bagian 6)
- `document_type`: standard_photo, scene_photo, id_card_photo, bda_photo, minutes_pdf

**Aturan yang mempengaruhi bentuk form, bukan sekadar nama kolom:**
- `operational_team` adalah pivot dua konteks (regu TKP vs regu perbaikan) — jangan gabung UI-nya jadi satu form.
- BA **tidak** boleh ambil `officer_1_id`/`officer_2_id` otomatis dari pivot operasional — pivot boleh jadi default dropdown, tapi wajib bisa di-override manual.
- `damaged_items.subtotal` dihitung backend, disimpan permanen — kalau frontend perlu tampilkan subtotal, ambil dari data yang sudah ada, jangan hitung ulang dari harga katalog terkini.
- PK `incident_report`, `incident_ba`, `damage_ba` bertipe UUID — form yang generate ID lokal (WatermelonDB) wajib UUID v4, bukan default generator.

---

## 12. Yang SENGAJA belum dibangun — jangan diusulkan/dibuat kecuali diminta eksplisit

- Integrasi sistem keuangan/akuntansi — rekonsiliasi tetap manual (keputusan desain sadar, Bagian 1)
- Identifikasi aset via QR/barcode — dianggap tidak praktis di lapangan, tetap pilih dari katalog visual
- Akses langsung pejabat JMJ (Manager Dalop s.d. Direktur) ke sistem — belum diputuskan, jangan desain dashboard approval untuk mereka dulu
- Logic otomatis penentuan `tingkat_kewenangan` di frontend — tunggu tafsir final batas Rp 250jt/500jt
- Sinkronisasi WatermelonDB sungguhan — tunggu kontrak API dari backend

---

## Terkait

- [[SK 40-KPTS-JMJ-XI-2025 — Pedoman Ganti Rugi]]
- [[Konsep Aplikasi Manajemen Insiden & Pemeliharaan Aset Jalan Tol]]
- [[Struktur Organisasi PT Jasa Marga Persero TBK]]
- [[ERD & Skema Database - Toll Command]]
- [[Decision]]
- [[Status]]
- [[Slicing & Pembagian Kerja - jmj-fe]]
