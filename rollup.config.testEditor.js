import typescript from "wonder-rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import * as packageData from "wonder-package";

var {namedExportsData, addNamedExports } = packageData.package;

function getNamedExports(namedExportsData) {
    var namedExports = {};

    addNamedExports(namedExports, namedExportsData.immutable);
    addNamedExports(namedExports, namedExportsData.bowser);
    addNamedExports(namedExports, namedExportsData["wonder-expect.js"]);

    return namedExports;
}

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
        namedExports: getNamedExports(namedExportsData)
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
