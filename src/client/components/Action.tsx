import React from 'react';
import { actionProps } from '../../types/types'
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
import './Action.scss'

export const Action = (props: actionProps) => {
  const { setActionIndex, actionIndex, setCurrState, setPrevState, currState, prevState } = useStore(useExtensionStore);

  const stateChangeHandler = () => {
    setActionIndex(props.idx)
    setCurrState(props.idx)
    setPrevState(props.idx - 1);
    console.log('current states', currState, prevState)
  }


  return(
    <div className="action-button-container">
      <button className={`action-large-button ${ actionIndex === props.idx ? 'visualization-button-color' : '' }`}  onClick={stateChangeHandler}>{props.action}</button>
      <button className="action-small-button">Jump</button>
    </div>
  );
};
