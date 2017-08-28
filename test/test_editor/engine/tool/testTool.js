var TestTool = YYC.Class({
    Public: {
        getValues: function (values, digit) {
            var digit = digit === undefined ? 7 : digit;

            if (values !== undefined) {
                if (mathTestUtils.isArray(values) || mathTestUtils.isFloat32Array(values) || mathTestUtils.isUint16Array(values) || mathTestUtils.isUint8Array(values)) {
                    return mathTestUtils.getValues(values, digit);
                }
                else if (values.values) {
                    return mathTestUtils.getValues(values.values, digit);
                }
                else if (values instanceof wd.Quaternion) {
                    return mathTestUtils.getValues([values.x, values.y, values.z, values.w], digit);
                }
                else {
                    return mathTestUtils.toFixed(values, digit);
                }
            }
        },
        prepareBufferForTest: function(sandbox, data, bufferTool){
            bufferTool.minBufferCount(sandbox, data);
        },

        initForTest: function(sandbox){
            gpuDetectTool.setGPUDetectData("maxTextureUnit", 16);
            gpuDetectTool.setGPUDetectData("maxUniformBufferBindings", 10);
        },

        clear: function (sandbox) {
            // this.clearInstance(sandbox);
            this.clearComponentData();
        },

        openContractCheck: function () {
            mainTool.setIsTest(true);
        },

        closeContractCheck: function () {
            mainTool.setIsTest(false);
        },
        // clearInstance: function (sandbox) {
        //     for (var i in wd) {
        //         if (wd.hasOwnProperty(i)) {
        //             if (wd[i]) {
        //                 wd[i]._instance = null;
        //             }
        //         }
        //     }
        //
        //     this.closeContractCheck();
        // },
        clearComponentData: function () {
            we.initDataAdaptor();
        },
        clearAndOpenContractCheck: function (sandbox, data) {
            mainTool.setIsTest(true);

            this.prepareBufferForTest(sandbox, data, bufferTool);

            this.clear(sandbox);

            mainTool.setIsTest(true);

            this.initForTest(sandbox);
            gpuDetectTool.setGPUDetectData("extensionVao", null);

            webglTestTool.initForTest(sandbox);
        }
    }
})

var testTool = new TestTool();


