import {setGPUDetectData} from "./gpuDetectTool";
import {clearDirectorInstance, initData, setIsTest} from "./mainTool";
import {
    getValues as getMathValues, isArray, isFloat32Array, isUint16Array, isUint8Array, QuaternionType,
    toFixed
} from "./mathTestUtils";
import {minBufferCount} from "./bufferTool";
import {initForTest as initWebglForTest} from "./webglTestTool";
import {root} from "wonder.js/dist/es2015/definition/Variable";

export const getValues = (values, digit = 7) => {
    if (values !== undefined) {
        if (isArray(values) || isFloat32Array(values) || isUint16Array(values) || isUint8Array(values)) {
            return getMathValues(values, digit);
        }
        else if (values.values) {
            return getMathValues(values.values, digit);
        }
        else if (values instanceof QuaternionType) {
            return getMathValues([values.x, values.y, values.z, values.w], digit);
        }
        else {
            return toFixed(values, digit);
        }
    }
}
export const prepareBufferForTest = (sandbox, data) => {
    minBufferCount(sandbox, data);
};

export const initGPUDataForTest = (sandbox) => {
    setGPUDetectData("maxTextureUnit", 16);
    setGPUDetectData("maxUniformBufferBindings", 10);

    setGPUDetectData("extensionVao", null);

    // setGPUDetectData("extensionColorBufferFloat", {});
}

export const clear =  (sandbox)  => {
    clearInstance(sandbox);
    clearComponentData();
}

export const openContractCheck = () => {
    setIsTest(true);
}

export const closeContractCheck = () => {
    setIsTest(false);
}
export const clearInstance = (sandbox) => {
    clearDirectorInstance();

    closeContractCheck();
};

export const clearComponentData = () => {
    initData();
};

export const clearAndOpenContractCheck = (sandbox, data = null) => {
    openContractCheck();

    _initForTest(sandbox, data);

    clear(sandbox);
};

export const clearAndCloseContractCheck = (sandbox, data = null) => {
    closeContractCheck();

    _initForTest(sandbox, data);

    clear(sandbox);
};

const _initForTest = (sandbox:any, data:any) => {
    prepareBufferForTest(sandbox, data);

    initGPUDataForTest(sandbox);

    initWebglForTest(sandbox);

    _stubPerformance(sandbox);
}

const _stubPerformance = (sandbox:any) => {
    root.performance = {
        now:sandbox.stub().returns(0)
    }
}
