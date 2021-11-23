import { RequirePath } from './required';
import { assertSame } from './typeAssertion';

it('RequirePath', () => {
  type T = { a?: { b: { c?: { d?: string } } } };
  type Actual = RequirePath<T, 'a.b.c'> & RequirePath<T, 'a.b.c.d'>;
  type Expected = { a?: { b: { c: { d: string } } } };
  assertSame<Expected, Actual>(true);
});
