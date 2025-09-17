import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Img = ({ src, className, dragId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: dragId,
    });

  const style = {
    transform: CSS.Translate.toString(transform) || undefined,
    touchAction: "none",
    zIndex: isDragging ? 999 : undefined,
    cursor: isDragging ? "grabbing" : "grab",
    transition: isDragging ? "none" : "transform 150ms ease",
    // optionally ensure the element can move visually
    position: "relative",
  };

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      src={src}
      alt=""
      className={className}
    />
  );
};

export default Img;