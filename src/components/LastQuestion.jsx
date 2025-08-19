import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";

import Process from "./Process";
import Timer from "./Timer";
import QuestionItem from "./QuestionItem";
import Modal from "./Modal";

import { useCtx } from "../context/context";
import { ANSWER_FEEDBACK, QR_FEEDBACK } from "../lib/constatnt";

//-----------------------------------------------------------------
import classes from "./Questions.module.css";
import { lastQuestions } from "../lib/testData";

// shuffle the answers function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//lastQuestion.tasks.map((item) => shuffleArray(item.answers));

//-----------------------------------------------------------------
//-----------------------------------------------------------------
const LastQuestion = () => {
  const btns = useRef([]);
  const questionRef = useRef();
  const dialog = useRef();

  const [questionNum, setQuestionNum] = useState(0);

  const [answerIsTrue, setAnswerIsTrue] = useState(true);
  const [feedback, setFeedback] = useState(ANSWER_FEEDBACK);
  const { onTurn, isEnd } = useCtx();
  
  lastQuestions.tasks.map((item) => shuffleArray(item.answers));

  //--------------------------------------------------------------

  useEffect(() => {
    if (!isEnd) {
      const container = questionRef.current;
      let ctx;
      if (questionNum >= 0) {
        gsap.to(".answer-gsap", {
          x: 0,
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.4,
          stagger: 0.4,
          delay: 0.7,
        });

        ctx = gsap.context(() => {
          gsap.from(container, {
            y: -50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "bounce.out",
          });
        });
      }
      return () => ctx.revert();
    }
  }, [questionNum]);

  //--------------------------------------------------------------
  // check the selected answer and add feedback if it is wrong
  const isOk = (e, index, answer) => {
    if (answer) {
      //dialog.current.open();
      setQuestionNum((prev) => prev + 1);
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

  //---------------------------------------------------------------
  const handlCancel = () => {
    dialog.current.close();
  };

  // check the QR code, and set the next question if the code is right
  const handleGetScanId = (result) => {};

  //-----------------------------------------------------------
  return (
    <>
      <Modal
        ref={dialog}
        onCancel={handlCancel}
        getScanId={handleGetScanId}
        modalText={feedback}
        actualQuestionNum={questionNum}
      />

      <section className={`${classes["container"]}`}>
        <div>
          <Process numOfQuestion={9} numOfAllQuestion={10} />
        </div>
        <div className={classes["question-section"]}>
          <div
            ref={questionRef}
            id="question-gsap"
            className={classes["question-container"]}
          >
            <div className={classes["question"]}>
              <h2>{lastQuestions.question}</h2>
            </div>
          </div>
          <ul className={classes.list}>
            {lastQuestions.tasks[questionNum].answers.map((item, i) => (
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
          <Timer className={classes["timer-display"]} isEnd={isEnd} />
        </div>
      </section>
    </>
  );
};

export default LastQuestion;
