import React, { useEffect } from "react";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, Flex, Form, Input, Row, message } from "antd";
import "../../scss/login.scss";
import anh_login from "../../assets/images/image-login.png";
import { call_register_customer } from "../../service/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_id")) navigate("/game");
  }, []);

  const onFinish = async (values) => {
    const { name, email, phone, password } = values;
    let res = await call_register_customer(name, email, phone, password);
    if (res && res.EC === -2) {
      message.error("Email đã được đăng kí");
    } else if (res && res.EC === 1) {
      message.success("Đăng ký thành công !");
      navigate("/login");
    } else {
      message.error("Đăng kí thất bại !");
    }
  };

  return (
    <div>
      <Row className="login">
        <Col xs={24} lg={8} span={8} className="login-left">
          <div className="title-tm">TM WOAY</div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập họ và tên!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="Họ và tên"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Hãy số điện thoại!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                pattern="(03|05|07|08|09)[0-9]{8}"
                placeholder="Số điện thoại"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                Đăng kí
              </Button>
              Đã có tài khoản ? <a href="/login">Đăng nhập ngay!</a>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={0} lg={16} span={16} className="img-login">
          <img src={anh_login} />
        </Col>
      </Row>
    </div>
  );
};
export default Register;
