import { storybookPlugin } from '@web/dev-server-storybook';
import baseConfig from '../web-dev-server.config.mjs';
import { polyfill } from '@web/dev-server-polyfill';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  ...baseConfig,
  open: '/',
  plugins: [
    storybookPlugin({ type: 'web-components' }),
    polyfill({
      scopedCustomElementRegistry: true,
    }),
    ...baseConfig.plugins
  ],
});
