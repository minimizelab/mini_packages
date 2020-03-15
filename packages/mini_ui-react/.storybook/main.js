module.exports = {
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-storysource',
    '@storybook/addon-actions/register',
  ],
  stories: ['../stories/**/*.stories.tsx'],
};
