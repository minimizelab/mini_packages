import { addSize, addFit, addQuality, addFormat, addQueryString, } from './shared';
const getContentfulUrl = ({ baseUrl, size, fit, format, quality, resolution, }) => {
    let queryString = '';
    if (size)
        queryString = addSize(queryString, size, resolution);
    if (fit)
        queryString = addFit(queryString, fit);
    if (quality !== undefined)
        queryString = addQuality(queryString, quality);
    queryString = addFormat(queryString, format);
    return addQueryString(baseUrl, queryString);
};
export default getContentfulUrl;
