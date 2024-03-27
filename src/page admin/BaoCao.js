import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Popconfirm, Table, message } from "antd";
import {
  call_check_game_customer,
  call_delete_baocao_id,
  call_get_all_baocao,
  call_update_active,
} from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";

const title = "Xác nhận xóa ?";
const BaoCao = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  ////// SEARCH
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Phần quà",
      dataIndex: "qua",
    },
    {
      title: "Ngày trúng thưởng",
      dataIndex: "day",
      sorter: {
        compare: (a, b) =>
          moment(a.day, "DD-MM-Y hh:mm:ss") - moment(b.day, "DD-MM-Y hh:mm:ss"),
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      render: (text, record, index) => {
        return (
          <Checkbox defaultChecked={record.active ? true :false} onChange={(e) => onChangeLienhe(e, record?.id)}>
            Đã liên hệ
            
          </Checkbox>
        );
      },
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
          </div>
        );
      },
    },
  ];
  ///////
  const onChangeLienhe = async (e, id) => {
    if (e.target.checked === true) {
      let res = await call_update_active(id, 1);
      if (res && res.EC === 1) {
        message.success("Cập nhật thành công !");
      } else {
        message.error("Không thể cập nhật !");
      }
    } else {
      let res = await call_update_active(id, 0);
      if (res && res.EC === 1) {
        message.success("Cập nhật thành công !");
      } else {
        message.error("Không thể cập nhật !");
      }
    }
  };
  //////
  const params = useParams();
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState();

  const fetch_baocao = async () => {
    let res = await call_get_all_baocao(params.id);
    if (res && res.EC === 1) {
      custom_table(res.data);
    }
  };

  const confirm = async (id) => {
    let res = await call_delete_baocao_id(id);
    if (res && res.EC === 1) {
      message.success("Xóa thành công ");
      fetch_baocao();
    } else {
      message.error("Xóa thất bại !");
    }
  };

  const custom_table = (list) => {
    let arr = [];
    list.map((item, index) => {
      arr.push({
        key: index,
        STT: index + 1,
        name: item.name,
        phone: item.phone,
        qua: item.qua,
        id: item.id,
        active: item.active,
        day: moment(item?.createdAt).format("DD-MM-Y hh:mm:ss"),
      });
    });
    setDataTable(arr);
  };

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
    fetch_baocao();
    fetch_check_game_customer();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataTable}
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
