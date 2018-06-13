import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
// import uglify from 'rollup-plugin-uglify';
import * as packageData from "wonder-package";
import postcss from 'rollup-plugin-postcss';

// postcss need project 
import simplevars from 'postcss-simple-vars';
import autoprefixer from 'autoprefixer';   //添加浏览器前缀,适应不同内核
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';     //支持css最新语法
import cssnano from 'cssnano';             //压缩并优化代码 

var { namedExportsData, addNamedExports } = packageData.package;

var namedExports = {
    // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
    // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
    // Just add the mentioned file / export here
    'node_modules/@blueprintjs/core/dist/esm/components/context-menu/contextMenu.js': [
        'classNames'
    ],
    'node_modules/react-dom/index.js': [
        'findDOMNode',
        'render'
    ],
    'node_modules/reason-react/node_modules/react-dom/index.js': [
        'render'
    ],
    'node_modules/reason-react/node_modules/react/index.js': [
        'Component',
        'isValidElement',
        'createElement'
    ],
    'node_modules/react/react.js': [
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
    postcss({
        // preprocessor: (content, id) => new Promise((resolve, reject) => {
        //     const result = sass.renderSync({ file: id })
        //     resolve({ code: result.css.toString() })
        // }),
        plugins: [
            autoprefixer,
            simplevars(),
            nested(),
            cssnext({ warnForDuplicates: false, }),
            cssnano(),
        ],
        extensions: ['.sass', '.scss', '.css'],
    }),
    replace({
        // The react sources include a reference to process.env.NODE_ENV so we need to replace it here with the actual value
        // 'process.env.NODE_ENV': JSON.stringify(nodeEnv)
        'process.env.NODE_ENV': JSON.stringify(dev)
    }),
    // nodeResolve makes rollup look for dependencies in the node_modules directory
    nodeResolve({
        skip: [
        ],
        extensions: [".js"]
    }),
    commonjs({
        // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
        include: 'node_modules/**',
        namedExports: namedExports
    })
];

var rollup = {
    plugins,
    entry: './lib/es6_global/src/core/Index.js',
    dest: './dist/index.js',
    moduleName: "amy",
    format: 'iife'
    // format: 'umd'
}


export default rollup;

