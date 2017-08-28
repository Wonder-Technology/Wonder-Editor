var bufferTool = (function () {
    return {
        minBufferCount: function(sandbox, data){
            var DataBufferConfig = we.getDataBufferConfigAdaptor();

            var transformDataBufferCount = (data && data.transformDataBufferCount) || 10;
            var geometryDataBufferCount = (data && data.geometryDataBufferCount) || 200;
            var ambientLightDataBufferCount = (data && data.ambientLightDataBufferCount) || 10;
            var directionLightDataBufferCount = (data && data.directionLightDataBufferCount) || 10;
            var pointLightDataBufferCount = (data && data.pointLightDataBufferCount) || 10;
            var deferAmbientLightCount = (data && data.deferAmbientLightCount) || 10;
            var deferDirectionLightCount = (data && data.deferDirectionLightCount) || 10;
            var deferPointLightCount = (data && data.deferPointLightCount) || 10;


            // testTool.stubGetter(sinon, wd.ThreeDTransformData, "maxCount", function () {
            //     return transformDataBufferCount;
            // });
            sandbox.stub(DataBufferConfig, "transformDataBufferCount", transformDataBufferCount);

            sandbox.stub(DataBufferConfig, "basicMaterialDataBufferCount", 20);
            sandbox.stub(DataBufferConfig, "lightMaterialDataBufferCount", 20);

            sandbox.stub(DataBufferConfig, "textureDataBufferCount", 20);

            sandbox.stub(DataBufferConfig, "geometryDataBufferCount", geometryDataBufferCount);
            sandbox.stub(DataBufferConfig, "renderCommandBufferCount", 20);


            sandbox.stub(DataBufferConfig, "ambientLightDataBufferCount", ambientLightDataBufferCount);
            sandbox.stub(DataBufferConfig, "directionLightDataBufferCount", directionLightDataBufferCount);
            sandbox.stub(DataBufferConfig, "pointLightDataBufferCount", pointLightDataBufferCount);

            sandbox.stub(DataBufferConfig, "deferAmbientLightCount", deferAmbientLightCount);
            sandbox.stub(DataBufferConfig, "deferPointLightCount", deferPointLightCount);
            sandbox.stub(DataBufferConfig, "deferDirectionLightCount", deferDirectionLightCount);
        }
    }
})()

