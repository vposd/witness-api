export class Deferred<T> {

  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (value: any) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    Object.freeze(this);
  }
}