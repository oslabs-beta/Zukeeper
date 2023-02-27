import React from "react";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import "../styles/VisualizationSelector.scss";

export const VisualizationSelector = (): JSX.Element => {
  const { showState, 
    showTree, 
    showDiff, 
    displayState, 
    displayDiff, 
  } = useStore(useExtensionStore);

  return (
    <nav className="visualization-nav">
      <div className="visualization-wrapper">
        <section className="visualization-current-button">
          <p>{displayState ? "State" : displayDiff ? "Diff" : "Tree"}</p>
        </section>
        <section className="visualization-buttons-container">
          <button
            className={`visualization-display-button ${
              displayState ? "visualization-button-color" : ""
            } `}
            onClick={showState}
          >
            State
          </button>
          <button
            className={`visualization-display-button ${
              displayDiff ? "visualization-button-color" : ""
            } `}
            onClick={showDiff}
          >
            Diff
          </button>
          <button
            className={`visualization-display-button ${
              !displayState && !displayDiff ? "visualization-button-color" : ""
            } `}
            onClick={showTree}
          >
            Tree
          </button>
        </section>
      </div>
    </nav>
  );
};
