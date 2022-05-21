import React from 'react';
import { ACTIONS } from './App';

function Dbutton({ dispatch, digit}) {
  return (
    <div onClick={() => 
        dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit} })} style={{width: "100%", padding: "10px"}}>{digit}</div>
  )
}

export default Dbutton