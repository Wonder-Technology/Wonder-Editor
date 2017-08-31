import {
    describe as describeCommonLib,
    it as itCommonLib,
    ensureFunc as ensureFuncCommonLib,
    requireFunc as requireFuncCommonLib
} from "wonder-commonlib/dist/es2015/typescript/decorator/contract";

var _getCompileIsTest = () => true;

var _getRunTimeIsTest = () => {
    return true;
}

export var describe = describeCommonLib;

export var it = itCommonLib;

export function requireCheckFunc(checkFunc: Function, bodyFunc: Function) {
    return requireFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}

export function ensureFunc(checkFunc: Function, bodyFunc: Function) {
    return ensureFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}
