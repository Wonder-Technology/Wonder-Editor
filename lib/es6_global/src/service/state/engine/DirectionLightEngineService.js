

import * as CountLightService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/all/light/CountLightService.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/light/DirectionLightAPI.js";
import * as BufferDirectionLightService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/light/direction/BufferDirectionLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/light/direction/RecordDirectionLightMainService.js";

function setDirectionLightColor(color, lightComponent, engineState) {
  return DirectionLightAPI$Wonderjs.setDirectionLightColor(lightComponent, color, engineState);
}

function setDirectionLightIntensity(intensity, lightComponent, engineState) {
  return DirectionLightAPI$Wonderjs.setDirectionLightIntensity(lightComponent, intensity, engineState);
}

function getCurrentCount(engineState) {
  return CountLightService$Wonderjs.getLightCount(RecordDirectionLightMainService$Wonderjs.getRecord(engineState)[/* renderLightArr */4]);
}

function isMaxCountByCount(count, engineState) {
  return (CountLightService$Wonderjs.getLightCount(RecordDirectionLightMainService$Wonderjs.getRecord(engineState)[/* renderLightArr */4]) + count | 0) > BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0);
}

function getLightCount(engineState) {
  return CountLightService$Wonderjs.getLightCount(RecordDirectionLightMainService$Wonderjs.getRecord(engineState)[/* renderLightArr */4]);
}

var create = DirectionLightAPI$Wonderjs.createDirectionLight;

var unsafeGetDirectionLightGameObject = DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject;

var getDirectionLightColor = DirectionLightAPI$Wonderjs.getDirectionLightColor;

var getDirectionLightIntensity = DirectionLightAPI$Wonderjs.getDirectionLightIntensity;

var isMaxCount = DirectionLightAPI$Wonderjs.isMaxCount;

var setDirectionLightIsRender = DirectionLightAPI$Wonderjs.setDirectionLightIsRender;

var getBufferMaxCount = BufferDirectionLightService$Wonderjs.getBufferMaxCount;

export {
  create ,
  unsafeGetDirectionLightGameObject ,
  getDirectionLightColor ,
  setDirectionLightColor ,
  getDirectionLightIntensity ,
  setDirectionLightIntensity ,
  isMaxCount ,
  getCurrentCount ,
  isMaxCountByCount ,
  setDirectionLightIsRender ,
  getBufferMaxCount ,
  getLightCount ,
  
}
/* CountLightService-Wonderjs Not a pure module */
