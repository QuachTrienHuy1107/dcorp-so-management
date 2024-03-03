import { Content } from "antd/es/layout/layout";
import BreadcrumbComponent from "../../components/breadcrumb";
import MainContentTemplate from "../../template/main-content-template";
import { useEffect, useState } from "react";
import {
  createSO,
  deleteSO,
  editSO,
  getCompanies,
  getProduct,
  getSO,
  getStores,
} from "../../services";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  Popconfirm,
  Table,
} from "antd";
import "./style.css";
import ModalAddSO from "./modal-add-so";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useFilterParams from "../../hooks/useFilterParams";
import { COMPANIES, PRODUCTS, SO, STORES } from "../../types/endpoints";
import dayjs from "dayjs";
import { StatusOptions } from "../../types/constants";

const { RangePicker } = DatePicker;

const SOPage = () => {
  const [showModalAdd, setShowModalAdd] = useState<any>(false);
  const [editId, setEditId] = useState(undefined);
  const {
    data: salesOrdersData,
    fetchData,
    setDateChange,
  } = useFilterParams(SO);
  const { data: productsData } = useFilterParams(PRODUCTS);
  const { data: storesData } = useFilterParams(STORES);
  const { data: companiesData } = useFilterParams(COMPANIES);

  const handleEdit = (id: any) => {
    handleOpenModal();
    setEditId(id);
  };
  

  const handleDeleteProduct = async (id: any) => {
    try {
      await deleteSO(id);
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
    console.log("data", data);

    try {
      let response: any = null;
      if (editId) {
        response = await editSO({ ...data, id: editId });
      } else {
        response = await createSO(data);
      }
      console.log(response);
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
      title: "Order date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (_: any, record: any) => {
        return <div>{dayjs(record?.orderDate).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Order number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      size: 300,
    },
    {
      title: "Company",
      dataIndex: "companyId",
      key: "companyId",
      render: (_: any, record: any) => {
        const companyFound = companiesData.find(
          (company: any) =>
            company?.id?.toString() === record.companyId.toString()
        );
        return <div>{companyFound?.name}</div>;
      },
    },
    {
      title: "Store",
      dataIndex: "storeId",
      key: "storeId",
      render: (_: any, record: any) => {
        const storeFound = storesData.find(
          (store: any) => store?.id?.toString() === record.storeId.toString()
        );
        return <div>{storeFound?.name}</div>;
      },
    },
    {
      title: "Product",
      dataIndex: "items",
      key: "productId",
      render: (_: any, record: any) => {
        console.log("record", record);

        const productFound = productsData.find(
          (product: any) =>
            product?.id?.toString() === record?.items[0]?.productId.toString()
        );
        return <div>{productFound?.name}</div>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, record: any) => {
        const productFound = productsData.find(
          (product: any) =>
            product?.id?.toString() === record?.items[0]?.productId.toString()
        );
        console.log("productFound?.quantity", record);

        return <div>{record?.items[0]?.quantity}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => {
        return <div>{record?.items[0]?.price.toLocaleString()}</div>;
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      render: (_: any, record: any) => {
        return <div>{record?.items[0]?.tax}%</div>;
      },
    },
    {
      title: "Discount",
      dataIndex: "orderDiscount",
      key: "orderDiscount",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_: any, record: any) => {
        return <div>{record?.items[0]?.amount?.toLocaleString()}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => {
        const statusFound = StatusOptions.find(
          (status: any) =>
            status?.value?.toString() === record?.status?.toString()
        );
        return <div>{statusFound?.label}</div>;
      },
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
        <ModalAddSO
          editId={editId}
          isModalOpen={showModalAdd}
          productsData={productsData}
          companiesData={companiesData}
          storesData={storesData}
          handleOk={handleOk}
          handleCancel={handleCloseModal}
        />
      )}
      <div className="sales-orders">
        <BreadcrumbComponent breadcrumbItems={["home", "sales-orders"]} />
        <MainContentTemplate>
          <div className="sales-orders__actions">
            <RangePicker
              format={"DD/MM/YYYY"}
              onChange={(dateChange) => setDateChange(dateChange)}
            />
            <Button onClick={handleOpenModal}>Add</Button>
          </div>
          <Table dataSource={salesOrdersData} columns={columns} />
        </MainContentTemplate>
      </div>
    </>
  );
};

export default SOPage;
