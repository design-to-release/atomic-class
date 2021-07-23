interface ClassState {
    [index: string]: string[];
}

type SubscribeFunction = (classSheet: string, state: string) => void;

class ClassBuilder {
    private states: ClassState = {};
    private currentState: string = 'default';
    private subscribeFunction: SubscribeFunction;
    private root: HTMLElement;
    private token: string;
    constructor(root: HTMLElement) {
        this.root = root;
    }
    resetNode(root: HTMLElement){this.root = root;}
    resetToken(token: string){this.token = token;}
    matchNode(dom: HTMLElement) {
        return this.root === dom || (this.token && dom.getAttribute('rctoken') == this.token);
    }
    matchToken(token: string) {
        return this.token === token || (this.root && this.root.getAttribute('rctoken') == token);
    }
    setStates(states: ClassState, override: boolean = true) {
        if(Object.keys(this.states).length > 0 && override == false) return;
        this.states = states;
    }
    setState(state: string) {
        this.currentState = state;
        this.update();
    }
    update() {
        const sheet = this.states[this.currentState] || [];
        this.subscribeFunction && this.subscribeFunction(sheet.join(' '), this.currentState);
    }
    subscribe(subscribeFunction: SubscribeFunction, override: boolean = true) {
        if (override === false && this.subscribeFunction) return;
        this.subscribeFunction = subscribeFunction;
    }
}
function setState(node:HTMLElement | string, state?: string) {
    if (typeof node === 'string') {
        setStateWithToken(node as string, state);
    } else {
        setStateWithNode(node as HTMLElement, state);
    }
}

let builders: ClassBuilder[] = [];

function setStateWithToken(token: string, state: string) {
    builders.filter(builder => builder.matchToken(token)).forEach(builder => builder.setState(state));
}

function setStateWithNode(node: HTMLElement, state: string) {
    builders.filter(builder => builder.matchNode(node)).forEach(builder => builder.setState(state));
}

export function registNode(node: HTMLElement, states: ClassState = {}){
    let b: ClassBuilder = builders.filter(builder => builder.matchNode(node))[0];
    if (!b) {
        b = new ClassBuilder(node);
        builders.push(b);
    } else {
        b.resetNode(node);
    }
    b.setStates(states, false);
    return b;
}
export function registToken(token: string, states: ClassState = {}){
    let b: ClassBuilder = builders.filter(builder => builder.matchToken(token))[0];
    if (!b) {
        b = new ClassBuilder(null);
        b.resetToken(token);
        builders.push(b);
    }
    b.setStates(states, false);
    return b;
}

export function unregistNode(node: HTMLElement) {
    builders = builders.filter(builder => {return !builder.matchNode(node)});
}

export function rc(states: ClassState, bind: SubscribeFunction, tokenId: string) {
    // if(tokenId) registToken(tokenId, states).subscribe(bind);
    return function(node: HTMLElement) {
        registNode(node, states).subscribe(bind);
        return {
            destroy() {
                unregistNode(node);
            }
        }
    }
}

export function stateHandler(...states: string[]) {
    return function(event: Event | object) {
        if (event.toString().indexOf('Event') > -1)  {
            states.forEach(state => {
                setStateWithNode((event as Event).target as HTMLElement, state);
            });
        } else {
            builders.filter(builder => builder.matchNode(event as HTMLElement)).forEach(builder => {
                states.forEach(state => {
                    builder.setState(state);
                });
            });
        }
    }
}
export function of(node: HTMLElement) {
    return 
}



import {getContext, setContext} from 'svelte';

export function entityId(): string[] {
    return getContext('_entity_id');
}
function initEntityContext(props: any){
    if (props.entityId) {
        let eid: string = getContext('_entity_id') || '';
        eid += (eid? ' ': '') + props.entityId;
        setContext('_entity_id', eid);
    }
}

export const iec = initEntityContext;;


interface Conf {
    [index: string]: any;
}

export function conf(cuid: string) {
    const eid = entityId();
    const conf = getContext('rcconf') as Conf;
    const cc = (conf && conf[cuid]) as any;
    if (cc) {
        const rs = cc.filter((c: any) => c.entity === eid);
        console.log(rs);
        if (rs.length) return rs[0];
    }
    return {};
}