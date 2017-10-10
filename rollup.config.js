// import typescript from 'typescript';
import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
// import uglify from 'rollup-plugin-uglify';
import * as packageData from "wonder-package";

var {namedExportsData, addNamedExports } = packageData.package;

var namedExports = {
    // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
    // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
    // Just add the mentioned file / export here
    "node_modules/rsvp/dist/rsvp.js": ["Promise"],
    'node_modules/react-dom/index.js': [
        'findDOMNode',
        'render'
    ],
    'node_modules/.15.4.2@react-dom/index.js': [
        'render',
        "findDOMNode"
    ],
    'node_modules/react/react.js': [
        'Component',
        'PropTypes',
        'createElement',
        'Children'
    ],
    'node_modules/.15.4.2@react/react.js': [
        'Component',
        'PropTypes',
        'createElement',
        'Children'
    ]
};

addNamedExports(namedExports, namedExportsData.immutable);
addNamedExports(namedExports, namedExportsData.bowser);
addNamedExports(namedExports, namedExportsData["wonder-expect.js"]);



const dev = 'development';

const prod = 'production';

const plugins = [
    replace({
        // The react sources include a reference to process.env.NODE_ENV so we need to replace it here with the actual value
        // 'process.env.NODE_ENV': JSON.stringify(nodeEnv)
        'process.env.NODE_ENV': JSON.stringify(dev)
    }),
    typescript({
        typescript:require("typescript")
    }),
    // nodeResolve makes rollup look for dependencies in the node_modules directory
    nodeResolve({
        skip:[
        ],
        extensions: [".js", ".ts",".tsx"]
    }),
    commonjs({
        // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
        include: 'node_modules/**',
        namedExports: namedExports
    })
    // typescriptPlugin({
    //     // The current rollup-plugin-typescript includes an old version of typescript, so we import and pass our own version
    //     typescript(),
    //     // rollup-plugin-typescript will inject some typescript helpers to your files (normally tsc will
    //     // do this). They however have some ES6 keywords like const so they break older browsers.
    //     // This instructs rollup-plugin-typescript to import tslib instead, which includes the same helpers
    //     // in proper format.
    //     importHelpers: true,
    // })
];

var rollup = {
     plugins,
     sourceMap: true,
     entry: './src/index.tsx',
     dest: './dist/editor.js',
     format: 'iife'
 }


export default rollup;

