import { create } from 'zustand';
import { Store } from '../../types';

const useExtensionStore = create<Store>()((set) => ({
  // State and Reducer Logic for our Extension
  displayState: true,
  displayDiff: false,
  showState: () => set({
    displayState: true,
    displayDiff: false,
  }),
  showTree: () => set({
    displayState: false,
    displayDiff: false,
  }),
  showDiff: () => set({
    displayState: false,
    displayDiff: true,
  }),
 

  
  // State and Reducer Logic for the Zustand Application
  previousStates: [],
  addPreviousState: (snapshot) => 
    set((state) => ({
      previousStates: [...state.previousStates, snapshot],
  })),

  actionsDispatched: [],
  addActionDispatched: (snapshot) =>
    set((state) => ({
      actionsDispatched: [...state.actionsDispatched, snapshot],
  })),
  resetState: () =>
  set((state) => ({
    previousStates: [],
    actionsDispatched: []
})),

}));

export default useExtensionStore;
