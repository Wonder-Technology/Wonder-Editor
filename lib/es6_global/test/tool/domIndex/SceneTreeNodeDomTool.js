


function getFirstCameraDomIndex(param) {
  return 0;
}

function getFirstCubeDomIndex(param) {
  return 1;
}

function getSecondCubeDomIndex(param) {
  return 2;
}

function getDirectionLightDomIndex(param) {
  return 3;
}

function getNewGameObjectDomIndex(param) {
  return 4;
}

function getNewGameObjectUid(param) {
  return 7;
}

function getLightComponentFromDirectionLight(param) {
  return 2;
}

function getGeometryComponentFromBox(param) {
  return 2;
}

function getRenderGroupComponentFromBox(param) {
  return 3;
}

function getNewComponentFromBox(param) {
  return 4;
}

function getCameraGroupFromCamera(param) {
  return 2;
}

function getArcballCameraComponentFromCamera(param) {
  return 3;
}

var OperateDefaultScene = /* module */[
  /* getFirstCameraDomIndex */getFirstCameraDomIndex,
  /* getFirstCubeDomIndex */getFirstCubeDomIndex,
  /* getSecondCubeDomIndex */getSecondCubeDomIndex,
  /* getDirectionLightDomIndex */getDirectionLightDomIndex,
  /* getNewGameObjectDomIndex */getNewGameObjectDomIndex,
  /* getNewGameObjectUid */getNewGameObjectUid,
  /* getLightComponentFromDirectionLight */getLightComponentFromDirectionLight,
  /* getGeometryComponentFromBox */getGeometryComponentFromBox,
  /* getRenderGroupComponentFromBox */getRenderGroupComponentFromBox,
  /* getNewComponentFromBox */getNewComponentFromBox,
  /* getCameraGroupFromCamera */getCameraGroupFromCamera,
  /* getArcballCameraComponentFromCamera */getArcballCameraComponentFromCamera
];

function getFirstCameraDomIndex$1(param) {
  return 0;
}

function getSecondCameraDomIndex(param) {
  return 1;
}

function getFirstCubeDomIndex$1(param) {
  return 2;
}

var OperateTwoCamera = /* module */[
  /* getFirstCameraDomIndex */getFirstCameraDomIndex$1,
  /* getSecondCameraDomIndex */getSecondCameraDomIndex,
  /* getFirstCubeDomIndex */getFirstCubeDomIndex$1
];

function getRootDivDomIndex(param) {
  return 3;
}

function getFirstLayerFirstCubeDomIndex(param) {
  return 0;
}

function getFirstLayerSecondCubeDomIndex(param) {
  return 1;
}

function getFirstLayerThirdCubeDomIndex(param) {
  return 2;
}

function getSecondLayerFirstCubeDomIndex(param) {
  return 1;
}

var OperateThreeLayer = /* module */[
  /* getRootDivDomIndex */getRootDivDomIndex,
  /* getFirstLayerFirstCubeDomIndex */getFirstLayerFirstCubeDomIndex,
  /* getFirstLayerSecondCubeDomIndex */getFirstLayerSecondCubeDomIndex,
  /* getFirstLayerThirdCubeDomIndex */getFirstLayerThirdCubeDomIndex,
  /* getSecondLayerFirstCubeDomIndex */getSecondLayerFirstCubeDomIndex
];

function getFirstLayerFirstCubeDomIndex$1(param) {
  return 0;
}

function getFirstLayerSecondCubeDomIndex$1(param) {
  return 1;
}

function getSecondLayerFirstCubeDomIndex$1(param) {
  return 1;
}

function getThirdLayerFirstCubeDomIndex(param) {
  return 1;
}

var OperateFourLayer = /* module */[
  /* getFirstLayerFirstCubeDomIndex */getFirstLayerFirstCubeDomIndex$1,
  /* getFirstLayerSecondCubeDomIndex */getFirstLayerSecondCubeDomIndex$1,
  /* getSecondLayerFirstCubeDomIndex */getSecondLayerFirstCubeDomIndex$1,
  /* getThirdLayerFirstCubeDomIndex */getThirdLayerFirstCubeDomIndex
];

export {
  OperateDefaultScene ,
  OperateTwoCamera ,
  OperateThreeLayer ,
  OperateFourLayer ,
  
}
/* No side effect */
