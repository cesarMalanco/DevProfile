import React, { useContext, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";
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

const levelMap = { Basic: 1, Intermediate: 2, Advanced: 3 };

export default function SkillsChart() {
  const { skills } = useContext(CVContext);
  const { darkMode } = useTheme();
  const labels = useMemo(() => skills.map((s) => s.nombre || "-"), [skills]);
  const values = useMemo(() => skills.map((s) => levelMap[s.nivel] || 0), [skills]);
  const themeColors = {
    bar: darkMode ? "#ebd488" : "#467db8",
    barBorder: darkMode ? "#baa560" : "#377ac5",
    barHover: darkMode ? "#d4af37" : "#95b0ce",

    text: darkMode ? "#e5d8ce" : "#021d43",
    grid: darkMode
      ? "rgba(232, 221, 184, 0.15)"
      : "rgba(172, 200, 240, 0.12)",

    tooltipBg: darkMode
      ? "#6e74a1"
      : "rgba(15, 23, 42, 0.92)",

    tooltipTitle: darkMode
      ? "#F2EEEB"
      : "#f8fafc",

    tooltipBody: darkMode
      ? "#f5f0de"
      : "#e2e8f0",
  };
  
  const colors = useMemo(
    () => labels.map(() => themeColors.bar),
    [labels, darkMode]
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Skill mastery",
          data: values,
          backgroundColor: colors,
          borderColor: themeColors.barBorder,
          borderWidth: 2,
          borderRadius: 12,
          barPercentage: 0.56,
          categoryPercentage: 0.7,
          hoverBackgroundColor: themeColors.barHover,
        },
      ],
    }),
    [labels, values, colors, darkMode]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 12 },
      scales: {
        x: {
          ticks: {
            color: themeColors.text,
            maxRotation: 45,
            minRotation: 0,
          },
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
            color: themeColors.text,
          },
          grid: { color: themeColors.grid },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: themeColors.tooltipBg,
          titleColor: themeColors.tooltipTitle,
          bodyColor: themeColors.tooltipBody,
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
    [darkMode]
  );

  return (
    <div className="skills-chart">
      <Bar data={data} options={options} />
    </div>
  );
}
