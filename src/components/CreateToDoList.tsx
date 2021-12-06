import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDoList() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [{ text: toDo, id: Date.now(), category }, ...prev]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "할일을 입력하세요.",
        })}
        type="text"
        placeholder="Write a to do"
      />
      <button>Add</button>
      <span>{errors?.toDo?.message}</span>
    </form>
  );
}

export default CreateToDoList;
