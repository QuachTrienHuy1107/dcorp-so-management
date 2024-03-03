import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getSODetail } from "../../services";
import { StatusEnum, StatusOptions } from "../../types/constants";
import "./style.css";

interface IModalAddProduct {
  isModalOpen: boolean;
  editId?: any;
  productsData?: any[];
  companiesData?: any[];
  storesData?: any[];
  handleOk: (data: any) => void;
  handleCancel: () => void;
}

const ModalAddProduct = (props: IModalAddProduct) => {
  const [salesOrdersDetail, setSalesOrdersDetail] = useState<any>(null);
  const {
    editId,
    productsData,
    companiesData,
    storesData,
    isModalOpen,
    handleOk,
    handleCancel,
  } = props;
  const [form] = Form.useForm();

  async function fetchProductDetail() {
    const { data } = await getSODetail(editId);
    console.log("data", data);
    setSalesOrdersDetail(data);

    form.setFieldsValue(data);
    form.setFieldValue("productId", data.items[0]?.productId);
    form.setFieldValue("quantity", data.items[0]?.quantity);
    form.setFieldValue("price", data.items[0]?.price);
    form.setFieldValue("tax", data.items[0]?.tax);
  }

  const SOvalues = Form.useWatch((values) => values, form);

  const renderAmountBeforeTax = useMemo(() => {
    const totalPrice = Number(SOvalues?.price * SOvalues?.quantity);
    return totalPrice;
  }, [SOvalues?.price, SOvalues?.quantity]);

  const totalAmount = useMemo(() => {
    const totalPrice = Number(SOvalues?.price * SOvalues?.quantity);
    const tax = Number(SOvalues?.tax);

    const discount = Number(SOvalues?.orderDiscount);
    const total = totalPrice + (totalPrice * tax) / 100;
    if (!discount) return total;
    return total - total * (discount / 100);
  }, [
    SOvalues?.price,
    SOvalues?.quantity,
    SOvalues?.tax,
    SOvalues?.orderDiscount,
  ]);

  useEffect(() => {
    if (editId) {
      fetchProductDetail();
    }
  }, [editId]);

  const onFinish = (data: any) => {
    const companyFound = companiesData?.find(
      (company: any) =>
        company?.id?.toString() === SOvalues?.companyId?.toString()
    );
    const storeFound = storesData?.find(
      (store: any) => store?.id?.toString() === SOvalues?.companyId?.toString()
    );
    const productFound = productsData?.find(
      (product: any) =>
        product?.id?.toString() === SOvalues?.productId?.toString()
    );

    let payload: any = {
      companyId: data.companyId,
      companyName: companyFound?.name,
      storeId: data.storeId,
      storeName: storeFound?.name,
      orderDate: new Date(),
      orderStatus: data.status,
      subTotal: renderAmountBeforeTax,
      orderDiscount: data.orderDiscount,
      orderTotal: totalAmount ? totalAmount : renderAmountBeforeTax,
      status: data.status,
      items: [
        {
          ...salesOrdersDetail?.items[0],
          productId: SOvalues?.productId,
          productName: productFound.name,
          quantity: SOvalues?.quantity,
          price: SOvalues?.price,
          tax: SOvalues?.tax,
          amountBeforeTax: renderAmountBeforeTax,
          amount: totalAmount ? totalAmount : renderAmountBeforeTax,
        },
      ],
    };

    if (editId) {
      payload = { ...payload, orderNumber: salesOrdersDetail.orderNumber };
    }

    handleOk(payload);
  };

  return (
    <Modal
      title={editId ? "Edit" : "Add"}
      open={isModalOpen}
      maskClosable={false}
      onCancel={handleCancel}
      footer={
        <Button type="primary" htmlType="submit" onClick={form.submit}>
          Save
        </Button>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Company"
          name="companyId"
          rules={[{ required: true, message: "Please select company!" }]}
        >
          <Select>
            {companiesData?.map((company) => (
              <Select.Option value={company.id}>{company.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Store"
          name="storeId"
          rules={[{ required: true, message: "Please select store!" }]}
        >
          <Select>
            {storesData?.map((store) => (
              <Select.Option value={store.id}>{store.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Product"
          name="productId"
          rules={[{ required: true, message: "Please select product!" }]}
        >
          <Select>
            {productsData?.map((product) => (
              <Select.Option value={product.id}>{product.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input your quantity!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Tax" name="tax">
          <InputNumber
            formatter={(value) => `${value}%`}
            parser={(value: any) => value!.replace("%", "")}
            style={{ width: "100%" }}
            min={0}
            max={100}
          />
        </Form.Item>

        <Form.Item label="Discount" name="orderDiscount">
          <InputNumber
            formatter={(value) => `${value}%`}
            parser={(value: any) => value!.replace("%", "")}
            style={{ width: "100%" }}
            min={0}
            max={100}
          />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select defaultValue={StatusEnum.Accepted}>
            {StatusOptions?.map((status) => (
              <Select.Option value={status.value}>{status.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="modal-add-so">
          <p>
            Amount before tax:{" "}
            {renderAmountBeforeTax
              ? renderAmountBeforeTax?.toLocaleString()
              : 0}
          </p>
        </div>
        <div className="modal-add-so">
          <p>Total amount: {totalAmount ? totalAmount?.toLocaleString() : 0}</p>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
