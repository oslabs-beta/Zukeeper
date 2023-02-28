import React, { useRef, useEffect } from "react";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import { Action } from "./Action";
import "../styles/ActionsDispatched.scss";

export const ActionsDispatched = (): JSX.Element => {
  const { actionsDispatched, filter, setFilter } = useStore(useExtensionStore);

  // creating a Ref to the 'actions-list' componenet
  const currentStateContainer = useRef<HTMLDivElement>(null);

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
      <section
        className="actions-list"
        ref={currentStateContainer}
      >
        {actions}
      </section>
    </section>
  );
};
