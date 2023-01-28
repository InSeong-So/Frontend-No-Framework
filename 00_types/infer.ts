// promise
type PromiseResType<T> = T extends Promise<infer R> ? R : T;

//
async function strPromise(): Promise<string> {
  return 'string promise';
}

interface Person {
  name: string;
  age: number;
}

async function personPromise(): Promise<Person> {
  return { name: 'p', age: 12 };
}

type StrPromise = ReturnType<typeof strPromise>; // Promise<string>
//
type StrPromiseRes = PromiseResType<StrPromise>; // str

type PersonPromise = ReturnType<typeof personPromise>; // Promise<Person>
//
type PersonPromiseRes = PromiseResType<PersonPromise>; // Person

//=========
type Fn<A extends unknown[]> = (...args: A) => unknown;
type FnArgs<T> = T extends Fn<infer A> ? A : unknown;

function strFn(name: string) {
  //
}

type StrFn = FnArgs<typeof strFn>; // [string]

//=========
type ElementOf<T> = T extends Array<infer E> ? E : never;

type ATuple = [string, number];

type ToUnion = ElementOf<ATuple>; // string | number

//=========
//
type CustomConstructorParameters<T extends new (...args: any[]) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never;

//
type CustomInstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any;

class TestClass {
  constructor(public name: string, public string: number) {}
}

type Params = CustomConstructorParameters<typeof TestClass>; // [string, numbder]

type Instance = CustomInstanceType<typeof TestClass>; // TestClass
