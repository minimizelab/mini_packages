const resolutions = [1, 1.5, 2];
const widths = [0.25, 0.5, 1, 1.5, 2];
const width = 800;
const formats = [
    {
        type: 'image/webp',
        name: 'webp',
    },
    {
        type: 'image/png',
        name: 'png',
    },
    {
        type: 'image/jpeg',
        name: 'jpg',
    },
];
const defaults = {
    formats,
    width,
    widths,
    resolutions,
};
export default defaults;
