


function getFirstCameraDomIndex() {
  return 0;
}

function getFirstCubeDomIndex() {
  return 1;
}

function getSecondCubeDomIndex() {
  return 2;
}

function getDirectionLightDomIndex() {
  return 3;
}

function getNewGameObjectDomIndex() {
  return 4;
}

function getLightComponentFromDirectionLight() {
  return 2;
}

function getRenderGroupComponentFromBox() {
  return 3;
}

function getNewComponentFromBox() {
  return 4;
}

function getCameraGroupFromCamera() {
  return 2;
}

function getArcballCameraComponentFromCamera() {
  return 3;
}

var OperateDefaultScene = /* module */[
  /* getFirstCameraDomIndex */getFirstCameraDomIndex,
  /* getFirstCubeDomIndex */getFirstCubeDomIndex,
  /* getSecondCubeDomIndex */getSecondCubeDomIndex,
  /* getDirectionLightDomIndex */getDirectionLightDomIndex,
  /* getNewGameObjectDomIndex */getNewGameObjectDomIndex,
  /* getLightComponentFromDirectionLight */getLightComponentFromDirectionLight,
  /* getRenderGroupComponentFromBox */getRenderGroupComponentFromBox,
  /* getNewComponentFromBox */getNewComponentFromBox,
  /* getCameraGroupFromCamera */getCameraGroupFromCamera,
  /* getArcballCameraComponentFromCamera */getArcballCameraComponentFromCamera
];

function getFirstCameraDomIndex$1() {
  return 0;
}

function getSecondCameraDomIndex() {
  return 1;
}

function getFirstCubeDomIndex$1() {
  return 2;
}

var OperateTwoCamera = /* module */[
  /* getFirstCameraDomIndex */getFirstCameraDomIndex$1,
  /* getSecondCameraDomIndex */getSecondCameraDomIndex,
  /* getFirstCubeDomIndex */getFirstCubeDomIndex$1
];

function getRootDivDomIndex() {
  return 3;
}

function getFirstLayerFirstCubeDomIndex() {
  return 0;
}

function getFirstLayerSecondCubeDomIndex() {
  return 1;
}

function getFirstLayerThirdCubeDomIndex() {
  return 2;
}

function getSecondLayerFirstCubeDomIndex() {
  return 1;
}

var OperateThreeLayer = /* module */[
  /* getRootDivDomIndex */getRootDivDomIndex,
  /* getFirstLayerFirstCubeDomIndex */getFirstLayerFirstCubeDomIndex,
  /* getFirstLayerSecondCubeDomIndex */getFirstLayerSecondCubeDomIndex,
  /* getFirstLayerThirdCubeDomIndex */getFirstLayerThirdCubeDomIndex,
  /* getSecondLayerFirstCubeDomIndex */getSecondLayerFirstCubeDomIndex
];

function getFirstLayerFirstCubeDomIndex$1() {
  return 0;
}

function getFirstLayerSecondCubeDomIndex$1() {
  return 1;
}

function getSecondLayerFirstCubeDomIndex$1() {
  return 1;
}

function getThirdLayerFirstCubeDomIndex() {
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
