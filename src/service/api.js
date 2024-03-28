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

export const call_post_image = (
  nut_quay,
  mui_ten,
  banner,
  anh_nen,
  footer,
  vong_quay,
  id_game
) => {
  return axios.post(`/api/v1/image${id_game}`, {
    nut_quay,
    mui_ten,
    banner,
    anh_nen,
    footer,
    vong_quay,
  });
};

// game

export const call_post_game = (name, slug, so_manh, id_Khachhang) => {
  return axios.post("/api/v1/game", { name, slug, so_manh, id_Khachhang });
};

// id_game
export const call_put_game = (name, slug, so_manh, id) => {
  return axios.put(`/api/v1/game/${id}`, {
    name,
    slug,
    so_manh,
  });
};

export const call_get_info_game = (id) => {
  return axios.get(`/api/v1/game/${id}`);
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

// khach hang

export const call_register_customer = (name, email, phone, password) => {
  return axios.post(`/api/v1/customer`, { name, email, phone, password });
};

export const call_login = (email, password) => {
  return axios.post("/api/v1/customer-login", { email, password });
};

export const call_get_info_detail_customer = (id) => {
  return axios.get(`/api/v1/info-customer/${id}`);
};

export const call_update_account = (id, name, phone) => {
  return axios.put(`/api/v1/customer/${id}`, { name, phone });
};
// check game - customer (id, id_khachhang có giống k)

export const call_check_game_customer = (id, id_Khachhang) => {
  return axios.post("/api/v1/check-game-customer", {
    id,
    id_Khachhang,
  });
};

// password

export const call_check_pass = (email, password) => {
  return axios.post("/api/v1/check-password", { email, password });
};

export const call_update_password = (email, password) => {
  return axios.post("/api/v1/update-password", { email, password });
};
