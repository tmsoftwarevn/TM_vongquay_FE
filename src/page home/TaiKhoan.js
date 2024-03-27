import { Button, Card } from "antd";
import "../scss/taikhoan.scss";
import { useNavigate } from "react-router-dom";

const TaiKhoan = () => {
  const navigate = useNavigate();
  return (
    <div className="tai-khoan">
      <Button type="primary" onClick={()=> navigate("/password")}>Đổi mật khẩu</Button>
    </div>
  );
};

export default TaiKhoan;
