const path = require('path');

module.exports = {
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
      },
    },
    '@storybook/addon-storysource',
    '@storybook/addon-actions/register',
  ],
  stories: ['../stories/**/*.stories.tsx'],
};
