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
         let editorState = SceneEditorService.setEditScene(scene, editorState);
         engineState
         |> createDefaultScene(scene)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEngineStateForEdit;
         let engineState = StateLogicService.getEngineStateForRun();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         let editorState = SceneEditorService.setRunScene(scene, editorState);
         engineState
         |> createDefaultScene(scene)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEngineStateForRun;
         editorState |> resolve
       }
     );

let run = () => {
  EngineStateDataEditorService.setIsRun(true);
  LoopEngineService.loop() |> resolve
};

let stop = () => EngineStateDataEditorService.setIsRun(false);

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_((editorState) => editorState |> StateEditorService.setState |> resolve);