import { Paths } from './path';
import { LastInUnion } from './union';

type RequiredIfKeyForNonNullableT<T, K> = K extends keyof T ? { [P in K]: NonNullable<T[K]> } : T;
type RequiredIfKeyForNullableT<T, K> = K extends keyof NonNullable<T>
  ? { [P in K]: NonNullable<NonNullable<T>[K]> }
  : T;
/**
 * KがTのkeyならKを必須にする
 * そうでなければTのまま
 */
type RequiredIfKey<T, K> = undefined extends T ? RequiredIfKeyForNullableT<T, K> : RequiredIfKeyForNonNullableT<T, K>;

// Leadのbase constraintをkeyofにしないと?が継承されない
type RecursiveForNonNullableT<T, Lead extends keyof T, Rest extends string> = {
  [P in Lead]: _RequirePath<T[Lead], Rest>;
};
type RecursiveForNullableT<T, Lead extends keyof NonNullable<T>, Rest extends string> = {
  [P in Lead]: _RequirePath<NonNullable<T>[Lead], Rest>;
};
// LeadがTのプロパティかチェック
type CallRecursiveForNonNullableT<T, Lead, Rest extends string> = Lead extends keyof T
  ? RecursiveForNonNullableT<T, Lead, Rest>
  : T;
type CallRecursiveForNullableT<T, Lead, Rest extends string> = Lead extends keyof NonNullable<T>
  ? RecursiveForNullableT<T, Lead, Rest>
  : T;
export type _RequirePath<T, Path extends string> = Path extends `${infer Lead}.${infer Rest}`
  ? undefined extends T
    ? CallRecursiveForNullableT<T, Lead, Rest>
    : CallRecursiveForNonNullableT<T, Lead, Rest>
  : RequiredIfKey<T, Path>;
/**
 * Pathで指定されたTのプロパティを必須にする
 */
export type RequirePath<T, Path extends Paths<T>, Last = LastInUnion<Path>> = [Path] extends [never]
  ? T
  : Last extends string
  ? _RequirePath<T, Last> & RequirePath<T, Exclude<Path, Last>>
  : never;
