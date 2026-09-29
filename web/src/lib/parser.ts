export interface InitChat {
    id: number;
    type: string;
}

export interface InitUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string | null;
    language_code?: string;
    photo_url?: string;
}

export interface ParsedInitData {
    ip?: string;
    startParam?: string;
    chat: InitChat;
    hash: string;
    authDate: Date;
    queryId?: string;
    user: InitUser;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseObject(
    params: URLSearchParams,
    key: string,
): Record<string, unknown> | undefined {
    const value = params.get(key);
    if (value === null) return undefined;

    try {
        const parsed: unknown = JSON.parse(value);
        return isRecord(parsed) ? parsed : undefined;
    } catch {
        return undefined;
    }
}

function isInitChat(
    value: Record<string, unknown>,
): value is Record<string, unknown> & InitChat {
    return Number.isSafeInteger(value.id) && typeof value.type === "string";
}

function isInitUser(
    value: Record<string, unknown>,
): value is Record<string, unknown> & InitUser {
    return (
        Number.isSafeInteger(value.id) &&
        typeof value.first_name === "string" &&
        (value.last_name === undefined ||
            typeof value.last_name === "string") &&
        (value.username === undefined ||
            value.username === null ||
            typeof value.username === "string") &&
        (value.language_code === undefined ||
            typeof value.language_code === "string") &&
        (value.photo_url === undefined || typeof value.photo_url === "string")
    );
}

export function parseInitData(input: unknown): ParsedInitData | undefined {
    if (typeof input !== "string" || !input.trim()) return undefined;

    const params = new URLSearchParams(
        input.startsWith("?") ? input.slice(1) : input,
    );

    const hash = params.get("hash");
    const authDateValue = params.get("auth_date");
    const authDateSeconds = Number(authDateValue);
    const chat = parseObject(params, "chat");
    const user = parseObject(params, "user");

    if (
        !hash ||
        !authDateValue ||
        !Number.isSafeInteger(authDateSeconds) ||
        !chat ||
        !isInitChat(chat) ||
        !user ||
        !isInitUser(user)
    ) {
        return undefined;
    }

    return {
        ip: params.get("ip") ?? undefined,
        startParam: params.get("start_param") ?? undefined,
        chat,
        hash,
        authDate: new Date(authDateSeconds * 1000),
        queryId: params.get("query_id") ?? undefined,
        user,
    };
}
