import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Store } from "./types";

const useExtensionStore = create<Store>()(
  persist<Store>(
    (set, get) => ({
      // logic for displaying correct tab element (state,diff,tree)
      displayState: true,
      displayDiff: false,

      showState: () => {
        set({
          displayState: true,
          displayDiff: false,
        });
      },

      showTree: () => {
        set({
          displayState: false,
          displayDiff: false,
        });
      },

      showDiff: () => {
        set({
          displayState: false,
          displayDiff: true,
        });
      },

      // actionIndex is the position of selected action in list
      actionIndex: null,
      setActionIndex: (idx) => {
        set((state) => ({
          actionIndex: idx,
        }));
      },

      // currState is the current state of the application at the selected action
      currState: {},
      setCurrState: (idx) => {
        set((state) => ({
          // idx + 1 is used because previousStates[0] is initialized with the initial state of the application
          currState: state.previousStates[idx + 1],
        }));
      },

      // prevState is the previous state of the application at the selected action
      prevState: {},
      setPrevState: (idx) => {
        set((state) => ({
          // idx + 1 is used because previousStates[0] is initialized with the initial state of the application
          prevState: state.previousStates[idx + 1],
        }));
      },

      // stores the string typed into the filter input
      filter: "",
      setFilter: (string) => {
        set((state) => ({
          filter: string,
        }));
      },

      // determines if time travel jump button was pressed
      timeTravel: false,
      setTimeTravel: (bool) => {
        set((state) => ({
          timeTravel: bool,
        }));
      },

      /* 
        highlightTime stores 2 indexes that will highlight the action buttons
        idx1 is the action that was clicked
        idx2 represents the current length of the actions list. All actions at index greater than current length will also be highlighted. 
      */
      highlightTime: [],
      setHighlightTime: (bool, idx1, idx2) => {
        if (bool) {
          set((state) => ({
            highlightTime: [idx1, idx2],
          }));
        }
      },

      // configures dark mode
      isDarkMode:
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      toggleDarkMode: () => {
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        }));
      },
      // Applies the appropriate theme on all divs based on the logic from toggleDarkMode function.

      applyTheme: (isDarkMode) => {
        const elements = document
          .getElementsByTagName("body")[0]
          .getElementsByTagName("*");
        for (let i = 0; i < elements.length; i++) {
          if (isDarkMode) {
            elements[i].classList.add("dark-theme");
            elements[i].classList.remove("light-theme");
          } else {
            elements[i].classList.add("light-theme");
            elements[i].classList.remove("dark-theme");
          }
        }
      },

      // configures initial state of application
      initialState: {},
      setInitialState: (snapshot) => {
        const state = get();
        if (Object.keys(state.initialState).length === 0) {
          set((state) => ({
            initialState: snapshot,
            previousStates: [snapshot],
          }));
        }
      },

      // adds snapshot of state to previousStates array
      previousStates: [],
      addPreviousState: (snapshot) => {
        set((state) => ({
          previousStates: [...state.previousStates, snapshot],
        }));
      },

      // adds snapshot of state to actionsDispatched array
      actionsDispatched: [],
      addActionDispatched: (snapshot) =>
        set((state) => ({
          actionsDispatched: [...state.actionsDispatched, snapshot],
        })),

      // reset all properties
      resetState: () => {
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

      // switches reset value which triggers resetState
      reset: false,
      setReset: (bool) => {
        set((state) => ({
          reset: bool,
        }));
      },
    }),
    {
      name: "zukeeper-storage", // unique name
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useExtensionStore;
