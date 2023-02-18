import React from 'react';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
const diff = require('deep-diff').diff;
import { DiffItem } from './DiffItem';
import { diffProps } from '../../types/types';
import './DiffDisplay.scss';

export const DiffDisplay = () => {
  const { previousStates, currState, prevState} = useStore(useExtensionStore);
  console.log('currState', currState);
  console.log('prevState', prevState);


  if (Object.keys(currState).length > 0 && Object.keys(prevState).length > 0){
    const differences: any[] = diff(
      prevState,
      currState,
    );

    const diffItems: JSX.Element[] = differences.map((obj: diffProps, idx: number) => {
      return <DiffItem key={idx} obj={obj} action={true}></DiffItem>;
    });

    return <div className="diff-item-container">{diffItems}</div>;
  }

  else if (previousStates[previousStates.length - 2]) {
    const differences1: any[] = diff(
      previousStates[previousStates.length - 2],
      previousStates[previousStates.length - 1]
    );

    const diffItems: JSX.Element[] = differences1.map((obj: diffProps, idx: number) => {
      return <DiffItem key={idx} obj={obj} action={false}></DiffItem>;
    });

    return <div className="diff-item-container">{diffItems}</div>;
  } 
  else return null;
};
