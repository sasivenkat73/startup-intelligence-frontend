import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API, { getFundingHistory } from "../services/api";
import FundingHistory from "../components/FundingHistory";
import LoadingScreen from "../components/LoadingScreen";

function StartupDetailPage() {
  const { name } = useParams();

  const [profile, setProfile] = useState(null);
  const [fundingHistory, setFundingHistory] = useState([]);

  useEffect(() => {
    API.get(`/startups/profile/${name}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch(console.error);

    getFundingHistory(name)
      .then((data) => {
        setFundingHistory(data);
      })
      .catch((error) => {
        console.error("Funding history error", error);
      });
  }, [name]);

  if (!profile) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
          {/* Subtle decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-50/80 blur-3xl transition-all"></div>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {profile.startupName}
              </h1>
              <p className="mt-3 text-lg font-medium text-slate-500">
                {profile.sector}
              </p>
            </div>

            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 ring-1 ring-inset ring-blue-600 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 active:scale-[0.98]"
            >
              Visit Website
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* FUNDING OVERVIEW */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/20 transition-all hover:border-slate-300 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Current Investment
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-emerald-600">
              {profile.currentInvestment}
            </h3>
          </div>

          <div className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/20 transition-all hover:border-slate-300 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Lead Investors
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-800">
              {profile.leadInvestors}
            </h3>
          </div>

          <div className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/20 transition-all hover:border-slate-300 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Business Model
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-800">
              {profile.businessModel}
            </h3>
          </div>
        </div>

        {/* AI SUMMARY */}
        <div className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-blue-600"></div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                AI Company Intelligence
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                AI-generated analysis and market insights
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100/75 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 p-6 shadow-inner md:p-8">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                AI Generated Insight
              </span>
            </div>

            <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
              {profile.aiSummary}
            </p>
          </div>
        </div>

        {/* FUNDING HISTORY */}
        <div className="mb-8">
          <FundingHistory history={fundingHistory} />
        </div>

        {/* BUSINESS DETAILS */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm ring-1 ring-slate-200/50">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-indigo-600"></div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Business Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50/50 p-5 ring-1 ring-inset ring-slate-200/75">
              <p className="mb-2 text-sm font-medium text-slate-500">Revenue</p>
              <p className="text-lg font-semibold text-slate-900">
                {profile.revenue}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50/50 p-5 ring-1 ring-inset ring-slate-200/75">
              <p className="mb-2 text-sm font-medium text-slate-500">
                Market Share
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {profile.marketShare}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50/50 p-5 ring-1 ring-inset ring-slate-200/75">
              <p className="mb-2 text-sm font-medium text-slate-500">
                Parent Company
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {profile.parentCompany || "Independent"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupDetailPage;
