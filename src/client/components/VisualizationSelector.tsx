import React from 'react';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';

export const VisualizationSelector = () => {
  const { showState, showTree, showDiff } = useStore(useExtensionStore);

  return (
    <div id="buttons-container">
      <button id="display-button" onClick={showState}>STATE</button>
      <button id="display-button" onClick={showDiff}>DIFF</button>
      <button id="display-button" onClick={showTree}>TREE</button>
    </div>
  );
};
