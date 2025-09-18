import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { plane } from "../../assets/birthday/index.js";

import classes from "./Puzzle.module.css";

const End = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#p",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, delay: 1.6, ease: "bounce.out" }
    );
    gsap.fromTo(
      "#plane",
      { y: 90, x: 400, rotate: 20 },
      { y: 0, x: -35, delay: 0.2, ease: "power1.inOut", duration: 1.5, rotate: 10 }
    );
  });
  return (
    <>
      <div className={classes["end-container"]}>
        <div>
          <p id="p">Irány Miami!</p>
          <img id="plane" src={plane} alt="" />
        </div>
      </div>
    </>
  );
};

export default End;
