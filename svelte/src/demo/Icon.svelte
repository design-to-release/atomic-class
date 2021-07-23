<script>
    import { entityId, stateHandler } from '../lib/index';
    let eid = entityId();

    function ui(node) {
        const h = stateHandler("hover"), d = stateHandler("default");
        node.addEventListener('mouseenter', h);
        node.addEventListener('mouseleave', d);
		return {
			destroy() {
                node.removeEventListener('mouseenter', h);
                node.removeEventListener('mouseleave', d);
            }
		};
	}

    /** 生成代码 演示*/
    import { conf } from '../lib/index';
    const cuid = 'CONTENT';
    __rc_0 = conf(cuid)[0].default;
    /** 生成代码结束*/
</script>
<div use:ui class="ss" rc-default="bg-gray" rc-hover="bg-red" rc-active="bg-blue">
    Entity Scope: {eid}
</div>