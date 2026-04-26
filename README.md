# Aplikasi Catatan Harian

Aplikasi catatan harian ini dibuat untuk memenuhi syarat tugas dengan fitur utama:

- Create / Read / Update / Delete catatan
- Pencarian berdasarkan judul atau isi catatan
- Kategori / tag: Kuliah, Pribadi, Kerja
- Konfirmasi hapus catatan
- Mode Dark / Light UI
- Fetch API eksternal dari `jsonplaceholder.typicode.com`
- Loading state dan error handling
- UI responsive dengan Bootstrap
- Data catatan disimpan ke `localStorage`

## Cara Menjalankan

1. Buka file `index.html` di browser.
2. Aplikasi akan dijalankan langsung tanpa instalasi tambahan.

## Strukur Proyek

- `index.html` — halaman web utama dengan library React dan Bootstrap.
- `style.css` — gaya tampilan, responsive, dan mode gelap.
- `app.js` — logika React, kelas `NoteStore`, state management, fetch API, dan event handling.

## Git Workflow

- Branch utama: `main`
- Branch pengembangan: `development`
- Branch fitur tambahan: `feature/catatan-harian`
- Commit message sebaiknya menggunakan format:
  - `feat:` untuk fitur baru
  - `fix:` untuk perbaikan bug
  - `style:` untuk perubahan tampilan
  - `docs:` untuk dokumentasi

> Buat pull request dari `development` ke `main` setelah fitur selesai.

## Catatan Commit

Contoh pesan commit rapi:

- `feat: tambah fitur kategori dan pencarian catatan`
- `fix: perbaiki validasi form dan loading API`
- `style: tingkatkan tampilan responsif dan mode gelap`

## Panduan Pull Request

1. Buat branch baru untuk fitur, misalnya `feature/catatan-harian`.
2. Commit perubahan dengan pesan terstruktur (`feat:`, `fix:`, `style:`).
3. Buka pull request dari branch fitur ke branch utama.
4. Sertakan deskripsi singkat dan langkah pengujian.
5. Gunakan `PULL_REQUEST_TEMPLATE.md` sebagai referensi untuk isi PR.
