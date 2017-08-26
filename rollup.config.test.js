import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// import uglify from 'rollup-plugin-uglify';

const plugins = [
    // nodeResolve makes rollup look for dependencies in the node_modules directory
    nodeResolve({
        skip:[
        ],
        extensions: [".js", ".ts",".tsx"]
    }),
    commonjs({
        // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
        include: 'node_modules/**',
        namedExports: {
            // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
            // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
            // Just add the mentioned file / export here
            'node_modules/react-dom/index.js': [
                'render'
            ],
            'node_modules/immutable/dist/immutable.js': [
                'Map'
            ],
            'node_modules/wonder-expect.js/dist/wdet.js': [
                'expect'
            ],
            'node_modules/react/react.js': [
                'Component',
                'PropTypes',
                'createElement',
                'Children'
            ],
            "./node_modules/rsvp/dist/rsvp.js": ["Promise"],
            "./node_modules/rxjs/Rx.js": ["Promise"]
        },
    }),
    typescriptPlugin({
        // The current rollup-plugin-typescript includes an old version of typescript, so we import and pass our own version
        typescript,
        // rollup-plugin-typescript will inject some typescript helpers to your files (normally tsc will
        // do this). They however have some ES6 keywords like const so they break older browsers.
        // This instructs rollup-plugin-typescript to import tslib instead, which includes the same helpers
        // in proper format.
        importHelpers: true,
    })
];

var rollup = {
    plugins,
    sourceMap:true,
    entry: './src/index.ts',
    dest: './dist/test.js',
    moduleName:"we",
    format: 'umd'
}

export default rollup;
