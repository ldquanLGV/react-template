import axios from "axios";
import { toast } from "react-toastify";

import store from "@/store";
import { logoutFlow } from "@/pages/Login/action";

const RestAdapter = axios.create({
  baseURL: 'https://test.com/',
});

const handleReqConfig = (config) => config;

const handleReqError = (error) => Promise.reject(error);

const handleResSuccess = (response) => response;

const processMessage = (data) => {
  const message = data?.message;
  if (typeof message === "string") return message;
  return data?.error;
};

const handleResError = (error) => {
  const silence = error?.response?.config?.silence;
  if (silence) return Promise.reject(error);

  const statusCode = error?.response?.status;
  const data = error?.response?.data;
  const errorMessage = processMessage(data);

  if (statusCode === 401) store.dispatch(logoutFlow.request());
  if (statusCode !== 200)
    toast.error(errorMessage || "Something went wrong!", {
      draggable: true,
      hideProgressBar: true,
    });
  return Promise.reject(error);
};

RestAdapter.interceptors.request.use(handleReqConfig, handleReqError);
RestAdapter.interceptors.response.use(handleResSuccess, handleResError);

export const httpGet = (url, params = {}, config = {}) =>
  RestAdapter.get(url, { params, ...config });

export const httpPost = (url, data) => RestAdapter.post(url, data);

export const httpPut = (url, data) => RestAdapter.put(url, data);

export const httpPatch = (url, data) => RestAdapter.patch(url, data);

export const httpDelete = (url, data) => RestAdapter.delete(url, data);

export default RestAdapter;
