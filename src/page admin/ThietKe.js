import { Button, Card, Col, Flex, Image, Row, Upload, message } from "antd";
import "../scss/thietke.scss";
import { useEffect, useState } from "react";
import UploadImage from "../component/upload/UploadImage";
import AnhVongQuay from "../component/upload/AnhVongQuay";
import { call_Put_Image, call_check_game_customer, call_get_image } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
const ThietKe = () => {
  const [nut_quay, setNut_quay] = useState();
  const [mui_ten, setMui_ten] = useState();
  const [banner, setBanner] = useState();
  const [anhnen, setAnhnen] = useState();
  const [footer, setFooter] = useState();
  const [vongquay, setVongquay] = useState();

  const [detailImage, setDetailImage] = useState();
  const [showImage, setShowImage] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const fetch_info_image = async () => {
    const res = await call_get_image(params.id);
    if (res && res.EC === 1) {
      setNut_quay(res.data.nut_quay);
      setMui_ten(res.data.mui_ten);
      setBanner(res.data.banner);
      setAnhnen(res.data.anh_nen);
      setFooter(res.data.footer);
      setVongquay(res.data.vong_quay);
      
    }
  };
  const fetch_check_game_customer = async () => {
    let res = await call_check_game_customer(
      params.id,
      localStorage.getItem("user_id")
    );
    if (res && +res.EC !== 1) {
      navigate("/game");
    }
  };

  useEffect(() => {
    fetch_info_image();
    fetch_check_game_customer();

  },[]);

  const handlePreviewImage = (link) => {
    setShowImage(link);
  };

  const handleSave_Thietke = async () => {
    if (!nut_quay) {
      message.error("Bạn chưa upload ảnh nút vòng quay");
      return;
    }
    if (!mui_ten) {
      message.error("Bạn chưa upload ảnh mũi tên quay");
      return;
    }
    if (!banner) {
      message.error("Bạn chưa upload ảnh banner");
      return;
    }
    if (!anhnen) {
      message.error("Bạn chưa upload ảnh nền");
      return;
    }
    if (!footer) {
      message.error("Bạn chưa upload ảnh footer");
      return;
    }
    if (!vongquay) {
      message.error("Bạn chưa upload ảnh vòng quay");
      return;
    }
    

    let res = await call_Put_Image(
      nut_quay,
      mui_ten,
      banner,
      anhnen,
      footer,
      vongquay,
      params.id
    );
    if (res && res.EC === 1) {
      message.success("Lưu thành công !");
    }
  };

  return (
    <div className="thiet-ke">
       <Flex justify="end">
        <Button type="primary" onClick={() => handleSave_Thietke()}>
          Lưu
        </Button>
      </Flex>
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
                <UploadImage
                  nut_quay={nut_quay}
                  keyUpload={1}
                  setNut_quay={setNut_quay}
                />
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
                <UploadImage
                  mui_ten={mui_ten}
                  keyUpload={2}
                  setMui_ten={setMui_ten}
                />
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
                <UploadImage
                  banner={banner}
                  keyUpload={3}
                  setBanner={setBanner}
                />
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
                <UploadImage
                 anhnen={anhnen}
                  keyUpload={4}
                  setAnhnen={setAnhnen}
                />
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
                <UploadImage
                  footer={footer}
                  keyUpload={5}
                  setFooter={setFooter}
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col span={16}>
          <Card title="Xem trước" bordered={false}>
            {showImage ? (
              <>
                <Image.PreviewGroup>
                  <Image
                    style={{ maxWidth: "500px" }}
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${showImage}`}
                  />
                </Image.PreviewGroup>
              </>
            ) : (
              <></>
            )}
          </Card>
        </Col>
      </Row>

      <AnhVongQuay
        vongquay={vongquay}
        setVongquay={setVongquay}
        
      />

      <Flex justify="end" style={{marginTop: "20px"}}>
        <Button type="primary" onClick={() => handleSave_Thietke()}>
          Lưu
        </Button>
      </Flex>
    </div>
  );
};

export default ThietKe;
