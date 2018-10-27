let _setIMGUIData = (hasWDBIMGUIFunc, editorState, engineState) => {
  let wdbImguiFunc =
    hasWDBIMGUIFunc ?
      ManageIMGUIEngineService.getIMGUIFunc(engineState) : None;

  (
    switch (wdbImguiFunc) {
    | None =>
      editorState
      |> IMGUIEditorService.removeGameViewIMGUIFunc
      |> IMGUIEditorService.removeGameViewIMGUICustomData
    | Some(wdbImguiFunc) =>
      editorState
      |> IMGUIEditorService.setGameViewIMGUIFunc(wdbImguiFunc)
      |> IMGUIEditorService.setGameViewIMGUICustomData(
           ManageIMGUIEngineService.getCustomData(engineState)
           |> OptionService.unsafeGet,
         )
    },
    engineState,
  );
};

let _handleEngineState = (gameObject, hasWDBIMGUIFunc, engineState) => {
  let engineState =
    engineState
    |> SceneEngineService.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial
    |> SceneEngineService.setSceneGameObject(gameObject);

  let editorState = StateEditorService.getState();
  let editorState =
    switch (
      GameObjectEngineService.getGameObjectActiveBasicCameraView(
        gameObject,
        engineState,
      )
    ) {
    | None => GameViewEditorService.removeActivedBasicCameraView(editorState)
    | Some(activeBasicCameraView) =>
      GameViewEditorService.setActivedBasicCameraView(
        activeBasicCameraView,
        editorState,
      )
    };

  let (editorState, engineState) =
    _setIMGUIData(hasWDBIMGUIFunc, editorState, engineState);

  /* let (assetTree, editorState) = */
  let editorState =
    editorState
    |> InspectorEditorService.clearComponentTypeMap
    |> SceneEditorService.clearCurrentSceneTreeNode;
  /* |> AssetTreeNodeUtils.initRootAssetTree(_, engineState); */

  editorState
  |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
       engineState |> GameObjectUtils.getChildren(gameObject),
       engineState,
     )
  /* |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree) */
  |> StateEditorService.setState
  |> ignore;

  let scene = engineState |> SceneEngineService.getSceneGameObject;

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName("scene", scene);

  let engineState =
    engineState
    |> JobEngineService.execDisposeJob
    |> ShaderEngineService.clearShaderCache;

  /* GameObjectEngineService.initAllGameObjects(gameObject)
     |> StateLogicService.getAndRefreshEngineStateWithFunc; */

  (gameObject, engineState);
};

let importSceneWDB = wdbArrayBuffer =>
  StateEngineService.unsafeGetState()
  |> AssembleWDBEngineService.assembleWDB(wdbArrayBuffer, true, false, true)
  |> WonderBsMost.Most.map(
       ((engineState, (_, hasWDBIMGUIFunc), gameObject)) => {
       let (gameObject, engineState) =
         _handleEngineState(gameObject, hasWDBIMGUIFunc, engineState);

       StateEngineService.setState(engineState) |> ignore;

       gameObject;
     });