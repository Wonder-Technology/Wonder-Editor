/* TODO there use GameObjectUtils */
let createDefaultScene = (scene, engineState) => {
  let (engineState, camera, box1, box2) =
    SceneEngineService.createDefaultSceneGameObjects(engineState);
  engineState
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
};

let init = (editorState) => {
  let engineState = MainEngineService.init("webgl", Js.true_);
  let (engineState, scene) = GameObjectEngineService.create(engineState);
  let editorState = SceneEditorService.setScene(scene, editorState);
  let engineState = createDefaultScene(scene, engineState);
  (editorState, engineState |> DirectorEngineService.init)
};

let start = () => {
  let (editorState, engineState) = StateEditorService.getState() |> init;
  LoopEngineService.loop();
  (editorState |> StateEditorService.setState, engineState |> StateEngineService.setState)
};