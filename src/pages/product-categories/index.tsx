import { Input, Table } from "antd";
import { useEffect, useState } from "react";
import BreadcrumbComponent from "../../components/breadcrumb";
import { getData, getProductCategories } from "../../services";
import MainContentTemplate from "../../template/main-content-template";
import { PRODUCT_CATEGORIES } from "../../types/endpoints";
import useFilterParams from "../../hooks/useFilterParams";

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

const ProductCategoriesPage = () => {
  const {
    data: productCategoriesData,
    setPage,
    total,
    setSearchValue,
  } = useFilterParams(PRODUCT_CATEGORIES);

  return (
    <>
      <BreadcrumbComponent breadcrumbItems={["home", "product-categories"]} />
      <MainContentTemplate>
        <Table
          dataSource={productCategoriesData}
          columns={columns}
          pagination={{
            total: total,
          }}
          onChange={(tableChange) => setPage(tableChange)}
        />
      </MainContentTemplate>
    </>
  );
};

export default ProductCategoriesPage;
