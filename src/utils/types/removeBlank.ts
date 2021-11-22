type RemoveBlank<T extends string> = T extends `${infer Lead} ${infer Rest}` ? RemoveBlank<`${Lead}${Rest}`> : T;
