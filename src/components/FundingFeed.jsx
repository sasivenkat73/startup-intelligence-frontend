import { useEffect, useState } from "react";
import api from "../services/api";

function FundingFeed() {
  const [funding, setFunding] = useState([]);

  useEffect(() => {
    api
      .get("/funding")

      .then((response) => {
        setFunding(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Recent Funding Feed</h2>

      <div className="space-y-4 mt-4">
        {funding.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">{item.startupName}</h3>

            <p>{item.fundingAmount}</p>

            <p>{item.fundingStage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FundingFeed;
