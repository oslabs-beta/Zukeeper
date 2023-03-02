import React, { useRef, useEffect } from "react";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import { Action } from "./Action";
import "../styles/ActionsDispatched.scss";

export const ActionsDispatched = (): JSX.Element => {
  const {
    actionsDispatched,
    filter,
    setFilter,
    setReset,
    actionIndex,
    setActionIndex,
    setCurrState,
    setPrevState,
  } = useStore(useExtensionStore);

  // resetHandler sets reset to true which triggers a useEffect hook in App.tsx resetting the state of devtools and Zustand app
  const resetHandler = () => {
    setReset(true);
  };

  // selects previous action updating the state,diff, and tree tabs
  const previousHandler = () => {
    if (actionIndex !== null && actionIndex > 0) {
      setCurrState(actionIndex - 1);
      setPrevState(actionIndex - 2);
      setActionIndex(actionIndex - 1);
    }
  };

  // selects next action updating the state,diff, and tree tabs
  const nextHandler = () => {
    if (actionIndex !== null && actionIndex < actionsDispatched.length - 1) {
      setCurrState(actionIndex + 1);
      setPrevState(actionIndex);
      setActionIndex(actionIndex + 1);
    }
  };

  // creating a Ref to the 'actions-list' componenet
  const currentStateContainer = useRef<HTMLDivElement>(null);

  // useEffect hook to pin scrollbar of the list items to the bottom based on 'actionsDispatched' state
  useEffect((): void => {
    const stateContainer: HTMLDivElement | null = currentStateContainer.current;
    if (stateContainer) stateContainer.scrollTop = stateContainer.scrollHeight;
  }, [actionsDispatched]);

  // filter input handler
  const inputHandler = (event: any): void => {
    setFilter(event.target.value);
  };

  // filters Action componenets and pushes them to new array for rendering
  const actions: JSX.Element[] = actionsDispatched
    .filter((action: string) => {
      return action.toLowerCase().startsWith(filter.toLowerCase());
    })
    .map((el, idx) => {
      return (
        <Action
          key={idx + el}
          action={el}
          idx={idx}
          length={actionsDispatched.length}
        />
      );
    });

  return (
    <section className="actions-container">
      <div className="actions-buttons">
        <button onClick={resetHandler} className="reset-button">
          Reset
        </button>
        <div className="action-move-container">
          <button onClick={previousHandler} className="action-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-counterclockwise arrow-svg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </svg>
          </button>
          <button onClick={nextHandler} className="action-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise arrow-svg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </button>
        </div>
      </div>
      <input
        className="actions-input"
        type="text"
        placeholder="filter actions..."
        autoFocus
        onChange={inputHandler}
      />
      <section className="actions-list" ref={currentStateContainer}>
        {actions}
      </section>
    </section>
  );
};
