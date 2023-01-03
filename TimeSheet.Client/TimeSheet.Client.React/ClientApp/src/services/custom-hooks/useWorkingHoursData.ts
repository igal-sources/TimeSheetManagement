import { useEffect, useState } from "react";
import { HTTP } from "../../global/types/types";
import { IResponseData } from "../../global/interfaces";
import { restSend } from "../http-common";

export const useWorkingHoursData = () => {
  const [data, setData] = useState<any | undefined>();
  const [error, setError] = useState<string | undefined>("");
  const [shouldRefetch, refetch] = useState<any>(false);

  console.log("refetch", shouldRefetch);

  useEffect(() => {
    (async () => {
      try {
        const response = await restSend<IResponseData>({
          url: "/WorkingHours/GetWorkingHoursList",
          method: HTTP.method.GET,
          requestBody: {},
        });

        if (response?.responseStatusCode && response?.responseStatusCode > 0) {
          console.log(">>> useWorkingHoursData.responseMessage: ", response.responseMessage);
          setData(undefined);
        } else {
          setData(response?.responseData);
        }

        console.log("useWorkingHoursData", response?.responseData);
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, [shouldRefetch]);
  return { data, error, refetch };
};
