open Wonderjs;

let getCurrentCameraGameObject = engineState =>
  switch (BasicCameraViewEngineService.getActiveBasicCameraView(engineState)) {
  | None => None
  | Some(basicCameraView) =>
    engineState
    |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
         basicCameraView,
       )
    |. Some
  };

let getCurrentCameraProjection = engineState =>
  engineState
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
       getCurrentCameraGameObject(engineState) |> OptionService.unsafeGet,
     );

let _getComponentInputByIndex = (componentDomIndex, index, domChildren) => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let article =
    WonderCommonlib.ArrayService.unsafeGet(
      articleParent##children,
      componentDomIndex,
    );
  let component =
    WonderCommonlib.ArrayService.unsafeGet(article##children, 1);
  let floatInputBase =
    WonderCommonlib.ArrayService.unsafeGet(component##children, index);
  let floatArticle =
    WonderCommonlib.ArrayService.unsafeGet(floatInputBase##children, 0);
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

let getEditCameraArcballCameraController = (editorState, editEngineState) =>
  SceneViewEditorService.unsafeGetEditCamera(editorState)
  |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
       _,
       editEngineState,
     );