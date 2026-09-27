import type { Context } from "@maxhub/max-bot-api";
import type { Update, User } from "@maxhub/max-bot-api/types";

export function getUserFromContext(ctx: Context<Update>): User | null {
    if (ctx.user === undefined) return null;
    else return ctx.user;
}
