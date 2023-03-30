import React from "react";
import { actionProps } from "./types";
import useExtensionStore from "../../store/useExtensionStore";
import { useStore } from "zustand";
import "./Action.scss";

export const Action = (props: actionProps): JSX.Element => {
  const {
    setActionIndex,
    actionIndex,
    setCurrState,
    setPrevState,
    setTimeTravel,
    highlightTime,
    setHighlightTime,
  } = useStore(useExtensionStore);

  /* 
    stateChangeHandler triggered with action button click
    if time travel button clicked, bool is passed in as true, else false
  */
  const stateChangeHandler = (bool: boolean): void => {
    setActionIndex(props.idx);
    setCurrState(props.idx);
    setPrevState(props.idx - 1);
    setTimeTravel(bool);
    setHighlightTime(bool, props.idx, props.length);
  };

  // renders action buttons and handles conditional rendering of styling
  return (
    <div className="action-button-container">
      <button
        className={`action-large-button ${
          actionIndex === props.idx && highlightTime[0] !== props.idx
            ? "action-large-button-color"
            : ""
        } ${
          highlightTime[0] === props.idx || props.idx >= highlightTime[1]
            ? "action-large-button-color-timetravel"
            : ""
        }`}
        onClick={() => stateChangeHandler(false)}
      >
        <div className="action-text-wrapper">
          <p className="action-text">{props.action}</p>
        </div>
      </button>
      <button
        className={`action-small-button ${
          highlightTime[0] === props.idx ? "action-small-button-color" : ""
        }`}
        onClick={() => stateChangeHandler(true)}
      >
        Jump
      </button>
    </div>
  );
};
