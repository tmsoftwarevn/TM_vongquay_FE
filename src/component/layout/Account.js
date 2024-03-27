import React, { useEffect, useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { call_get_info_detail_customer } from "../../service/api";

const Account = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState();

  const fetch_detail_customer = async () => {
    let res = await call_get_info_detail_customer(
      localStorage.getItem("user_id")
    );
    if (res && res.EC == 1) {
      setAccount(res.data);
    }
  };
  
  useEffect(() => {
    fetch_detail_customer();
  }, []);

  const handleMenuClick = (e) => {
    if (+e.key === 1) {
      navigate("/password");
    }
    if (+e.key === 2) {
      handleLogout();
    }
  };

  const items = [
    {
      label: "Đổi mật khẩu",
      key: "1",
    },
    {
      label: "Đăng xuất",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const handleLogout = () => {
    localStorage.clear();
    message.success("Đăng xuất thành công !");
    navigate("/login");
  };

  return (
    <div>
      <Space wrap>
        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
          style={{ marginRight: "20px" }}
        >
          {account?.name}
        </Dropdown.Button>
      </Space>
    </div>
  );
};

export default Account;
