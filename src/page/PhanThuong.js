import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const title = "Xác nhận xóa ?";
const columns = [
  {
    title: "STT",
    dataIndex: "STT",
  },
  {
    title: "Tên phần quà (Theo thứ tự các mảnh ghép)",
    dataIndex: "name",
  },
  {
    title: "Tỉ lệ",
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
              //   onConfirm={() => {
              //     confirm(record?.id);
              //   }}
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
            >
              <CiEdit style={{ fontSize: "15px" }} />
            </Button>
          </div>
        </div>
      );
    },
  },
];
const data = [
  {
    key: "1",
    STT: "1",
    name: "John Brown",
    tile: "20%",
  },
  {
    STT: "2",
    key: "2",
    name: "Mary Def",
    tile: "20%",
  },
];

const PhanThuong = () => {
  return (
    <div style={{ padding: "0 50px" }}>
      <Button style={{marginBottom:"10px"}}>Hướng dẫn</Button>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};
export default PhanThuong;
