import React, { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { cursorTo } from "readline";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Todos, toDoStateDnD } from "../atoms";
import ToDoList from "../ToDoList";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 10px 0px;

  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

interface IBoard {
  toDos: Todos[];
  boardId: string;
}

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Area = styled.div<IArea>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(26, 188, 156,1.0)"
      : props.isDraggingFromThis
      ? "rgba(189, 195, 199,1.0)"
      : "rgba(52, 73, 94,1.0)"};
  flex-grow: 1;
  padding: 20px;

  transition: background-color 0.3s ease-in-out;
`;

interface IForm {
  toDo: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
function Board({ toDos, boardId }: IBoard) {
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoStateDnD);

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) => {
      return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
    });

    setValue("toDo", ""); //초기화
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: true,
            minLength: { value: 2, message: "2자이상 입력하여야합니다." },
          })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
        <button>추가</button>
        <span>{formState.errors.toDo?.message}</span>
      </Form>

      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, idx) => {
              return (
                <DraggableCard
                  key={toDo.id}
                  index={idx}
                  toDo={toDo}
                ></DraggableCard>
              );
            })}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
