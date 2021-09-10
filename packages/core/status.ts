export interface StateProps {
    [index: string]: StateProp
}

export interface StateProp {
    classes: string;
    overlap: boolean;
}

 export class Status {
    constructor(
        public props: StateProps = {},
        public states: string[] = ['default']
    ) {}

    public setProps(stateProps: StateProps) {
        this.props = stateProps;
        return this;
    }

    public setStates(newStates: string[]){
        this.states = newStates;
        return this;
    }

    public setState(newState: string){
        if (this.props && this.props[newState] && this.states.indexOf(newState) === -1) {
            if (this.props[newState].overlap) {
                this.states.push(newState);
            } else {
                this.states = this.states.filter(state => this.props[state].overlap == true);
                this.states.unshift(newState);
            }
        }
        return this;
    }
    public unsetState(existedState: string) {
        if (this.props && this.props[existedState] && this.states.indexOf(existedState) > -1) {
            this.states = this.states.filter(item => item !== existedState);
            if (this.props[existedState].overlap !== true) {
                this.states.unshift('default');
            }
        }
        return this;
    }
}
