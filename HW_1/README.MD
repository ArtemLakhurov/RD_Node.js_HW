# Node.js Habit Tracker CLI

### ! Need to instal dependencies

>npm i

### Supported Commands
  * add   --name "<*name*>" --desc "<*description*>" --freq <daily|weekly|monthly> — adds a habbit;
  * list — show all habits in table;
  * done  --id <*id*> — mark habit as done for today;
  * stats — --period <*period*> - show for each habit the percentage of progress for the last <*period*> days; If the period is not specified, it displays for the period specified in the .env file or for the last 7 days
  * delete --id <*id*> — delete habit;
  * update --id <*id*> --name "<*habbit name*>" --desc "<*description*>" --freq <daily|weekly|monthly> — update

### Run Examples
npx tsx index.ts add --name someName --freq monthly

npx tsx index.ts list

npx tsx index.ts delete --id 4

npx tsx index.ts done  --id 4

### .env example

* DAY_OFFSET - offset of date when habit marks ad done
* STATS_PERIOD - default period of stats
