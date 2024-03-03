import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { getProductCategories, getProductDetail } from "../../services";
import { MAX_LIMIT } from "../../types/constants";
import useFilterParams from "../../hooks/useFilterParams";
import { PRODUCT_CATEGORIES } from "../../types/endpoints";
import TextArea from "antd/es/input/TextArea";

interface IModalAddProduct {
  isModalOpen: boolean;
  editId?: any;
  handleOk: (data: any) => void;
  handleCancel: () => void;
}

const ModalAddProduct = (props: IModalAddProduct) => {
  const { editId, isModalOpen, handleOk, handleCancel } = props;
  const [form] = Form.useForm();
  const { data: productCategoriesData } = useFilterParams(PRODUCT_CATEGORIES, {
    pageSize: MAX_LIMIT,
  });

  console.log("productCategoriesData", productCategoriesData);

  async function fetchProductDetail() {
    const [productDetailResponse] = await Promise.all([
      getProductDetail(editId),
    ]);

    form.setFieldsValue(productDetailResponse.data);
  }

  useEffect(() => {
    if (editId) {
      fetchProductDetail();
    }
  }, [editId]);

  console.log("productCategoriesData", productCategoriesData);

  const onFinish = (data: any) => {
    handleOk(data);
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
          label="Product name"
          name="name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Category" name="productCategoryId">
          <Select>
            {productCategoriesData?.map((company) => (
              <Select.Option value={company.id}>{company.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea />
        </Form.Item>

        <Form.Item label="Code" name="code">
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber
            formatter={(value: any) =>
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
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
