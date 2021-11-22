type RequiredIfKeyForNonNullableT<T, K> = K extends keyof T ? { [P in K]: NonNullable<T[K]> } : T;
type RequiredIfKeyForNullableT<T, K> = K extends keyof NonNullable<T>
  ? { [P in K]: NonNullable<NonNullable<T>[K]> } | undefined
  : T;
/**
 * KがTのkeyならKを必須にする
 * そうでなければTのまま
 */
type RequiredIfKey<T, K> = undefined extends T ? RequiredIfKeyForNullableT<T, K> : RequiredIfKeyForNonNullableT<T, K>;

// Leadのbase constraintをkeyofにしないと?が継承されない
type RecursiveForNonNullableT<T, Lead extends keyof T, Rest extends string> = {
  [P in Lead]: RequirePath<T[Lead], Rest>;
};
type RecursiveForNullableT<T, Lead extends keyof NonNullable<T>, Rest extends string> = {
  [P in Lead]: RequirePath<NonNullable<T>[Lead], Rest>;
};
// LeadがTのプロパティかチェック
type CallRecursiveForNonNullableT<T, Lead, Rest extends string> = Lead extends keyof T
  ? RecursiveForNonNullableT<T, Lead, Rest>
  : T;
type CallRecursiveForNullableT<T, Lead, Rest extends string> = Lead extends keyof NonNullable<T>
  ? RecursiveForNullableT<T, Lead, Rest>
  : T;
/**
 * Pathで指定されたTのプロパティを必須にする
 */
export type RequirePath<T, Path extends string> = Path extends `${infer Lead}.${infer Rest}`
  ? undefined extends T
    ? CallRecursiveForNullableT<T, Lead, Rest>
    : CallRecursiveForNonNullableT<T, Lead, Rest>
  : RequiredIfKey<T, Path>;

type RequireBlankRemovedPaths<T, Paths extends string> = T &
  (Paths extends `${infer Path},${infer Rest}`
    ? RequirePath<T, Path> & RequireBlankRemovedPaths<T, Rest>
    : RequirePath<T, Paths>);
/**
 * Pathsで指定されたTの複数のプロパティを必須にする
 */
export type RequirePaths<T, Paths extends string> = RequireBlankRemovedPaths<T, RemoveBlank<Paths>>;
