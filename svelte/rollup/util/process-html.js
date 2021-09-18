import { walk } from 'svelte/compiler';
import processAcProps from './process-ac-props';
import processAcAttrs from './process-ac-attrs';
import processClass from './process-class';

export default function processHtml(root, magicContent, prefix) {
    const configs = {};
    walk(root, {
        enter(node, parent, prop, index) {
            if (node.type !== 'Element' || !node.attributes) return;
    
            /** <span ac-props={data}>  propsNames=["data"]*/
            let propsNames = processAcProps(node, magicContent, prefix);
           
            if (!propsNames) return;

            /** <span ac-default="ddd dd" ac-hover-ol="hh">  props={default: {...}, hover: ...} */
            const props = processAcAttrs(node, magicContent, prefix);

            /** <span class="ddd dd {c}">  baseClasses="ddd d"  + <span class="{c}"></span> */
            const baseClasses = processClass(node, magicContent);
            if (baseClasses) props['base'] = { classes: baseClasses };

            propsNames.forEach(name => {
                if (configs[name]) {
                    console.warn(`[atomic-classes] bind ac-props {${name}} to more than one dom`);
                }
                configs[name] = props;
            });
        },
        leave(node, parent, prop, index) {}
    });
    return configs;
}
