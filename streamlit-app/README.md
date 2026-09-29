# Padi Indramayu — versi Streamlit

Ringkasan interaktif skripsi estimasi produksi padi 1 km × 1 km di Kabupaten Indramayu (two-phase modeling, Sentinel-1/2, CHIRPS, ERA5-Land, KSA).

Situs web di pratinjau Grok memakai React. Berkas ini adalah **versi Streamlit** yang bisa diubah di komputer Anda.

## Menjalankan

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

Buka URL yang dicetak Streamlit (biasanya http://localhost:8501).

## Struktur

| Berkas | Isi |
| --- | --- |
| `app.py` | Enam halaman: Beranda, Pendahuluan, Landasan teori, Metode, Hasil, Kesimpulan |
| `data.py` | Tabel klasifikasi, ablation, kecamatan, skenario BPS |
| `map_chart.py` | Peta tematik 31 kecamatan (matplotlib) |
| `kecamatan-paths.json` | Path SVG skematik untuk peta |
| `requirements.txt` | Dependensi |

## Menyesuaikan

- Ubah teks narasi di fungsi `page_*` dalam `app.py`.
- Ubah angka di `data.py` (pastikan nama kecamatan sama dengan `id` di JSON peta).
- Ganti palet di bagian atas `app.py` (`PADDY`, `PAPER`, `INK`).
- Untuk peta resmi, ganti `kecamatan-paths.json` dengan GeoJSON dan tulis ulang `map_chart.py`.

Angka dikutip dari naskah skripsi. Peta adalah skema geografis, bukan batas resmi BIG.
