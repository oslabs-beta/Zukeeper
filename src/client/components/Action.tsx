import React from 'react';
import { actionProps } from '../../types/types'
import './Action.scss'

export const Action = (props: actionProps) => {
 
  return(
    <div className="action-button-container">
      <button className="action-large-button" >{props.action}</button>
      <button className="action-small-button">Jump</button>
    </div>
  );
};
