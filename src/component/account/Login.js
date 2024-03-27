import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Flex, Form, Input, Row, message } from "antd";
import "../../scss/login.scss";
import anh_login from "../../assets/images/image-login.png";
import { useNavigate } from "react-router-dom";
import { call_login } from "../../service/api";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_id"))
      navigate("/");
  }, []);

  const onFinish = async (values) => {
    const { email, password } = values;
    let res = await call_login(email, password);
    if (res && res.EC === 1) {
      localStorage.setItem("user_id", res.data.id);
      message.success("Đăng nhập thành công !");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      message.error("Tài khoản hoặc mật khẩu không chính xác.");
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
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
              <Flex justify="end">
                <a className="login-form-forgot" href="/quen-mat-khau">
                  Quên mật khẩu ?
                </a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                Đăng nhập
              </Button>
              Chưa có tài khoản ? <a href="/dang-ki">Đăng kí ngay!</a>
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
export default Login;
