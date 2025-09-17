import React, { forwardRef } from "react";
import { useDroppable } from "@dnd-kit/core";

const DropArea = forwardRef(({ className, dropAreaId, src }, ref) => {
  const { setNodeRef } = useDroppable({
    id: dropAreaId,
  });
  return (
    <div ref={setNodeRef} className={className}>
      <img ref={ref} src={src} alt="" style={{ display: "none" }} />
    </div>
  );
});

export default DropArea;