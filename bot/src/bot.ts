import "dotenv/config";

import { Bot } from "@maxhub/max-bot-api";
import { exit } from "node:process";
import registerHandles from "./handles.js";

if (process.env.BOT_TOKEN === undefined) {
    console.log("No BOT_TOKEN environment variable");
    exit(1);
}

const bot = new Bot(process.env.BOT_TOKEN);

bot.api.setMyCommands([
  {
    name: 'start',
    description: 'Подобрать субсидии',
  },
  {
    name: 'help',
    description: 'Справка'
  },
  {
    name: 'remind',
    description: 'Посмотреть напоминания'
  }
]);  


registerHandles(bot);

console.log("Bot starting up...");
bot.start();
