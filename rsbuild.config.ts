import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  output: {
    assetPrefix: '/React-todo/',
  },

  plugins: [pluginReact()],
});
