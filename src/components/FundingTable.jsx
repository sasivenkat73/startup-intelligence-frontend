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
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200/50">
      <SortToggle sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {/* Filter Section */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/50 px-6 py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900">
              Filter Funding Rounds
            </h3>
            <p className="mt-1 text-sm text-slate-500">
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
        {(selectedSectors.length > 0 || selectedStages.length > 0) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {selectedSectors.map((sector) => (
              <span
                key={sector}
                className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20"
              >
                {sector}
              </span>
            ))}
            {selectedStages.map((stage) => (
              <span
                key={stage}
                className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
              >
                {stage}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-sm">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <th scope="col" className="px-6 py-4">
                Startup
              </th>
              <th scope="col" className="px-6 py-4">
                Sector
              </th>
              <th scope="col" className="px-6 py-4">
                Stage
              </th>
              <th scope="col" className="px-6 py-4">
                Amount
              </th>
              <th scope="col" className="px-6 py-4">
                Investors
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-3xl ring-1 ring-slate-100">
                      📊
                    </div>
                    <h3 className="mt-5 text-sm font-semibold text-slate-900">
                      No matching funding rounds
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      We couldn't find anything matching your current filter
                      criteria. Try adjusting your selections.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((round, idx) => (
                <tr
                  key={idx}
                  className="group transition-colors duration-200 hover:bg-slate-50/75"
                >
                  <td className="px-6 py-5">
                    <Link
                      to={`/startup/${encodeURIComponent(round.startupName)}`.trim()}
                      className="font-semibold text-slate-900 transition-colors group-hover:text-indigo-600 group-hover:underline"
                    >
                      {round.startupName}
                    </Link>
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                      {round.sector}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                      {round.fundingStage}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="font-semibold text-emerald-700">
                      {round.fundingAmount}
                    </div>
                  </td>

                  <td className="px-6 py-5 whitespace-normal">
                    <div className="flex flex-wrap gap-1.5">
                      {parseInvestors(round.investors).map((investor, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 transition-transform duration-200 hover:scale-105"
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
