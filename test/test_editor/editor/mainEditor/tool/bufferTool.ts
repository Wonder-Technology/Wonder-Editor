import {DataBufferConfig} from "wonder.js/dist/es2015/config/DataBufferConfig";

export const minBufferCount = (sandbox, data) => {
    var transformDataBufferCount = (data && data.transformDataBufferCount) || 10;
    var geometryDataBufferCount = (data && data.geometryDataBufferCount) || 200;
    var ambientLightDataBufferCount = (data && data.ambientLightDataBufferCount) || 10;
    var directionLightDataBufferCount = (data && data.directionLightDataBufferCount) || 10;
    var pointLightDataBufferCount = (data && data.pointLightDataBufferCount) || 10;
    var deferAmbientLightCount = (data && data.deferAmbientLightCount) || 10;
    var deferDirectionLightCount = (data && data.deferDirectionLightCount) || 10;
    var deferPointLightCount = (data && data.deferPointLightCount) || 10;


    DataBufferConfig.transformDataBufferCount = transformDataBufferCount;

    DataBufferConfig.basicMaterialDataBufferCount = 20;
    DataBufferConfig.lightMaterialDataBufferCount = 20;

    DataBufferConfig.textureDataBufferCount = 20;

    DataBufferConfig.geometryDataBufferCount = geometryDataBufferCount;
    DataBufferConfig.renderCommandBufferCount = 20;


    DataBufferConfig.ambientLightDataBufferCount = ambientLightDataBufferCount;
    DataBufferConfig.directionLightDataBufferCount = directionLightDataBufferCount;
    DataBufferConfig.pointLightDataBufferCount = pointLightDataBufferCount;

    DataBufferConfig.deferAmbientLightCount = deferAmbientLightCount;
    DataBufferConfig.deferPointLightCount = deferPointLightCount;
    DataBufferConfig.deferDirectionLightCount = deferDirectionLightCount;
}

