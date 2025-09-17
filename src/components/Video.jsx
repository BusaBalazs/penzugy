import React from "react";
import { useNavigate } from "react-router";
import classes from "./Video.module.css";

const Video = () => {
  const navigate = useNavigate();
  //invoke the startGame function in context.jsx
  const handleStart = () => {

    navigate("/puzzle");
  };
  return (
    <div onClick={handleStart} className={classes["btn-container"]}>
      <button id="start-btn" className={classes["start-btn"]}>
        INDULÁS
      </button>
    </div>
  );
};

export default Video;
