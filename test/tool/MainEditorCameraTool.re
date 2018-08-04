open Wonderjs;

let getCurrentCameraGameObject = engineState =>
  BasicCameraViewEngineService.getActiveBasicCameraView(engineState);

let getCurrentCameraProjection = engineState =>
  engineState
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
       getCurrentCameraGameObject(engineState) |> OptionService.unsafeGet,
     );

let addArcballCameraComponentToCamera = () => {
  let cameraComponentCount = ComponentDomTool.getCameraComponentCount();
  let cameraCategoryDomIndex = ComponentDomTool.getCameraCategoryDomIndex();
  let arcballCameraTypeDomIndex =
    ComponentDomTool.getArcballCameraControllerTypeDomIndex();

  OperateComponentEventTool.addComponentIntoCurrentGameObject(
    cameraComponentCount,
    cameraCategoryDomIndex,
    arcballCameraTypeDomIndex,
  );
};

let _getComponentInputByIndex = (componentDomIndex, index, domChildren) => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);

  let article =
    WonderCommonlib.ArrayService.unsafeGet(
      articleParent##children,
      componentDomIndex,
    );

  let arcballDiv =
    WonderCommonlib.ArrayService.unsafeGet(article##children, 1);

  let floatArticle =
    WonderCommonlib.ArrayService.unsafeGet(arcballDiv##children, index);
  let input =
    WonderCommonlib.ArrayService.unsafeGet(floatArticle##children, 1);

  input;
};

let triggerChangeArcballDistance = (value, domChildren) => {
  let arcballDomIndex =
    SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera();
  let input = _getComponentInputByIndex(arcballDomIndex, 0, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerBlurArcballDistance = (value, domChildren) => {
  let arcballDomIndex =
    SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera();
  let input = _getComponentInputByIndex(arcballDomIndex, 0, domChildren);

  BaseEventTool.triggerBlurEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerChangeArcballMinDistance = (value, domChildren) => {
  let arcballDomIndex =
    SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera();
  let input = _getComponentInputByIndex(arcballDomIndex, 1, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerBlurArcballMinDistance = (value, domChildren) => {
  let arcballDomIndex =
    SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera();
  let input = _getComponentInputByIndex(arcballDomIndex, 1, domChildren);

  BaseEventTool.triggerBlurEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};