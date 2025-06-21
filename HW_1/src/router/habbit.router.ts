import { HabitController } from '../controller/index';
import { Commands } from '../types/index';
import { getCommandName } from '../utils/index';

class HabitRouter {
  public routeHandler = (args: string[]) => {
    const command = getCommandName(args);

    if (HabitController.getIsValidateCommand(command as Commands)) {
      HabitController.run(args);
    } else {
      console.log('Команда не підтримується');
    }
  };
}

export default new HabitRouter();
