import React, { useEffect, useState } from "react";
import "../../scss/layoutParent.scss";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Layout, Menu, theme } from "antd";
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

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem(
      <p
        onClick={() =>
          navigate(`/admin/thiet-lap-chung/${localStorage.getItem("game_id")}`)
        }
      >
        Thiết lập chung
      </p>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <p
        onClick={() =>
          navigate(`/admin/phan-thuong/${localStorage.getItem("game_id")}`)
        }
      >
        Phần quà
      </p>,
      "3",
      <PieChartOutlined />
    ),
    getItem(
      <p
        onClick={() =>
          navigate(`/admin/thiet-ke/${localStorage.getItem("game_id")}`)
        }
      >
        Thiết kế
      </p>,
      "4",
      <DesktopOutlined />
    ),

    getItem(
      <p
        onClick={() =>
          navigate(`/admin/bao-cao/${localStorage.getItem("game_id")}`)
        }
      >
        Báo cáo
      </p>,
      "5",
      <PieChartOutlined />
    ),
  ];
  // return (
  //   <Layout
  //     style={{
  //       minHeight: "100vh",
  //     }}
  //   >
  //     <Sider
  //       collapsible
  //       collapsed={collapsed}
  //       onCollapse={(value) => setCollapsed(value)}
  //       theme="light"
  //     >
  //       <div className="demo-logo-vertical" />
  //       <Menu
  //         theme="light"
  //         defaultSelectedKeys={["2"]}
  //         mode="inline"
  //         items={items}
  //       />
  //     </Sider>
  //     <Layout>
  //       <Header
  //         style={{
  //           padding: 0,
  //           background: colorBgContainer,
  //         }}
  //       >
  //         <Flex justify="end" style={{ marginRight: "10px" }}>
  //           <Button type="primary" onClick={() => navigate("/game")}>
  //             Trang chủ
  //           </Button>
  //         </Flex>
  //       </Header>
  //       <Content
  //         style={{
  //           margin: "16px",
  //         }}
  //       >
  //         <div
  //           style={{
  //             padding: 24,
  //             minHeight: 500,
  //             background: colorBgContainer,
  //             borderRadius: borderRadiusLG,
  //           }}
  //         >
  //           <Outlet />
  //         </div>
  //       </Content>
  //       <Footer
  //         style={{
  //           textAlign: "center",
  //         }}
  //       >
  //         Ant Design ©{new Date().getFullYear()} Created by Ant UED
  //       </Footer>
  //     </Layout>
  //   </Layout>
  // );

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#ffff",
          },
          Menu: {
            colorItemBg: "#ffff",
          },
          Sider: {},
        },
      }}
    >
      <Layout
        style={{
          minHeight: "96vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          //theme="light"
        >
          <div className="demo-logo-vertical" />
          <Menu
            //theme="dark"
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
            <Flex justify="end" style={{ marginRight: "10px" }}>
              <Button type="primary" onClick={() => navigate("/game")}>
                Trang chủ
              </Button>
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
            ©{new Date().getFullYear()} Created by TM Software
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default LayoutParent;
