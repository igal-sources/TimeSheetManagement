import { HTTP } from "../global/types/types";
import { IResponseData } from "../global/interfaces";
import { restSend } from "./http-common";

export const fetchWorkingHoursList = async () => {
  const response = await restSend<IResponseData>({
    url: "/WorkingHours/GetWorkingHoursList",
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchWorkingHoursList.responseMessage: ", response.responseMessage);
    return undefined;
  }

  console.log("fetchWorkingHoursList-response", response);
  return response?.responseData;
};

export const fetchWorkingHoursById = async (id: number) => {
  const response = await restSend<IResponseData>({
    url: `/WorkingHours/${id}`,
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchWorkingHoursById.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("fetchWorkingHoursById-response: ", response);
  return response?.responseData;
};

export const saveWorkingHours = async (documentData: any) => {
  const response = await restSend<IResponseData>({
    url: "/WorkingHours/SaveWorkingHours",
    method: HTTP.method.POST,
    requestBody: documentData,
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> saveWorkingHours.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("saveWorkingHours-response: ", response);
  return response?.responseData;
};

export const updateWorkingHours = async (documentData: any) => {
  const response = await restSend<IResponseData>({
    url: "/WorkingHours/UpdateWorkingHours",
    method: HTTP.method.PUT,
    requestBody: documentData,
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> updateAddress.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("updateAddress-response: ", response);
  return response?.responseData;
};
