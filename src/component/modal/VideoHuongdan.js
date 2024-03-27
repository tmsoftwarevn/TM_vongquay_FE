import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "../../scss/VideoHuongdan.scss";

const VideoHuongdan = (props) => {
  const { isShowVideo, setShowVideo } = props;
  const refOutside = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refOutside &&
        refOutside.current &&
        !refOutside.current?.contains(event.target)
      ) {
        setShowVideo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isShowVideo)
    return (
      <div className="show-video">
        <div className="blur"></div>

        <div className="video-yt" ref={refOutside}>
          <ReactPlayer
            className="react-player"
            url={process.env.REACT_APP_LINK_HUONG_DAN}
            controls={true}
          />
        </div>
      </div>
    );
  else {
    return <></>;
  }
};

export default VideoHuongdan;
