import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import pkg from './package.json'

const outDir = '../dist'

export default defineConfig({
  base: '/pilpil/',
  root: 'src',
  build: {
    outDir: outDir,
    minify: true,
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        chunkFileNames: pkg.name+'.js',
        entryFileNames: pkg.name+'.js',
        assetFileNames: ({name}) => {
          if (/\.css$/.test(name ?? '')) {
              return pkg.name+'[extname]';   
          }
          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return pkg.name+'[extname]';
        },
      },
    }
  },
  plugins: [banner({
    outDir,
    content: `/**\n* ${pkg.title} v${pkg.version} - ${pkg.description}\n* @link ${pkg.homepage}\n* @copyright 2015-${new Date().getFullYear()} ${pkg.author}\n* @license ${pkg.license}\n*/`
  })],
})