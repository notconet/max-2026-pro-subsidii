import type { Context } from "@maxhub/max-bot-api";
import type { Update } from "@maxhub/max-bot-api/types";

export async function sendHelloMessage(ctx: Context<Update>) {
    const message =
        "Здравствуйте! Я чат-бот ПРО Субсидии.\n" +
        "Я помогу вам в поиске субсидий для вашего бизнеса.\n" +
        "Для начала работы - откройте Мини Приложение 👇";

    ctx.reply(message);
}

export async function sendHelpMessage(ctx: Context<Update>) {
    ctx.reply("Сообщение помощь!");
}

export async function sendRemindMessage(ctx: Context<Update>) {
    ctx.reply("Сообщение напоминание!");
}
