import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const plugins = [
    typescript({
        typescript:require("typescript")
    }),
    // nodeResolve makes rollup look for dependencies in the node_modules directory
    nodeResolve({
        skip:[
        ],
        extensions: [".js", ".ts"]
    }),
    commonjs({
        // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
        include: 'node_modules/**',
        namedExports: {
            'node_modules/immutable/dist/immutable.js': [
                'Map'
            ],
            'node_modules/wonder-expect.js/dist/wdet.js': [
                'expect'
            ]
        }
    })
];

var rollup = {
    plugins,
    sourceMap:true,
    entry: './src/editor/index.ts',
    dest: './dist/editor.test.js',
    moduleName:"we",
    format: 'umd'
}

export default rollup;
