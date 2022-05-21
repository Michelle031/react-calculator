import React from 'react';
import { ACTIONS } from './App';

function Dbutton({ dispatch, operation}) {
  return (
    <div onClick={() => 
        dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation} })
    } style={{width: "100%", padding: "10px"}}>{operation}</div>
  )
}

export default Dbutton