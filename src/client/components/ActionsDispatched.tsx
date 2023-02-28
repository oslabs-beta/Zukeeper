import React, { useRef, useEffect } from "react";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import { Action } from "./Action";
import "../styles/ActionsDispatched.scss";

export const ActionsDispatched = (): JSX.Element => {
  const { actionsDispatched, filter, setFilter, setReset, actionIndex, setActionIndex, setCurrState, setPrevState } = useStore(useExtensionStore);

  // creating a Ref to the 'actions-list' componenet
  const currentStateContainer = useRef<HTMLDivElement>(null);

  const resetHandler = () => {
    setReset(true);
  }

  const previousHandler = () => {
    if (actionIndex !== null && actionIndex > 0){
      setCurrState(actionIndex - 1);
      setPrevState(actionIndex- 2);
      setActionIndex(actionIndex - 1)
    }
  }
  const nextHandler = () => {
    if (actionIndex !== null && actionIndex < actionsDispatched.length - 1){
      setCurrState(actionIndex + 1);
      setPrevState(actionIndex);
      setActionIndex(actionIndex + 1)
    }
  }

  // useEffect hook to pin scrollbar of the list items to the bottom based on 'actionsDispatched' state
  useEffect((): void => {
    const stateContainer: HTMLDivElement | null = currentStateContainer.current;
    if (stateContainer) stateContainer.scrollTop = stateContainer.scrollHeight;
  }, [actionsDispatched]);

  const inputHandler = (event: any): void => {
    setFilter(event.target.value);
  };

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
       <input
        className="actions-input"
        type="text"
        placeholder="filter actions..."
        autoFocus
        onChange={inputHandler}
      />
      <div className='actions-buttons'>
        <button onClick={resetHandler}>Reset</button>
        <div className="action-move-container">
          <button onClick={previousHandler} className="action-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-backward-btn" viewBox="0 0 16 16">
            <path d="M11.21 5.093A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8.5 8.972V10.5a.5.5 0 0 1-.79.407L5 8.972V10.5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 1 0v1.528l2.71-1.935a.5.5 0 0 1 .79.407v1.528l2.71-1.935z"/>
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
          </svg>
          </button>
          <button onClick={nextHandler} className="action-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-btn" viewBox="0 0 16 16">
            <path d="M8.79 5.093A.5.5 0 0 0 8 5.5v1.886L4.79 5.093A.5.5 0 0 0 4 5.5v5a.5.5 0 0 0 .79.407L8 8.614V10.5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5Z"/>
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4Z"/>
          </svg>
          </button>
        </div>
      </div>
      
      <section
        className="actions-list"
        ref={currentStateContainer}
      >
        {actions}
      </section>
    </section>
  );
};
