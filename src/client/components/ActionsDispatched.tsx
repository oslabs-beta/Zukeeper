import React from 'react';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';

export const ActionsDispatched = () => {
  const { actionsDispatched }  = useStore(useExtensionStore);
 
  const actions = actionsDispatched.map((el, idx) => {
    return <li key={idx}>{el}</li>
  });

  return(
    <div id="actions-dispatched-container">
      <h2 id="action-header">Actions Dispatched</h2>
      <div id="action-list">
        <ul>
          {actions}
        </ul>
      </div>
    </div>
  );
};
