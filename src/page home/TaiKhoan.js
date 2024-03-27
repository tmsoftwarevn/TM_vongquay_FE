import { Button, Card, Col, Input, Row, Form, message } from "antd";
import "../scss/taikhoan.scss";
import { useNavigate } from "react-router-dom";
import {
  call_get_info_detail_customer,
  call_update_account,
} from "../service/api";
import { useEffect, useState } from "react";

const TaiKhoan = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [account, setAccount] = useState();

  const fetch_detail_customer = async () => {
    let res = await call_get_info_detail_customer(
      localStorage.getItem("user_id")
    );
    if (res && res.EC == 1) {
      setAccount(res.data);
      form.setFieldsValue({
        name: res.data.name,
        phone: res.data.phone,
        email: res.data.email,
      });
    }
  };

  useEffect(() => {
    fetch_detail_customer();
  }, []);
  const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09)+([0-9]{8})\b/.test(number);
  };
  const onFinish = async (values) => {
    const { name, phone } = values;
    if (!isVietnamesePhoneNumber(phone)) {
      message.error("Số điện thoại không đúng !");
      return;
    }
    let res = await call_update_account(
      localStorage.getItem("user_id"),
      name,
      phone
    );

    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
    } else {
      message.error("Lưu thất bại. Hãy thử lại sau !");
    }
  };

  return (
    <div className="tai-khoan">
      <Row>
        <Col span={16}>
          <Card title="Thông tin tài khoản">
            <Form onFinish={onFinish} form={form}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập họ tên!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại!",
                  },
                ]}
              >
                <Input
                  pattern="(03|05|07|08|09)[0-9]{8}"
                  placeholder="Số điện thoại"
                />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input disabled={true} />
              </Form.Item>

              <Button
                onClick={() => form.submit()}
                style={{ marginTop: "30px" }}
                type="primary"
              >
                Cập nhật
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TaiKhoan;
