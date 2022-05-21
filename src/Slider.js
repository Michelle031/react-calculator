import React from 'react'
import styled from "styled-components";

const Div = styled.div`
   width: 48%;
   display: flex;
   justify-content: space-between;
   margin-bottom: 5px;
   padding-right: 5px;
   align-self: flex-end;
   align-items: center;
   font-weight: 700;
`;
const Slide = styled.div`
   width: 47%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   font-size: 13px;


  input {
      -webkit-appearance: none;
      width: 100%;
      height: 12px;
      border-radius: 10px;
      background: ${(props) => props.theme.sliderBg};
      outline: none;
      padding: 5px;
      -webkit-transition:all ease-in .2s;
      transition:all ease-in .2s;
  }
  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${(props) => props.theme.equalBg};
    cursor: pointer;
  }
  
  `;


const Slider = ({theme, setTheme}) => {
  
  const handleChange = (e) => {
      switch(e.target.value){
        case "1": 
           setTheme("first");
           break;
        case "2": 
           setTheme("second");
           break;
        case "3": 
           setTheme("third");
           break;
        default: 
           break;
      }
  }

  return (
    <Slide>
        <Div>
            <span>1</span>
            <span>2</span>
            <span>3</span>
        </Div>
        <div style={{display: "flex", alignItems: "center"}}>
         <span style={{marginRight: "10px"}}>THEME</span>
         <input type="range" min="1" max="3" className="slider" defaultValue="1" onChange={handleChange}/>
        </div>
    </Slide>
  )
}

export default Slider;