import styled, { createGlobalStyle } from "styled-components";
import ToDoList from "./ToDoList";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoState, toDoStateDnD } from "./atoms";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";
import Boards from "./components/Boards";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
  background-color : ${(props) => props.theme.bgColor};
  color : ${(props) => props.theme.textColor};
}
a{
  text-decoration : none;
  color : inherit;
}
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoStateDnD);

  const onDragEnd = (info: DropResult) => {
    const { draggableId, source, destination } = info;

    if (!destination?.droppableId) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        //1) Delete Item on Source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination index
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [destination.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinBoard,
        };
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards></Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
