let _buildDisposeGameObjectFunc = scriptAPIJsObj =>
  (. gameObject, engineState) => {
    let disposeGameObject = scriptAPIJsObj##disposeGameObject;

    let engineState = disposeGameObject(. gameObject, engineState);

    let engineState = engineState |> JobEngineService.execDisposeJob;

    engineState |> StateEngineService.setState |> ignore;

    SceneTreeSelectCurrentNodeUtils.clearCurrentData
    |> StateLogicService.getAndSetEditorState;

    UIStateService.getDispatch(
      (),
      AppStore.UpdateAction(
        Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
      ),
    );

    StateEngineService.unsafeGetState();
  };

let _createScriptAPIJsObj = scriptAPIJsObj => {
  "unsafeGetScriptAttribute": scriptAPIJsObj##unsafeGetScriptAttribute,
  "unsafeGetScriptAttributeFieldValue":
    scriptAPIJsObj##unsafeGetScriptAttributeFieldValue,
  "setScriptAttributeFieldValue": scriptAPIJsObj##setScriptAttributeFieldValue,
  "unsafeGetScriptGameObject": scriptAPIJsObj##unsafeGetScriptGameObject,
  "getTransformLocalPosition": scriptAPIJsObj##getTransformLocalPosition,
  /* TODO should only set MainEditorTransform->local position values */
  "setTransformLocalPosition": scriptAPIJsObj##setTransformLocalPosition,
  "unsafeGetGameObjectTransformComponent":
    scriptAPIJsObj##unsafeGetGameObjectTransformComponent,
  "disposeGameObject": _buildDisposeGameObjectFunc(scriptAPIJsObj),
  "findGameObjectsByName": scriptAPIJsObj##findGameObjectsByName,
};

let initJob =
    (_, ({apiRecord}: Wonderjs.StateDataMainType.state) as engineState) => {
  ...engineState,
  apiRecord: {
    ...apiRecord,
    scriptAPIJsObj:
      _createScriptAPIJsObj(apiRecord.scriptAPIJsObj |> Obj.magic)
      |> Obj.magic,
  },
};