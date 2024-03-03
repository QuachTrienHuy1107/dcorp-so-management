import { Breadcrumb } from "antd";

export interface IBreadcrumbComponent {
  breadcrumbItems: string[];
}

const BreadcrumbComponent = ({ breadcrumbItems }: IBreadcrumbComponent) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbItems.map((breadcrumb, index) => {
        return <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
