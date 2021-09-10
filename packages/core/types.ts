import type { Status } from './status';
export interface Observer<T> {
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
}
  

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export type SubscriptionObserver<T> = Partial<Observer<T>>;