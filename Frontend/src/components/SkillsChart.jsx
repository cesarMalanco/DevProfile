import React, { useContext, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { CVContext } from "../context/CVContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const levelMap = { Basico: 1, Intermedio: 2, Avanzado: 3 };

export default function SkillsChart() {
  const { skills } = useContext(CVContext);

  const labels = useMemo(() => skills.map((s) => s.nombre || "-"), [skills]);
  const values = useMemo(() => skills.map((s) => levelMap[s.nivel] || 0), [skills]);

  const colors = useMemo(() => labels.map((_, i) => `hsl(${(i * 40) % 360} 70% 50% / 0.85)`), [labels]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Nivel (1=Básico,3=Avanzado)",
          data: values,
          backgroundColor: colors,
          borderColor: colors.map((c) => c.replace(/0\.85\)$/, "1)")),
          borderWidth: 1,
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
      ],
    }),
    [labels, values, colors]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 8 },
      scales: {
        x: {
          ticks: { color: "#374151", maxRotation: 45, minRotation: 0 },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 3,
          ticks: {
            stepSize: 1,
            callback: function (value) {
              if (value === 1) return "Básico";
              if (value === 2) return "Intermedio";
              if (value === 3) return "Avanzado";
              return value;
            },
            color: "#374151",
          },
          grid: { color: "rgba(15, 23, 42, 0.04)" },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(17,24,39,0.95)",
          titleColor: "#fff",
          bodyColor: "#e5e7eb",
          padding: 10,
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y;
              return `Nivel: ${v} (${v === 1 ? "Básico" : v === 2 ? "Intermedio" : v === 3 ? "Avanzado" : ""})`;
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="skills-chart">
      <Bar data={data} options={options} />
    </div>
  );
}
