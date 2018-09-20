open Js.Promise;

open AssetNodeType;

open FileType;

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
    |> SceneEngineService.disposeSceneAllChildrenKeepOrder
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

  let (assetTree, editorState) =
    editorState
    |> InspectorEditorService.clearComponentTypeMap
    |> SceneEditorService.clearCurrentSceneTreeNode
    |> AssetTreeNodeUtils.initRootAssetTree;

  editorState
  |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
       engineState |> GameObjectUtils.getChildren(gameObject),
       engineState,
     )
  |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree)
  |> StateEditorService.setState
  |> ignore;

  let scene = engineState |> SceneEngineService.getSceneGameObject;

  let engineState =
    engineState |> GameObjectEngineService.setGameObjectName("scene", scene);

  engineState
  |> JobEngineService.execDisposeJob
  |> ShaderEngineService.clearShaderCache
  |> StateEngineService.setState;

  GameObjectEngineService.initAllGameObjects(gameObject)
  |> StateLogicService.getAndRefreshEngineStateWithFunc;
};

/* TODO use imageUint8ArrayDataMap */
let handleSceneWDB = wdbArrayBuffer =>
  StateEngineService.unsafeGetState()
  |> AssembleWDBEngineService.assembleWDB(wdbArrayBuffer, true, false, true)
  |> WonderBsMost.Most.map(
       ((engineState, (_, hasWDBIMGUIFunc), gameObject)) =>
       _handleEngineState(gameObject, hasWDBIMGUIFunc, engineState)
     );

let loadSceneWDB = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (
    e##target##files
    |> Js.Dict.values
    |> Js.Array.map(AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord)
    |> ArrayService.getFirst
  ) {
  /* TODO remove Obj.magic */
  | None => Js.Promise.make((~resolve, ~reject) => resolve(. Obj.magic(-1)))
  | Some(wdbInfo) =>
    WonderBsMost.Most.just(wdbInfo)
    |> WonderBsMost.Most.flatMap(wdbInfo =>
         WonderBsMost.Most.fromPromise(
           Js.Promise.make((~resolve, ~reject) => {
             let reader = FileReader.createFileReader();

             FileReader.onload(reader, result =>
               resolve(. {
                 name: wdbInfo.name,
                 type_: AssetTreeNodeUtils.getUploadFileType(wdbInfo.name),
                 result,
               })
             );

             AssetTreeNodeUtils.readFileByTypeSync(reader, wdbInfo);
           }),
         )
       )
    |> WonderBsMost.Most.flatMap((wdbResult: nodeResultType) =>
         wdbResult.result
         |> FileReader.convertResultToArrayBuffer
         |> handleSceneWDB
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         dispatchFunc(
           AppStore.SceneTreeAction(
             SetSceneGraph(
               Some(
                 SceneTreeUtils.getSceneGraphDataFromEngine
                 |> StateLogicService.getStateToGetData,
               ),
             ),
           ),
         );

         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
         |> resolve;
       })
  };
};