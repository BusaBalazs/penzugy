import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DropArea from "./DropArea";
import Img from "./Img.jsx";

import classes from "./Puzzle.module.css";
import { maps } from "../../assets/birthday/index.js";

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";

const DROPAREA = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

// shuffle the answers function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return new Array(...array);
};
// shuffle the maps array
const shuffledMaps = shuffleArray([...maps]);

//-----------------------------------------------------
//*****************************************************
const Puzzle = () => {
  const actualImgRef = useRef([]);
  const navigate = useNavigate();
  // register sensors
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const [dropImgs, setDropImgs] = useState(
    shuffledMaps.map((item, index) => {
      return {
        id: item.id, // use prefixed id
        src: item.src,
        isOk: false,
      };
    })
  );
console.log(dropImgs)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (over.id === active.id) {
      actualImgRef.current[parseInt(over.id)].style.display = "block";
      setDropImgs((prev) => prev.filter((item) => item.id !== active.id));
    }

    if (dropImgs.length - 1 === 0) {
      navigate("/end");
    }
  };

  return (
    <div className={classes["container"]}>
      <h2>Húzd a képeket a megfelelő helyre!</h2>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={classes["grid"]}>
          {DROPAREA.map((item, index) => (
            <DropArea
              key={item}
              className={classes["drop-area-item"]}
              dropAreaId={item} // prefix droppable ids
              src={maps[item].src}
              ref={(element) => (actualImgRef.current[index] = element)}
            />
          ))}
        </div>
        <div className={classes["grid-imgs"]}>
          {dropImgs.map((item, index) => (
            <Img
              key={item.id}
              src={item.src}
              className={classes["grid-item"]}
              dragId={item.id} // prefixed draggable id
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Puzzle;
