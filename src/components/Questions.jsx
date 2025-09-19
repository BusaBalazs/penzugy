import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";

import Process from "./Process";

import QuestionItem from "./QuestionItem";

import { useCtx } from "../context/context";
import { ANSWER_FEEDBACK, QR_FEEDBACK } from "../lib/constatnt";
import { backgrounds } from "../assets/birthday/index";

//-----------------------------------------------------------------
import classes from "./Questions.module.css";
import { lastQuestions, question } from "../lib/testData";

// shuffle the answers function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

lastQuestions.map((item) => shuffleArray(item.answers));

//-----------------------------------------------------------------
// local storage functions

const getLocaldata = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//-----------------------------------------------------------------
//-----------------------------------------------------------------
const LastQuestion = () => {
  const btns = useRef([]);
  const questionRef = useRef();
  const dialog = useRef();

  const navigate = useNavigate();

  const [questionNum, setQuestionNum] = useState(0);
  const [questionId, setQuestionId] = useState([]);

  // Add new state for preloaded image
  const [displayedBg, setDisplayedBg] = useState(backgrounds[0]);

  const [answerIsTrue, setAnswerIsTrue] = useState(true);

   // keep or remove this helper; don't store Image object in state
  const preload = (src) => {
    const img = new Image();
    img.src = src;
  };

  //--------------------------------------------------------------
  useEffect(() => {
    try {
      const getStatus = getLocaldata("status");
      if (getStatus) {
        setQuestionNum(getStatus.questionCounter);
      }
    } catch (error) {
      console.error("Error fetching status from localStorage:", error);
    }

    let cancelled = false;
    const src = backgrounds[questionNum];

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setDisplayedBg(src);

      // preload next image
      const nextIdx = questionNum + 1;
      if (nextIdx < backgrounds.length) preload(backgrounds[nextIdx]);

      // run GSAP after the new image is ready
      gsap.fromTo(
        "#question-gsap",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2.8, ease: "bounce.out" }
      );

      gsap.to(".answer-gsap", {
        x: 0,
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.4,
        stagger: 0.4,
        delay: 3,
      });

      gsap.fromTo(
        "#bg-img-gsap",
        { x: -360, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
      );
    };
    img.onerror = () => {
      if (cancelled) return;
      // fallback: still set displayedBg so UI doesn't remain stuck
      setDisplayedBg(src);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [questionNum]);

  //--------------------------------------------------------------
  // check the selected answer and add feedback if it is wrong
  const isOk = (e, index, answer) => {
    if (answer) {
      if (questionNum >= 17) {
        //dialog.current.open();
        navigate("/video");
        return;
      }

      setQuestionNum((prev) => prev + 1);
      setLocalData("status", { questionCounter: questionNum + 1 });
      setAnswerIsTrue(true);
    } else {
      setAnswerIsTrue(false);
      //setBtn(e.target);

      btns.current[index].style.background = "rgba(194, 0, 0, 0.7)";
      setTimeout(() => {
        btns.current[index].style.background = "";
        setAnswerIsTrue(true);
      }, 1500);
    }
  };

  //-----------------------------------------------------------
  return (
    <>
      <section className={`${classes["container"]}`}>
        <div>
          <Process
            numOfQuestion={questionNum}
            numOfAllQuestion={lastQuestions.length}
          />
        </div>
        <div className={classes["question-section"]}>
          <img
            id="bg-img-gsap"
            src={displayedBg}
            alt=""
            className={classes["bg-img"]}
          />
          <div
            ref={questionRef}
            id="question-gsap"
            className={classes["question-container"]}
          >
            <div className={classes["question"]}>
              <h2>{lastQuestions[questionNum].question}</h2>
            </div>
          </div>
          <ul className={classes.list}>
            {lastQuestions[questionNum].answers.map((item, i) => (
              <QuestionItem
                key={item.answer}
                CheckAnswer={(e, index = i) => isOk(e, index, item.right)}
                isDisabled={!answerIsTrue ? true : false}
                ref={(el) => (btns.current[i] = el)}
                className="answer-gsap question-item"
              >
                {item.answer}
              </QuestionItem>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default LastQuestion;
