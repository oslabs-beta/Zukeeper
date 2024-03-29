import React from "react";
import useExtensionStore from "../../store/useExtensionStore";
import { useStore } from "zustand";
import { DiffItem } from "./DiffItem";
import { diffItemTypes } from "./types";
const diff = require("deep-diff").diff;
import "./DiffDisplay.scss";

const DiffDisplay = (): null | JSX.Element => {
  const { previousStates, currState, prevState, isDarkMode } =
    useStore(useExtensionStore);

  /* 
    render conditionally based on if action button was clicked 

    if currState and prevState have properties, render array of DiffItem componenets using data
    returned from using the diff function with arguments prevState and currState.

    if currState and prevState are empty, use previousStates array to get latest state data
    to pass into the diff function. 

    else return null.
  */

  if (Object.keys(currState).length > 0 && Object.keys(prevState).length > 0) {
    const differences: diffItemTypes[] = diff(prevState, currState);

    let diffItems: JSX.Element[] = [];
    if (differences) {
      diffItems = differences.map(
        (obj: diffItemTypes, idx: number) => {
          return <DiffItem key={idx} obj={obj} action={true} />;
        }
      );
    }

    return (
      <div
        className={`diff-item-container ${
          isDarkMode ? "dark-theme" : "light-theme"
        }`}
      >
        {diffItems}
      </div>
    );
  } else if (previousStates[previousStates.length - 2]) {
    const differences: diffItemTypes[] = diff(
      previousStates[previousStates.length - 2],
      previousStates[previousStates.length - 1]
    );

    let diffItems: JSX.Element[] = [];
    if (differences) {
      diffItems = differences.map(
        (obj: diffItemTypes, idx: number) => {
          return <DiffItem key={idx} obj={obj} action={false} />;
        }
      );
    }

    return (
      <div
        className={`diff-item-container ${
          isDarkMode ? "dark-theme" : "light-theme"
        }`}
      >
        {diffItems}
      </div>
    );
  } else return null;
};

export default DiffDisplay;
