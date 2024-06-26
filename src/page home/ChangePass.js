import { useRef, useState } from "react";

import {
  Button,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Steps,
} from "antd";
import { useNavigate } from "react-router-dom";
import { call_check_pass, call_update_password } from "../service/api";

const GetPassword = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const otpRef = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const next = () => {
    setCurrent(current + 1);
  };

  const contentStyle = {
    marginTop: 16,
  };

  const handleXacnhan = async () => {
    if (!email) {
      message.error("Email không được để trống");
      return;
    }
    if (!password) {
      message.error("Mật khẩu không được để trống");
      return;
    }

    // call api xác nhận
    let res = await call_check_pass(email, password);

    if (res && res.EC === 1) {
      next();
    } else {
      message.error("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  const onFinish = async (values) => {
    const { password, rePassword } = values;
    if (password != rePassword) {
      notification.error({
        message: "Mật khẩu không khớp. Hãy kiểm tra lại",
      });
      return;
    }

    let res = await call_update_password(email, password);
    if (res && res.EC === 1) {
      message.success("Thay đổi mật khẩu thành công");
      navigate("/tai-khoan");
    } else {
      message.error("Cập nhật thất bại !");
    }
  };
  const handleNewPassword = async () => {
    form.submit();
  };

  const steps = [
    {
      title: "Xác minh",
      content: (
        <>
          <Row>
            <Col span={8}>
              <Input
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Input
                style={{ marginTop: 20 }}
                placeholder="Nhập mật khẩu"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Button
                style={{ marginTop: 20 }}
                type="primary"
                onClick={() => handleXacnhan()}
              >
                Xác nhận
              </Button>
            </Col>
          </Row>
        </>
      ),
    },

    {
      title: "Đổi mật khẩu mới",
      content: (
        <>
          <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu mới"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu",
                },
              ]}
            >
              <Input.Password visibilityToggle={false} />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Xác nhận lại mật khẩu"
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: " Hãy xác nhận lại mật khẩu",
                },
              ]}
            >
              <Input.Password visibilityToggle={false} />
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="forgot">
      <div className="forgot-content">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => handleNewPassword()}>
              Thay đổi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetPassword;
