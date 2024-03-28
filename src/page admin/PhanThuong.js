import React, { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Table, message } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  call_check_game_customer,
  call_delete_phanqua,
  call_get_all_phanqua,
  call_get_info_game,
} from "../service/api";
import ModalUpdatePhanThuong from "../component/modal/UpdatePhanThuong";
import ModalAddPhanThuong from "../component/modal/AddPhanthuong";

const title = "Xác nhận xóa ?";

const PhanThuong = () => {
  const params = useParams();
  const [manh_ghep, setManh_ghep] = useState();
  const [listQua, setListQua] = useState();
  const [dataTable, setDataTable] = useState();

  const [dataUpdate, setDataUpdate] = useState("");
  const [isModalUpdatePhanqua, setIsModalUpdatePhanqua] = useState();
  const [isModalAddPhanqua, setModalAddPhanqua] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch_all_phanqua();
    fetch_infoGame();
    fetch_check_game_customer();
  }, []);

  const fetch_check_game_customer = async () => {
    let res = await call_check_game_customer(
      params.id,
      localStorage.getItem("user_id")
    );
    if (res && +res.EC !== 1) {
      navigate("/game");
    }
  };

  const fetch_all_phanqua = async () => {
    let res = await call_get_all_phanqua(params.id);
    if (res && res.EC === 1) {
      setListQua(res.data);
      custom_table(res.data);
    }
  };

  const fetch_infoGame = async () => {
    let res = await call_get_info_game(params.id);
    if (res && res.EC === 1) {
      setManh_ghep(res.data.so_manh);
    }
  };

  const handleUpdatePhanqua = (record) => {
    setIsModalUpdatePhanqua(true);
    setDataUpdate(record);
  };

  const confirm = async (id) => {
    let res = await call_delete_phanqua(id);
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetch_all_phanqua();
    } else {
      message.error("Xóa thất bại !");
    }
  };

  const columns = [
    {
      title: "STT (Theo thứ tự các mảnh ghép)",
      dataIndex: "STT",
    },
    {
      title: "Tên phần quà",
      dataIndex: "name",
    },
    {
      title: "Tỉ lệ (%)- Tổng 100%",
      dataIndex: "tile",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              fontSize: "18px",
              gap: 20,
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <Popconfirm
                placement="left"
                title={title}
                onConfirm={() => {
                  confirm(record?.id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  type="primary"
                  danger
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MdDelete />
                </Button>
              </Popconfirm>
            </div>

            <div>
              <Button
                size="small"
                type="primary"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => {
                  handleUpdatePhanqua(record);
                }}
              >
                <CiEdit style={{ fontSize: "15px" }} />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  const custom_table = (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push({
        key: index,
        STT: item.stt,
        name: item.name,
        tile: item.tile,
        id: item.id,
      });
    });
    setDataTable(arr);
  };

  const handleAdd_phanqua = () => {
    // check đã chọn số mảnh ghép chưa
    if (!manh_ghep) {
      message.error("Bạn chưa chọn số phần quà ở mục Thiết lập chung !");
      return;
    }
    setModalAddPhanqua(true);
  };
  return (
    <div>
      <Flex justify="space-between" style={{ marginBottom: "20px" }}>
        {/* <Button type="primary">Hướng dẫn</Button> */}
        <Button type="primary" onClick={() => handleAdd_phanqua()}>
          <PlusCircleOutlined /> Thêm phần quà
        </Button>
      </Flex>
      <Table columns={columns} dataSource={dataTable} pagination={false} />

      <ModalUpdatePhanThuong
        isModalUpdatePhanqua={isModalUpdatePhanqua}
        setIsModalUpdatePhanqua={setIsModalUpdatePhanqua}
        dataUpdate={dataUpdate}
        fetch_all_phanqua={fetch_all_phanqua}
      />
      <ModalAddPhanThuong
        fetch_all_phanqua={fetch_all_phanqua}
        isModalAddPhanqua={isModalAddPhanqua}
        setModalAddPhanqua={setModalAddPhanqua}
        manh_ghep={manh_ghep} // truyen 2 cai, để check ít hoặc nhiều hơn số mảnh
        listQua={listQua}
      />
    </div>
  );
};
export default PhanThuong;
