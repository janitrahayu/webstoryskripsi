# Estimasi Produksi Padi Skala Grid Menggunakana Integrasi Deep Learning dan Data MultiSumber di Kabupaten Indramayu

Repositori ini berisi kode _artifact_ (sistem), kode pemodelan, dataset, serta dokumentasi untuk keperluan Skripsi/Tugas Akhir.

## Struktur File dan Direktori

Repositori ini terbagi menjadi beberapa direktori utama yang memisahkan antara kode pemodelan (Python) dan _artifact_ sistem (Node.js/JavaScript):

- `pemodelan_klasifikasi/` : Berisi code Python (`.ipynb`) untuk _preprocessing_ dan pelatihan model tahap klasifikasi _Deep Learning_ serta _Machine Learning_.
- `pemodelan_regresi/` : Berisi code Python (`.ipynb`) untuk _preprocessing_ dan pelatihan model tahap regresi _Deep Learning_ serta _Machine Learning_.
- `dataset/` : Berisi dataset yang diguanakn pada fase klasifikasi dan regresi
- `src/` : Kode sumber utama untuk antarmuka pengguna (_frontend_) dari sistem.
- `scripts/` : Kumpulan skrip otomasi atau utilitas tambahan.
- `public/` : Aset statis yang dapat diakses publik.
- `package.json` & `package-lock.json` : Daftar dependensi Node.js yang dibutuhkan oleh sistem.

## Panduan Penggunaan dan Dokumentasi Sistem

### 1. Menjalankan Kode Pemodelan

1. Pastikan Python terinstal di sistem Anda, beserta _library_ pendukung seperti `pandas`, `geopandas`, `xgboost`, `tensorflow`/`pytorch`, dan `rasterio`.
2. Buka folder `pemodelan_klasifikasi/` dan `pemodelan_klasifikasi/` menggunakan Jupyter Notebook atau Visual Studio Code.
3. Jalankan sel kode secara berurutan. Jika menggunakan dataset sampel dari folder `dataset/`, sesuaikan _path_ pembacaan file di dalam _notebook_ dan dengan rincian seperti berikut.
   Berikut adalah rincian file yang digunakan dalam pemodelan _two-phase_:

- `unik_per_bulan.xlsx`: Digunakan untuk tahap pertama, yaitu **klasifikasi** fase tumbuh padi.
- `Dataset_Siap_Modeling_Padi_P3_Fixed.xlsx`: Digunakan untuk tahap kedua, yaitu pemodelan **regresi** untuk estimasi produktivitas.
- `Dataset_Regresi_2025 (1).xlsx`: Digunakan secara khusus untuk uji tes _out-of-sample_, yaitu pengujian kinerja model pada data baru (tahun 2025) yang tidak ikut dilatih sebelumnya.

### 2. Menjalankan Artifact Sistem (Web/Aplikasi)

Sistem dibangun menggunakan ekosistem Node.js. Ikuti langkah berikut untuk menjalankan di _local environment_:

1. Pastikan Node.js (versi 18.x atau terbaru) sudah terinstal.
2. Buka terminal pada folder utama repositori ini.
3. Instal semua dependensi dengan menjalankan perintah:
   ```bash
   npm install
   ```
4. Setelah instalasi selesai, jalankan _server_ atau aplikasi dengan perintah:
   ```bash
   npm run dev
   # (atau sesuaikan dengan script start di package.json, misal: npm start)
   ```
5. Akses sistem melalui _browser_ pada `http://localhost:[PORT_YANG_SESUAI]`.
