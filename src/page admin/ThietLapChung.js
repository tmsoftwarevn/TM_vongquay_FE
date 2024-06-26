import { Button, Card, Flex, Form, Input, Select, message } from "antd";
import "../scss/thietlapchung.scss";
import { useEffect, useState } from "react";
import { convertSlug } from "../utils/convertSlug";
import {
  call_check_game_customer,
  call_get_all_phanqua,
  call_get_info_game,
  call_put_game,
} from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { Space, Tooltip } from "antd";

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
const ThietLapChung = () => {
  const [detailGame, setDetailGame] = useState("");
  const navigate = useNavigate();
  const [link, setLink] = useState();
  const [form] = Form.useForm();
  const params = useParams();
  const [disabled, setDisabled] = useState(false);
  const [phanqua, setPhanqua] = useState();

  const fetch_infoGame = async () => {
    let res = await call_get_info_game(params.id);
    if (res && res.EC === 1) {
      setDetailGame(res.data);
      setLink(process.env.REACT_APP_URL_TEMPLATE + "/" + res.data.slug);
      // lưu trong input
      let init = {
        name: res.data.name,
        manh_ghep: res.data.so_manh,
      };
      form.setFieldsValue(init);
    }
  };

  // check để user ko xem được game người khác
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
    fetch_infoGame();
    fetch_check_game_customer();
    fetch_length_phanqua();
  }, []);

  const fetch_length_phanqua = async() =>{
    let res = await call_get_all_phanqua(localStorage.getItem("game_id"));
    if(res && res.EC === 1){
      setPhanqua(res.data.length);
    }
  }

  const onFinish = async (values) => {
    const { name, manh_ghep } = values;
    if (!name) {
      message.error("Bạn chưa nhập tên chương trình !");
      return;
    }
    if (!manh_ghep) {
      message.error("Bạn chưa chọn số phần quà !");
      return;
    }
    let slug = convertSlug(name) + "-" + params.id;

    let res = await call_put_game(name, slug, manh_ghep, params.id);
    if (res && res.EC === 1) {
      message.success("Lưu thành công");
    } else {
      message.error("Lưu thất bại. Hãy thử lại sau !");
    }
  };

  const handle_get_link = ()=>{
    if(phanqua < +detailGame.so_manh){
      message.error("Bạn chưa nhập đủ số phần quà !");
      return;
    }

    if(!detailGame.slug){
      message.error("Bạn chưa lưu tên chương trình !")
      return;
    }

    setDisabled(true);
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="thiet-lap-chung">
      <Flex justify="end" style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={() => form.submit()}>
          Lưu
        </Button>
      </Flex>
      <Card title="Thông tin chung">
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="name"
            label="Tên chương trình"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên chương trình!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="manh_ghep"
            label="Số phần quà (số mảnh ghép)"
            rules={[
              {
                required: true,
                message: "Hãy chọn số phần quà!",
              },
            ]}
          >
            <Select
              style={{
                width: 100,
              }}
              options={so_manh_ghep}
            />
          </Form.Item>
         
          <Space>
            <Button
              onClick={() => handle_get_link()}
            >
              {disabled ? "Đã copy" : "Copy"}
            </Button>
            <Tooltip>
              <span>Lấy link vòng quay</span>
            </Tooltip>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default ThietLapChung;
