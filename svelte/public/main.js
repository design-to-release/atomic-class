require.config({
    baseUrl: './build'
});
require(['bundle'], function(bundle) {
    var Button = bundle.Button;

    // const map = new Map();

    // 配置平台生成的
    // map.set('rcconf', {
    //     'CONTENT': [{
    //         entity: 'eapp', // 实体条件
    //         0: { hover: 'bg-red', default: 'bg-orange', rcid: 'ct' } // CONTENT	组件的第0槽位的dom配置，槽位顺序是编译生成的，或者rcid指定
    //     },{
    //         entity: 'eapp icon-blue',
    //         0: { hover: 'bg-red', default: 'bg-blue' },
    //     }],
    // });

    const app = new Button({
        target: document.body,
        props: {
            name: 'A',
            // entityId: 'eapp', // App根层 标注实体为eapp
        },
        // context: map // app下所有组件所有dom的样式配置一次性注入，这个配置通常是生成的
    });

});