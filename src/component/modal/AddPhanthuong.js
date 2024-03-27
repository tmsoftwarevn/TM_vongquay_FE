import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  message,
} from "antd";

import { call_add_phanqua } from "../../service/api";
import { useParams } from "react-router-dom";

const ModalAddPhanThuong = (props) => {
  const {
    fetch_all_phanqua,
    isModalAddPhanqua,
    setModalAddPhanqua,
    manh_ghep,
    listQua,
  } = props;

  const [form] = Form.useForm();
  const params = useParams();
  const handleCancel = () => {
    setModalAddPhanqua(false);
  };
  const onFinish = async (values) => {
    if(listQua.length === manh_ghep){
      message.error("Bạn đã nhập đủ số phần quà !");
      return;
    }
    
    const { name, tile, stt } = values;
    fetchAdd_phanqua(name, tile, stt);
  };

  useEffect(() => {
    form.resetFields();
  }, [isModalAddPhanqua]);

  const fetchAdd_phanqua = async (name, tile, stt) => {
    let res = await call_add_phanqua(name, tile, stt, params.id);
    if (res && res.EC === 1) {
      message.success("Thêm phần quà thành công");
      setModalAddPhanqua(false);
      fetch_all_phanqua();
    } else {
      message.error("Thêm thất bại ");
    }
  };

  return (
    <>
      <Modal
        title="Thêm phần quà"
        open={isModalAddPhanqua}
        onOk={() => {
          form.submit();
        }}
        okText="Thêm"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tỉ lệ trúng"
                name="tile"
                rules={[
                  {
                    required: true,
                    message: "Tỉ lệ không được để trống !",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số thứ tự"
                name="stt"
                rules={[
                  {
                    required: true,
                    message: "STT không được để trống !",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddPhanThuong;
