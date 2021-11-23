import { Paths } from './path';
import { assertSame } from './typeAssertion';

it('Path', () => {
  type Test = {
    a?: { b?: { c?: string } };
    d: { e: string };
    f: string;
  };
  type Actual = Paths<Test>;
  type Expected = 'a' | 'a.b' | 'a.b.c' | 'd' | 'd.e' | 'f';

  assertSame<Expected, Actual>(true);
});
