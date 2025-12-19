// SortableItem.js
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const draggingStyle = isDragging
    ? {
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
        WebkitBoxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
        MozBoxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
        opacity: 0.5,
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: 10,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...draggingStyle, height: "fit-content", borderRadius: "24px" }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
