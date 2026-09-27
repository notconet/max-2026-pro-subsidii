import type { Context } from "@maxhub/max-bot-api";
import type { Update } from "@maxhub/max-bot-api/types";
import { helloKeyboard } from "./keyboards.js";

export async function sendHelloMessage(ctx: Context<Update>) {
    let full_name;

    if (ctx.user) {
        const first_name = ctx.user.first_name;
        const last_name = ctx.user.last_name;
        full_name = first_name + " " + last_name;
    } else {
        full_name = "Пользователь";
    }

    ctx.reply(`Привет тебе, ${full_name}!`, {
        attachments: [helloKeyboard]
    });
}

export async function sendHelpMessage(ctx: Context<Update>) {
    ctx.reply("Сообщение помощь!");
}

export async function sendRemindMessage(ctx: Context<Update>) {
    ctx.reply("Сообщение напоминание!");
}
