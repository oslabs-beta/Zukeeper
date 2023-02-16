import React from 'react';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
import { Action } from './Action'
import './ActionsDispatched.scss'

export const ActionsDispatched = () => {
  const { actionsDispatched }  = useStore(useExtensionStore);
 
  const actions = actionsDispatched.map((el, idx) => {
    return <Action key={idx} action={el}/>
  });

  return(
    <div className="actions-container">
      <input className="actions-input" type="text" placeholder='filter actions...' autoFocus/>
      <div className="actions-list">
        {actions}
      </div>
    </div>
  );
};
