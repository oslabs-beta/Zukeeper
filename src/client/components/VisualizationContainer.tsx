import React, { lazy, Suspense } from "react";
import { VisualizationSelector } from "./VisualizationSelector";
import { StateDisplay } from "./StateDisplay";
import useExtensionStore from "../store/useExtensionStore";
import { useStore } from "zustand";
import "../styles/VisualizationContainer.scss";

const DiffDisplay = lazy(() => import("./DiffDisplay"));
const TreeDisplay = lazy(() => import("./TreeDisplay"));

export const VisualizationContainer = (): JSX.Element => {
  const { 
    displayState, 
    displayDiff,
  } = useStore(useExtensionStore);
  return (
    <>
      <section id="visualization-container">
        <VisualizationSelector />
        <Suspense>
          <section id="display-space">
            {displayState ? (
              <StateDisplay />
            ) : displayDiff ? (
              <DiffDisplay />
            ) : (
              <TreeDisplay />
            )}
          </section>
        </Suspense>
      </section>
    </>
  );
};
