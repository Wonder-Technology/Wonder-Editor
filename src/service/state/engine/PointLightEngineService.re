open Wonderjs;

let create = PointLightAPI.createPointLight;

let getPointLightGameObject = PointLightAPI.unsafeGetPointLightGameObject;

let getPointLightColor = PointLightAPI.getPointLightColor;

let setPointLightColor = (value, component, state) =>
  PointLightAPI.setPointLightColor(component, value, state);

let getPointLightIntensity = PointLightAPI.getPointLightIntensity;

let setPointLightIntensity = (value, component, state) =>
  PointLightAPI.setPointLightIntensity(component, value, state);

let getPointLightConstant = PointLightAPI.getPointLightConstant;

let setPointLightConstant = (value, component, state) =>
  PointLightAPI.setPointLightConstant(component, value, state);

let getPointLightLinear = PointLightAPI.getPointLightLinear;

let setPointLightLinear = (value, component, state) =>
  PointLightAPI.setPointLightLinear(component, value, state);

let getPointLightQuadratic = PointLightAPI.getPointLightQuadratic;

let setPointLightQuadratic = (value, component, state) =>
  PointLightAPI.setPointLightQuadratic(component, value, state);

let getPointLightRange = PointLightAPI.getPointLightRange;

let setPointLightRange = (value, component, state) =>
  PointLightAPI.setPointLightRange(component, value, state);

let setPointLightRangeLevel = PointLightAPI.setPointLightRangeLevel;

let isMaxCount = PointLightAPI.isMaxCount;

let getCurrentCount = engineState =>
  RecordPointLightMainService.getRecord(engineState).renderLightArr
  |> CountLightService.getLightCount;

let isMaxCountByCount = (count, engineState) =>
  getCurrentCount(engineState)
  + count > BufferPointLightService.getBufferMaxCount();

let setPointLightIsRender = PointLightAPI.setPointLightIsRender;

let getBufferMaxCount = BufferPointLightService.getBufferMaxCount;

let getLightCount = engineState =>
  CountLightService.getLightCount(
    RecordPointLightMainService.getRecord(engineState).renderLightArr,
  );