import React from "react";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import { Action } from "./Action";
import "../styles/ActionsDispatched.scss";

export const ActionsDispatched = (): JSX.Element => {
  const { actionsDispatched, filter, setFilter } = useStore(useExtensionStore);

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
    <div className="actions-container">
      <input
        className="actions-input"
        type="text"
        placeholder="filter actions..."
        autoFocus
        onChange={inputHandler}
      />
      <div className="actions-list">{actions}</div>
    </div>
  );
};
