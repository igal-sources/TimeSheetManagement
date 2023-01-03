import { HTTP } from "../global/types/types";
import { IResponseData } from "../global/interfaces";
import { restSend } from "./http-common";

export const fetchCustomerList = async () => {
  const response = await restSend<IResponseData>({
    url: "/Customers/GetCustomerList",
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchCustomerList.responseMessage: ", response.responseMessage);
    return undefined;
  }

  console.log("fetchCustomerList-response", response);
  return response?.responseData;
};

export const fetchCustomerSelectList = async () => {
  const response = await restSend<IResponseData>({
    url: "/Customers/GetCustomerSelectList",
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchCustomerSelectList.responseMessage: ", response.responseMessage);
    return undefined;
  }

  console.log("fetchCustomerSelectList-response", response);
  return response?.responseData;
};
export const fetchCustomerById = async (id: number) => {
  const response = await restSend<IResponseData>({
    url: `/Customers/${id}`,
    method: HTTP.method.GET,
    requestBody: {},
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> fetchCustomerById.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("fetchCustomerById-response: ", response);
  return response?.responseData;
};

export const saveCustomer = async (documentData: any) => {
  const response = await restSend<IResponseData>({
    url: "/Customers/SaveCustomer",
    method: HTTP.method.POST,
    requestBody: documentData,
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> saveCustomer.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("saveCustomer-response: ", response);
  return response?.responseData;
};

export const updateCustomer = async (documentData: any) => {
  const response = await restSend<IResponseData>({
    url: `/Customers/UpdateCustomer`,
    method: HTTP.method.PUT,
    requestBody: documentData,
  });

  if (response?.responseStatusCode && response?.responseStatusCode > 0) {
    console.log(">>> updateCustomer.responseMessage: ", response.responseMessage);
    return response;
  }

  console.log("updateCustomer-response: ", response);
  return response?.responseData;
};
