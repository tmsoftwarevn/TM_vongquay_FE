import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import {
  callUpload_Img_anhnen,
  callUpload_Img_banner,
  callUpload_Img_footer,
  callUpload_Img_vongquay,
} from "../../service/api";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = (props) => {
  const {
    keyUpload,
    setAnhnen,
    setBanner,
    setFooter,
    setMui_ten,
    setNut_quay,
  } = props;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleUploadFile = async ({ file, onSuccess, onError }) => {
    let res;
    if (keyUpload === 1) {
      res = await callUpload_Img_vongquay(file);
      if (res && res.EC === 1) {
        setNut_quay(res.data.fileUploaded);
      }
    }
    if (keyUpload === 2) {
      res = await callUpload_Img_vongquay(file);
      if (res && res.EC === 1) {
        setMui_ten(res.data.fileUploaded);
      }
    }
    if (keyUpload === 3) {
      res = await callUpload_Img_banner(file);
      if (res && res.EC === 1) {
        setBanner(res.data.fileUploaded);
      }
    }
    if (keyUpload === 4) {
      res = await callUpload_Img_anhnen(file);
      if (res && res.EC === 1) {
        setAnhnen(res.data.fileUploaded);
      }
    }
    if (keyUpload === 5) {
      res = await callUpload_Img_footer(file);
      if (res && res.EC === 1) {
        setFooter(res.data.fileUploaded);
      }
    }

    if (res && res.data) {
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={handleUploadFile}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
export default UploadImage;
