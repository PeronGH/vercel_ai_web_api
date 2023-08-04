type Func<T, R> = (params: T) => R;

type Overlap<T, U> = {
  [P in Extract<keyof T, keyof U>]: T[P];
};

export function withDefaults<
  T extends object,
  U extends Partial<T>,
  R,
>(
  fn: Func<T, R>,
  defaultParams: U,
): Func<Partial<Overlap<T, U>> & Omit<T, keyof U>, R> {
  // deno-lint-ignore no-explicit-any
  return (params: any) => fn({ ...defaultParams, ...params } as T);
}
