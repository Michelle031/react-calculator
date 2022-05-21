import React from 'react';
import styled from "styled-components";
import { ACTIONS } from './App';

const Buttons = styled.div`
  background-color: ${({nature, theme}) => (
    (nature === "del" && theme.delBg) ||
    (nature === "reset" && theme.delBg) ||
    (nature === "equal" && theme.equalBg) ||
    (theme.keyBg)
  )};
  text-align: center;
  font-size: ${({nature}) => (
    (nature === "del" && "15px") ||
    (nature === "reset" && "15px") ||
    (nature === "equal" && "15px") ||
    ("20px")
  )};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: ${({nature}) => (
    (nature === "reset"  && "span 2") ||
    (nature === "equal" && "span 2") 
  )};
  border-radius: 5px;
  box-shadow : 0 3px 0 ${({nature, theme}) => (
    (nature === "del" && theme.delShadow) ||
    (nature === "reset" && theme.delShadow) ||
    (nature === "equal" && theme.equalShadow) ||
    (theme.keyShadow)
  )};
  color:  ${({nature, theme}) => (
    (nature === "del" && "white") ||
    (nature === "reset" && "white") ||
    (nature === "equal" && theme.equalcolor) ||
    (theme.keycolor)
  )};
  div {
    width: 100%;
    padding: 10px;
  }
`;

const Button = ({theme,nature,children}) => {
  return (
    <Buttons nature={nature} theme={theme}  >{children}</Buttons>
    
  )
}

export default Button