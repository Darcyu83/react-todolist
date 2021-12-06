import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, ITodo, toDoState } from "../atoms";

function ToDo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCate: ITodo["category"]) => {
    console.log("I Wanna to ", newCate);
  };

  const onClick1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelelte = (e: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const indx = oldToDos.findIndex((itm) => itm.id === id);

      return [...oldToDos.slice(0, indx), ...oldToDos.slice(indx + 1)];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick1}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick1}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick1}>
          Done
        </button>
      )}
      <button id={id + ""} onClick={onDelelte}>
        {" "}
        Delete{" "}
      </button>
    </li>
  );
}

export default ToDo;
