const addClassName = (classNames, newClassName) => classNames.length ? classNames.concat(' ', newClassName) : newClassName;
const combineClasses = (classNames) => {
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
        }
    });
    return result;
};

const addSize = (url, size, resolution = 1) => {
    let sizeString = '';
    if (size.width !== undefined)
        sizeString += `&w=${size.width * resolution}`;
    if (size.height !== undefined)
        sizeString += `&h=${size.height * resolution}`;
    return url + sizeString;
};
const addQueryString = (url, queryString, preString) => queryString.length > 0
    ? `${preString ? preString : ''}${url}?${queryString[0] === '&'
        ? queryString.slice(1, queryString.length)
        : queryString}`
    : `${preString ? preString : ''}${url}`;
const addFit = (url, fit) => `${url}&fit=${fit}`;
const addQuality = (url, quality) => `${url}&q=${quality}`;
const addFormat = (url, format) => {
    if (format === 'jpg') {
        return `${url}&fm=jpg&fl=progressive`;
    }
    else if (format !== 'original') {
        return `${url}&fm=${format}`;
    }
    return url;
};
const getQueryString = ({ size, resolution, quality, fit, format, }) => {
    let queryString = '';
    if (size)
        queryString = addSize(queryString, size, resolution);
    if (fit)
        queryString = addFit(queryString, fit);
    if (quality !== undefined)
        queryString = addQuality(queryString, quality);
    queryString = addFormat(queryString, format);
    return queryString;
};

const getContentfulUrl = ({ baseUrl, ...props }) => {
    return addQueryString(baseUrl, getQueryString(props), 'https:');
};

const getSanityUrl = ({ baseUrl, ...props }) => {
    return addQueryString(baseUrl, getQueryString(props));
};

var index = {
    getContentfulUrl,
    getSanityUrl,
};

export { combineClasses, index as urlBuilder };
//# sourceMappingURL=index.js.map
