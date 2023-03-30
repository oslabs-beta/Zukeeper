import React from "react";
import useExtensionStore from "../../store/useExtensionStore";
import { useStore } from "zustand";
import "./StateDisplay.scss";

export const StateDisplay = (): JSX.Element => {
  const { previousStates, actionIndex, isDarkMode } =
    useStore(useExtensionStore);

  let currState: any;
  /*
    assign currState to the state corresponding to the action buttons list if actionIndex is not null
    if not assign the currState to the last element of the previous states array if it exists,
    otherwise assign currState to an empty array
  */
  if (actionIndex !== null) {
    currState = previousStates[actionIndex + 1];
  } else {
    currState = previousStates[previousStates.length - 1]
      ? previousStates[previousStates.length - 1]
      : {};
  }

  const currStateArr: JSX.Element[] = [];

  // populate currStateArr array with divs encapsulating the state of each property in currState object
  for (let key in currState) {
    const value: string = JSON.stringify(currState[key])
      .replaceAll(/,/g, ", ")
      .replaceAll(/:/g, ": ");

    currStateArr.push(
      <div
        className={`current-state-item ${
          isDarkMode ? "dark-theme" : "light-theme"
        }`}
        key={key + value}
      >
        {key}: {value}
      </div>
    );
  }
  return (
    <>
      <section className="current-state-container">{currStateArr}</section>
    </>
  );
};
