import React, { useMemo } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Layout, Menu, theme } from "antd";
import "./style.css";
import BreadcrumbComponent from "../components/breadcrumb";
import { ROUTER_LIST } from "../routers";
import { redirect, useNavigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

interface IHomeTemplate {
  children: React.ReactNode;
}

const MainContentTemplate: React.FC<IHomeTemplate> = ({
  children,
}: IHomeTemplate) => {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: "#fff",
        overflow: "initial",
      }}
    >
      {children}
    </Content>
  );
};

export default MainContentTemplate;
