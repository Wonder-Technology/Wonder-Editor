import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
// import uglify from 'rollup-plugin-uglify';

const dev = 'development';
const prod = 'production';

const nodeEnv = parseNodeEnv(process.env.NODE_ENV);

const plugins = [
    replace({
        // The react sources include a reference to process.env.NODE_ENV so we need to replace it here with the actual value
        'process.env.NODE_ENV': JSON.stringify(nodeEnv),
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
        namedExports: {
            // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
            // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
            // Just add the mentioned file / export here
            'node_modules/react-dom/index.js': [
                'render',
            ],
            'node_modules/react/react.js': [
                'Component',
                'PropTypes',
                'createElement',
                'Children',
            ],
            "./node_modules/rsvp/dist/rsvp.js": ["Promise"],
            "./node_modules/rxjs/Rx.js": ["Promise"],
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
    }),
];


if (nodeEnv === dev) {
    // For playing around with just frontend code the serve plugin is pretty nice.
    // We removed it when we started doing actual backend work.
    plugins.push(serve({
        port: 3000,
        historyApiFallback: true,
    }));
    plugins.push(livereload());
}

if (nodeEnv === prod) {
    // plugins.push(uglify());
}

const sourceMap = nodeEnv === dev ? 'inline' : false;

export default {
    plugins,
    sourceMap,
    entry: './src/ui/index.tsx',
    dest: './server/public/js/editor.js',
    format: 'iife'
};

function parseNodeEnv(nodeEnv) {
    if (nodeEnv === prod || nodeEnv === dev) {
        return nodeEnv;
    }
    return dev;
}
