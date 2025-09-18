import React from "react";
import { useNavigate } from "react-router";
import classes from "./Video.module.css";
import video from "../assets/birthday/video.mp4";

const Video = () => {
  const navigate = useNavigate();
  //invoke the startGame function in context.jsx
  const handleStart = () => {
    navigate("/puzzle");
  };
  return (
    <>
      <div className={classes.container}>
        <video controls className={classes.video}>
          <source src={video} type="video/mp4" />
        </video>

        <div className={classes["btn-container"]}>
          <button
            id="start-btn"
            className={classes["start-btn"]}
            onClick={handleStart}
          >
            nyisd ki!
          </button>
        </div>
      </div>
    </>
  );
};

export default Video;
