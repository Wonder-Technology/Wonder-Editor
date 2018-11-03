open Wonderjs;

let create = DirectionLightAPI.createDirectionLight;

let unsafeGetDirectionLightGameObject = DirectionLightAPI.unsafeGetDirectionLightGameObject;

let getDirectionLightColor = DirectionLightAPI.getDirectionLightColor;

let setDirectionLightColor = (color, lightComponent, engineState) =>
  DirectionLightAPI.setDirectionLightColor(
    lightComponent,
    color,
    engineState,
  );

let getDirectionLightIntensity = DirectionLightAPI.getDirectionLightIntensity;

let setDirectionLightIntensity = (intensity, lightComponent, engineState) =>
  DirectionLightAPI.setDirectionLightIntensity(
    lightComponent,
    intensity,
    engineState,
  );

let isMaxCount = DirectionLightAPI.isMaxCount;

let setDirectionLightIsRender = DirectionLightAPI.setDirectionLightIsRender;

let getBufferMaxCount = BufferDirectionLightService.getBufferMaxCount;

let getLightCount = engineState =>
  CountLightService.getLightCount(
    RecordDirectionLightMainService.getRecord(engineState).renderLightArr,
  );