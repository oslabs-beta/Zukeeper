export interface Store {
  displayState: boolean,
  displayDiff: boolean,
  showState: () => void,
  showTree: () => void,
  showDiff: () => void,

  previousStates: string[],
  addPreviousState: (snapshot: string) => void,
  actionsDispatched: string[],
  addActionDispatched: (snapshot: string) => void,
  resetState: () => void
}

// export interface RawNodeDatum {
//   name: string;
//   attributes?: Record<string, string | number | boolean>;
//   children?: RawNodeDatum[];
// }

export type diffProps = {
  obj: any
}

export type actionProps = {
  action: string
}

