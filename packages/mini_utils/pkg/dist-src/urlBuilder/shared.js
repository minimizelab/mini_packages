export const addSize = (url, size, resolution = 1) => {
    let sizeString = '';
    if (size.width !== undefined)
        sizeString += `&w=${size.width * resolution}`;
    if (size.height !== undefined)
        sizeString += `&h=${size.height * resolution}`;
    return url + sizeString;
};
export const addQueryString = (url, queryString) => queryString.length > 0
    ? `https:${url}?${queryString[0] === '&'
        ? queryString.slice(1, queryString.length)
        : queryString}`
    : `https:${url}`;
export const addFit = (url, fit) => `${url}&fit=${fit}`;
export const addQuality = (url, quality) => `${url}&q=${quality}`;
export const addFormat = (url, format) => {
    if (format === 'jpg') {
        return `${url}&fm=jpg&fl=progressive`;
    }
    else if (format !== 'original') {
        return `${url}&fm=${format}`;
    }
    return url;
};
