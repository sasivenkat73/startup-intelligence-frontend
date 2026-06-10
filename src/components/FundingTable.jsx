import SortToggle from "./SortToggle";
import { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { Link } from "react-router-dom";

function FundingTable({ fundingData, sortOrder, setSortOrder }) {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);

  const sectorOptions = [...new Set(fundingData.map((item) => item.sector))];

  const stageOptions = [
    ...new Set(fundingData.map((item) => item.fundingStage)),
  ];

  const parseInvestors = (investorStr) => {
    try {
      if (!investorStr || investorStr === "[]") return [];

      return investorStr
        .replace(/[\[\]']/g, "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } catch {
      return [];
    }
  };

  const filteredData = fundingData.filter((round) => {
    const sectorMatch =
      selectedSectors.length === 0 || selectedSectors.includes(round.sector);

    const stageMatch =
      selectedStages.length === 0 ||
      selectedStages.includes(round.fundingStage);

    return sectorMatch && stageMatch;
  });

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <SortToggle sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {/* Filter Section */}

      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50 px-6 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Filter Funding Rounds
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Refine results by sectors and startup funding stages
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <MultiSelectDropdown
              label="Sector"
              options={sectorOptions}
              selected={selectedSectors}
              setSelected={setSelectedSectors}
            />

            <MultiSelectDropdown
              label="Stage"
              options={stageOptions}
              selected={selectedStages}
              setSelected={setSelectedStages}
            />
          </div>
        </div>

        {/* Active filter pills */}

        <div className="mt-4 flex flex-wrap gap-2">
          {selectedSectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
            >
              {sector}
            </span>
          ))}

          {selectedStages.map((stage) => (
            <span
              key={stage}
              className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 text-left">Startup</th>

              <th className="px-6 py-4 text-left">Sector</th>

              <th className="px-6 py-4 text-left">Stage</th>

              <th className="px-6 py-4 text-left">Amount</th>

              <th className="px-6 py-4 text-left">Investors</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl">📊</div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-700">
                      No matching funding rounds
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Try adjusting your filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((round, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-100 transition-all duration-200 hover:bg-indigo-50/30"
                >
                  <td className="px-6 py-4 font-semibold">
                    <Link
                      to={`/startup/${encodeURIComponent(round.startupName)}`.trim()}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {round.startupName}
                    </Link>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                      {round.sector}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      {round.fundingStage}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="font-bold text-emerald-600">
                      {round.fundingAmount}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {parseInvestors(round.investors).map((investor, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition hover:scale-105"
                        >
                          {investor}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FundingTable;
