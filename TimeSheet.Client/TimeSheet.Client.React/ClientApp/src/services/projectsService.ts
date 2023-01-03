import { HTTP } from "../global/types/types";
import { IResponseData } from "../global/interfaces";
import { restSend } from "./http-common";

export const fetchProjectsList = async () => {
  const response = await restSend<IResponseData>({
    url: "/Projects/GetProjectList",
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchProjectsList.responseMessage: ", response.responseMessage);
    return undefined;
  }

  console.log("fetchProjectsList-response", response);
  return response?.responseData;
};

export const fetchProjectsSelectList = async () => {
  const response = await restSend<IResponseData>({
    url: "/Projects/GetProjectSelectList",
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchProjectsSelectList.responseMessage: ", response.responseMessage);
    return undefined;
  }

  console.log("fetchProjectsSelectList-response", response);
  return response?.responseData;
};

export const fetchProjectById = async (id: number) => {
  const response = await restSend<IResponseData>({
    url: `/Projects/${id}`,
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchProjectById.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("fetchProjectById-response: ", response);
  return response?.responseData;
};

export const fetchProjectByCustomerId = async (id: number) => {
  const response = await restSend<IResponseData>({
    url: `/Projects/GetByCustomerId/${id}`,
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchProjectByCustomerId.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("fetchProjectByCustomerId-response: ", response);
  return response?.responseData;
};

export const saveProject = async (documentData: any) => {
  const response = await restSend<IResponseData>({
    url: "/Projects/SaveProject",
    method: HTTP.method.POST,
    requestBody: documentData,
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> saveProject.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("saveProject-response: ", response);
  return response?.responseData;
};

export const updateProject = async (documentData: any) => {
  const response = await restSend<IResponseData>({
    url: "/Projects/UpdateProject",
    method: HTTP.method.PUT,
    requestBody: documentData,
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> updateProject.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("updateProject-response: ", response);
  return response?.responseData;
};
