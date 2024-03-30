"use client";
import { cardsData } from "@/bin/CardsData";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import LoadingSkeleton from "./LoadingSkeleton";
import { DndContext } from "@/context/DndContext";
import { FiMove } from "react-icons/fi";
interface Cards {
  id: number;
  name: string;
}
export default function DndExample() {
  const [data, setData] = useState<Cards[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const newData = [...data];

    const [reorderedItem] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, reorderedItem);

    setData(newData);
  };

  useEffect(() => {
    setData(cardsData);
  }, []);

  if (!data.length) {
    return <LoadingSkeleton />;
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
        <Droppable droppableId="1">
          {(provided) => (
            <div
              className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {data.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center gap-2 bg-gray-200 mx-1 px-4 py-3 my-3 ${
                        snapshot.isDragging ? "bg-blue-500" : ""
                      }`}>
                      {/* Drag Handle Icon */}
                      <span {...provided.dragHandleProps} className="handle">
                        <FiMove />
                      </span>
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DndContext>
  );
}
