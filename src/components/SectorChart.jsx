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

        backgroundColor: [
          "#1f77b4",
          "#aec7e8",
          "#ff7f0e",
          "#2ca02c",
          "#9467bd",
          "#bcbd22",
          "#d62728",
        ],

        borderRadius: 6,
        barThickness: 30,
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
    },
  };

  return (
    <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Global Market Sector Weightings & Core Momentum
      </h2>

      <div className="h-[420px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SectorChart;
