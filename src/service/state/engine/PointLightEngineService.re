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

let isExceedMaxCount = PointLightAPI.isExceedMaxCount;