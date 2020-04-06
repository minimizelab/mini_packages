import { addQueryString, getQueryString } from './shared';
const getContentfulUrl = ({ baseUrl, ...props }) => {
    return addQueryString(baseUrl, getQueryString(props), 'https:');
};
export default getContentfulUrl;
