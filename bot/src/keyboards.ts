import { Keyboard } from "@maxhub/max-bot-api";


const buttonOpenApp = Keyboard.button.openApp("Подобрать субсидию", "", 0, '');

export const helloKeyboard = Keyboard.inlineKeyboard([
    [buttonOpenApp]
])