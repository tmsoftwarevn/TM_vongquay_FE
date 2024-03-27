import React, { useEffect, useState } from "react";
import "../../scss/layoutParent.scss";
import {
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const LayoutParent = () => {
  const navigate = useNavigate();
  const [isLogin, setIslogin] = useState(localStorage.getItem("user_id"));

  useEffect(()=>{
    if(!isLogin)
    navigate("/login");
  },[])

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem(<p onClick={() =>navigate(`/admin/thiet-lap-chung/${localStorage.getItem("id_game")}`)}>Thiết lập chung</p>, "2", <DesktopOutlined />),
    getItem(<Link to="/admin/phan-thuong/1">Phần thưởng</Link>, "3", <PieChartOutlined />),
    getItem(<Link to="/admin/thiet-ke/1">Thiết kế</Link>, "4", <DesktopOutlined />),

    getItem(<Link to="/admin/bao-cao/1">Báo cáo</Link>, "5", <PieChartOutlined />),
    
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "16px",
            
          }}
        >
          
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutParent;
