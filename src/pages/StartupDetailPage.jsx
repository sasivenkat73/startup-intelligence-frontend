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
    return <LoadingScreen/>
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                {profile.startupName}
              </h1>

              <p className="text-slate-500 text-lg mt-2">{profile.sector}</p>
            </div>

            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Visit Website →
            </a>
          </div>
        </div>

        {/* FUNDING OVERVIEW */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
            <p className="text-slate-500 text-sm uppercase tracking-wide">
              Current Investment
            </p>

            <h3 className="text-3xl font-bold text-emerald-600 mt-3">
              {profile.currentInvestment}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
            <p className="text-slate-500 text-sm uppercase tracking-wide">
              Lead Investors
            </p>

            <h3 className="text-lg font-semibold mt-3 text-slate-800">
              {profile.leadInvestors}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
            <p className="text-slate-500 text-sm uppercase tracking-wide">
              Business Model
            </p>

            <h3 className="text-lg font-semibold mt-3 text-slate-800">
              {profile.businessModel}
            </h3>
          </div>
        </div>

        {/* AI SUMMARY */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
          

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  AI Company Intelligence
                </h2>

                <p className="text-slate-500">
                  AI-generated analysis and market insights
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-slate-600">
                  AI Generated Insight
                </span>
              </div>

              <p className="text-slate-700 leading-8 text-[16px] whitespace-pre-wrap">
                {profile.aiSummary}
              </p>
            </div>
          </div>
        </div>

        {/* FUNDING HISTORY */}

        <div className="mb-8">
          <FundingHistory history={fundingHistory} />
        </div>

        {/* BUSINESS DETAILS */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>

            <h2 className="text-2xl font-bold text-slate-900">
              Business Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="text-slate-500 text-sm mb-2">Revenue</p>

              <p className="font-semibold text-lg text-slate-900">
                {profile.revenue}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="text-slate-500 text-sm mb-2">Market Share</p>

              <p className="font-semibold text-lg text-slate-900">
                {profile.marketShare}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="text-slate-500 text-sm mb-2">Parent Company</p>

              <p className="font-semibold text-lg text-slate-900">
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
