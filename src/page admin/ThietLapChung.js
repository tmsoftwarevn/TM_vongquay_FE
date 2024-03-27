import { Button, Card, Flex, Input, Select, message } from "antd";
import "../scss/thietlapchung.scss";
import { useState } from "react";
import { convertSlug } from "../utils/convertSlug";
import { call_put_game } from "../service/api";
import { useParams } from "react-router-dom";

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
  const [name, setName] = useState();
  const [manh_ghep, setManh_ghep] = useState();
  const params = useParams();

  const handleChange_somanh = (value) => {
    setManh_ghep(value);
  };

  const handel_call_save_game = async () => {
    if (!name) {
      message.error("Bạn chưa nhập tên chương trình !");
      return;
    }
    if (!manh_ghep) {
      message.error("Bạn chưa chọn số phần quà !");
      return;
    }
    let slug = convertSlug(name);
    let res = await call_put_game(name, slug, manh_ghep, params.id);
    if (res && res.EC === 1) {
      message.success("Lưu thành công");
    } else {
      message.error("Lưu thất bại. Hãy thử lại sau !");
    }
  };

  return (
    <div className="thiet-lap-chung">
      <Flex justify="end" style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={() => handel_call_save_game()}>
          Lưu
        </Button>
      </Flex>
      <Card title="Thông tin chung">
        <div className="group">
          <p>Tên chương trình: </p>
          <Input onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="group" style={{ marginTop: "35px" }}>
          <p>Số phần quà: (số mảnh ghép của vòng quay)</p>
          <div className="so-manh-ghep">
            <Select
              style={{
                width: 100,
              }}
              onChange={(e) => handleChange_somanh(e)}
              options={so_manh_ghep}
              //   value={manh_ghep}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThietLapChung;
