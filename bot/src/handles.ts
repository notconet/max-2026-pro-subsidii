import type { Bot } from "@maxhub/max-bot-api";
import {
    sendHelloMessage,
    sendHelpMessage,
    sendRemindMessage,
} from "./actions.js";

export default function registerHandles(bot: Bot) {
    bot.on("bot_started", sendHelloMessage);
    bot.command("start", sendHelloMessage);
    bot.command("help", sendHelpMessage);
    bot.command("remind", sendRemindMessage);
}
