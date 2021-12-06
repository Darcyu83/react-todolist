import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import { hourSelector, minutesState } from "./atoms";
import ToDoList from "./ToDoList";

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

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setMinutes(+value);
  };

  const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
    setHours(+e.currentTarget.value);
  };

  return (
    <>
      <GlobalStyle />
      <ToDoList />

      <input
        value={minutes}
        onChange={onChange}
        type="number"
        placeholder="Minutes"
      />

      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </>
  );
}

export default App;
