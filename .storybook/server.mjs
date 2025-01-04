import { storybookPlugin } from '@web/dev-server-storybook';
import baseConfig from '../web-dev-server.config.mjs';
import { polyfill } from '@web/dev-server-polyfill';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  ...baseConfig,
  open: '/',
  plugins: [storybookPlugin(
    polyfill({
      scopedCustomElementRegistry: true,
    }),{ type: 'web-components' }), ...baseConfig.plugins],
});
