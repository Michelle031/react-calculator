import './App.css';
import styled, { ThemeProvider } from "styled-components";
import { themes } from "./Theme";
import { useReducer, useState } from 'react';
import Slider from "./Slider";
import Button from "./Button";
import Dbutton from './Dbutton';
import Obutton from "./Obutton";


const Calculator = styled.div`
  width: 20%;
  height: auto;
  position: fixed;
  left: 40%;
  top: 5%;
  border-radius: 10px;
  background: ${(props) => props.theme.mainBg};
  padding: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

  @media screen and (max-width: 960px) {
    width: 70%;
    left: 10%;
  }
  
  `;
const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 15%;
  color: ${(props) => props.theme.color};
 `; 


const Screen = styled.div`
  width: 100%;
  height: 4.5rem;
  margin-bottom: 22px;
  div {
   width: 88%;
   border: none;
   background-color: ${(props) => props.theme.screenbg}; 
   color: ${(props) => props.theme.color}; 
   text-align: end;
   padding: 2px 15px;
 }
 .previous {
   height: 25%;
   border-radius: 8px 8px 0 0;
 }
 .now {
  height: 75%;
  border-radius: 0 0 8px 8px;
  font-size: 28px;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 1;
 }
 `;

 const Keypad = styled.div`
  background-color: ${(props) => props.theme.keypadBg};
  max-width: 100%;
  border-radius: 8px;
  height: auto;
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(4, 22%);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
 `;

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

function reducer(state, {type, payload}){
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand ==="0") return state
      if (state.overwrite) return {
        ...state,
        currentOperand: payload.digit,
        overwrite: false
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null) {
          return state
      }
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
        overwrite: true
      }
    case ACTIONS.CHOOSE_OPERATION: 
      if(state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if(state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.DELETE_DIGIT: 
      if(state.overwrite){
        return{
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1) {
        return {
          ...state, 
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    default:
      break;
  }
}

function evaluate({ currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return ""
  let result = "";
  switch (operation) {
    case "+":
      result = prev + current
      break;
    case "-":
      result = prev - current
      break;
    case "*":
      result = prev * current
      break;
    case "/":
      result = prev / current
      break;
    default:
      break;
  }
  return result.toString()
}


function App() {
  const [theme, setTheme] = useState("first");
  const [{ currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
  
  

  return (
    <ThemeProvider theme={themes[theme]}>
      <Calculator>
        <Nav>
          <h1>calc</h1>
          <Slider theme={theme} setTheme={setTheme}/>
        </Nav>
        <Screen>
           <div className='previous'>{previousOperand} {operation}</div>
           <div className='now'>{currentOperand}</div>
        </Screen>
        <Keypad>
          <Button><Dbutton digit="7" dispatch={dispatch}/></Button>
          <Button><Dbutton digit="8" dispatch={dispatch}/></Button>
          <Button><Dbutton digit="9" dispatch={dispatch}/></Button>
          <Button nature="del"><div onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</div></Button>
          <Button><Dbutton digit="4" dispatch={dispatch}/></Button>
          <Button><Dbutton digit="5" dispatch={dispatch}/></Button>
          <Button><Dbutton digit="6" dispatch={dispatch}/></Button>
          <Button><Obutton operation="+" dispatch={dispatch}/></Button>
          <Button><Dbutton digit="1" dispatch={dispatch}/></Button>
          <Button><Dbutton digit="2" dispatch={dispatch}/></Button>
          <Button><Dbutton digit="3" dispatch={dispatch}/></Button>
          <Button><Obutton operation="-" dispatch={dispatch}/></Button>
          <Button><Obutton operation="." dispatch={dispatch}/></Button>
          <Button><Dbutton digit="0" dispatch={dispatch}/></Button>
          <Button><Obutton operation="/" dispatch={dispatch}/></Button>
          <Button><Obutton operation="*" dispatch={dispatch}/></Button>
          <Button nature="reset"><div onClick={() => dispatch({type: ACTIONS.CLEAR})}>RESET</div></Button>
          <Button nature="equal"><div onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</div></Button>
        </Keypad>
      </Calculator>
    </ThemeProvider>
  );
}

export default App;
