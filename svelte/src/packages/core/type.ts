export interface Status {
    states: string[];
    props: StateProps; 
}

export interface StateProp {
    classes: string;
    overlap: boolean;
}
  
export interface StateProps {
    [index: string]: StateProp
}

export interface SettableStatus {
    setProps: (stateProps: StateProps) => void;
    states: () => string[];
    setStates: (states: string[]) => void; 
    setState: (newState: string) => void;
    unsetState: (existedState: string) => void;
}

export type UI<T> = (node: HTMLElement | Document, status: SettableStatus, options?: T) => {
    destroy: () => void;
}