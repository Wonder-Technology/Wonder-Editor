open Js.Promise;

open AssetNodeType;

open FileType;

/* TODO use imageUint8ArrayDataMap */
let handleSceneWdb = wdbResult =>
  StateLogicService.getEditEngineState()
  |> AssembleWDBEngineService.assembleWDB(
       wdbResult.result |> FileReader.convertResultToArrayBuffer,
     )
  |> WonderBsMost.Most.map(((editEngineState, _, gameObject)) => {
       let editEngineState =
         editEngineState
         |> SceneEngineService.disposeSceneAndChildren
         |> SceneEngineService.setSceneGameObject(gameObject);

       let scene = editEngineState |> SceneEngineService.getSceneGameObject;

       let (editEngineState, editCamera) =
         editEngineState
         |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState;

       editEngineState
       |> GameObjectComponentEngineService.getBasicCameraViewComponent(
            editCamera,
          )
       |. BasicCameraViewEngineService.activeBasicCameraView(editEngineState)
       |> GameObjectEngineService.setGameObjectName("scene", scene)
       |> DirectorEngineService.init
       |> DirectorEngineService.loopBody(0.)
       |> StateLogicService.setEditEngineState;
     })
  |> WonderBsMost.Most.flatMap(_ =>
       StateLogicService.getRunEngineState()
       |> AssembleWDBEngineService.assembleWDB(
            wdbResult.result |> FileReader.convertResultToArrayBuffer,
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

            runEngineState
            |> SceneEngineService.disposeSceneAndChildren
            |> SceneEngineService.setSceneGameObject(gameObject)
            |> DirectorEngineService.init
            |> DirectorEngineService.loopBody(0.)
            |> StateLogicService.setRunEngineState;
          })
     );

let loadSceneWDB = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  let wdbInfo =
    e##target##files
    |> Js.Dict.values
    |> Js.Array.map(AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord)
    |> ArrayService.getFirst;

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

           AssetTreeNodeUtils.readFileByType(reader, wdbInfo);
         }),
       )
     )
  |> WonderBsMost.Most.flatMap((wdbResult: nodeResultType) =>
       wdbResult |> handleSceneWdb
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
  |> ignore;
};