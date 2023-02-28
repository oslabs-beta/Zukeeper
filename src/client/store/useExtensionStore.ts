import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { Store } from '../../types/types';

const useExtensionStore = create<Store>()(persist<Store>((set, get) => ({
  // State and Reducer Logic for our Extension
  displayState: true,
  displayDiff: false,
  showState: () =>
    set({
      displayState: true,
      displayDiff: false,
    }),
  showTree: () =>
    set({
      displayState: false,
      displayDiff: false,
    }),
  showDiff: () =>
    set({
      displayState: false,
      displayDiff: true,
    }),

  actionIndex: null,
  setActionIndex: (idx) => {
    set((state) => ({
      actionIndex: idx,
    }));
  },

  currState: {},
  setCurrState: (idx) => {
    set((state) => ({
      currState: state.previousStates[idx + 1],
    }));
  },

  prevState: {},
  setPrevState: (idx) => {
    set((state) => ({
      prevState: state.previousStates[idx + 1],
    }));
  },

  filter: '',
  setFilter: (string) => {
    set((state) => ({
      filter: string
    }));
  },

  timeTravel: false,
  setTimeTravel: (bool) => {
    set((state) => ({
      timeTravel: bool
    }));
  },

  highlightTime: [],
  setHighlightTime: (bool, idx1, idx2) => {
    if (bool) {
      set((state) => ({
        highlightTime: [idx1, idx2]
      }));
    }
  },

  // State and Reducer Logic for the Zustand Application
  initialState: {},
  setInitialState: (snapshot) => {
    console.log('snapshot', snapshot);
    const state = get();
    if (Object.keys(state.initialState).length === 0) {
      set((state) => ({
        initialState: snapshot,
        previousStates: [snapshot],
      }));
    };
  },
  
  previousStates: [],
  addPreviousState: (snapshot) => {
    set((state) => ({
      previousStates: [...state.previousStates, snapshot],
    }));
  },

  actionsDispatched: [],
  addActionDispatched: (snapshot) =>
    set((state) => ({
      actionsDispatched: [...state.actionsDispatched, snapshot],
    })),
    
  resetState: () => {
    console.log('dsjdfsjlidjsd')
    set((state) => ({
      previousStates: [state.initialState],
      actionsDispatched: [],
      highlightTime: [],
      prevState: {},
      currState: {},
      timeTravel: false,
      actionIndex: null,
    }));
  },

  reset: false,
  setReset: (bool) => {
    set((state) => ({
      reset: bool
    }))
  },
}),
{
  name: 'zukeeper-storage', // unique name
  storage: createJSONStorage(() => sessionStorage),
}));

export default useExtensionStore;
