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
    engineState |> SceneEngineService.setSceneGameObject(gameObject);

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
  /* |> AssetTreeUtils.initRootAssetTree(_, engineState); */

  editorState
  |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
       engineState |> GameObjectUtils.getChildren(gameObject),
       engineState,
     )
  /* |> TreeRootAssetEditorService.setAssetTreeRoot(assetTree) */
  |> StateEditorService.setState
  |> ignore;

  let scene = engineState |> SceneEngineService.getSceneGameObject;

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName("scene", scene);

  let engineState = engineState |> ShaderEngineService.clearShaderCache;

  /* GameObjectEngineService.initAllGameObjects(gameObject)
     |> StateLogicService.getAndRefreshEngineStateWithFunc; */

  (gameObject, engineState);
};

let importSceneWDB = wdbArrayBuffer => {
  let engineState =
    StateEngineService.unsafeGetState()
    |> SceneEngineService.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial
    |> JobEngineService.execDisposeJob;

  engineState
  |> AssembleWDBEngineService.assembleWDB(
       wdbArrayBuffer,
       true,
       false,
       true,
       true,
     )
  |> WonderBsMost.Most.map(
       (
         (engineState, (imageUint8ArrayDataMap, hasWDBIMGUIFunc), gameObject),
       ) => {
       let (gameObject, engineState) =
         _handleEngineState(gameObject, hasWDBIMGUIFunc, engineState);

       StateEngineService.setState(engineState) |> ignore;

       (gameObject, imageUint8ArrayDataMap);
     });
};