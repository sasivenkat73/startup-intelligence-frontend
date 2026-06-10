import { useEffect, useState } from "react";
import api from "../services/api";

function useStats() {
  const [sectors, setSectors] = useState(null);

  useEffect(() => {
    api
      .get("/sectors")

      .then((response) => {
        setSectors(response.data);
      })

      .catch(console.error);
  }, []);

  return sectors;
}

export default useStats;
