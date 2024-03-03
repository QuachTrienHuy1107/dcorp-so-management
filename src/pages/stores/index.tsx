import { Table } from "antd";
import BreadcrumbComponent from "../../components/breadcrumb";
import MainContentTemplate from "../../template/main-content-template";
import { useEffect, useState } from "react";
import { getStores } from "../../services";
import useFilterParams from "../../hooks/useFilterParams";
import { STORES } from "../../types/endpoints";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Company name",
    dataIndex: "companyName",
    key: "companyName",
  },
];

const StorePage = () => {
  const { data: productCategoriesData } = useFilterParams(STORES);

  return (
    <>
      <BreadcrumbComponent breadcrumbItems={["home", "stores"]} />
      <MainContentTemplate>
        <Table dataSource={productCategoriesData} columns={columns} />
      </MainContentTemplate>
    </>
  );
};

export default StorePage;
