let createDefaultScene = (scene, engineState) => {
  let (engineState, camera, box1, box2) =
    SceneEngineService.createDefaultSceneGameObjects(engineState);
  engineState
  |> GameObjectEngineService.addChild(scene, camera)
  |> GameObjectEngineService.addChild(scene, box1)
  |> GameObjectEngineService.addChild(scene, box2)
};

let init = (editorState) => {
  let engineState = MainEngineService.init("webgl", Js.true_);
  let (engineState, scene) = GameObjectEngineService.create(engineState);
  let editorState = SceneService.setScene(scene, editorState);
  let engineState = createDefaultScene(scene, engineState);
  (editorState, engineState |> DirectorEngineService.init)
};

let loopSetState = (time, engineState) => engineState |> DirectorEngineService.loopBody(time);

let loop = () => {
  let rec _loopRequest = (time) =>
    DomHelper.requestAnimationFrame(
      (time) => {
        loopSetState(time) |> StateLogicService.getAndSetEngineState;
        _loopRequest(time) |> ignore
      }
    );
  _loopRequest(0.) |> ignore
};

let start = () => {
  let (editorState, engineState) = StateEditorService.getState() |> init;
  loop();
  (
    editorState |> StateEditorService.setState,
    engineState |> StateEngineService.setState
  )
};