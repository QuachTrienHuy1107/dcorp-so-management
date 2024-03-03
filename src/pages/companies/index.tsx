import { useEffect, useState } from "react";
import BreadcrumbComponent from "../../components/breadcrumb";
import MainContentTemplate from "../../template/main-content-template";
import { Table } from "antd";
import { getCompanies } from "../../services";
import useFilterParams from "../../hooks/useFilterParams";
import { COMPANIES } from "../../types/endpoints";

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
];

const CompaniesPage = () => {
  const { data: companiesData } = useFilterParams(COMPANIES);

  return (
    <>
      <BreadcrumbComponent breadcrumbItems={["home", "companies"]} />
      <MainContentTemplate>
        <Table dataSource={companiesData} columns={columns} />
      </MainContentTemplate>
    </>
  );
};

export default CompaniesPage;
