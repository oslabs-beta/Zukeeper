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