export default function processExtraCss(
    /** configs e.g.
     {
            0: {
                names: ['p0'],
                props: {},
                import: 'xx',
                insert: 6
            }
        }
     */
    configs,
    extraCss,
    prefix
) {
    if (!extraCss) {
        return configs;
    }
    Object.keys(configs).forEach(key => {
        let config = configs[key];
        if (config.import) {
            const className = prefix + '-' + config.import;
            if (config.props.base.classes) {
                config.props.base.classes = className + ' ' + config.props.base.classes;
            }
            else {
                config.props.base.classes = className;
            }
        }
    });
    return configs;
}