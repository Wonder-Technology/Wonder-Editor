import {
    describe as describeCommonLib,
    it as itCommonLib,
    ensureFunc as ensureFuncCommonLib,
    requireFunc as requireFuncCommonLib
} from "wonder-commonlib/dist/es2015/typescript/decorator/contract";

const _getCompileIsTest = () => true;

const _getRunTimeIsTest = () => {
    return true;
}

export const describe = describeCommonLib;

export const it = itCommonLib;

export function requireCheckFunc(checkFunc: Function, bodyFunc: Function) {
    return requireFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}

export function ensureFunc(checkFunc: Function, bodyFunc: Function) {
    return ensureFuncCommonLib(checkFunc, bodyFunc, _getCompileIsTest(), _getRunTimeIsTest);
}
