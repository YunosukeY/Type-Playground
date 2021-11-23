import { OnlyObject } from './only';

type Keys<T> = T extends T ? keyof T : never;

type Inner<T> = NonNullable<T[keyof T]>;
type InnerObject<T> = T extends T ? OnlyObject<Inner<T>> : never;
type InnerObjectKey<T> = Keys<InnerObject<T>>;
