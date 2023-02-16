import React from 'react';
import { VisualizationSelector } from './VisualizationSelector';
import { StateDisplay } from './StateDisplay';
import { TreeDisplay } from './TreeDisplay';
import { DiffDisplay } from './DiffDisplay';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
import './VisualizationContainer.scss'

export const VisualizationContainer = () => {
  const { displayState, displayDiff } = useStore(useExtensionStore);

  return (
    <>
      <div id="visualization-container">
        <VisualizationSelector />
        <div id="display-space">
          {
          displayState ? <StateDisplay /> : 
          displayDiff ? <DiffDisplay/> : <TreeDisplay />
          }
        </div>
      </div>
    </>
  );
}