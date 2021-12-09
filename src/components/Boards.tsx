import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;
function Boards() {
  return (
    <Wrapper>
      <Droppable droppableId="boards">
        {Object.keys(toDos).map((toDo) => (
          <Board toDos={toDos[boardId]} key={toDo.id} boardId={boardId} />
        ))}
      </Droppable>
      ;
    </Wrapper>
  );
}

export default Boards;
