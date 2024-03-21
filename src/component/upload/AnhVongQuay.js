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

const onChange = (key) => {
  console.log(key);
};
const item_tab = [
  {
    key: "1",
    label: "Hướng dẫn",
    children: (
      <>
        <Collapse accordion items={item_accord} />
      </>
    ),
  },
  {
    key: "2",
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
];
const so_manh_ghep = [
  {
    value: "4",
    label: "4",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "12",
    label: "12",
  },
];
const AnhVongQuay = () => {
  const handleChange_somanh = (value) => {
    console.log(value);
  };
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
            <div className="so-manh-ghep">
              <p>Số mảnh ghép:</p>
              <Select
                labelInValue
                style={{
                  width: 120,
                }}
                onChange={handleChange_somanh}
                options={so_manh_ghep}
              />
            </div>
            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Ảnh vòng quay</p>
                <p className="p-size">640 x 640</p>
                <span>XEM</span>
              </div>
              <div className="image-upload">
                <UploadImage />
              </div>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Tabs defaultActiveKey="1" items={item_tab} onChange={onChange} />
        </Col>
      </Row>
    </div>
  );
};

export default AnhVongQuay;
