import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SectorChart({ sectors }) {
  const sectorNames = sectors.map((item) => item[0]);
  const sectorValues = sectors.map((item) => item[1]);

  const data = {
    labels: sectorNames,
    datasets: [
      {
        data: sectorValues,
        // Modern Tailwind-inspired palette
        backgroundColor: [
          "#6366f1", // indigo-500
          "#10b981", // emerald-500
          "#0ea5e9", // sky-500
          "#f59e0b", // amber-500
          "#f43f5e", // rose-500
          "#8b5cf6", // violet-500
          "#14b8a6", // teal-500
          "#ec4899", // pink-500
        ],
        hoverBackgroundColor: [
          "#4f46e5", // indigo-600
          "#059669", // emerald-600
          "#0284c7", // sky-600
          "#d97706", // amber-600
          "#e11d48", // rose-600
          "#7c3aed", // violet-600
          "#0d9488", // teal-600
          "#db2777", // pink-600
        ],
        borderRadius: 6,
        borderSkipped: false, // Rounds both ends of the horizontal bar
        maxBarThickness: 32, // Replaced fixed thickness for better responsiveness
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b", // slate-800
        padding: 12,
        titleFont: { size: 13, family: "system-ui, sans-serif", weight: "600" },
        bodyFont: { size: 14, family: "system-ui, sans-serif", weight: "500" },
        cornerRadius: 8,
        displayColors: false, // Hides the color box in the tooltip
        callbacks: {
          label: function (context) {
            return ` ${context.parsed.x}`; // Adds a little breathing room in the tooltip text
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#f1f5f9", // Very faint slate-100 gridlines
          drawTicks: false,
        },
        border: {
          display: false, // Removes the hard axis line
        },
        ticks: {
          font: { family: "system-ui, sans-serif", size: 12 },
          color: "#64748b", // slate-500
          padding: 8,
        },
      },
      y: {
        grid: {
          display: false, // Removes horizontal gridlines for a cleaner look
        },
        border: {
          display: false,
        },
        ticks: {
          font: { family: "system-ui, sans-serif", size: 13, weight: "500" },
          color: "#334155", // slate-700
          padding: 12,
        },
      },
    },
  };

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-200/50 md:p-8">
      {/* Polished Header Section */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-6 w-1.5 rounded-full bg-indigo-500"></div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Sector Weightings
          </h2>
        </div>
        <p className="ml-4.5 text-sm text-slate-500">
          Global market distribution and core momentum across industries
        </p>
      </div>

      {/* Chart Container */}
      <div className="h-[420px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SectorChart;
