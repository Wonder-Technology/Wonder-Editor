

import * as PointLightAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/light/PointLightAPI.js";
import * as CountLightService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/all/light/CountLightService.js";
import * as BufferPointLightService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/light/point/BufferPointLightService.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/light/point/RecordPointLightMainService.js";

function setPointLightColor(value, component, state) {
  return PointLightAPI$Wonderjs.setPointLightColor(component, value, state);
}

function setPointLightIntensity(value, component, state) {
  return PointLightAPI$Wonderjs.setPointLightIntensity(component, value, state);
}

function setPointLightConstant(value, component, state) {
  return PointLightAPI$Wonderjs.setPointLightConstant(component, value, state);
}

function setPointLightLinear(value, component, state) {
  return PointLightAPI$Wonderjs.setPointLightLinear(component, value, state);
}

function setPointLightQuadratic(value, component, state) {
  return PointLightAPI$Wonderjs.setPointLightQuadratic(component, value, state);
}

function setPointLightRange(value, component, state) {
  return PointLightAPI$Wonderjs.setPointLightRange(component, value, state);
}

function getLightCount(engineState) {
  return CountLightService$Wonderjs.getLightCount(RecordPointLightMainService$Wonderjs.getRecord(engineState)[/* renderLightArr */8]);
}

var create = PointLightAPI$Wonderjs.createPointLight;

var getPointLightGameObject = PointLightAPI$Wonderjs.unsafeGetPointLightGameObject;

var getPointLightColor = PointLightAPI$Wonderjs.getPointLightColor;

var getPointLightIntensity = PointLightAPI$Wonderjs.getPointLightIntensity;

var getPointLightConstant = PointLightAPI$Wonderjs.getPointLightConstant;

var getPointLightLinear = PointLightAPI$Wonderjs.getPointLightLinear;

var getPointLightQuadratic = PointLightAPI$Wonderjs.getPointLightQuadratic;

var getPointLightRange = PointLightAPI$Wonderjs.getPointLightRange;

var setPointLightRangeLevel = PointLightAPI$Wonderjs.setPointLightRangeLevel;

var isMaxCount = PointLightAPI$Wonderjs.isMaxCount;

var setPointLightIsRender = PointLightAPI$Wonderjs.setPointLightIsRender;

var getBufferMaxCount = BufferPointLightService$Wonderjs.getBufferMaxCount;

export {
  create ,
  getPointLightGameObject ,
  getPointLightColor ,
  setPointLightColor ,
  getPointLightIntensity ,
  setPointLightIntensity ,
  getPointLightConstant ,
  setPointLightConstant ,
  getPointLightLinear ,
  setPointLightLinear ,
  getPointLightQuadratic ,
  setPointLightQuadratic ,
  getPointLightRange ,
  setPointLightRange ,
  setPointLightRangeLevel ,
  isMaxCount ,
  setPointLightIsRender ,
  getBufferMaxCount ,
  getLightCount ,
  
}
/* PointLightAPI-Wonderjs Not a pure module */
