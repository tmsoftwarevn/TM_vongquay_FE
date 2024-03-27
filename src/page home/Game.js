import { Button, Card, Col, Flex, Row, message } from "antd";
import woay from "../assets/images/woay.jpg";
import "../scss/game.scss";
import { useState } from "react";
import VideoHuongdan from "../component/modal/VideoHuongdan";
import { useNavigate } from "react-router-dom";
import { call_post_game } from "../service/api";

const Game = () => {
  const [isShowVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const handle_create_game = async() =>{
   
    // check đã tạo game chưa
    let res = await call_post_game("","","", localStorage.getItem("user_id"));
    // lưu id_game ở localstorage
    if(res && res.EC === -2){       /// -2: game đã tạo thì trả về info_game
      localStorage.setItem("game_id", res.data.id);
      navigate(`/admin/thiet-lap-chung/${res.data.id}`)
    }
    else if(res && res.EC === 1){
      // chưa thì tạo rồi trả về id_game
      localStorage.setItem("game_id", res.data.id);
      navigate(`/admin/thiet-lap-chung/${res.data.id}`)
    }else{
      message.error("Xin hãy thử lại !")
    }
  }

  return (
    <>
      <div className="game">
        <Row gutter={20}>
          <Col span={8}>
            <Card title="Game vòng quay may mắn">
              <div className="image">
                <img src={woay}></img>
              </div>
              <Flex justify="space-between" style={{ marginTop: "20px" }}>
                <Button type="dashed" onClick={() => setShowVideo(true)}>
                  Hướng dẫn
                </Button>
                <Button type="primary" onClick={() => handle_create_game()}>
                  Chọn
                </Button>
              </Flex>
            </Card>
          </Col>

          {/* <Col span={8}>
            <Card>ff</Card>
          </Col>
          <Col span={8}>
            <Card>ff</Card>
          </Col> */}
        </Row>
      </div>
      <VideoHuongdan isShowVideo={isShowVideo} setShowVideo={setShowVideo} />
    </>
  );
};

export default Game;
