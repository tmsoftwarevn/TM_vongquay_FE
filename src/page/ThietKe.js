import { Card, Col, Row, Upload } from "antd";
import "../scss/thietke.scss";
import { useState } from "react";
import UploadImage from "../component/upload/UploadImage";
const ThietKe = () => {
  return (
    <div className="thiet-ke">
      <Row gutter={30}>
        <Col span={8}>
          <Card title="Thao tác" bordered={false}>
            <div className="group-action">
              <div className="text-action">
                <p className="p-normal">Nút vòng quay</p>
                <p className="p-normal">640 x 640</p>
              </div>
              <div className="image-upload">
                <UploadImage />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card title="Xem trước" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ThietKe;
