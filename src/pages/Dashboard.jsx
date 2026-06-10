import { useState } from "react";
import useLatest from "../hooks/useLatest";
import useSectors from "../hooks/useSector";

import MetricCard from "../components/MetricCard";
import SectorChart from "../components/SectorChart";
import FundingTable from "../components/FundingTable";
import LoadingScreen from "../components/LoadingScreen";
import FeedbackBox from "../components/FeedbackBox";

function Dashboard() {
  const [sortOrder, setSortOrder] = useState(false);

  const fundingData = useLatest(sortOrder) || [];
  const sectors = useSectors() || [];

  if (fundingData.length === 0 || sectors.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Startup Intelligence Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Real-time tracking of venture capital deployment timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Funding Volume" value="$5.2B" />

        <MetricCard title="Tracked Startups" value="8" />

        <MetricCard title="Total Investors" value="18" />

        <MetricCard title="Funding Rounds" value="8" />
      </div>

      <SectorChart sectors={sectors} />

      <FundingTable
        fundingData={fundingData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <FeedbackBox />
    </div>
  );
}

export default Dashboard;
