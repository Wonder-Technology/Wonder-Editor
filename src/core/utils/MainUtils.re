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
  |> Most.forEach((value) => ())
  |> then_(
       () => {
         StateEngineService.setIsDebug(true) |> ignore;
         let engineState = StateLogicService.getEngineStateForEdit();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         let editorState = SceneEditorService.setScene(scene, editorState);
         let engineState = createDefaultScene(scene, engineState);
         (editorState, engineState |> DirectorEngineService.init) |> resolve
       }
     );

let run = () =>
  AssetEngineService.loadToData(
    [|"./src/service/state/data/engine/runSetting.json", "./node_modules/wonder.js/data/"|],
    EngineStateDataEditorService.getEngineStateDataForRun()
  )
  |> Most.forEach((value) => ())
  |> then_(
       () => {
         EngineStateDataEditorService.setIsRun(true);
         let engineState = StateLogicService.getEngineStateForRun();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         let engineState = createDefaultScene(scene, engineState);
         engineState |> DirectorEngineService.init |> StateLogicService.setEngineStateForRun;
         LoopEngineService.loop() |> resolve
       }
     );

let stop = () => {
  EngineStateDataEditorService.setIsRun(false);
  WonderLog.Log.print(LoopEditorService.getLoopId |> StateLogicService.getEditorState) |> ignore
};

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_(
       ((editorState, engineState)) => {
         let engineState = engineState |> DirectorEngineService.loopBody(0.);
         (
           editorState |> StateEditorService.setState,
           engineState |> StateLogicService.setEngineStateForEdit
         )
         |> resolve
       }
     );