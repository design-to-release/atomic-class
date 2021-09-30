import {walk} from 'svelte/compiler';
import processAcProps from './process-ac-props';
import processAcAttrs from './process-ac-attrs';
import processClass from './process-class';
import processAcImport from './process-ac-import';

export default function processHtml(root, magicContent, prefix, identifier) {
    const configs = {};
    const existProps = {};
    walk(root, {
        enter(node, parent, prop, index) {
            if (node.type !== 'Element' || !node.attributes) {
                return;
            }

            /** <span ac-props={data}>  propsNames=["data"] */
            let propsNames = processAcProps(node, magicContent, prefix);

            if (!propsNames) {
                return;
            }

            /** <span ac-default="ddd dd" ac-hover="hh">  props={default: {...}, hover: ...} */
            const props = processAcAttrs(node, magicContent, prefix);

            /** <span class="ddd dd {c}">  baseClasses="ddd d"  + <span class="{c}"></span> */
            const baseClasses = processClass(node, magicContent);
            if (baseClasses) {
                props.base = {classes: baseClasses};
            }

            /** <span ac-import="aconf.dd"> imp = "dd" */
            const imp = processAcImport(node, magicContent, prefix);
            configs[node.start] = {
                names: propsNames,
                props: props,
                import: imp,
                insert: node.attributes[0].start,
            };
            propsNames.forEach(name => {
                if (existProps[name]) {
                    console.warn(`[atomic-classes] bind ac-props {${name}} to more than one dom`);
                }
                existProps[name] = true;
            });
        },
        leave(node, parent, prop, index) {},
    });
    return configs;
}
