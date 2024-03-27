import { useEffect, useRef, useState } from "react";
import "../../scss/quenmatkhau.scss";
import { Button, Form, Input, message, notification, Steps } from "antd";
import { useNavigate } from "react-router-dom";


const QuenMatkhau = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");
  const otpRef = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (localStorage.getItem("user_id")) navigate("/game");
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };

  const contentStyle = {
    marginTop: 16,
  };

  const handleSendOTP = async () => {
    next();
    if (!email) {
      message.error("Email không được để trống");
      return;
    }
    // let res = await callSendOTP(email);
    // if (res && res.EC === 1) {

    //   message.success(res.message);
    //   next();
    // } else {

    //   message.error(res.message);
    // }
  };
  const handleVerify = async () => {
    next();

    // let res = await callVerify(email, otpRef.current.value);

    // if (res && res.EC === 1) {
    //   next();
    // } else {
    //   message.error("Mã OTP không chính xác");
    // }
  };

  const handleNewPassword = async () => {
    form.submit();
  };
  const onFinish = async (values) => {
    const { password, rePassword } = values;
    if (password != rePassword) {
      notification.error({
        message: "Mật khẩu không khớp. Hãy kiểm tra lại",
      });
      return;
    }

    // let res = await callNewPassword(email, password);

    // if (res && res.data) {
    //   message.success("Thay đổi mật khẩu thành công");
    //   navigate("/login");
    // } else {
    //   message.error(res.message);
    // }
  };
  const steps = [
    {
      title: "Nhập email",
      content: (
        <>
          <div>
            <Input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Button
              style={{ marginTop: 20 }}
              type="primary"
              onClick={() => handleSendOTP()}
            >
              Gửi mã xác nhận
            </Button>
          </div>
        </>
      ),
    },
    {
      title: "Nhập mã OTP",
      content: (
        <>
          <div>
            <input
              ref={otpRef}
              type="text"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
            />
          </div>
          <Button
            style={{ marginTop: 20 }}
            type="primary"
            onClick={() => handleVerify()}
          >
            Xác nhận
          </Button>
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
    <div className="forgot-pass">
      <div className="forgot-content">
        <div
          style={{
            marginBottom: 50,
            textAlign: "center",
            fontWeight: 500,
            fontSize: 24,
            cursor: "pointer",
            color: "orange",
          }}
          onClick={() => navigate("/")}
        >
          TM WOAY
        </div>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {/* {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Tiếp theo
            </Button>
          )} */}
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

export default QuenMatkhau;
