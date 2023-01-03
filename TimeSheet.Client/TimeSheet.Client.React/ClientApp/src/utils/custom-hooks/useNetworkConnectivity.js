import { useState, useEffect } from "react";

// returns: true if connected, false if disconnected & undefined if unknown
export const useNetworkConnectivity = () => {
  const [isOnline, setIsOnline] = useState(!!(navigator && navigator.onLine));

  useEffect(() => {
    const setOnline = () => {
      setIsOnline(true);
    };
    const setOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    // cleanup
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return isOnline;
};
