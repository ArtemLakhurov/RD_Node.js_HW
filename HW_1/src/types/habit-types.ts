export type THabit = {
  id: number;
  name: string;
  description?: string;
  completedTable: TCompletedTable[];
  frequency: Frequency;
};

export enum Frequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export type TCompletedTable = {
  id: number;
  date: number;
};
