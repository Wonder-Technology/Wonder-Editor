open Js.Promise;

let createDefaultScene = (scene, engineState) => {
  let (engineState, camera, box1, box2) =
    SceneEngineService.createDefaultSceneGameObjects(engineState);
  engineState
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
};

let init = (editorState) =>
  AssetEngineService.loadToData(
    [|"./src/service/state/data/engine/setting.json", "./node_modules/wonder.js/data/"|],
    EngineStateDataEditorService.getEngineStateDataForEdit()
  )
  |> Most.merge(
       AssetEngineService.loadToData(
         [|"./src/service/state/data/engine/runSetting.json", "./node_modules/wonder.js/data/"|],
         EngineStateDataEditorService.getEngineStateDataForRun()
       )
     )
  |> Most.forEach((value) => ())
  |> then_(
       () => {
         StateEngineService.setIsDebug(true) |> ignore;
         let engineState = StateLogicService.getEngineStateForEdit();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         let editorState = SceneEditorService.setScene(scene, editorState);
         engineState
         |> createDefaultScene(scene)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEngineStateForEdit;
         WonderLog.Log.print("fck this") |> ignore;
         let engineState = StateLogicService.getEngineStateForRun();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         engineState
         |> createDefaultScene(scene)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEngineStateForRun;
         WonderLog.Log.print("fck init ") |> ignore;
         editorState |> resolve
       }
     );

let run = () => {
  EngineStateDataEditorService.setIsRun(true);
  LoopEngineService.loop() |> resolve
};

let stop = () => {
  EngineStateDataEditorService.setIsRun(false);
  WonderLog.Log.print(LoopEditorService.getLoopId |> StateLogicService.getEditorState) |> ignore
};

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_((editorState) => editorState |> StateEditorService.setState |> resolve);