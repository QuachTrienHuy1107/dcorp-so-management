import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../services";
import dayjs from "dayjs";
import { REPORTS } from "../types/endpoints";

export default function useFilterParams(url: string, options?: any) {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [dateChange, setDateChange] = useState<any>(null);
  const [productCategoryId, setProductCategoryId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState<any>({
    current: options?.pageIndex || 0,
    pageSize: options?.pageSize || 10,
  });
  const [searchValue, setSearchValue] = useState("");

  console.log("status", status);

  const fetchData = useCallback(async () => {
    let requestData: any = {
      pageIndex: page.current || 0,
      pageSize: page.pageSize || 10,
    };
    if (searchValue) {
      requestData = { ...requestData, search: searchValue };
    }
    if (dateChange) {
      requestData = {
        ...requestData,
        startDate: dayjs(dateChange?.[0]),
        endDate: dayjs(dateChange?.[1]),
      };
    }
    if (productCategoryId) {
      requestData = { ...requestData, productCategoryId };
    }
    if (companyId) {
      requestData = { ...requestData, companyId };
    }
    if (storeId) {
      requestData = { ...requestData, storeId };
    }
    if (status) {
      requestData = { ...requestData, status };
    }
    const data = await getData(url, requestData);

    console.log("data", data);

    if (url === REPORTS) {
      setData(data.data);
    } else {
      setData(data.data.records);
      setTotal(data.data.total);
    }
  }, [
    companyId,
    dateChange,
    page,
    productCategoryId,
    searchValue,
    status,
    storeId,
    url,
  ]);

  console.log("aaa", data);

  useEffect(() => {
    fetchData();
  }, [fetchData, page, searchValue, url]);

  return {
    data,
    total,
    page,
    searchValue,
    dateChange,
    productCategoryId,
    companyId,
    storeId,
    status,
    setPage,
    setSearchValue,
    fetchData,
    setDateChange,
    setProductCategoryId,
    setCompanyId,
    setStoreId,
    setStatus,
  };
}
