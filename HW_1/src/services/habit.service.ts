import { ENV } from '../config/index';
import { HabitsModel } from '../models/index';
import { Frequency, THabit } from '../types/index';
import {
  getLastId,
  getWeekYear,
  getYearMonth,
  toDateString,
} from '../utils/index';

const DAY = 24 * 60 * 60 * 1000;

class HabitService {
  public deleteHabit = async (habitId: number) => {
    try {
      await HabitsModel.deleteHabit(habitId);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  public getHabitsList = async () => {
    const habits = await HabitsModel.getHabitsList();
    console.table(
      habits.map((habit) => ({
        id: habit.id,
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
      }))
    );
    return habits;
  };

  public addHabit = async (
    name: string | undefined,
    description: string | undefined,
    frequency: Frequency | undefined = Frequency.DAILY
  ) => {
    if (!name) {
      throw new Error('Name is required');
    }

    const habits = await HabitsModel.getHabitsList();

    habits.push({
      id: getLastId(habits.map((habit) => habit.id)),
      name,
      description,
      completedTable: [],
      frequency,
    });

    HabitsModel.saveHabits(habits);
  };

  public markHabitAsCompleted = async (habitId: number) => {
    try {
      const habit = await HabitsModel.getHabit(habitId);
      habit.completedTable.push({
        id: getLastId(habit.completedTable.map((table) => table.id)),
        date: this.now(),
      });
      HabitsModel.updateHabit(habit);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  public updateHabit = async (
    habitId: number,
    name?: string,
    description?: string,
    frequency?: Frequency
  ) => {
    try {
      const habit = await HabitsModel.getHabit(habitId);
      habit.name = name || habit.name;
      habit.description = description || habit.description;
      habit.frequency = frequency || habit.frequency;
      await HabitsModel.updateHabit(habit);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  public getHabitsStats = async (
    period: string | number = ENV.DEFAULT_PERIOD || 7
  ) => {
    const habits = await HabitsModel.getHabitsList();

    const habitsWithStats = habits.map((habit) => ({
      name: habit.name,
      id: habit.id,
      completionPercentage: this.calculateCompletionRateMs(
        Number(period),
        habit
      ),
    }));
    console.table(habitsWithStats);
  };

  private now = () => Date.now() - +(ENV.DAY_OFFSET || 0) * DAY;

  private calculateCompletionRateMs = (n: number, habit: THabit) => {
    const now = new Date();
    const nDaysAgo = new Date();
    nDaysAgo.setDate(now.getDate() - n);
    const uniqueDays = habit.completedTable
      .map((table) => table.date)
      .filter((ts) => {
        const date = new Date(ts);
        return date >= nDaysAgo && date <= now;
      });

    if (habit.completedTable.length === 0) {
      return 0;
    }

    if (habit.frequency === Frequency.DAILY) {
      const days = new Set(uniqueDays.map(toDateString));

      return (days.size / n) * 100;
    } else if (habit.frequency === Frequency.WEEKLY) {
      const weeks = new Set(uniqueDays.map((ts) => getWeekYear(ts)));
      return (weeks.size / (n / 7)) * 100;
    } else {
      const months = new Set(uniqueDays.map((ts) => getYearMonth(ts)));
      return (months.size / (n / 30)) * 100;
    }
  };
}

export default new HabitService();
