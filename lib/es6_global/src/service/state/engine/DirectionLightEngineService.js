

import * as DirectionLightAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/light/DirectionLightAPI.js";

function setDirectionLightColor(color, lightComponent, engineState) {
  return DirectionLightAPI$Wonderjs.setDirectionLightColor(lightComponent, color, engineState);
}

function setDirectionLightIntensity(intensity, lightComponent, engineState) {
  return DirectionLightAPI$Wonderjs.setDirectionLightIntensity(lightComponent, intensity, engineState);
}

var create = DirectionLightAPI$Wonderjs.createDirectionLight;

var unsafeGetDirectionLightGameObject = DirectionLightAPI$Wonderjs.unsafeGetDirectionLightGameObject;

var getDirectionLightColor = DirectionLightAPI$Wonderjs.getDirectionLightColor;

var getDirectionLightIntensity = DirectionLightAPI$Wonderjs.getDirectionLightIntensity;

var isMaxCount = DirectionLightAPI$Wonderjs.isMaxCount;

var setDirectionLightIsRender = DirectionLightAPI$Wonderjs.setDirectionLightIsRender;

export {
  create ,
  unsafeGetDirectionLightGameObject ,
  getDirectionLightColor ,
  setDirectionLightColor ,
  getDirectionLightIntensity ,
  setDirectionLightIntensity ,
  isMaxCount ,
  setDirectionLightIsRender ,
  
}
/* DirectionLightAPI-Wonderjs Not a pure module */
