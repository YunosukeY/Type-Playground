export type OnlyString<T> = T extends string ? T : never;
export type OnlyObject<T> = T extends object ? T : never;
