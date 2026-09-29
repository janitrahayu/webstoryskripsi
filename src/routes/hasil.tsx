import { createFileRoute } from "@tanstack/react-router";
import { AblationChart, ClassificationChart, ScenarioChart } from "@/components/charts";
import { ChoroplethMap } from "@/components/choropleth-map";
import { DataTable } from "@/components/data-table";
import { Callout, PageHero, Section } from "@/components/page-hero";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { TimeMap } from "@/components/time-map";
import { KECAMATAN, TOP_ACTIVITY, TOP_PRODUCTION } from "@/data/kecamatan";
import { AREA_ABLATION, CLASSIFICATION, PRODUCTIVITY_ABLATION, SCENARIO_TOTALS } from "@/data/tables";
import { formatPct, formatTon } from "@/lib/utils";

export const Route = createFileRoute("/hasil")({ component: Hasil });

const TOC = [
  { href: "#klasifikasi", t: "1. Klasifikasi sawah" },
  { href: "#keaktifan", t: "2. Peta keaktifan" },
  { href: "#groundcheck", t: "3. Validasi groundcheck" },
  { href: "#downscaling", t: "4. Downscaling 1 km" },
  { href: "#ablation", t: "5. Ablation regresi" },
  { href: "#validasi", t: "6. Validasi BPS" },
  { href: "#produksi", t: "7. Peta produksi 2025" },
  { href: "#dinamika", t: "8. Dinamika 2022–2025" },
];

function Hasil() {
  return (
    <>
      <PageHero
        kicker="Bab IV"
        title="Hasil dan pembahasan"
        lead="Mentransformasi Data Citra Menjadi Angka Produksi: Alur Lengkap Pemetaan Lahan, Fase Tumbuh, hingga Estimasi Hasil."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[200px_minmax(0,1fr)] md:px-6">
        <nav className="hidden lg:block" aria-label="Urutan hasil">
          <ol className="sticky top-24 space-y-1 text-sm">
            {TOC.map((x) => (
              <li key={x.href}>
                <a href={x.href} className="block rounded-sm px-2 py-2 text-muted hover:bg-paddy-mist hover:text-paddy">
                  {x.t}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-16">
          <Section id="klasifikasi" kicker="4.1–4.3" title="Fase 1: klasifikasi tutupan padi">
            <p>
              Delapan model diuji pada piksel 10 m. F1-Score jadi acuan utama, bukan akurasi, agar
              kelas minoritas bisa dikenali dengan baik. BiLSTM modifikasi memiliki evaluasi paling baik: akurasi 0,9488, F1 0,9514, Kappa
              0,8977. Versi modifikasi mengalahkan arsitektur asli sekitar 0,6–1,0 poin persentase,
              dan mengungguli ensemble pohon.
            </p>
            <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] md:p-6">
              <p className="text-sm font-medium">Perbandingan F1 dan akurasi</p>
              <ClassificationChart />
            </div>
            <DataTable
              caption="Performa model klasifikasi"
              columns={[
                { key: "model", label: "Model" },
                { key: "acc", label: "Akurasi", numeric: true },
                { key: "f1", label: "F1-Score", numeric: true },
                { key: "kappa", label: "Cohen’s Kappa", numeric: true },
              ]}
              rows={CLASSIFICATION.map((r) => ({
                model: r.model,
                acc: r.acc.toFixed(4),
                f1: r.f1.toFixed(4),
                kappa: r.kappa.toFixed(4),
                best: "best" in r && r.best ? "1" : "",
              }))}
              highlightRow={(row) => row.best === "1"}
            />
            <Callout>
              Jaringan sekuensial pada <em>deep learning</em> yang lebih dalam belajar dependensi temporal indeks
              radar-optik lebih baik daripada lag tabular yang biasa diunggulkan model pohon.
            </Callout>
          </Section>

          <Section id="keaktifan" title="Peta keaktifan tanam 2022–2024">
            <p>
              Setelah model terbaik diterapkan ke seluruh piksel dan di-mask dengan poligon LBS,
              proporsi lahan padi aktif dihitung sebagai rasio kumulatif piksel padi terhadap piksel valid
              sepanjang periode. Hijau pekat di tengah-barat kabupaten berarti sawah ditanami hampir
              setiap musim; pesisir utara lebih pucat.
            </p>
            <ChoroplethMap
              metric="activity"
              title="Indeks keaktifan tanam"
              caption="Nilai tinggi (Bongas 80,4%, Lelea 79,4%, Bangodua 78,7%) menandai intensitas tanam. Pasekan 25,2%, Cantigi 26,7%, dan Indramayu kota 37,2% rendah: alih fungsi ke tambak, bera, puso, dan pasokan air terbatas."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="p-5">
                <CardTitle className="text-lg">Paling intensif</CardTitle>
                <CardDesc>Lahan LBS hampir terus ditanami padi.</CardDesc>
                <ul className="mt-3 space-y-1 text-sm">
                  {TOP_ACTIVITY.slice(0, 5).map((k) => (
                    <li key={k.name} className="flex justify-between">
                      <span>{k.name}</span>
                      <span className="tabular-nums font-medium">{formatPct(k.activity, 1)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5">
                <CardTitle className="text-lg">Paling rendah</CardTitle>
                <CardDesc>Dominan pesisir dan kawasan tambak.</CardDesc>
                <ul className="mt-3 space-y-1 text-sm">
                  {TOP_ACTIVITY.slice(-5)
                    .reverse()
                    .map((k) => (
                      <li key={k.name} className="flex justify-between">
                        <span>{k.name}</span>
                        <span className="tabular-nums font-medium">{formatPct(k.activity, 1)}</span>
                      </li>
                    ))}
                </ul>
              </Card>
            </div>
          </Section>

          <Section id="groundcheck" title="Validasi groundcheck">
            <p>
              Validasi ini menempatkan sembilan titik validasi berwarna kuning pada peta overlay klasifikasi dan LBS, 
              masing-masing dilengkapi foto Google Street View. Empat titik berlabel padi memperlihatkan hamparan sawah 
              hijau atau lahan sawah pascapanen dengan sisa jerami, sedangkan lima titik berlabel bukan padi memperlihatkan 
              hutan, semak dan rawa, tambak atau kolam air, lahan terbuka, dan area dengan bangunan.
            </p>
            
            <div className="my-6 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] border">
              <img 
                src="/groundcheck.png" 
                alt="Sembilan titik validasi groundcheck dengan Street View" 
                className="w-full h-auto object-cover" 
              />
            </div>
            
            <p>
              Titik-titik bukan padi umumnya berada di luar area LBS berwarna hijau, sedangkan titik padi berada di dalamnya, 
              sehingga hasil klasifikasi dan LBS konsisten dengan kondisi lapangan pada titik-titik tersebut. Validasi ini 
              bersifat kualitatif karena hanya sembilan titik dan foto Street View belum tentu bertepatan dengan waktu 
              pengamatan satelit. Titik yang tampak sebagai lahan sisa jerami atau bera menunjukkan bahwa fase pascapanen 
              sulit dibedakan secara visual dari lahan nonpadi, sehingga menjadi sumber ketidakpastian klasifikasi sekaligus 
              keterbatasan penelitian.
            </p>
          </Section>

          <Section id="downscaling" kicker="4.4" title="Mengapa grid 1 km × 1 km">
            <p>
              BPS tidak merilis produksi kecamatan. Satu angka kabupaten menyembunyikan perbedaan
              seperti Bongas vs Pasekan. Grid 1 km dipilih karena tiga alasan: (1) tiap sel memuat
              sekitar 10.000 piksel Sentinel 10 m sehingga proporsi padi stabil; (2) iklim asli
              lebih kasar (CHIRPS ~5 km, ERA5-Land ~9 km) sehingga grid lebih halus dari iklim
              tetapi tidak mengada-ada; (3) jumlah sel cukup untuk melatih regresi.
            </p>
            <p>
              Target per grid = proporsi piksel padi terhadap LBS dikalikan produksi kabupaten.
            </p>
          </Section>

          <Section id="ablation" title="Fase 2: ablation regresi">
            <p>
              Hasil downscaling estimasi produksi ke dalam grid berukuran 1 km × 1 km 
              berfungsi sebagai target pelatihan model regresi. Dalam proses 
              preprocessing data regresi, ekstraksi fitur dari citra satelit (Sentinel-1 
              dan Sentinel-2) serta data iklim (CHIRPS dan ERA5-Land) difokuskan hanya 
              pada piksel yang terklasifikasi sebagai sawah aktif melalui proses masking.
              Setelah data iklim disesuaikan resolusinya melalui interpolasi bilinear ke 
              titik tengah grid, seluruh fitur diekstraksi menjadi representasi bulanan 
              dan diagregasikan secara spasial ke tingkat grid menggunakan nilai median. 
              Rangkaian proses ini bertujuan untuk menstrukturkan data menjadi format panel 
              spasiotemporal bulanan yang utuh dan siap digunakan sebagai variabel prediktor 
              dalam model regresi.
            </p>
            <p>
              Lima skenario input × delapan algoritma. Pola konsisten: iklim saja paling lemah
              (R² produktivitas 0,50–0,67) karena hujan dan suhu homogen dalam satu kabupaten.
              Variasi hasil antar grid lebih banyak ditulis vegetasi yang tertangkap optik dan radar.
            </p>
            <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] md:p-6">
              <p className="text-sm font-medium">R² produktivitas pada empat model kunci</p>
              <AblationChart />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardTitle>Estimasi Produktivitas Terbaik</CardTitle>
                <p className="mt-3 font-display text-4xl font-semibold text-paddy">R² 0,8146</p>
                <CardDesc>
                  BiLSTM modifikasi, skenario semua fitur. RMSE 0,8053 ton/ha. Penambahan iklim ke
                  S1+S2 masih membantu di level grid untuk hasil per hektar.
                </CardDesc>
              </Card>
              <Card>
                <CardTitle>Estimasi Luas Lahan Terbaik</CardTitle>
                <p className="mt-3 font-display text-4xl font-semibold text-paddy">R² 0,6181</p>
                <CardDesc>
                  LightGBM, skenario S1+S2, RMSE 18,50 ha. Luas lebih sulit dijelaskan satelit:
                  keputusan tanam, kepemilikan, dan bera tidak terekam spektral.
                </CardDesc>
              </Card>
            </div>
            <DataTable
              caption="Hasil Evaluasi Model Terbaik Estimasi Produktivitas — BiLSTM modifikasi"
              columns={[
                { key: "scenario", label: "Skenario" },
                { key: "r2", label: "R²", numeric: true },
                { key: "rmse", label: "RMSE (ton/ha)", numeric: true },
              ]}
              rows={PRODUCTIVITY_ABLATION.filter((r) => r.model === "BiLSTM Modifikasi").map((r) => ({
                scenario: r.scenario,
                r2: r.r2.toFixed(4),
                rmse: r.rmse.toFixed(4),
                best: r.best ? "1" : "",
              }))}
              highlightRow={(row) => row.best === "1"}
            />
            <DataTable
              caption="Hasil Evaluasi Model Terbaik Estimasi Luas lahan — LightGBM"
              columns={[
                { key: "scenario", label: "Skenario" },
                { key: "r2", label: "R²", numeric: true },
                { key: "rmse", label: "RMSE (ha)", numeric: true },
              ]}
              rows={AREA_ABLATION.filter((r) => r.model === "LightGBM").map((r) => ({
                scenario: r.scenario,
                r2: r.r2.toFixed(4),
                rmse: r.rmse.toFixed(4),
                best: r.best ? "1" : "",
              }))}
              highlightRow={(row) => row.best === "1"}
            />
          </Section>

          <Section id="validasi" title="Validasi terhadap Data Produksi BPS Tahun 2025">
            <p>
              Metrik pada tingkat grid menunjukkan konsistensi internal model, tetapi validasi 
              operasional yang sesungguhnya terletak pada skala kabupaten. Mengingat BPS hanya 
              merilis satu angka agregat tahunan, agregasi estimasi dari seluruh grid menjadi 
              tolok ukur utama untuk menguji keandalan hasil akhir model (produktivitas × luas panen).
            </p>
            <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] md:p-6">
              <p className="text-sm font-medium">Total produksi prediksi vs data BPS</p>
              <ScenarioChart />
            </div>
            <DataTable
              caption="Agregasi kabupaten 2025"
              columns={[
                { key: "name", label: "Skenario" },
                { key: "ton", label: "Produksi (ton)", numeric: true },
                { key: "note", label: "Catatan" },
              ]}
              rows={SCENARIO_TOTALS.map((s) => ({
                name: s.name,
                ton: formatTon(s.ton, 0),
                note: s.note,
                best: "best" in s && s.best ? "1" : "",
              }))}
              highlightRow={(row) => row.best === "1"}
            />
            <Callout>
              Insight kunci. S1+S2 tanpa iklim: 1.582.391 ton vs BPS 1.583.262 ton (selisih 871 ton,
              0,1%). Iklim saja underestimasi tajam (869.597 ton). Semua fitur justru ambruk
              (539.991 ton). Di skala mikro, interpolasi iklim 5–9 km ke grid 1 km menambah noise
              musiman, bukan sinyal spasial. Radar + optik sudah cukup untuk volume kabupaten.
            </Callout>
          </Section>

          <Section id="produksi" kicker="Tabel 8" title="Peta Estimasi Produksi Kecamatan 2025">
            <p>
              Angka di peta ini adalah agregasi grid skenario S1+S2—kombinasi yang paling dekat ke
              BPS. Kroya 129.069 ton memimpin, diikuti Anjatan, Gabuswetan, dan Terisi. Pesisir
              Pasekan hanya 13.176 ton, sejalan LBS yang sempit dan keaktifan rendah.
            </p>
            <ChoroplethMap
              metric="production2025"
              title="Estimasi produksi padi 2025"
              caption="Skema geografis 31 kecamatan, diarsir menurut total ton. Hover untuk LBS dan keaktifan. Ini peta kebijakan: volume, bukan hasil per hektar."
            />
            <DataTable
              caption="Estimasi produksi 2025 per kecamatan"
              columns={[
                { key: "i", label: "#", numeric: true },
                { key: "name", label: "Kecamatan" },
                { key: "ton", label: "Produksi (ton)", numeric: true },
                { key: "act", label: "Keaktifan", numeric: true },
              ]}
              rows={TOP_PRODUCTION.map((k, i) => ({
                i: i + 1,
                name: k.name,
                ton: formatTon(k.production2025, 2),
                act: formatPct(k.activity, 1),
              }))}
            />
            <p className="text-sm text-muted">
              Total 31 kecamatan: {formatTon(KECAMATAN.reduce((s, k) => s + k.production2025, 0), 2)} ton.
              Data 2022–2024 adalah downscaling aktual, bukan prediksi; 2025 adalah out-of-sample.
            </p>
          </Section>

          <Section id="dinamika" kicker="Eksplorasi Spasial" title="Dinamika Spasiotemporal 2022–2025">
            <p>
              Simulasi interaktif di bawah ini memperlihatkan perubahan produksi padi antar kecamatan dari tahun ke tahun. Tahun 2022 digunakan sebagai baseline, sedangkan peta untuk tahun berikutnya menunjukkan fluktuasi produksi secara <em>year-on-year</em> (YoY).
            </p>
            <div className="mt-6">
              <TimeMap />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}