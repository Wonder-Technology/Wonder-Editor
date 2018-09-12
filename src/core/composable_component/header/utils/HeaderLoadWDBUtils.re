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

  /* TODO test */
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

  let engineState =
    GameObjectEngineService.initAllGameObjects(gameObject, engineState);

  engineState
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState;
};

/* let _handleRunEngineState = (gameObject, runEngineState) => {
     let (assetTree, editorState) =
       StateEditorService.getState()
       |> InspectorEditorService.clearComponentTypeMap
       |> SceneEditorService.clearCurrentSceneTreeNode
       |> AssetTreeNodeUtils.initRootAssetTree;

     editorState
     |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
          runEngineState |> GameObjectUtils.getChildren(gameObject),
          runEngineState,
        )
     |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree)
     |> StateEditorService.setState
     |> ignore;

     WonderLog.Log.print("run enginestate component map") |> ignore;

     StateEditorService.getState()
     |> InspectorEditorService.getComponentTypeMap
     |> WonderLog.Log.print;

     let runEngineState =
       runEngineState
       |> SceneEngineService.disposeSceneAllChildrenKeepOrder
       |> SceneEngineService.setSceneGameObject(gameObject);

     let runEngineState =
       GameObjectEngineService.initAllGameObjects(gameObject, runEngineState);

     runEngineState
     |> DirectorEngineService.loopBody(0.)
     |> StateLogicService.setRunEngineState;
   }; */

/* TODO use imageUint8ArrayDataMap */
/* let handleSceneWDB = wdbResult =>
   StateLogicService.getEngineState()
   |> AssembleWDBEngineService.assembleWDB(
        wdbResult.result |> FileReader.convertResultToArrayBuffer,
        true,
        false,
        false,
      )
   |> WonderBsMost.Most.map(
        ((engineState, (_, hasWDBIMGUIFunc), gameObject)) =>
        _handleEngineState(gameObject, hasWDBIMGUIFunc, engineState)
      );
   /* |> WonderBsMost.Most.flatMap(_ =>
        StateEngineService.unsafeGetState();
        |> AssembleWDBEngineService.assembleWDB(
             wdbResult.result |> FileReader.convertResultToArrayBuffer,
             true,
             false,
             true,
           )
        |> WonderBsMost.Most.map(((runEngineState, _, gameObject)) =>
             _handleRunEngineState(gameObject, runEngineState)
           )
      ); */ */

let handleSceneWDB = wdbResult =>
  StateEngineService.unsafeGetState()
  |> AssembleWDBEngineService.assembleWDB(
       wdbResult.result |> FileReader.convertResultToArrayBuffer,
       true,
       false,
       true,
     )
  |> WonderBsMost.Most.map(
       ((engineState, (_, hasWDBIMGUIFunc), gameObject)) =>
       _handleEngineState(gameObject, hasWDBIMGUIFunc, engineState)
     );
/* |> WonderBsMost.Most.flatMap(_ =>
     StateEngineService.unsafeGetState();
     |> AssembleWDBEngineService.assembleWDB(
          wdbResult.result |> FileReader.convertResultToArrayBuffer,
          true,
          false,
          true,
        )
     |> WonderBsMost.Most.map(((runEngineState, _, gameObject)) =>
          _handleRunEngineState(gameObject, runEngineState)
        )
   ); */

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
    |> WonderBsMost.Most.flatMap((wdbResult: nodeResultType)
         /* WonderLog.Log.print(("file reader load wdb: ", wdbResult)) |> ignore; */
         => wdbResult |> handleSceneWDB)
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