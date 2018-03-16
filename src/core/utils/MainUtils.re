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
  /* let engineState = MainEngineService.init("webgl", Js.true_); */
  AssetEngineService.load([|
    "./src/service/state/data/engine/setting.json",
    "./node_modules/wonder.js/data/"
  |])
  |> Most.forEach((value) => ())
  |> then_(
       () => {
         let engineState = StateEngineService.getState();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         let editorState = SceneEditorService.setScene(scene, editorState);
         let engineState = createDefaultScene(scene, engineState);
         (editorState, engineState |> DirectorEngineService.init) |> resolve
       }
     );

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_(
       ((editorState, engineState)) => {
         LoopEngineService.loop();
         (editorState |> StateEditorService.setState, engineState |> StateEngineService.setState)
         |> resolve
       }
     );