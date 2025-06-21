import { Commands, Frequency, Options, TOption } from '../types/index';
import { HabitService } from '../services/index';

class HabitController {
  private supportedCommands: Commands[] = Object.values(Commands);

  private supportedOptions: {
    [key in Commands]: TOption[];
  } = {
    [Commands.ADD]: [
      { isRequired: true, valueRequired: true, option: Options.NAME },
      {
        isRequired: false,
        valueRequired: true,
        option: Options.DESC,
      },
      {
        valueRequired: true,
        option: Options.FREQ,
      },
    ],
    [Commands.DELETE]: [
      { isRequired: true, valueRequired: true, option: Options.ID },
    ],
    [Commands.DONE]: [
      { isRequired: true, valueRequired: true, option: Options.ID },
    ],
    [Commands.LIST]: [],
    [Commands.STATS]: [
      { isRequired: true, valueRequired: true, option: Options.PERIOD },
    ],
    [Commands.UPDATE]: [
      { isRequired: true, valueRequired: true, option: Options.ID },
      { valueRequired: false, option: Options.NAME },
      { valueRequired: false, option: Options.DESC },
      { valueRequired: false, option: Options.FREQ },
    ],
  };

  public run = (args: string[]) => {
    const { command, options } = this.getCommandAndOptions(args);

    const parsedOptions = this.parseOptions(options);
    const isValidateOptions = this.getIsValidateOptions(command, parsedOptions);
    if (!isValidateOptions) {
      return false;
    }
    switch (command) {
      case Commands.ADD:
        HabitService.addHabit(
          parsedOptions.name,
          parsedOptions.desc,
          parsedOptions.freq as Frequency
        );
        break;
      case Commands.DELETE:
        HabitService.deleteHabit(Number(parsedOptions.id));
        break;
      case Commands.DONE:
        HabitService.markHabitAsCompleted(Number(parsedOptions.id));
        break;
      case Commands.LIST:
        HabitService.getHabitsList();
        break;
      case Commands.STATS:
        HabitService.getHabitsStats(parsedOptions.period);
        break;
      case Commands.UPDATE:
        HabitService.updateHabit(
          Number(parsedOptions.id),
          parsedOptions.name,
          parsedOptions.desc,
          parsedOptions.freq as Frequency
        );
        break;
      default:
        console.log('Команда не підтримується');
        break;
    }
  };

  public getIsValidateCommand = (command: Commands) => {
    if (!this.supportedCommands.includes(command)) {
      console.log(`Команда ${command} не підтримується`);
      return false;
    }
    return true;
  };

  private getIsValidateOptions = (
    command: Commands,
    options: Record<string, string | undefined>
  ) => {
    const supportedOptions = this.supportedOptions[command];
    const isRequiredOptionsName = supportedOptions
      .filter((option) => option.isRequired)
      .map((option) => option.option);
    const passedOptionsName = Object.keys(options);

    const diff = isRequiredOptionsName.filter(
      (requiredOption) => !passedOptionsName.includes(requiredOption)
    );

    if (diff.length > 0) {
      console.log(`Опція ${diff.join(', ')} є обов'язковою`);
      return false;
    }

    for (const option of passedOptionsName) {
      const foundOption = supportedOptions.find((opt) => opt.option === option);
      if (!foundOption) {
        console.log(`Опція ${option} не підтримується`);
        return false;
      } else if (options[option] === undefined && foundOption.valueRequired) {
        console.log(`Опція ${option} не має значення`);
        return false;
      } else if (
        option === Options.FREQ &&
        !Object.values(Frequency).includes(options[option] as Frequency)
      ) {
        console.log(`Опція ${option} має невірне значення`);
        return false;
      }
    }
    return true;
  };

  private parseOptions = (options: string) => {
    const parts = options.trim().split(/\s+/);
    const result: Record<string, string | undefined> = {};
    let key = null;

    for (let part of parts) {
      if (part.startsWith('--')) {
        key = part.slice(2);
        result[key] = undefined;
      } else if (key) {
        result[key] = part;
        key = null;
      }
    }

    return result;
  };

  private getCommandAndOptions = (value: string[]) => {
    const args = value.slice(2);
    const command = args[0] as Commands;
    const options = args.slice(1).join(' ');
    return { command, options };
  };
}

export default new HabitController();
