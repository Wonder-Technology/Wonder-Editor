open Js.Promise;

open AssetNodeType;

open FileType;

let _setIMGUI = (hasWDBIMGUIFunc, editorState, editEngineState) => {
  let wdbImguiFunc =
    hasWDBIMGUIFunc ?
      ManageIMGUIEngineService.getIMGUIFunc(editEngineState) : None;

  let editEngineStateCustomData =
    EditIMGUIFuncUtils.getEditEngineStateCustomData(
      editorState,
      editEngineState,
    );
  let editEngineStateImguiFunc =
    EditIMGUIFuncUtils.getEditEngineStateIMGUIFunc();

  let editEngineState =
    switch (wdbImguiFunc) {
    | None =>
      ManageIMGUIEngineService.setIMGUIFunc(
        (editEngineStateCustomData, editEngineStateImguiFunc) |> Obj.magic,
        Obj.magic(
          (.
            (editEngineStateCustomData, editEngineStateImguiFunc),
            apiJsObj,
            state,
          ) =>
          editEngineStateImguiFunc(.
            editEngineStateCustomData,
            apiJsObj,
            state,
          )
        ),
        editEngineState,
      )
    | Some(wdbImguiFunc) =>
      let wdbCustomData =
        ManageIMGUIEngineService.getCustomData(editEngineState)
        |> OptionService.unsafeGet;

      ManageIMGUIEngineService.setIMGUIFunc(
        (
          (editEngineStateCustomData, editEngineStateImguiFunc),
          (wdbImguiFunc, wdbCustomData),
        )
        |> Obj.magic,
        Obj.magic(
          (.
            (
              (editEngineStateCustomData, editEngineStateImguiFunc),
              (wdbImguiFunc, wdbCustomData),
            ),
            apiJsObj,
            state,
          ) => {
          let state =
            editEngineStateImguiFunc(.
              editEngineStateCustomData,
              apiJsObj,
              state,
            );

          wdbImguiFunc(. wdbCustomData, apiJsObj, state);
        }),
        editEngineState,
      );
    };

  (editorState, editEngineState);
};

let _handleEditEngineState = (gameObject, hasWDBIMGUIFunc, editEngineState) => {
  let editEngineState =
    editEngineState
    |> SceneEngineService.disposeSceneAllChildrenKeepOrder
    |> SceneEngineService.setSceneGameObject(gameObject);

  let (editorState, editEngineState) =
    _setIMGUI(
      hasWDBIMGUIFunc,
      StateEditorService.getState(),
      editEngineState,
    );

  let scene = editEngineState |> SceneEngineService.getSceneGameObject;

  let editEngineState =
    editEngineState
    |> GameObjectEngineService.setGameObjectName("scene", scene);

  let editEngineState =
    GameObjectEngineService.initAllGameObjects(gameObject, editEngineState);

  editEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;
};

let _handleRunEngineState = (gameObject, runEngineState) => {
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
};

/* TODO use imageUint8ArrayDataMap */
let handleSceneWDB = wdbResult =>
  StateLogicService.getEditEngineState()
  |> AssembleWDBEngineService.assembleWDB(
       wdbResult.result |> FileReader.convertResultToArrayBuffer,
       true,
       false,
       false,
     )
  |> WonderBsMost.Most.map(
       ((editEngineState, (_, hasWDBIMGUIFunc), gameObject)) =>
       _handleEditEngineState(gameObject, hasWDBIMGUIFunc, editEngineState)
     )
  |> WonderBsMost.Most.flatMap(_ =>
       StateLogicService.getRunEngineState()
       |> AssembleWDBEngineService.assembleWDB(
            wdbResult.result |> FileReader.convertResultToArrayBuffer,
            true,
            false,
            true,
          )
       |> WonderBsMost.Most.map(((runEngineState, _, gameObject)) =>
            _handleRunEngineState(gameObject, runEngineState)
          )
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