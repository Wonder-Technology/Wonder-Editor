open Js.Promise;

let init = (editorState) =>
  AssetEngineService.loadToData(
    [|"./src/service/state/data/engine/setting.json", "./node_modules/wonder.js/data/"|],
    EngineStateDataEditorService.getEditEngineStateData()
  )
  |> Most.merge(
       AssetEngineService.loadToData(
         [|"./src/service/state/data/engine/runSetting.json", "./node_modules/wonder.js/data/"|],
         EngineStateDataEditorService.getRunEngineStateData()
       )
     )
  |> Most.forEach((value) => ())
  |> then_(
       () => {
         StateEngineService.setIsDebug(true) |> ignore;
         let editEngineState = StateLogicService.getEditEngineState();
         let (editEngineState, scene) = GameObjectEngineService.create(editEngineState);
         let (editEngineState, box) =
           editEngineState |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(scene);
         editEngineState
         |> DefaultSceneUtils.computeDiffValue(editorState)
         |> DefaultSceneUtils.createDefaultSceneForEdit(scene, box)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEditEngineState;
         let editorState = StateEditorService.getState();
         let engineState = StateLogicService.getRunEngineState();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         engineState
         |> DefaultSceneUtils.createDefaultSceneForRun(scene)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setRunEngineState;
         SceneEditorService.setScene(scene, editorState) |> resolve
       }
     );

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_((editorState) => editorState |> StateEditorService.setState |> resolve);