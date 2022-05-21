declare module 'utils' {
  // 첫 번째 배열의 원소 타입 가져오기
  export type ArrayHeaderType<T extends unknown[]> = T extends [] ? never : T[0];

  // 튜플 타입의 길이 가져오기
  export type TupleLength<T extends readonly unknown[]> = T['length'];

  // Promise Await 타입 선언
  export type AwaitedType<T extends Promise<unknown>> = T extends Promise<infer V>
    ? V extends Promise<unknown>
      ? AwaitedType<V>
      : V
    : never;

  // If 적용하기
  export type IfType<E extends boolean, L, R> = E extends true ? L : R;

  // 배열 타입 concat 하기
  export type ConcatArrayType<T extends unknown[], U extends unknown[]> = [...T, ...U];

  // 배열 타입 push 하기
  export type PushArrayType<T extends unknown[], U> = [...T, U];

  // 배열 타입 pop 하기
  export type PopArrayType<T extends unknown[]> = T extends [...infer L, infer R] ? L : never;
}
