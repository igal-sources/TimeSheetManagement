import React, { useState, useEffect } from "react";
import { ICommonRefreshCounterProps } from "./ICommonRefreshCounterProps";
import "./common-refresh-counter.css";

export const RefreshCounter = ({ placement }: ICommonRefreshCounterProps) => {
  const enabled = process.env.NODE_ENV === "development" && process.env.REACT_APP_REFRESH_COUNT === "true";

  const [count, setCount] = useState(enabled ? 0 : -1);

  console.log("RefreshCounter - REACT_APP_REFRESH_COUNT", process.env.REACT_APP_REFRESH_COUNT);

  if (count === -1) return <></>;

  useEffect(() => {
    return () => setCount(count + 1);
  });

  const value = count < 1000 ? count : `${(count / 1000).toFixed(1)}K`;

  let cls = `RefreshCounter-container ref-count-placement-${placement}`;
  if (count > 15) cls = `RefreshCounter-container ref-count-placement-${placement} alert`;
  else if (count > 5) cls = `RefreshCounter-container ref-count-placement-${placement} warn`;

  return <span className={cls}>{value}</span>;
};
