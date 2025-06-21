import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { THabit } from '../types/index';

class HabitsModel {
  private DB: string;

  constructor() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    this.DB = join(__dirname, '../..', 'database.json');
  }

  public getHabitsList = async () => {
    const data = await this.read();

    return data;
  };

  public updateHabit = async (habit: THabit) => {
    const data = await this.read();
    const index = data.findIndex((h) => h.id === habit.id);
    if (index === -1) {
      throw new Error('Habit not found');
    } else {
      data[index] = habit;
      await this.save(data);
      console.log(`Habit ${habit.id} updated`);
    }
  };

  public getHabit = async (habitId: number) => {
    const data = await this.read();
    const habit = data.find((h) => h.id === habitId);
    if (!habit) {
      throw new Error('Habit not found');
    }
    return habit;
  };

  public saveHabits = async (habits: THabit[]) => {
    await this.save(habits);
  };

  public deleteHabit = async (habitId: number) => {
    const data = await this.read();
    const index = data.findIndex((h) => h.id === habitId);
    if (index === -1) {
      throw new Error('Habit not found');
    } else {
      data.splice(index, 1);
      await this.save(data);
      console.log(`Habit ${habitId} deleted`);
    }
  };

  private save = async (data: THabit[]) => {
    await writeFile(this.DB, JSON.stringify(data, null, 2));
  };

  private read = async () => {
    const data = await readFile(this.DB, 'utf8');
    if (!data.length) return [];
    return JSON.parse(data) as THabit[];
  };
}

export default new HabitsModel();
