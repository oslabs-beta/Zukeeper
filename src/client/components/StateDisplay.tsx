import React from 'react';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
import './StateDisplay.scss';


export const StateDisplay = () => {
  // grabbing all previous states from our store
  const { previousStates } = useStore(useExtensionStore);

  // determine if there is an non-undefined value for the current state - which should be the last element of the array
  // if yes, grab that value, if no, return an empty array
  const currState: any = (previousStates[previousStates.length - 1] ? previousStates[previousStates.length - 1] : [])
  const currStateArr: JSX.Element[] = [];

  // helper function to produce an array of JSX elements containing current state properties and their values
  const currStateDisplay = (currState: any): JSX.Element[] => {
    const currStateProperties: string[] = Object.keys(currState);

    for (let i: number = 0; i < currStateProperties.length; i += 1) {
      let value: string = JSON.stringify(currState[currStateProperties[i]]);
      value = value.replaceAll(/,/g, ', ').replaceAll(/:/g, ': ');
      currStateArr.push(<p className="current-state-values" key={i}>{currStateProperties[i]}: {value}</p>)
    }

    return currStateArr;
  };

  // invoke our helper function and save results into a constant to be rendered below
  const currStateDisplayResult: JSX.Element[] = currStateDisplay(currState);

  return (
    <>
      <div className="current-state-container">
        {currStateDisplayResult}
      </div>
    </>
  );
};
