import {Quaternion} from "wonder.js/dist/es2015/math/Quaternion";

export const QuaternionType = Quaternion;

export const getValues = (values, digit) => {
    var len = 0,
        i = 0,
        result = [];

    len = values.length;

    if(digit <= 0){
        for (i = 0; i < len; i++) {
            result[i] = Math.round(values[i]);

            if (result[i] === -0) {
                result[i] = 0;
            }
        }

        return result;
    }

    for (i = 0; i < len; i++) {
        result[i] = toFixed(values[i], digit === undefined ? 7 : digit);
        if (result[i] === -0) {
            result[i] = 0;
        }
    }
    return result;
};

export const toFixed = (decimal,digit) => {
    var num = Math.pow(10, digit),
        decimalNumber = _getDecimalNumber(decimal),
        result = 0;

    if (num === Infinity) {
        throw new Error("浮点溢出");
    }
    if (!isNaN(decimalNumber) && digit > decimalNumber) {
        return decimal;
    }

    if (decimal > 0) {
        result = Math.round(decimal * num) / num;
    }
    else {
        result = -Math.round(-decimal * num) / num;
    }

    if (result < 0 && result > 1e-5) {
        result = 0;
    }

    return result;
};

const _getDecimalNumber = (decimal)=>{
    var numStr = String(decimal);

    var portionArr = numStr.split('.');

    if (numStr.indexOf("e") > -1) {
        return NaN;
    }

    if (portionArr.length === 1) {
        //throw new Error("参数必须为小数");
        return decimal;
    }

    return portionArr[1].length;
}

export const isFloat32Array = (val) => {
    return {}.toString.call(val) === "[object Float32Array]";
};

export const isUint16Array = (val) => {
    return Object.prototype.toString.call(val) === "[object Uint16Array]";
};

export const isUint8Array = (val) => {
    return Object.prototype.toString.call(val) === "[object Uint8Array]";
};

export const isArray = (val) => {
    return {}.toString.call(val) === "[object Array]";
};

