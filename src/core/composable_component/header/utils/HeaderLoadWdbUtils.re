open Js.Promise;

open AssetNodeType;

open FileType;

let _setIMGUI = (hasWdbIMGUIFunc, editorState, editEngineState) => {
  let wdbImguiFunc =
    hasWdbIMGUIFunc ?
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

/* TODO use imageUint8ArrayDataMap */
let handleSceneWdb = wdbResult =>
  StateLogicService.getEditEngineState()
  |> AssembleWDBEngineService.assembleWDB(
       wdbResult.result |> FileReader.convertResultToArrayBuffer,
       true,
       false,
     )
  |> WonderBsMost.Most.map(
       ((editEngineState, (_, hasWdbIMGUIFunc), gameObject)) => {
       let editEngineState =
         editEngineState
         |> SceneEngineService.disposeSceneAndChildren
         |> SceneEngineService.setSceneGameObject(gameObject);

       let (editorState, editEngineState) =
         _setIMGUI(
           hasWdbIMGUIFunc,
           StateEditorService.getState(),
           editEngineState,
         );

       let scene = editEngineState |> SceneEngineService.getSceneGameObject;

       let editCamera =
         GameObjectEditorService.unsafeGetEditCamera(editorState);

       let editEngineState =
         editEngineState
         |> GameObjectComponentEngineService.getBasicCameraViewComponent(
              editCamera,
            )
         |. BasicCameraViewEngineService.activeBasicCameraView(
              editEngineState,
            )
         |> GameObjectEngineService.setGameObjectName("scene", scene);

       let editEngineState =
         GameObjectEngineService.getAllGameObjects(
           gameObject,
           editEngineState,
         )
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (. editEngineState, gameObject) =>
                GameObjectEngineService.initGameObject(
                  gameObject,
                  editEngineState,
                ),
              editEngineState,
            );

       editEngineState
       |> DirectorEngineService.loopBody(0.)
       |> StateLogicService.setEditEngineState;
     })
  |> WonderBsMost.Most.flatMap(_ =>
       StateLogicService.getRunEngineState()
       |> AssembleWDBEngineService.assembleWDB(
            wdbResult.result |> FileReader.convertResultToArrayBuffer,
            true,
            false,
          )
       |> WonderBsMost.Most.map(((runEngineState, _, gameObject)) => {
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
              |> SceneEngineService.disposeSceneAndChildren
              |> SceneEngineService.setSceneGameObject(gameObject);

            let runEngineState =
              GameObjectEngineService.getAllGameObjects(
                gameObject,
                runEngineState,
              )
              |> WonderCommonlib.ArrayService.reduceOneParam(
                   (. editEngineState, gameObject) =>
                     GameObjectEngineService.initGameObject(
                       gameObject,
                       runEngineState,
                     ),
                   runEngineState,
                 );

            runEngineState
            |> DirectorEngineService.loopBody(0.)
            |> StateLogicService.setRunEngineState;
          })
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
         => wdbResult |> handleSceneWdb)
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