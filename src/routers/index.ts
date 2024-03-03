import CompaniesPage from "../pages/companies";
import HomePage from "../pages/home";
import ProductCategoriesPage from "../pages/product-categories";
import ProductPage from "../pages/products";
import ReportPage from "../pages/report";
import SOPage from "../pages/sales-orders";
import StorePage from "../pages/stores";
import {
    HomeOutlined,
    AppstoreOutlined,
    DesktopOutlined,
    UserOutlined,
    ApartmentOutlined,
    AuditOutlined,
    AreaChartOutlined
  } from '@ant-design/icons';

export const ROUTER_LIST = [
    {
        path: '/',
        component: HomePage,
        label: "Home",
        icon: HomeOutlined
    },
    {
        path: '/products',
        component: ProductPage,
        label: "Products",
        icon: DesktopOutlined
    },
    {
        path: '/product-categories',
        component: ProductCategoriesPage,
        label: "Product categories",
        icon: AppstoreOutlined
    },
    {
        path: '/companies',
        component: CompaniesPage,
        label: "Companies",
        icon: UserOutlined

    },
    {
        path: '/stores',
        component: StorePage,
        label: "Stores",
        icon: ApartmentOutlined
    },
    {
        path: '/sales-orders',
        component: SOPage,
        label: "Sales orders",
        icon: AuditOutlined
    },
    {
        path: '/reports',
        component: ReportPage,
        label: "Report",
        icon: AreaChartOutlined
    },
]