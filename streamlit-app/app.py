"""Padi Indramayu — ringkasan skripsi (Streamlit).

Jalankan:  streamlit run app.py
Ubah angka di data.py, narasi di fungsi page_*, palet di CSS di bawah.
"""

from __future__ import annotations

import pandas as pd
import streamlit as st

from data import (
    AREA,
    BPS_2025,
    CLASSIFICATION,
    DATA_SOURCES,
    KECAMATAN,
    PRODUCTIVITY,
    RELATED,
    SCENARIOS,
)
from map_chart import draw_map

st.set_page_config(page_title="Padi Indramayu", page_icon=":ear_of_rice:", layout="wide")

st.markdown(
    """
    <style>
      html, body, [data-testid="stAppViewContainer"] {
        background: #F4F0E6;
        color: #1A1C16;
      }
      [data-testid="stSidebar"] { background: #E8E1D1; }
      h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; letter-spacing: -0.02em; }
      .stMetric { background: #FBF8F1; border: 1px solid #C9C2B2; padding: 0.75rem 1rem; border-radius: 12px; }
      div[data-testid="stCaption"] { color: #5C6358; }
    </style>
    """,
    unsafe_allow_html=True,
)

PAGES = [
    "Beranda",
    "Pendahuluan",
    "Tinjauan Pustaka",
    "Metode",
    "Hasil",
    "Kesimpulan",
]


def page_beranda():
    st.title("Dari citra satelit ke grid padi 1 km")
    st.caption("Pembahasan skripsi two-phase modeling · Kabupaten Indramayu · Politeknik Statistika STIS")
    st.write(
        "Radar Sentinel-1, optik Sentinel-2, CHIRPS, dan ERA5-Land disusun menjadi peta sawah "
        "aktif 10 m, lalu produksi diturunkan ke grid 1 km × 1 km. Kombinasi S1+S2 mendekati "
        "angka BPS 2025 hingga selisih 0,1 persen."
    )

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Akurasi klasifikasi", "0,9488", "BiLSTM modifikasi")
    c2.metric("R² produktivitas", "0,8146", "RMSE 0,8053 t/ha")
    c3.metric("Selisih vs BPS", "0,1%", "1.582.391 vs 1.583.262 t")
    c4.metric("Produsen tertinggi", "Kroya", "129.069 ton")

    st.subheader("Peta produksi 2025")
    vals = {k["name"]: k["prod_2025"] for k in KECAMATAN}
    st.pyplot(draw_map(vals, "Estimasi produksi padi 2025", "ton"), use_container_width=True)
    st.caption("Skema 31 kecamatan, bukan batas resmi. Kroya, Anjatan, Gabuswetan, Terisi memimpin volume.")

    st.info(
        "Ubah file ini sesuka Anda: teks di `app.py`, angka di `data.py`, palet di blok CSS. "
        "Peta memakai `kecamatan-paths.json`."
    )


def page_pendahuluan():
    st.title("Bab I · Pendahuluan")
    st.header("Latar belakang")
    st.write(
        "Padi memasok lebih dari 21 persen kalori manusia dan 76 persen asupan kalori Asia Tenggara. "
        "Perubahan iklim menekan hasil lewat suhu, hujan, dan ekstrem. El Niño menunda musim tanam; "
        "satu persen kenaikan intensitas hujan yang tidak menentu dapat memangkas panen 0,21 persen per musim."
    )
    st.write(
        "Indramayu adalah lumbung nasional (~1,5 juta ton pada 2025) tetapi rentan banjir dan kekeringan. "
        "Puso tercatat 2019, 2021, 2023, dan 2024. KSA BPS akurat secara statistik namun mahal untuk "
        "pemantauan kontinu. Remote sensing menurunkan skala makro menjadi grid 1 km."
    )
    st.header("Identifikasi masalah")
    for n, t, d in [
        ("1", "Peta lahan statis", "Prediksi dari peta satu tahun mencampur area non-padi."),
        ("2", "Sensor tunggal", "Optik terhalang awan; radar peka genangan. Keduanya perlu digabung."),
        ("3", "Agregat kabupaten", "Satu angka BPS tidak menarget bantuan saat puso."),
        ("4", "Rata-rata bulanan", "Menghilangkan stres kumulatif. Dipakai rolling window 120 hari."),
    ]:
        st.markdown(f"**{n}. {t}.** {d}")

    st.header("Rumusan dan tujuan")
    st.write(
        "**(a)** Bagaimana memetakan sawah padi aktif secara dinamis dengan Sentinel-1 dan Sentinel-2?  \n"
        "**(b)** Model regresi mana yang optimal pada grid 1 km melalui ablation study?"
    )
    st.write(
        "Tujuan mengikuti dua pertanyaan itu. Manfaat teoritis: kerangka two-phase, bukti ablation, "
        "downscaling, dan iklim resolusi tinggi. Manfaat praktis: peta mikro bagi pemda/BPS dan "
        "sinyal awal bagi petani."
    )


def page_landasan():
    st.title("Bab II · Tinjauan Pustaka")
    st.subheader("Definisi singkat")
    defs = {
        "Produksi padi": "Luas panen × produktivitas (BPS). Produktivitas dari ubinan 2,5 × 2,5 m.",
        "Fenologi": "Siklus 90–130 hari; fase generatif paling peka (suhu >35°C saat antesis).",
        "Rolling window": "Hasil adalah integral musim, bukan satu tanggal. Jendela 120 hari.",
        "KSA": "Survei area FAO/USDA: blok 6 km, segmen 300 m, amatan akhir bulan.",
        "Sentinel-1": "SAR C-band, menembus awan, revisit ~6 hari. Perlu kalibrasi σ° dan filter speckle.",
        "Sentinel-2": "13 band optik, 10 m. Awan menjatuhkan NDVI; SCL membuang piksel kotor.",
        "NDVI": "(NIR−RED)/(NIR+RED). Dilengkapi EVI, LSWI, BSI, RVI, CrossRatio.",
    }
    for k, v in defs.items():
        st.markdown(f"**{k}.** {v}")

    st.subheader("Tabel 2. Penelitian terkait")
    df = pd.DataFrame(RELATED, columns=["Peneliti", "Jenis", "Data", "Metode", "Lokasi"])
    st.dataframe(df, hide_index=True, use_container_width=True)
    st.caption(
        "Penelitian ini memisahkan klasifikasi dan regresi, menggabungkan empat sumber data, "
        "dan menguji spektrum algoritma paling lebar di tabel."
    )


def page_metode():
    st.title("Bab III · Metode")
    st.header("Kerangka berpikir")
    col1, col2, col3 = st.columns(3)
    col1.write("**Masalah.** Sensor tunggal, peta statis, data hanya kabupaten.")
    col2.write("**Solusi.** S1+S2+iklim+KSA, two-phase, downscaling 1 km, window 120 hari.")
    col3.write("**Evaluasi.** F1/Kappa; R²/RMSE; total 2025 vs BPS.")

    st.header("CRISP-DM")
    st.write(
        "Business Understanding → Data Understanding → Data Preparation → Modeling (klasifikasi 10 m "
        "lalu regresi 1 km) → Evaluation. Split 80/20 tanpa acak waktu."
    )
    st.header("Alur two-phase")
    a, b = st.columns(2)
    a.success("**Fase 1 · Klasifikasi 10 m.** VV/VH/RVI + NDVI/EVI/LSWI/BSI. Masking LBS BIG.")
    b.info("**Fase 2 · Regresi 1 km.** Produktivitas × luas. Ablation lima skenario input.")

    st.subheader("Tabel 3. Sumber data")
    st.dataframe(
        pd.DataFrame(DATA_SOURCES, columns=["Data", "Sumber", "Spasial", "Temporal"]),
        hide_index=True,
        use_container_width=True,
    )


def page_hasil():
    st.title("Bab IV · Hasil")
    st.header("1. Klasifikasi sawah aktif")
    st.write(
        "F1 jadi acuan. BiLSTM modifikasi: akurasi 0,9488, F1 0,9514, Kappa 0,8977 — unggul atas "
        "arsitektur Filho dan ensemble pohon."
    )
    st.dataframe(pd.DataFrame(CLASSIFICATION), hide_index=True, use_container_width=True)
    st.bar_chart(pd.DataFrame(CLASSIFICATION).set_index("model")[["f1", "acc"]])

    st.header("2. Peta keaktifan tanam")
    act = {k["name"]: k["activity"] for k in KECAMATAN}
    st.pyplot(draw_map(act, "Indeks keaktifan tanam 2022–2024", "%"), use_container_width=True)
    st.caption("Tertinggi: Bongas 80,4%, Lelea 79,4%, Bangodua 78,7%. Terendah: Pasekan 25,2%, Cantigi 26,7%.")

    st.header("3. Downscaling 1 km")
    st.write(
        "Tiap grid ~10.000 piksel Sentinel. Produksi grid = (piksel padi / piksel LBS) × produksi kabupaten. "
        "Iklim CHIRPS ~5 km dan ERA5-Land ~9 km diinterpolasi bilinear."
    )

    st.header("4. Ablation regresi")
    st.write("**Produktivitas — pemenang: BiLSTM modifikasi, semua fitur, R² 0,8146, RMSE 0,8053 t/ha.**")
    st.dataframe(
        pd.DataFrame(PRODUCTIVITY, columns=["Model", "Skenario", "R²", "RMSE"]),
        hide_index=True,
        use_container_width=True,
    )
    st.write("**Luas panen — pemenang: LightGBM S1+S2, R² 0,6181, RMSE 18,50 ha.**")
    st.dataframe(
        pd.DataFrame(AREA, columns=["Model", "Skenario", "R²", "RMSE"]),
        hide_index=True,
        use_container_width=True,
    )

    st.header("5. Validasi BPS 2025")
    sdf = pd.DataFrame(SCENARIOS, columns=["Skenario", "Ton", "Catatan"])
    st.bar_chart(sdf.set_index("Skenario")["Ton"])
    st.dataframe(sdf, hide_index=True, use_container_width=True)
    st.success(
        f"S1+S2 = 1.582.391 ton vs BPS {BPS_2025:,} ton (selisih 871 ton / 0,1%). "
        "Iklim saja underestimasi; semua fitur tidak stabil di agregasi kabupaten."
    )

    st.header("6. Peta produksi kecamatan 2025")
    prod = {k["name"]: k["prod_2025"] for k in KECAMATAN}
    st.pyplot(draw_map(prod, "Estimasi produksi 2025", "ton"), use_container_width=True)
    pdf = pd.DataFrame(KECAMATAN).sort_values("prod_2025", ascending=False)
    st.dataframe(
        pdf[["name", "prod_2025", "activity", "lbs_ha"]].rename(
            columns={"name": "Kecamatan", "prod_2025": "Produksi (ton)", "activity": "Keaktifan (%)", "lbs_ha": "LBS (ha)"}
        ),
        hide_index=True,
        use_container_width=True,
    )


def page_kesimpulan():
    st.title("Bab V · Kesimpulan")
    st.subheader("1. Sawah aktif terpetakan dengan BiLSTM modifikasi")
    st.write(
        "Akurasi 0,9488 · F1 0,9514 · Kappa 0,8977. Intensitas tanam terpusat di tengah kabupaten "
        "(Bongas 80,4%, Lelea 79,4%); pesisir rendah (Pasekan 25,21%, Cantigi 26,74%)."
    )
    st.subheader("2. S1+S2 mendekati BPS hingga 0,1%")
    st.write(
        "Produktivitas: BiLSTM semua fitur, R² 0,8146. Luas: LightGBM S1+S2, R² 0,6181. "
        "Agregasi kabupaten terbaik tanpa iklim: 1.582.391 vs 1.583.262 ton. Kroya 129.068,57 ton, "
        "Anjatan 111.044,60 ton. Iklim resolusi kasar menambah noise pada total makro."
    )
    st.header("Saran")
    for i, t in enumerate(
        [
            "Bobot downscaling: irigasi, tanah, NDVI historis.",
            "Komposit 10–15 harian agar anomali singkat tidak hilang.",
            "Grid lebih halus, dengan hitungan yang masih terjangkau.",
            "Iklim beresolusi lebih tinggi / reanalisis regional.",
            "Arsitektur GRU, TCN, Transformer, atau CNN-LSTM.",
            "Rentang historis lebih panjang dari 2022–2024.",
        ],
        start=1,
    ):
        st.markdown(f"{i}. {t}")


page = st.sidebar.radio("Halaman", PAGES, index=0)
st.sidebar.markdown("---")
st.sidebar.caption("Ubah `data.py` untuk angka, `app.py` untuk narasi.")

{
    "Beranda": page_beranda,
    "Pendahuluan": page_pendahuluan,
    "Tinjauan Pustaka": page_landasan,
    "Metode": page_metode,
    "Hasil": page_hasil,
    "Kesimpulan": page_kesimpulan,
}[page]()
