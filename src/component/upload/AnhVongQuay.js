import { Divider } from "antd";
import { Select } from "antd";
import { Button, Card, Col, Image, Row, Upload } from "antd";
import UploadImage from "./UploadImage";
import { Tabs } from "antd";
import { Collapse } from "antd";
import HuongDan4 from "../huong_dan/HuongDan4";
import HuongDan6 from "../huong_dan/HuongDan6";
import HuongDan8 from "../huong_dan/HuongDan8";
import HuongDan12 from "../huong_dan/HuongDan12";
import { useState } from "react";

const item_accord = [
  {
    key: "1",
    label: "4 mảnh ghép",
    children: (
      <>
        <HuongDan4 />
      </>
    ),
  },
  {
    key: "2",
    label: "6 mảnh ghép",
    children: (
      <>
        <HuongDan6 />
      </>
    ),
  },
  {
    key: "3",
    label: "8 mảnh ghép",
    children: (
      <>
        <HuongDan8 />
      </>
    ),
  },

  {
    key: "4",
    label: "12 mảnh ghép",
    children: (
      <>
        <HuongDan12 />
      </>
    ),
  },
];

const onChangeTab = (key) => {};

const item_tab = [
  {
    key: "1",
    label: "Xem trước",
    children: (
      <>
        <Image.PreviewGroup>
          <Image
            width="100%"
            style={{ maxWidth: "500px" }}
            src="http://localhost:8080/images/vongquay/VongQuay Khai Truong Che Ngon 3N-08-1710910933379.png"
          />
        </Image.PreviewGroup>
      </>
    ),
  },
  {
    key: "2",
    label: "Hướng dẫn",
    children: (
      <>
        <Collapse accordion items={item_accord} />
      </>
    ),
  },
];


const AnhVongQuay = (props) => {
  const { vongquay, setVongquay } = props;

  const item_tab = [
    {
      key: "1",
      label: "Xem trước",
      children: (
        <>
          {vongquay ? (
            <Image.PreviewGroup>
              <Image
                style={{ maxWidth: "500px" }}
                src={`${process.env.REACT_APP_BACKEND_URL}/images/vongquay/${vongquay}`}
              />
            </Image.PreviewGroup>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Hướng dẫn",
      children: (
        <>
          <Collapse accordion items={item_accord} />
        </>
      ),
    },
  ];


  return (
    <div className="vong-quay">
      <Divider />
      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#1677ff",
          marginBottom: "50px",
        }}
      >
        CÀI ĐẶT VÒNG QUAY
      </div>

      <Row gutter={30}>
        <Col span={8}>
          <Card title="Thao tác" bordered={false}>
           
            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Ảnh vòng quay</p>
                <p className="p-size">Kích thước:450 x 450</p>
                <p className="p-size">(Tối đa 2MB)</p>
                <span>XEM</span>
              </div>
              <div className="image-upload">
                <UploadImage
                  vongquay={vongquay}
                  setVongquay={setVongquay}
                  keyUpload={6}
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Tabs defaultActiveKey="1" items={item_tab} onChange={onChangeTab} />
        </Col>
      </Row>
    </div>
  );
};

export default AnhVongQuay;
