import { OnlyString } from './only';

type Concat<T extends string, U extends string> = `${T}.${U}`;

// キーKと再帰的な結果を結合する
type Recursive<T, K extends keyof T> = Concat<OnlyString<K>, Paths<T[K]>>;

// 各Kに対して再帰的に計算する
type ForEachKey<T, K extends keyof T> = K extends K ? Recursive<T, K> : never;

/**
 * Tのプロパティのパスをliteralのunionとして列挙する
 */
export type Paths<T> = T extends object ? OnlyString<keyof T> | ForEachKey<T, keyof T> : never;
