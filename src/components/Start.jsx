import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { gsap } from "gsap/gsap-core";

import Leaderboard from "./Leaderboard.jsx";
import { useCtx } from "../context/context";

import classes from "./Start.module.css";

//-------------------------------------------------------
//-------------------------------------------------------
const Start = () => {
  const leaderboard = useRef();
  const navigate = useNavigate();

  //from context.jsx
  const { startGame } = useCtx();

  useEffect(() => {
    const loaded = () => {
      gsap.fromTo(
        "#start-btn",
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "expo.out",
          duration: 1,
          delay: 0.3,
        }
      );
    };

    if (document.readyState === "complete") {
      loaded();
    } else {
      window.addEventListener("load", loaded);

      return () => {
        window.removeEventListener("load", loaded);
      };
    }
  }, []);

  //-----------------------------------------------------------

  //invoke the startGame function in context.jsx
  const handleStart = () => {
    startGame();
    navigate("/questions");
  };

  //-----------------------------------------------------------
  return (
    <>
      {/* <Leaderboard ref={leaderboard} /> */}
      <section className={classes["start-page"]}>
        <div className={classes["card"]}>
          <div className={classes["welcome-text"]}>
            <h2>Induljon a játékos pénzügyi utazás!</h2>
            <p>
              Olvasd be a QR-kódot, válaszolj a kvízre, és ha jól teljesítesz, a
              térkép segít továbblépni.
            </p>
            <p>
              Szórakozva tanulhatod meg, hogyan gazdálkodj okosan a
              zsebpénzeddel.
            </p>
          </div>
          <div onClick={handleStart} className={classes["btn-container"]}>
            <button id="start-btn" className={classes["start-btn"]}>
              start
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Start;
