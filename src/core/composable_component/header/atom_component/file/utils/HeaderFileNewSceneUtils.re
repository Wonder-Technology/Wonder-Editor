let initEditorJob = (_, engineState) => {
  let engineState =
    ScriptEventFunctionEngineService.disableScriptEventFunction(engineState);

  let editorState = StateEditorService.getState();

  let (editorState, engineState, editCamera) =
    DefaultSceneUtils.prepareSpecificGameObjects(editorState, engineState);

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  let (editorState, engineState, sceneCamera) =
    DefaultSceneUtils.createDefaultScene(
      cubeGeometry,
      editorState,
      engineState,
    );

  let editorState =
    editorState
    |> GameViewEditorService.setActivedBasicCameraView(
         GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
           sceneCamera,
           engineState,
         ),
       );

  editorState
  |> InspectorEditorService.addSceneGameObjectComponentTypeToMap(
       SceneEngineService.getSceneGameObject(engineState),
     )
  |> StateEditorService.setState
  |> ignore;

  engineState
  |> BasicCameraViewEngineService.activeBasicCameraView(
       engineState
       |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
            editCamera,
          ),
     );
};

let handleNewScene = (dispatchFunc, (editorState, engineState)) => {
  let engineState =
    engineState
    |> SceneEngineService.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial
    |> JobEngineService.execDisposeJob;

  let (editorState, engineState, sceneCamera) =
    DefaultSceneUtils.createDefaultScene(
      GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
        editorState,
      ),
      editorState,
      engineState,
    );

  let editorState =
    editorState
    |> GameViewEditorService.setActivedBasicCameraView(
         GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
           sceneCamera,
           engineState,
         ),
       );

  let engineState =
    engineState
    |> BasicCameraViewEngineService.activeBasicCameraView(
         engineState
         |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
              editorState |> SceneViewEditorService.unsafeGetEditCamera,
            ),
       );

  let engineState =
    engineState |> StateLogicService.renderEngineStateAndReturnEngineState;

  dispatchFunc(
    AppStore.UpdateAction(
      Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
    ),
  )
  |> ignore;

  (editorState, engineState);
};