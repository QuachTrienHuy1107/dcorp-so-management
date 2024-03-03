import { StatusEnum } from "../types/constants";
import {
  COMPANIES,
  PRODUCTS,
  PRODUCT_CATEGORIES,
  REPORTS,
  SO,
  STORES,
} from "./../types/endpoints";
import axiosInstance from "./axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getData = (url: string, params: any) => {
  return axiosInstance.get(url, {
    params: {
      status: [
        StatusEnum.Accepted,
        StatusEnum.InProcess,
        StatusEnum.Completed,
        StatusEnum.Cancelled,
      ].join(","),
      ...params,
    },
  });
};

/**
 * Product categories
 */

export const getProductCategories = async (params?: any) => {
  return axiosInstance.get(PRODUCT_CATEGORIES, { params });
};

/**
 * Product
 */

export const getProduct = async (params?: any) => {
  return axiosInstance.get(PRODUCTS, { params });
};

export const getProductDetail = async (id: any) => {
  return axiosInstance.get(`${PRODUCTS}/${id}`);
};

export const createProduct = async (data: any) => {
  return axiosInstance.post(`${PRODUCTS}`, { ...data, status: 3 });
};

export const editProduct = async (data: any) => {
  return axiosInstance.put(`${PRODUCTS}`, { ...data, status: 3 });
};

export const deleteProduct = async (id: any) => {
  return axiosInstance.delete(`${PRODUCTS}?id=${id}`);
};

/**
 * Stores
 */
export const getStores = async () => {
  return axiosInstance.get(`${STORES}`);
};

/**
 * Companies
 */
export const getCompanies = async () => {
  return axiosInstance.get(`${COMPANIES}`);
};

/**
 * Sales orders
 */

export const getSO = async () => {
  return axiosInstance.get(`${SO}`);
};

export const getSODetail = async (id: any) => {
  return axiosInstance.get(`${SO}/${id}`);
};

export const createSO = async (data: any) => {
  return axiosInstance.post(`${SO}`, { ...data, status: 3 });
};

export const editSO = async (data: any) => {
  return axiosInstance.put(`${SO}`, { ...data });
};

export const deleteSO = async (id: any) => {
  return axiosInstance.delete(`${SO}?id=${id}`);
};

/**
 * Report
 */
export const getReports = async () => {
  return axiosInstance.get(`${REPORTS}`);
};
