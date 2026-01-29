import axios from "axios";
import type { AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

const axiosApiInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const successHandler = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

axiosApiInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const auth = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    config.headers = config.headers ?? {};
    config.headers.Authorization = auth;
  }
  return config;
});

axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const hadToken = !!sessionStorage.getItem("token");
      sessionStorage.removeItem("token");
      if (hadToken) {
        window.location.href = `/login?redirect=${window.location.pathname}`;
      }
    }
    return Promise.reject(error);
  }
);

export const getRequest = async <T>(url: string, params?: any) => {
  return axiosApiInstance.get<T>(url, { params }).then(successHandler);
};

export const postRequest = async <T>(
  url: string,
  payload: any,
  options: any = {}
) => {
  const isFormData = payload instanceof FormData;

  const mergedOptions = {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      ...(isFormData ? { "Content-Type": undefined } : {}),
    },
  };

  return axiosApiInstance
    .post<T>(url, payload, mergedOptions)
    .then(successHandler);
};

export const putRequest = async <T>(
  url: string,
  payload: any,
  options?: any
) => {
  return axiosApiInstance.put<T>(url, payload, options).then(successHandler);
};

export const patchRequest = async <T>(
  url: string,
  payload: any,
  options?: any
) => {
  return axiosApiInstance.patch<T>(url, payload, options).then(successHandler);
};

export const deleteRequest = async <T>(url: string, params?: any) => {
  return axiosApiInstance.delete<T>(url, { params }).then(successHandler);
};
