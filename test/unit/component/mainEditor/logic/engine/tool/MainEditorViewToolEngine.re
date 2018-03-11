let init = (sandbox) => {
  let editorState = StateToolLogic.createEditorState();
  let engineState = MainEngineService.init("webgl", Js.true_);
  let (engineState, scene) = GameObjectEngineService.create(engineState);
  let editorState = SceneEditorService.setScene(scene, editorState);
  let engineState = MainLogicService.createDefaultScene(scene, engineState);
  let engineState =
    engineState |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()));
  let engineState = engineState |> DirectorEngineService.init;
  (editorState, engineState)
};