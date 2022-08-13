export type Ctor = new (...args: any[]) => any;
export class ServicesMap<T = any> extends Map<string, T> {}
