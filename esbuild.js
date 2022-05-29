// const esbuild = require('esbuild');
// const {readFile, writeFile, mkdir} = require('fs').promises;

// (async () => {
//     await mkdir('./lib');

//     const script = esbuild
//         .buildSync({
//             entryPoints: ['./src/index.ts'],
//             bundle: true,
//             minify: true,
//             format: 'iife', //iife 
//             target: ['esnext'],
//             write: false,
//             globalName: 'myLib',
//             outdir:'lib'
//         });

// })();

// const { dtsPlugin } = require("esbuild-plugin-d.ts");
const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        outdir: 'lib',
        bundle: true,
        sourcemap: true,
        minify: false,
        splitting: true,
        format: 'esm',
        target: ['esnext'],
        // plugins: [dtsPlugin()]
    })
    .catch(() => process.exit(1));