import { useEffect, useState } from "react";
import api from "../services/api";

function useLatest(sortOrder) {
  const [latestFeed, setLatestFeed] = useState([]);

  useEffect(() => {
    // Determine endpoint based on sortOrder boolean
    const endpoint = sortOrder ? "/latest" : "/oldtonew";

    api.get(endpoint)
      .then((response) => {
        setLatestFeed(response.data);
      })
      .catch(console.error);
  }, [sortOrder]); // Refetch data when sortOrder changes

  return latestFeed;
}

export default useLatest;
