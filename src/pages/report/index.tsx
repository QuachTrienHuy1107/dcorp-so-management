import { DatePicker, Select, Table } from "antd";
import BreadcrumbComponent from "../../components/breadcrumb";
import MainContentTemplate from "../../template/main-content-template";
import { StatusLabelReportEnum, StatusOptions } from "../../types/constants";
import { COMPANIES, REPORTS, STORES } from "../../types/endpoints";
import useFilterParams from "../../hooks/useFilterParams";
import "./style.css";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const ReportPage = () => {
  const {
    data: salesOrdersData,
    setCompanyId,
    setStoreId,
    setDateChange,
    setStatus,
  } = useFilterParams(REPORTS);

  const [salesOrdersDataFormatted, setSalesOrdersDataFormatted] = useState<
    { status: string; value: any }[]
  >([]);

  const { data: storesData } = useFilterParams(STORES);
  const { data: companiesData } = useFilterParams(COMPANIES);

  console.log("salesOrdersData", salesOrdersData);

  useEffect(() => {
    if (salesOrdersData) {
      const salesOrdersDataFormatted = Object.entries(salesOrdersData).map(
        ([key, value]: any) => {
          return {
            status: StatusLabelReportEnum[key],
            value: value,
          };
        }
      );

      setSalesOrdersDataFormatted(salesOrdersDataFormatted);
    }
  }, [salesOrdersData]);

  console.log("salesOrdersDataFormatted", salesOrdersDataFormatted);

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <>
      <BreadcrumbComponent breadcrumbItems={["home", "reports"]} />
      <MainContentTemplate>
        <div className="report__actions">
          <RangePicker
            format={"DD/MM/YYYY"}
            onChange={(dateChange) => setDateChange(dateChange)}
          />
          <Select
            allowClear
            style={{ minWidth: 150 }}
            placeholder="Select company"
            onChange={(value) => setCompanyId(value)}
          >
            {companiesData?.map((company) => (
              <Select.Option value={company.id}>{company.name}</Select.Option>
            ))}
          </Select>
          <Select
            allowClear
            style={{ minWidth: 150 }}
            placeholder="Select store"
            onChange={(value) => setStoreId(value)}
          >
            {storesData?.map((store) => (
              <Select.Option value={store.id}>{store.name}</Select.Option>
            ))}
          </Select>

          <Select
            allowClear
            style={{ minWidth: 150 }}
            placeholder="Select status"
            mode="multiple"
            onChange={(value) => setStatus(value.join(","))}
          >
            {StatusOptions?.map((store) => (
              <Select.Option value={store.value}>{store.label}</Select.Option>
            ))}
          </Select>
        </div>
        <Table
          dataSource={salesOrdersDataFormatted}
          columns={columns}
          pagination={false}
        />
      </MainContentTemplate>
    </>
  );
};

export default ReportPage;
