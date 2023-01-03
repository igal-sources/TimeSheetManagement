import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { HTTP } from "../global/types/types";
import { IRequestData } from "../global/interfaces";

export const restSend = async <TResponse>({
  url,
  method,
  requestBody,
}: IRequestData): Promise<TResponse | undefined> => {
  let response: AxiosResponse<any> | undefined;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const target = `${process.env.REACT_APP_BASE_URL}${url}`;
  const cfg: AxiosRequestConfig = { headers };
  // console.log("method", method, target);

  try {
    switch (method) {
      case HTTP.method.GET:
        response = await axios.get<TResponse>(target, cfg);
        break;

      case HTTP.method.POST:
        response = await axios.post<AxiosResponse<TResponse>>(target, requestBody, cfg);
        break;

      case HTTP.method.PUT:
        response = await axios.put<AxiosResponse<TResponse>>(target, requestBody, cfg);
        break;

      case HTTP.method.DELETE:
        response = await axios.delete<TResponse>(target, cfg);
        break;

      default:
        throw Error(`Proxy: [${method}] is not supported`);
    }
    if (response.status < 400) {
      return response?.data;
    }

    const errorMessage = `Service failure, status = [${response.status}: ${response.statusText}], url: ${target}`;
    // eslint-disable-next-line no-console
    console.error(errorMessage);
    // throw new Error(errorMessage);
    return undefined;
  } catch (err) {
    const log = `Service call [${method}] failure [${response?.status}]: url: ${target}, ${response?.statusText}, ${err}`;
    // eslint-disable-next-line no-console
    console.error(log, requestBody);
    throw new Error(log);
  }
};
