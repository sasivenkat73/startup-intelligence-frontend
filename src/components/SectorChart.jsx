import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Doughnut elements instead of Bar
ChartJS.register(ArcElement, Tooltip, Legend);

function SectorChart({ sectors }) {
  // 1. Sort the data from highest to lowest for better readability
  const sortedSectors = [...sectors].sort(
    (a, b) => Number(b[1]) - Number(a[1]),
  );

  const sectorNames = sortedSectors.map((item) => item[0]);
  const sectorValues = sortedSectors.map((item) => Number(item[1]));

  // Extended modern color palette
  const baseColors = [
    "#6366f1", // indigo-500
    "#10b981", // emerald-500
    "#0ea5e9", // sky-500
    "#f59e0b", // amber-500
    "#f43f5e", // rose-500
    "#8b5cf6", // violet-500
    "#14b8a6", // teal-500
    "#ec4899", // pink-500
    "#64748b", // slate-500
  ];

  // Map colors dynamically in case there are more sectors than colors
  const backgroundColors = sectorNames.map(
    (_, i) => baseColors[i % baseColors.length],
  );

  // Slightly darken on hover
  const hoverColors = backgroundColors.map((color) =>
    color.replace("500", "600"),
  );

  const data = {
    labels: sectorNames,
    datasets: [
      {
        data: sectorValues,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
        borderWidth: 3,
        borderColor: "#ffffff", // Creates clean gaps between slices
        hoverOffset: 6, // Makes the hovered slice pop out slightly
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%", // Creates the sleek thin ring look
    plugins: {
      legend: {
        display: false, // We hide the default legend to build a better custom one below
      },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 13, family: "system-ui, sans-serif", weight: "600" },
        bodyFont: { size: 14, family: "system-ui, sans-serif", weight: "500" },
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
      },
    },
  };

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-200/50 md:p-8">
      {/* Header Section */}
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

      {/* Two-column layout: Chart on left, Custom Legend on right */}
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        {/* Doughnut Chart */}
        <div className="relative h-[320px] w-full md:w-1/2">
          <Doughnut data={data} options={options} />
          {/* Centered label inside the doughnut */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Total Sectors
            </span>
            <span className="mt-1 text-3xl font-bold text-slate-800">
              {sectorNames.length}
            </span>
          </div>
        </div>

        {/* Custom Data List (Legend) */}
        <div className="w-full md:w-1/2">
          <div className="max-h-[320px] space-y-3 overflow-y-auto pr-2">
            {sortedSectors.map((sector, index) => {
              const [name, value] = sector;
              const color = backgroundColors[index % backgroundColors.length];

              return (
                <div
                  key={name}
                  className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    {/* Color Dot */}
                    <div
                      className="h-3 w-3 rounded-full ring-2 ring-white shadow-sm"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="font-medium text-slate-700 group-hover:text-slate-900">
                      {name}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900">{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectorChart;
