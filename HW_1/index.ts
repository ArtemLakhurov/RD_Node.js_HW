import { HabitRouter } from './src/router/index';
import './src/config/index';

if (process.argv.length < 3) {
  console.error('Немає команди');
} else {
  HabitRouter.routeHandler(process.argv);
}
