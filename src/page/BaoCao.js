import React from "react";
import { Checkbox, Table } from "antd";

const columns = [
  {
    title: "STT",
    dataIndex: "STT",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "SĐT",
    dataIndex: "phone",
  },
  {
    title: "Phần quà",
    dataIndex: "gift",
  },
  {
    title: "Ngày trúng thưởng",
    dataIndex: "day",
  },
  {
    title: "Trạng thái",
    dataIndex: "trangthai",
    render: () => {
      return <Checkbox onChange={onChange}>Đã liên hệ</Checkbox>;
    },
  },
];
const data = [
  {
    key: "1",
    STT: "1",
    phone: "0123456789",
    name: "John Brown",
    gift: "Phần quà may mắn",
    day: "11/11/2023",
    trangthai: "1",
  },
];
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const BaoCao = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          position: ["bottomCenter"],
          pageSizeOptions: [2, 10, 50, 100],
        }}
      />
    </div>
  );
};
export default BaoCao;
