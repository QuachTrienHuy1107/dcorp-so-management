import {
  UserOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu } from "antd";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER_LIST } from "../routers";
import "./style.css";

const { Header, Content, Sider } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

interface IHomeTemplate {
  children: React.ReactNode;
}

const HomeTemplate: React.FC<IHomeTemplate> = ({ children }: IHomeTemplate) => {
  const navigate = useNavigate();
  const sidebarSOManagement: MenuProps["items"] = useMemo(() => {
    return ROUTER_LIST.map((route, index) => {
      const IconComponent = route.icon;
      return {
        key: index,
        label: route.label,
        icon: <IconComponent />,
        onClick: () => {
          navigate(route.path);
        },
      };
    });
  }, [navigate]);

  return (
    <Layout className="template">
      <div
        className="template__header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="template__logo">
          <img src="./dcorp-logo.png" alt="dcorp-logo" />
        </div>

        <Avatar icon={<UserOutlined />} />
      </div>
      <div></div>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={sidebarSOManagement}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px", overflow: "auto" }}>
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomeTemplate;
