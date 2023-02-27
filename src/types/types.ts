export interface Store {
  displayState: boolean;
  displayDiff: boolean;
  showState: () => void;
  showTree: () => void;
  showDiff: () => void;

  actionIndex: number | null;
  setActionIndex: (snapshot: number) => void;

  currState: any;
  setCurrState: (snapshot: number) => void;

  prevState: any;
  setPrevState: (snapshot: number) => void;

  filter: string;
  setFilter: (snapshot: string) => void;

  timeTravel: boolean;
  setTimeTravel: (snapshot: boolean) => void;

  highlightTime: number[];
  setHighlightTime: (bool: boolean, idx1: number, idx2: number) => void;

  isDarkMode: boolean;
  toggleDarkMode: (bool: boolean) => void;
  applyTheme: (bool: boolean) => void;
  

  initialState: string;
  setInitialState: (snapshot: string) => void;

  previousStates: string[];
  addPreviousState: (snapshot: string) => void;

  actionsDispatched: string[];
  addActionDispatched: (snapshot: string) => void;

  resetState: () => void;
}

export type diffProps = {
  obj: any;
  action: boolean;
};

export type actionProps = {
  action: string;
  idx: number;
  length: number;
};
