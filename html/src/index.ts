interface Options{
    prefix?: string;
}
export function init(dom: HTMLElement, options?: Options) {
    options = nomarlizeOptions(options);

}

function nomarlizeOptions(options?: Options): Options {
    options = options || {};
    options.prefix = options.prefix || 'rc';
    return options;
}