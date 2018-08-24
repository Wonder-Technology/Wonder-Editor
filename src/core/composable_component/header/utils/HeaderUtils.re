open Js.Promise;

open AssetNodeType;

open FileType;

let handleSceneWdb = wdbResult =>
  StateLogicService.getEditEngineState()
  |> AssembleWDBEngineService.assembleWDB(
       wdbResult.result |> FileReader.convertResultToArrayBuffer,
     )
  |> WonderBsMost.Most.map(((editEngineState, gameObject)) => {
       /* let editEngineState =
          editEngineState
          |> ArcballCameraEngineService.unbindArcballCameraControllerEvent(
               GameObjectComponentEngineService.getArcballCameraControllerComponent(
                 2,
                 editEngineState,
               ),
             ); */

       let editEngineState =
         editEngineState
         |> SceneEngineService.disposeSceneAndChildren
         |> DirectorEngineService.loopBodyForEditEngineState(0.)
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
       |> DirectorEngineService.loopBodyForEditEngineState(0.)
       |> StateLogicService.setEditEngineState;
     })
  |> WonderBsMost.Most.flatMap(_ =>
       StateLogicService.getRunEngineState()
       |> AssembleWDBEngineService.assembleWDB(
            wdbResult.result |> FileReader.convertResultToArrayBuffer,
          )
       |> WonderBsMost.Most.map(((runEngineState, gameObject)) => {
            let (assetTree, editorState) =
              StateEditorService.getState()
              |> InspectorEditorService.clearComponentTypeMap
              |> SceneEditorService.clearCurrentSceneTreeNode
              |> AssetTreeNodeUtils.initRootAssetTree;

            editorState
            |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
                 gameObject,
                 runEngineState,
               )
            |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree)
            |> StateEditorService.setState
            |> ignore;

            WonderLog.Log.print("run enginestate component map") |> ignore;

            StateEditorService.getState()
            |> InspectorEditorService.getComponentTypeMap
            |> WonderLog.Log.print;

            WonderLog.Log.print("run dispose scene start") |> ignore;
            runEngineState
            |> SceneEngineService.disposeSceneAndChildren
            |> SceneEngineService.setSceneGameObject(gameObject)
            |> GameObjectEngineService.initGameObject(gameObject)
            |> StateLogicService.setRunEngineState;
            WonderLog.Log.print("run dispose scene end") |> ignore;
          })
     );

let loadWDB = (dispatchFunc, event) => {
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
               type_: AssetTreeNodeUtils.getUploadFileType(wdbInfo.type_),
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