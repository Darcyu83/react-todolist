import React from 'react';
import styled from 'styled-components'
import Circle from "./Circle"


function App() {
  return (
   <div>
     <Circle bgColor="teal"/>
     <Circle bgColor="tomato" borderColor="teal" text="AAA"/>
   </div>
  );
}

export default App;
