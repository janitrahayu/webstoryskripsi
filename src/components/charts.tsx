import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CLASSIFICATION, PRODUCTIVITY_ABLATION, SCENARIO_TOTALS } from "@/data/tables";

const PADDY = "#1F4D3A";
const MIST = "#5E8A6E";
const PAPER = "#C9C2B2";
const INK = "#1A1C16";

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-ink px-3 py-2 text-xs text-paper shadow-[var(--shadow-border)]">
      <p className="font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="tabular-nums text-paper/80">
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString("id-ID") : p.value}
        </p>
      ))}
    </div>
  );
}

export function ClassificationChart() {
  const data = CLASSIFICATION.map((r) => ({
    name: r.model.replace(" (Modifikasi)", " mod.").replace(" (Filho et al., 2020)", " Filho"),
    F1: r.f1,
    Akurasi: r.acc,
  }));
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
          <CartesianGrid stroke={PAPER} horizontal={false} />
          <XAxis type="number" domain={[0.78, 0.96]} tick={{ fill: INK, fontSize: 11 }} />
          <YAxis type="category" dataKey="name" width={118} tick={{ fill: INK, fontSize: 11 }} />
          <Tooltip content={<ChartTip />} />
          <Legend />
          <Bar dataKey="F1" fill={PADDY} radius={[0, 4, 4, 0]} maxBarSize={14} />
          <Bar dataKey="Akurasi" fill={MIST} radius={[0, 4, 4, 0]} maxBarSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AblationChart() {
  const models = ["LightGBM", "BiLSTM (Jeong)", "LSTM Modifikasi", "BiLSTM Modifikasi"];
  const scenarios = ["Sentinel-1", "Sentinel-2", "Iklim", "S1+S2", "Semua fitur"];
  const data = scenarios.map((s) => {
    const row: Record<string, string | number> = { scenario: s };
    for (const m of models) {
      const hit = PRODUCTIVITY_ABLATION.find((r) => r.model === m && r.scenario === s);
      if (hit) row[m] = hit.r2;
    }
    return row;
  });
  const colors = [PADDY, MIST, "#3d6b55", PAPER];
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid stroke={PAPER} vertical={false} />
          <XAxis dataKey="scenario" tick={{ fill: INK, fontSize: 11 }} />
          <YAxis domain={[0.45, 0.85]} tick={{ fill: INK, fontSize: 11 }} />
          <Tooltip content={<ChartTip />} />
          <Legend />
          {models.map((m, i) => (
            <Bar key={m} dataKey={m} fill={colors[i]} radius={[4, 4, 0, 0]} maxBarSize={18} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ScenarioChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={SCENARIO_TOTALS} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid stroke={PAPER} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: INK, fontSize: 11 }} interval={0} />
          <YAxis
            tick={{ fill: INK, fontSize: 11 }}
            tickFormatter={(v) => `${Math.round(v / 1000)} rb`}
          />
          <Tooltip content={<ChartTip />} />
          <Bar dataKey="ton" name="Produksi (ton)" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {SCENARIO_TOTALS.map((s) => (
              <Cell
                key={s.name}
                fill={"official" in s && s.official ? PAPER : "best" in s && s.best ? PADDY : MIST}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
