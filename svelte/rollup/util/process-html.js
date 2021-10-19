import {walk} from 'svelte/compiler';
import processAcState from './process-ac-state';
import processAcAttrs from './process-ac-attrs';
import processAcId from './process-ac-id';
import processClass from './process-class';
import UniqueId from './unique-id';
import merge from './merge-class';

export default function processHtml(root, magicContent, prefix, identifier) {
    const configs = {};
    const elementPath = [];
    const acPath = [];
    const uid = new UniqueId({prefix});
    // const existProps = {};
    walk(root, {
        enter(node, parent, prop, index) {
            if (node.type === 'Element') {
                elementPath.push(node.name);
            }
            if (node.type !== 'Element' || !node.attributes) {
                return;
            }
            /** <span ac-props={data}>  propsNames=["data"] */
            let state = processAcState(node, magicContent, prefix);

            /** <span ac-default="ddd dd" ac-hover="hh">  props={default: {...}, hover: ...} */
            const props = processAcAttrs(node, magicContent, prefix);
            if (!state && Object.keys(props).length === 0) {
                return;
            }
            let id = processAcId(node, magicContent, prefix);
            if (!id) id = '_' + uid.get(acPath);
            elementPath[elementPath.length-1] = elementPath[elementPath.length-1] + '.' + id;
            acPath.push(id);
            /** <span class="ddd dd {c}">  baseClasses="ddd d"  + <span class="{c}"></span> */
            const cssrs = processClass(node, magicContent);
            
            /** <span ac-import="aconf.dd"> imp = "dd" */
            // const imp = processAcImport(node, magicContent, prefix);
            configs[node.start] = {
                name: node.name,
                id,
                state,
                props,
                insert: node.attributes[0].start,
                classes: merge([cssrs.baseClasses , cssrs.classes]),
                end: node.end,
                elementPath: [...elementPath],
                acPath: [...acPath],
            };
            
            // propsNames.forEach(name => {
            //     if (existProps[name]) {
            //         console.warn(`[atomic-classes] bind ac-props {${name}} to more than one dom`);
            //     }
            //     existProps[name] = true;
            // });
        },
        leave(node, parent, prop, index) {
            if (node.type === 'Element') {
                const p = elementPath.pop();
                if (p.indexOf('.')) acPath.pop();
            }
        },
    });
    if (Object.keys(configs).length === 0) return undefined;
    return configs;
}
