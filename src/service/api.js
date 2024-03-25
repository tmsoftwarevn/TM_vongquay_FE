import axios from "../utils/axios-customized";

// upload ảnh
export const callUpload_Img_vongquay = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/upload-vongquay",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const callUpload_Img_banner = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/upload-banner",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const callUpload_Img_anhnen = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/upload-anhnen",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const callUpload_Img_footer = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/upload-footer",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// image
export const call_Put_Image = (
  nut_quay,
  mui_ten,
  banner,
  anh_nen,
  footer,
  vong_quay,
  id
) => {
  return axios.put(`/api/v1/image/${id}`, {
    nut_quay,
    mui_ten,
    banner,
    anh_nen,
    footer,
    vong_quay,
  });
};
// theo id_game

export const call_get_image = (id) => {
  return axios.get(`/api/v1/image/${id}`);
};

// game

export const call_put_game = (name, slug, so_manh, id) => {
  return axios.put(`/api/v1/game/${id}`, {
    name,
    slug,
    so_manh,
  });
};

// phần quà
export const call_get_all_phanqua = (id) => {
  return axios.get(`/api/v1/phan-qua/${id}`);
};

export const call_put_phanqua = (id, name, tile, stt) => {
  return axios.put(`/api/v1/phan-qua/${id}`, { name, tile, stt });
};

export const call_delete_phanqua = (id) => {
  return axios.delete(`/api/v1/phan-qua/${id}`);
};

export const call_add_phanqua = (name, tile, stt, id_game) => {
  return axios.post(`/api/v1/phan-qua`, {
    name,
    tile,
    stt,
    id_game,
  });
};

// bao cao

export const call_get_all_baocao = (id) => {
  return axios.get(`/api/v1/bao-cao/${id}`);
};

export const call_delete_baocao_id = (id) => {
  return axios.delete(`/api/v1/bao-cao/${id}`);
};

export const call_update_active = (id, a) => {
  return axios.put(`/api/v1/bao-cao/${id}`, { a });
};
