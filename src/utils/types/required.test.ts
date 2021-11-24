import { RequirePath } from './required';
import { Equal, Expect } from './typeAssertion';

it('RequirePath', () => {
  type T = { a?: { b: { c?: { d?: string } } } };
  type Actual = RequirePath<T, 'a.b.c' | 'a.b.c.d'>;
  type Expected = { a?: { b: { c: { d: string } } } };
  type Assert = Expect<Equal<Expected, Actual>>;
});
