import { Content } from "antd/es/layout/layout";
import BreadcrumbComponent from "../../components/breadcrumb";
import MainContentTemplate from "../../template/main-content-template";
import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
} from "../../services";
import { Button, Input, Popconfirm, Select, Table } from "antd";
import "./style.css";
import ModalAddProduct from "./modal-add-product";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useFilterParams from "../../hooks/useFilterParams";
import { PRODUCTS, PRODUCT_CATEGORIES } from "../../types/endpoints";
import { MAX_LIMIT } from "../../types/constants";

const ProductPage = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [editId, setEditId] = useState(undefined);
  const [pageIndex, setPageIndex] = useState({});
  const {
    data: productsData,
    fetchData,
    setProductCategoryId,
  } = useFilterParams(PRODUCTS);
  const { data: productCategoriesData } = useFilterParams(PRODUCT_CATEGORIES, {
    pageSize: MAX_LIMIT,
  });

  console.log("productCategoriesData", productCategoriesData);

  const handleEdit = (id: any) => {
    handleOpenModal();
    setEditId(id);
  };

  const handleDeleteProduct = async (id: any) => {
    try {
      await deleteProduct(id);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
    setEditId(undefined);
  };

  const handleOk = async (data: any) => {
    try {
      let response: any = null;
      if (editId) {
        response = await editProduct({ ...data, id: editId });
      } else {
        response = await createProduct(data);
      }
      console.log("response", response);

      if (response?.success) {
        await fetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

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
      title: "Category",
      dataIndex: "productCategoryId",
      key: "productCategoryId",
      render: (_: any, record: any) => {
        const storeFound = productCategoriesData.find(
          (store: any) =>
            store?.id?.toString() === record.productCategoryId.toString()
        );
        return <div>{storeFound?.name}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => {
        return <div>{record?.price.toLocaleString()}</div>;
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Action",
      key: "operation",
      width: 100,
      render: (_: any, record: any) => {
        console.log("row", ``);
        console.log("row", record);
        return (
          <div className="table-actions">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record?.id)}
            />

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDeleteProduct(record?.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {showModalAdd && (
        <ModalAddProduct
          editId={editId}
          isModalOpen={showModalAdd}
          handleOk={handleOk}
          handleCancel={handleCloseModal}
        />
      )}
      <div className="products">
        <BreadcrumbComponent breadcrumbItems={["home", "products"]} />
        <MainContentTemplate>
          <div className="products__actions">
            <Input placeholder="Search by product name" allowClear />
            <Select
              allowClear
              style={{ minWidth: 150 }}
              placeholder="Select category"
              onChange={(value) => setProductCategoryId(value)}
            >
              {productCategoriesData?.map((company) => (
                <Select.Option value={company.id}>{company.name}</Select.Option>
              ))}
            </Select>
            <Button onClick={handleOpenModal}>Add</Button>
          </div>
          <Table
            dataSource={productsData}
            columns={columns}
            onChange={(tableChange) => setPageIndex(tableChange)}
          />
        </MainContentTemplate>
      </div>
    </>
  );
};

export default ProductPage;
