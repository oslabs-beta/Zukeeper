import React from "react";
import { actionProps } from "../../types/types";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import "../styles/Action.scss";

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

  const stateChangeHandler = (bool: boolean): void => {
    setActionIndex(props.idx);
    setCurrState(props.idx);
    setPrevState(props.idx - 1);
    setTimeTravel(bool);
    setHighlightTime(bool, props.idx, props.length);
  };

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
          highlightTime[0] === props.idx ? "action-small-button-color " : ""
        }`}
        onClick={() => stateChangeHandler(true)}
      >
        Jump
      </button>
    </div>
  );
};
