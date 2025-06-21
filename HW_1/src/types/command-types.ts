export enum Commands {
  ADD = 'add',
  DELETE = 'delete',
  DONE = 'done',
  LIST = 'list',
  STATS = 'stats',
  UPDATE = 'update',
}

export enum Options {
  NAME = 'name',
  DESC = 'desc',
  FREQ = 'freq',
  ID = 'id',
  PERIOD = 'period',
}

export type TOption = {
  fullOptionName?: string;
  isRequired?: boolean;
  valueRequired?: boolean;
  option: string;
};
