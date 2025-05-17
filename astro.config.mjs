import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';


import vercel from '@astrojs/vercel';


export default defineConfig({
  output: 'server',
  integrations: [react()],
  adapter: vercel(), // wichtig für Deployment
});