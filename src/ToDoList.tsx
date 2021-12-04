import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector } from "recoil";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");

//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDoError("");
//     setToDo(value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer than 10char");
//     } else {
//       console.log("submit");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           type="text"
//           value={toDo}
//           placeholder="Write a to do"
//         />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  FirstName: string;
  LastName: string;
  Email: string;
  password: string;
  passwordcnfrm: string;
  ToDo: string;
  extraError: string;
}
function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordcnfrm) {
      setError(
        "passwordcnfrm",
        { message: "password are not same" },
        { shouldFocus: true }
      );
    }
    //setError("extraError", { message: "extra error happened" });
  };

  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("FirstName", {
            required: "FirstName is required",
            validate: (value) =>
              value.includes("nico") ? "no nico allowed" : true,
          })}
          type="text"
          placeholder="Write FirstName"
        />
        <span style={{ color: "white" }}>{errors?.FirstName?.message}</span>
        <input
          {...register("LastName", {
            required: "plz input your last Name",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "noNico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "noNick allowed" : true,
            },
          })}
          type="text"
          placeholder="Write LastName"
        />
        <span style={{ color: "white" }}>{errors?.LastName?.message}</span>
        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "네이버 메일만 사용가능",
            },
            minLength: {
              value: 5,
              message: "Emil Addredd is way too short",
            },
          })}
          type="text"
          placeholder="Write a Email"
        />
        <span style={{ color: "white" }}>{errors?.Email?.message}</span>
        <input {...register("password")} type="text" placeholder="패스워드" />
        <span style={{ color: "white" }}>{errors?.password?.message}</span>
        <input
          {...register("passwordcnfrm")}
          type="text"
          placeholder="패스워드 확인"
        />
        <span style={{ color: "white" }}>{errors?.passwordcnfrm?.message}</span>
        <input {...register("ToDo")} type="text" placeholder="Write a to do" />
        <span style={{ color: "white" }}>{errors?.ToDo?.message}</span>

        <button>Add</button>
        <span style={{ color: "white" }}>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
