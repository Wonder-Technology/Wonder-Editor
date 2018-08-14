

import * as SceneTreeTool$WonderEditor from "../../../../../tool/SceneTreeTool.js";
import * as ComponentDomTool$WonderEditor from "../../../../../tool/domIndex/ComponentDomTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as OperateComponentEventTool$WonderEditor from "../../../../../tool/OperateComponentEventTool.js";

function addDirectionLightInBox() {
  var boxComponentCount = ComponentDomTool$WonderEditor.getBoxComponentCount(/* () */0);
  var renderingCategoryDomIndex = ComponentDomTool$WonderEditor.getRenderingCategoryDomIndex(/* () */0);
  var lightTypeDomIndex = ComponentDomTool$WonderEditor.getLightTypeDomIndex(/* () */0);
  return OperateComponentEventTool$WonderEditor.addComponentIntoCurrentGameObject(boxComponentCount, renderingCategoryDomIndex, lightTypeDomIndex);
}

function addArcballCameraInBox() {
  var boxComponentCount = ComponentDomTool$WonderEditor.getBoxComponentCount(/* () */0);
  var cameraCategoryDomIndex = ComponentDomTool$WonderEditor.getCameraCategoryDomIndex(/* () */0);
  var arcballCameraTypeDomIndex = ComponentDomTool$WonderEditor.getArcballCameraControllerTypeDomIndex(/* () */0);
  return OperateComponentEventTool$WonderEditor.addComponentIntoCurrentGameObject(boxComponentCount, cameraCategoryDomIndex, arcballCameraTypeDomIndex);
}

function addArcballCameraInCamera() {
  var cameraComponentCount = ComponentDomTool$WonderEditor.getCameraComponentCount(/* () */0);
  var cameraCategoryDomIndex = ComponentDomTool$WonderEditor.getCameraCategoryDomIndex(/* () */0);
  var arcballCameraTypeDomIndex = ComponentDomTool$WonderEditor.getArcballCameraControllerTypeDomIndex(/* () */0);
  return OperateComponentEventTool$WonderEditor.addComponentIntoCurrentGameObject(cameraComponentCount, cameraCategoryDomIndex, arcballCameraTypeDomIndex);
}

function addCameraGroupInBox() {
  var boxComponentCount = ComponentDomTool$WonderEditor.getBoxComponentCount(/* () */0);
  var cameraCategoryDomIndex = ComponentDomTool$WonderEditor.getCameraCategoryDomIndex(/* () */0);
  var cameraGroupTypeDomIndex = ComponentDomTool$WonderEditor.getCameraGroupTypeDomIndex(/* () */0);
  return OperateComponentEventTool$WonderEditor.addComponentIntoCurrentGameObject(boxComponentCount, cameraCategoryDomIndex, cameraGroupTypeDomIndex);
}

function addRenderGroupInCamera() {
  var cameraComponentCount = ComponentDomTool$WonderEditor.getCameraComponentCount(/* () */0);
  var renderingCategoryDomIndex = ComponentDomTool$WonderEditor.getRenderingCategoryDomIndex(/* () */0);
  var renderGroupTypeDomIndex = ComponentDomTool$WonderEditor.getRenderGroupTypeDomIndex(/* () */0);
  return OperateComponentEventTool$WonderEditor.addComponentIntoCurrentGameObject(cameraComponentCount, renderingCategoryDomIndex, renderGroupTypeDomIndex);
}

function getTwoAddedArcballCameraControllerCamera(sandbox) {
  var match = SceneTreeTool$WonderEditor.buildTwoCameraSceneGraphToEngine(sandbox);
  SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateTwoCamera[/* getFirstCameraDomIndex */0](/* () */0));
  addArcballCameraInCamera(/* () */0);
  SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateTwoCamera[/* getSecondCameraDomIndex */1](/* () */0));
  addArcballCameraInCamera(/* () */0);
  return /* tuple */[
          match[0],
          match[1]
        ];
}

export {
  addDirectionLightInBox ,
  addArcballCameraInBox ,
  addArcballCameraInCamera ,
  addCameraGroupInBox ,
  addRenderGroupInCamera ,
  getTwoAddedArcballCameraControllerCamera ,
  
}
/* SceneTreeTool-WonderEditor Not a pure module */
