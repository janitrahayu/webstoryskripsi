import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { PageHero, Section } from "@/components/page-hero";
import { CRISP_PHASES, DATA_SOURCES } from "@/data/tables";

export const Route = createFileRoute("/metode")({ component: Metode });

function Metode() {
  return (
    <>
      <PageHero
        kicker="Bab III"
        title="Metode penelitian"
        lead="Penelitian ini menggunakan kerangka kerja CRISP-DM"
      />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:px-6">
        <Section kicker="3.1" title="Tinjauan Umum">
          <p className="mb-6 text-justify">
            Penelitian ini kuantitatif, berbasis remote sensing multisensor dan data iklim. Tiga
            masalah yang diikat: (1) sensor tunggal tidak menutup awan dan ambiguitas sinyal
            sekaligus; (2) peta lahan statis memicu bias area non-padi; (3) produksi resmi hanya
            tersedia di tingkat kabupaten. Solusi, tujuan, dan evaluasi dirangkai pada bagan
            kerangka berpikir dan alur penelitian di bawah ini.
          </p>
          
          <div className="space-y-6">
            <KerangkaDiagram />
            <Section title="Alur two-phase modeling">
              <TwoPhaseDiagram />
            </Section>
            <AlurDiagram />
          </div>
        </Section>

        <Section kicker="3.2" title="CRISP-DM">
          <p className="text-justify">
            Cross-Industry Standard Process for Data Mining dipilih karena siklusnya terstruktur
            dan berorientasi pemecahan masalah nyata—cocok untuk data heterogen dan komparasi
            banyak algoritma. Fase Modeling dipecah dua sub-fase berurutan.
          </p>
          <CrispDiagram />
          
          <div className="mt-6 space-y-4">
            {CRISP_PHASES.map((p) => {
              const isModeling = p.name.toLowerCase().includes("modeling");
              return (
                <div
                  key={p.name}
                  className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
                >
                  <h3 className="mb-3 font-display text-xl font-semibold">{p.name}</h3>

                  <div className="flex flex-col items-start gap-6 lg:flex-row">
                    <div className="flex-1">
                      {p.goal && (
                        <p className="text-sm leading-relaxed text-muted text-justify whitespace-pre-line">
                          {p.goal}
                        </p>
                      )}

                      {p.items && (
                        <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted text-justify">
                          {p.items.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="mt-1.5 text-paddy text-[10px]">-</span>
                              <p>{item}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="mt-4 text-sm text-justify">
                        <span className="font-medium text-paddy">Output: </span>
                        {p.out}
                      </p>
                    </div>

                    {/* Render Gambar Satuan untuk fase selain Modeling */}
                    {p.image && !isModeling && (
                      <div className="w-full shrink-0 md:w-1/3 lg:w-1/2 xl:w-[28%]">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-auto w-full rounded-md border border-line bg-white object-contain p-2 shadow-sm"
                        />
                      </div>
                    )}
                  </div>

                  {/* Render 8 Arsitektur Model khusus untuk Fase Modeling */}
                  {isModeling && (
                    <div className="mt-8 border-t border-line pt-6">
                      <h4 className="font-display text-lg font-semibold mb-6 text-center">
                        Arsitektur Model Deep Learning (Regresi & Klasifikasi)
                      </h4>
                      
                      <div className="space-y-8">
                        {/* KELOMPOK 2: KLASIFIKASI (4 Gambar) */}
                        <div>
                          <h5 className="font-semibold text-sm text-paddy mb-4 uppercase tracking-wider">
                            2. Model Klasifikasi (Piksel 10 m)
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <ArchitectureCard 
                              src="cls-lstm-filho.png" 
                              title="LSTM Filho et al." 
                              desc="Arsitektur baseline LSTM untuk klasifikasi" 
                            />
                            <ArchitectureCard 
                              src="cls-bilstm-filho.png" 
                              title="BiLSTM Filho et al." 
                              desc="Arsitektur baseline BiLSTM untuk klasifikasi" 
                            />
                            <ArchitectureCard 
                              src="cls-lstm-modif.png" 
                              title="LSTM Modifikasi" 
                              desc="Arsitektur LSTM modifikasi untuk klasifikasi" 
                            />
                            <ArchitectureCard 
                              src="cls-bilstm-modif.png" 
                              title="BiLSTM Modifikasi" 
                              desc="Arsitektur BiLSTM modifikasi terbaik untuk klasifikasi" 
                            />
                          </div>
                        </div>
                        {/* KELOMPOK 1: REGRESI (4 Gambar) */}
                        <div>
                          <h5 className="font-semibold text-sm text-paddy mb-4 uppercase tracking-wider">
                            1. Model Regresi (Grid 1 km)
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <ArchitectureCard 
                              src="reg-lstm-jeong.png" 
                              title="LSTM Jeong et al." 
                              desc="Arsitektur baseline LSTM untuk regresi" 
                            />
                            <ArchitectureCard 
                              src="reg-bilstm-jeong.png" 
                              title="BiLSTM Jeong et al." 
                              desc="Arsitektur baseline BiLSTM untuk regresi" 
                            />
                            <ArchitectureCard 
                              src="reg-lstm-modif.png" 
                              title="LSTM Modifikasi" 
                              desc="Arsitektur LSTM modifikasi untuk regresi" 
                            />
                            <ArchitectureCard 
                              src="reg-bilstm-modif.png" 
                              title="BiLSTM Modifikasi" 
                              desc="Arsitektur BiLSTM modifikasi terbaik untuk regresi" 
                            />
                          </div>
                        </div>

                        
                      </div>
                    </div>
                  )}

                  {/* Tabel Data Understanding */}
                  {p.name.toLowerCase().includes("data understanding") && (
                    <div className="mt-6 border-t border-line pt-4">
                      <DataTable
                        caption="Tabel 3. Rincian data yang digunakan"
                        columns={[
                          { key: "no", label: "No", numeric: true },
                          { key: "name", label: "Data" },
                          { key: "source", label: "Sumber" },
                          { key: "spatial", label: "Resolusi spasial" },
                          { key: "temporal", label: "Resolusi temporal" },
                        ]}
                        rows={DATA_SOURCES.map((r) => ({ ...r }))}
                      />
                      <p className="mt-4 text-sm text-justify text-muted leading-relaxed">
                        Amatan KSA mengidentifikasi Padi, Puso, dan Tanaman Lain. Kelas Air,
                        Bangunan, dan Hutan ditambah secara manual agar ketidakseimbangan
                        non-pertanian tertutup. Sentinel-1 GRD melalui kalibrasi radiometri,
                        koreksi terrain SRTM, dan filter speckle boxcar. Sentinel-2 Level-2A
                        difilter SCL; komposit klasifikasi diambil tujuh hari terakhir tiap
                        bulan agar selaras jadwal KSA tanggal 25–31.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </>
  );
}

function ArchitectureCard({ src, title, desc }: { src: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-line bg-surface p-3 shadow-sm transition-all hover:shadow-md">
      <div className="aspect-[3/4] w-full overflow-hidden rounded bg-white flex items-center justify-center p-2 border border-line/50">
        <img 
          src={src} 
          alt={title} 
          className="h-full w-full object-contain" 
        />
      </div>
      <div className="mt-3 text-center">
        <h6 className="font-display text-xs font-semibold text-ink">{title}</h6>
        <p className="mt-1 text-[11px] text-muted leading-tight">{desc}</p>
      </div>
    </div>
  );
}

export function CrispDiagram() {
  const phases = [
    { n: "01", t: "Business Understanding", d: "Masalah & lingkup" },
    { n: "02", t: "Data Understanding", d: "Enam sumber data (tabel terlampir di bawah ini)" },
    { n: "03", t: "Data Preparation", d: "Fitur Preprocessing" },
    { n: "04", t: "Modeling", d: "Klasifikasi + regresi" },
    { n: "05", t: "Evaluation", d: "Metrik Evaluasi Klasifikasi dan Regresi, serta validasi data resmi BPS" },
  ];
  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {phases.map((p, i) => (
        <li key={p.n} className="relative rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="font-display text-2xl font-semibold text-paddy">{p.n}</p>
          <p className="mt-2 font-medium leading-snug">{p.t}</p>
          <p className="mt-1 text-sm text-muted">{p.d}</p>
          {i < phases.length - 1 ? (
            <ArrowRight className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted md:block" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function TwoPhaseDiagram() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
      <article className="rounded-xl bg-paddy p-6 text-paper shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/70">Fase 1</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-white">Klasifikasi 10 m</h3>
        <p className="mt-3 text-sm leading-relaxed text-paper/85 text-justify">
          Sentinel-1 (VV, VH, RVI) dan Sentinel-2 (NDVI, EVI, LSWI, BSI) memetakan sawah padi
          aktif tiap bulan. Masking LBS BIG membatasi estimasi pada lahan sawah resmi.
        </p>
        <p className="mt-4 text-xs text-paper/70">Output: peta padi bulanan + proporsi piksel per grid</p>
      </article>
      <div className="hidden items-center justify-center md:flex">
        <ArrowRight className="size-6 text-paddy" />
      </div>
      <div className="flex justify-center md:hidden">
        <ArrowDown className="size-6 text-paddy" />
      </div>
      <article className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-paddy">Fase 2</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">Regresi 1 km × 1 km</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted text-justify">
          Produktivitas dan luas panen diprediksi terpisah, lalu dikalikan. Ablation lima skenario
          data menguji kontribusi radar, optik, dan iklim.
        </p>
        <p className="mt-4 text-xs text-muted">Output: produksi grid, agregasi kecamatan, validasi kabupaten</p>
      </article>
    </div>
  );
}

export function KerangkaDiagram() {
  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-center md:text-left">
          Kerangka Berpikir
        </h3>
      </div>
      <div className="p-3 md:p-5">
        <img 
          src="/Kerangka Berpikir.png" 
          alt="Kerangka Berpikir Skripsi" 
          className="h-auto w-full rounded-lg object-contain"
        />
      </div>
    </div>
  );
}

export function AlurDiagram() {
  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="border-b border-line px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-center md:text-left">
          Alur Penelitian
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4 p-3 md:grid-cols-2 md:p-5">
        <img 
          src="/alur 1.png" 
          alt="Alur Penelitian Fase 1" 
          className="h-auto w-full object-contain border border-line"
        />
        <img 
          src="/alur 2.png" 
          alt="Alur Penelitian Fase 2" 
          className="h-auto w-full object-contain border border-line"
        />
      </div>
    </div>
  );
}