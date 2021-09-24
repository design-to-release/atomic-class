export interface Observer<T> {
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
}
  

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export type SubscriptionObserver<T> = Partial<Observer<T>>;

export type State = string;

export interface StateProps {
    [index: string]: StateProp
}

export interface StateProp {
    classes: string;
}
