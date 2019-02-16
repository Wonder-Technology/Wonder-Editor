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

let _handleEngineState = (sceneGameObject, hasWDBIMGUIFunc, engineState) => {
  let engineState =
    engineState |> SceneEngineService.setSceneGameObject(sceneGameObject);

  let editorState = StateEditorService.getState();
  let editorState =
    switch (
      GameObjectEngineService.getGameObjectActiveBasicCameraView(
        sceneGameObject,
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
    |> SceneTreeEditorService.clearCurrentSceneTreeNode;
  /* |> AssetTreeUtils.initRootAssetTree(_, engineState); */

  editorState
  |> GameObjectComponentLogicService.setGameObjectArrComponentTypeMap(
       engineState
       |> HierarchyGameObjectEngineService.getChildren(sceneGameObject),
       GameObjectComponentLogicService.buildAllComponentArray(),
       engineState,
     )
  |> InspectorEditorService.addSceneGameObjectComponentTypeToMap(
       sceneGameObject,
     )
  |> StateEditorService.setState
  |> ignore;

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName(
         SceneEngineService.getDefaultName(),
         sceneGameObject,
       );

  (sceneGameObject, engineState);
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
       false,
     )
  |> WonderBsMost.Most.map(
       (
         (
           engineState,
           (imageUint8ArrayDataMap, hasWDBIMGUIFunc),
           sceneGameObject,
         ),
       ) => {
       let (sceneGameObject, engineState) =
         _handleEngineState(sceneGameObject, hasWDBIMGUIFunc, engineState);

       StateEngineService.setState(engineState) |> ignore;

       (sceneGameObject, imageUint8ArrayDataMap);
     });
};