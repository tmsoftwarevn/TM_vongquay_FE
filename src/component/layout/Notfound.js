import { Button, Result } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  useEffect(() =>{
    navigate("/")
  },[])
  
  return (
    // <Result
    //   status="404"
    //   title="404"
    //   subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
    //   extra={
    //     <Button type="primary" onClick={() => navigate("/")}>
    //       Back Home
    //     </Button>
    //   }
    // />
    <></>
  );
};

export default Notfound;
