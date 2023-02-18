export interface Store {
  displayState: boolean,
  displayDiff: boolean,
  showState: () => void,
  showTree: () => void,
  showDiff: () => void,

  actionIndex: number | null, 
  setActionIndex: (snapshot: number) => void,

  currState: any,
  setCurrState: (snapshot: number) => void,

  prevState: any,
  setPrevState: (snapshot: number) => void,

  filter: string;
  setFilter: (snapshot: string) => void,

  initialState: string,
  setInitialState: (snapshot: string) => void,

  previousStates: string[],
  addPreviousState: (snapshot: string) => void,

  actionsDispatched: string[],
  addActionDispatched: (snapshot: string) => void,
  
  resetState: () => void
}

export type diffProps = {
  obj: any
  action: boolean
}

export type actionProps = {
  action: string
  idx: number
}

