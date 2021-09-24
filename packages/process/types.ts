export interface StateProps {
    [index: string]: StateProp
}

export interface StateProp {
    classes: string;
}

export type State = string;