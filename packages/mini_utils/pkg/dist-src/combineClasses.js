const addClassName = (classNames, newClassName) => classNames.length ? classNames.concat(' ', newClassName) : newClassName;
export const combineClasses = (classNames) => {
    let result = '';
    classNames.forEach((item) => {
        switch (typeof item) {
            case 'string':
                if (item.length > 0)
                    result = addClassName(result, item);
                break;
            case 'object':
                Object.entries(item).forEach(([key, val]) => {
                    if (val && key.length > 0) {
                        result = addClassName(result, key);
                    }
                });
                break;
            default:
                break;
        }
    });
    return result;
};
