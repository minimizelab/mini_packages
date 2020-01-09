const addClassName = (classNames: string, newClassName: string): string =>
  classNames.length ? classNames.concat(' ', newClassName) : newClassName;

export const combineClasses = (
  classNames: Array<string | undefined | { [key: string]: boolean | undefined }>
): string => {
  let result = '';
  classNames.forEach(item => {
    switch (typeof item) {
      case 'string':
        if (item.length > 0) result = addClassName(result, item);
        break;
      case 'object':
        Object.entries(item).forEach(([key, val]) => {
          if (val && key.length > 0) {
            result = addClassName(result, key);
          }
        });
        break;
      case 'undefined':
      default:
        break;
    }
  });
  return result;
};
