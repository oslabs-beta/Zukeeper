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

  initialState: {};
  setInitialState: (snapshot: {}) => void;

  previousStates: object[];
  addPreviousState: (snapshot: object) => void;

  actionsDispatched: string[];
  addActionDispatched: (snapshot: string) => void;

  resetState: () => void;

  reset: boolean;
  setReset: (bool: boolean) => void;
}

export type diffProps = {
  obj: diffItemTypes;
  action: boolean;
};

export interface diffItemTypes {
  kind: string | undefined;
  path: any;
  lhs?: string | undefined;
  rhs?: string | undefined;
  index?: number | undefined;
  item?: any;
}

export type actionProps = {
  action: string;
  idx: number;
  length: number;
};
