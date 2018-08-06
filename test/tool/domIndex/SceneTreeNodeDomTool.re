module OperateDefaultScene = {
  let getFirstCameraDomIndex = () => 0;

  let getFirstCubeDomIndex = () => 1;

  let getSecondCubeDomIndex = () => 2;

  let getDirectionLightDomIndex = () => 3;

  let getNewGameObjectDomIndex = () => 4;

  let getLightComponentFromDirectionLight = () => 2;

  let getRenderGroupComponentFromBox = () => 3;

  let getNewComponentFromBox = () => 4;

  let getCameraGroupFromCamera = () => 2;

  let getArcballCameraComponentFromCamera = () => 3;
};

module OperateTwoCamera = {
  let getFirstCameraDomIndex = () => 0;

  let getSecondCameraDomIndex = () => 1;

  let getFirstCubeDomIndex = () => 2;
};

module OperateThreeLayer = {
  let getRootDivDomIndex = () => 3;

  let getFirstLayerFirstCubeDomIndex = () => 0;

  let getFirstLayerSecondCubeDomIndex = () => 1;

  let getFirstLayerThirdCubeDomIndex = () => 2;

  let getSecondLayerFirstCubeDomIndex = () => 1;
};

module OperateFourLayer = {
  let getFirstLayerFirstCubeDomIndex = () => 0;

  let getFirstLayerSecondCubeDomIndex = () => 1;

  let getSecondLayerFirstCubeDomIndex = () => 1;

  let getThirdLayerFirstCubeDomIndex = () => 1;
};