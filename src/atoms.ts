import { atom, selector } from "recoil";

type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export enum CategoriesNum {
  "TO_DO",
  "DOING",
  "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});

export interface Todos {
  id: number;
  text: string;
}

export interface IBoards {
  [key: string]: Todos[];
}
export const toDoStateDnD = atom<IBoards>({
  key: "toDoDnD",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: (options) => {
    const toDos = options.get(toDoState);
    const category = options.get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const minutesState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    return get(minutesState) / 60;
  },
  set: ({ set }, newVal) => {
    const minutes = Number(newVal) * 60;
    set(minutesState, minutes);
  },
});
