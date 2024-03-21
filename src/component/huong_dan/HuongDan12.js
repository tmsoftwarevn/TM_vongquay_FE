import img_4 from "../../assets/images/Screenshot (80).png";
import "../../scss/huongdan.scss";

const HuongDan_12 = () => {
  return (
    <div className="huong-dan">
      <div className="mota">
        <p>
         Quý khách thiết kế ảnh theo mẫu dưới đây
        </p>
      </div>
      <div className="anh">
        <img src={img_4} />
      </div>
    </div>
  );
};
export default HuongDan_12;
