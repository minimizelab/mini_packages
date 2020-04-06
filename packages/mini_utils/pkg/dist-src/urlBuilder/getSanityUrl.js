import { addQueryString, getQueryString } from './shared';
const getSanityUrl = ({ baseUrl, ...props }) => {
    return addQueryString(baseUrl, getQueryString(props));
};
export default getSanityUrl;
