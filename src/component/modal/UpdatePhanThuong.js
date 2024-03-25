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

import { call_put_phanqua } from "../../service/api";

const ModalUpdatePhanThuong = (props) => {
  const {
    fetch_all_phanqua,
    isModalUpdatePhanqua,
    setIsModalUpdatePhanqua,
    dataUpdate,
  } = props;

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalUpdatePhanqua(false);
  };
  const onFinish = async (values) => {
    const { name, tile, stt } = values;

    fetchUpdate_phanqua(name, tile, stt);
  };

  useEffect(() => {
    form.resetFields();
  }, [dataUpdate]);

  const fetchUpdate_phanqua = async (name, tile, stt) => {
    let res = await call_put_phanqua(dataUpdate?.id, name, tile, stt);
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      setIsModalUpdatePhanqua(false);
      fetch_all_phanqua();
    } else {
      message.error("Cập nhật thất bại ");
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật phần quà"
        open={isModalUpdatePhanqua}
        onOk={() => {
          form.submit();
        }}
        okText="Cập nhật"
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
                initialValue={dataUpdate.name}
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
                initialValue={dataUpdate.tile}
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
                    message: "STT được để trống !",
                  },
                ]}
                initialValue={dataUpdate.STT}
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
export default ModalUpdatePhanThuong;
