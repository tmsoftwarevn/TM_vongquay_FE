import { Button, Card, Col, Flex, Image, Row, Upload } from "antd";
import "../scss/thietke.scss";
import { useState } from "react";
import UploadImage from "../component/upload/UploadImage";
import AnhVongQuay from "../component/upload/AnhVongQuay";
const ThietKe = () => {
  const [nut_quay, setNut_quay] = useState();
  const [mui_ten, setMui_ten] = useState();
  const [banner, setBanner] = useState();
  const [anhnen, setAnhnen] = useState();
  const [footer, setFooter] = useState();

  const [showImage, setShowImage] = useState();

  const handlePreviewImage = (link) => {
    setShowImage(link);
  };

  const handleSave_Thietke = () => {
    //call api

    console.log(nut_quay, mui_ten, banner, anhnen, footer);
  };
  return (
    <div className="thiet-ke">
      <Row gutter={30}>
        <Col span={8}>
          <Card title="Thao tác" bordered={false}>
            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Nút vòng quay</p>
                <p className="p-size">640 x 640</p>
                <span
                  onClick={() => handlePreviewImage(`vongquay/${nut_quay}`)}
                >
                  Xem
                </span>
              </div>
              <div className="image-upload">
                <UploadImage keyUpload={1} setNut_quay={setNut_quay} />
              </div>
            </div>
            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Mũi tên quay</p>
                <p className="p-size">640 x 640</p>
                <span onClick={() => handlePreviewImage(`vongquay/${mui_ten}`)}>
                  Xem
                </span>
              </div>
              <div className="image-upload">
                <UploadImage keyUpload={2} setMui_ten={setMui_ten} />
              </div>
            </div>

            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Ảnh banner </p>
                <p className="p-size">640 x 640</p>
                <span onClick={() => handlePreviewImage(`banner/${banner}`)}>
                  Xem
                </span>
              </div>
              <div className="image-upload">
                <UploadImage keyUpload={3} setBanner={setBanner} />
              </div>
            </div>
            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Ảnh nền </p>
                <p className="p-size">640 x 640</p>
                <span onClick={() => handlePreviewImage(`anh_nen/${anhnen}`)}>
                  Xem
                </span>
              </div>
              <div className="image-upload">
                <UploadImage keyUpload={4} setAnhnen={setAnhnen} />
              </div>
            </div>
            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Ảnh footer </p>
                <p className="p-size">640 x 640</p>
                <span onClick={() => handlePreviewImage(`footer/${footer}`)}>
                  Xem
                </span>
              </div>
              <div className="image-upload">
                <UploadImage keyUpload={5} setFooter={setFooter} />
              </div>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Card title="Xem trước" bordered={false}>
            <Image.PreviewGroup>
              <Image
                style={{ maxWidth: "500px" }}
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${showImage}`}
              />
            </Image.PreviewGroup>
          </Card>
        </Col>
      </Row>

      <AnhVongQuay />
      <Flex justify="end">
        <Button type="primary" onClick={() => handleSave_Thietke()}>
          Lưu
        </Button>
      </Flex>
    </div>
  );
};

export default ThietKe;
