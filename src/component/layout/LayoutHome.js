import React, { useEffect, useState } from "react";
import "../../scss/layoutParent.scss";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Layout, Menu, message, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const LayoutHome = () => {
  const navigate = useNavigate();
  const [isLogin, setIslogin] = useState(localStorage.getItem("user_id"));

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem(<Link to="/game">Game</Link>, "2", <DesktopOutlined />),
    getItem(<Link to="/tai-khoan">Tài khoản</Link>, "3", <PieChartOutlined />),
  ];

  const handleLogout =() =>{
    localStorage.removeItem('user_id');
    message.success("Đăng xuất thành công !")
    navigate("/login")
  }

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
        >
          {/* <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          /> */}

          <Flex justify="end" style={{ marginRight: "10px" }}>
            <Button type="primary" onClick={() => handleLogout()}>Đăng xuất</Button>
          </Flex>
        </Header>
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
export default LayoutHome;
