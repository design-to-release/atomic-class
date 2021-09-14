import { initEditor } from './editor.mjs';

const lang = location.search.match(/lang=(\w+)/);
let target;
const loading = document.querySelector('.loading');
if (lang) {
    target = lang[1];
    document.querySelector(`.${target}`).classList.add('active');
    loading.style.display = 'block';
    import('@atomic-class/core').then(() => { success(1);
    import('@atomic-class/process').then(() => { success(2);
    import('@atomic-class/action').then(() => { success(3);
    

        import('@codemirror/basic-setup').then(() => { success(4);
        import('@codemirror/state').then(() => { success(5);
        import('@codemirror/lang-javascript').then(() => { success(6);
        import('@codemirror/view').then(() => { success(7);

            import(`./${target}/entry.mjs`).then(module => {
                log(`<sug>Demo has been loaded successfully!</sug>`);
                loading.style.display = 'none';
                const script = module.script || 'console.log("Hello, World!");'
                initEditor(script, function(code) {
                    exec(code);
                });
                exec(script, true);
            }).catch(demoHandler);
            
        }).catch(cdnHandler);
        }).catch(cdnHandler);;
        }).catch(cdnHandler);;
        }).catch(cdnHandler);;

    }).catch(actionHandler);
    }).catch(processHandler);
    }).catch(coreHandler);
} else {
    location.href = './?lang=svelte';
}

function exec(code, first) {
    if (document.getElementById('runner')) document.getElementById('runner').remove();
    document.querySelector('.root').innerHTML = '';
    const runner = document.createElement('script');
    runner.type = 'module';
    runner.innerHTML = `
        const root = document.querySelector('.root');
        ${code};; ${first ? '' : 'window.__end();'}
    `;
    runner.id = 'runner';
    window.onerror = execHandler;
    window.__end = function() { log ("<sug>Demo has been updated successfully!</sug>");};
    document.body.appendChild(runner);
}

function success(index) {
    const text = [
        '@atomic-class/core',
        '@atomic-class/process',
        '@atomic-class/action',
        '@codemirror/basic-setup',
        '@codemirror/state',
        '@codemirror/lang-javascript',
        '@codemirror/view',
        `./${target}/main.mjs`
    ];
    log(`<div>[${index + 1}/${text.length}] ${text[index]} has been loaded successfully...</div><div>${text[index]} is loading now...</div>`);
}
function log(msg) {
    document.querySelector('.console').innerHTML = msg;
}

function coreHandler(err) {
    log(`<div><error>${err}</error></div><div>Build Core Please: <sug>cd ../packages/core && pnpm install && pnpm run build && cd ../../${target}</sug></div>`);
}
function processHandler(err) {
    log(`<div><error>${err}</error></div><div>Build Process Please: <sug>cd ../packages/process && pnpm install && pnpm run build && cd ../../${target}</sug></div>`);
}
function actionHandler(err) {
    log(`<div><error>${err}</error></div><div>Build Action Please: <sug>cd ../packages/action && pnpm install && pnpm run build && cd ../../${target}</sug></div>`);
}
function polyfillHandler(err) {
    log(`<div><error>${err}</error></div><div>Unpack ES module error, <sug>please check your network or proxy, then retry again.</sug></div>`);
}
function cdnHandler(err) {
    log(`<div><error>${err}</error></div><div>Unpack ES module error, <sug>please check your network or proxy, then retry again.</sug></div>`);
}
function demoHandler(err) {
    console.log(err);
    log(`<div><error>${err}</error></div><div>Load module fail: <sug>please make sure /${target}/ has been compiled!</sug></div>`);
}
function execHandler(err){
    log(`<div><error>${err}</error></div>`);
}

document.querySelectorAll('a.disabled').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    });
});