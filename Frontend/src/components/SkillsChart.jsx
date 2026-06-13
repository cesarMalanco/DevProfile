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

  const colors = useMemo(
    () => labels.map(() => "rgba(30, 58, 138, 0.92)"),
    [labels]
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Skill mastery",
          data: values,
          backgroundColor: colors,
          borderColor: "rgba(30, 58, 138, 1)",
          borderWidth: 2,
          borderRadius: 12,
          barPercentage: 0.56,
          categoryPercentage: 0.7,
          hoverBackgroundColor: "rgba(30, 58, 138, 0.98)",
        },
      ],
    }),
    [labels, values, colors]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 12 },
      scales: {
        x: {
          ticks: { color: "#334155", maxRotation: 45, minRotation: 0 },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 3,
          ticks: {
            stepSize: 1,
            callback: function (value) {
              if (value === 1) return "Basic";
              if (value === 2) return "Intermediate";
              if (value === 3) return "Advanced";
              return value;
            },
            color: "#334155",
          },
          grid: { color: "rgba(148, 163, 184, 0.12)" },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          titleColor: "#f8fafc",
          bodyColor: "#e2e8f0",
          padding: 12,
          boxPadding: 6,
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y;
              return `Level: ${v} (${v === 1 ? "Basic" : v === 2 ? "Intermediate" : v === 3 ? "Advanced" : ""})`;
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
