import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { plane, travelBg } from "../../assets/birthday/index.js";

import classes from "./End.module.css";

const End = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#p",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, delay: 1, ease: "power1.inOut" }
    );
    gsap.fromTo(
      "#plane",
      { y: 220, x: 400, rotate: 20 },
      {
        y: 190,
        x: 15,
        delay: 0.2,
        ease: "power1.inOut",
        duration: 1.5,
        rotate: 10,
      }
    );
  });
  return (
    <>
      <div className={classes["end-container"]}>
        <img src={travelBg} alt="" className={classes["end-bg"]} />

        <div>
          <h3 id="p" className={classes["end-text"]}>
            Boldog születésnapot kívánunk!
          </h3>
          <img id="plane" src={plane} alt="" className={classes["plane-img"]} />
        </div>
      </div>
    </>
  );
};

export default End;
