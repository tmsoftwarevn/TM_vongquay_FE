import React, { useEffect, useState } from "react";
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
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isJpgOrPng) {
    message.error("File upload phải có định dạng JPG/PNG/jpeg file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Ảnh phải có dung lượng nhỏ hơn 2MB!");
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
    setVongquay,
    nut_quay,
    mui_ten,
    banner,
    anhnen,
    footer,
    vongquay,
  } = props;

  useEffect(() => {
    if (nut_quay) {
      setImageUrl(`vongquay/${nut_quay}`);
      return;
    }
    if (mui_ten) {
      setImageUrl(`vongquay/${mui_ten}`);
      return;
    }
    if (banner) {
      setImageUrl(`banner/${banner}`);
      return;
    }
    if (anhnen) {
      setImageUrl(`anh_nen/${anhnen}`);
      return;
    }
    if (footer) {
      setImageUrl(`footer/${footer}`);
      return;
    }
    if (vongquay) {
      setImageUrl(`vongquay/${vongquay}`);
      return;
    }
  }, [nut_quay, mui_ten, banner, anhnen, footer, vongquay]);

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
        //setImageUrl(url);
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
        setImageUrl(`vongquay/${res.data.fileUploaded}`);
      }
    }

    if (keyUpload === 2) {
      res = await callUpload_Img_vongquay(file);
      if (res && res.EC === 1) {
        setMui_ten(res.data.fileUploaded);
        setImageUrl(`vongquay/${res.data.fileUploaded}`);
      }
    }
    if (keyUpload === 3) {
      res = await callUpload_Img_banner(file);
      if (res && res.EC === 1) {
        setBanner(res.data.fileUploaded);
        setImageUrl(`banner/${res.data.fileUploaded}`);
      }
    }
    if (keyUpload === 4) {
      res = await callUpload_Img_anhnen(file);
      if (res && res.EC === 1) {
        setAnhnen(res.data.fileUploaded);
        setImageUrl(`anh_nen/${res.data.fileUploaded}`);
      }
    }
    if (keyUpload === 5) {
      res = await callUpload_Img_footer(file);
      if (res && res.EC === 1) {
        setFooter(res.data.fileUploaded);
        setImageUrl(`footer/${res.data.fileUploaded}`);
      }
    }
    if (keyUpload === 6) {
      res = await callUpload_Img_vongquay(file);
      if (res && res.EC === 1) {
        setVongquay(res.data.fileUploaded);
        setImageUrl(`vongquay/${res.data.fileUploaded}`);
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
            //src={imageUrl}
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${imageUrl}`}
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
