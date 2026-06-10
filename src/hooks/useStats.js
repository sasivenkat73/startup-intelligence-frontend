import { useEffect, useState } from "react";
import api from "../services/api";

function useStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/stats")

      .then((response) => {
        setStats(response.data);
      })

      .catch(console.error);
  }, []);

  return stats;
}

export default useStats;
