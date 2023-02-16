import React from 'react';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
import './VisualizationSelector.scss';

export const VisualizationSelector = () => {
  const { showState, showTree, showDiff, displayState, displayDiff } = useStore(useExtensionStore);

  return (
    <div className="visualization-wrapper">
      <div className="visualization-current-button">
        {
          displayState ? 'State': 
          displayDiff ? 'Diff' : 'Tree'
        }
      </div>
      <div className="visualization-buttons-container">
        <button className={`visualization-display-button ${ displayState ? 'visualization-button-color' : '' } `} onClick={showState}>State</button>
        <button className={`visualization-display-button ${ displayDiff ? 'visualization-button-color' : '' } `} onClick={showDiff}>Diff</button>
        <button className={`visualization-display-button ${ !displayState && !displayDiff ? 'visualization-button-color' : '' } `} onClick={showTree}>Tree</button>
      </div>
    </div>
  );
};
