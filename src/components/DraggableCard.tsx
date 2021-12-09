import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Todos } from "../atoms";

interface ICard {
  isDragging: boolean;
}
const Card = styled.div<ICard>`
  background-color: ${(props) =>
    props.isDragging ? "lightgrey" : props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 15px rgba(0,0,0,0.1)" : "none"};
`;

interface IToDo {
  text: string;
}

interface IDraggableCard {
  index: number;
  toDo: Todos;
}

function DraggableCard({ toDo, index }: IDraggableCard) {
  return (
    <Draggable key={toDo.id} draggableId={toDo.id + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
