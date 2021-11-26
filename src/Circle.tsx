
import styled from "styled-components"
import {useState} from 'react'


interface CircleProps {
    bgColor:string;
    borderColor? : string;   
    text? : string;
}

interface ContainerProps {
    bgColor:string;
    borderColor : string;
}

const Container = styled.div<ContainerProps>`
    box-sizing: border-box;
    width:200px;
    height: 200px;
    background-color : ${props =>props.bgColor };
    border-radius: 100px;
    border: 2px solid ${props=>props.borderColor };
`;


function Circle({bgColor, borderColor, text ="default Text"}:CircleProps) { 
    const [counter, setCounter] = useState<number | string>(0) ; 
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}</Container>
}

export default Circle;