let initEngineMain = MainEditorMainBuss.initEngineMain;

let initEditor = MainEditorMainView._initEditor;

let init = (sandbox) => {
  let editorState = StateToolLogic.createEditorState();
  let engineState = MainEditorMainBuss.initEngineMain();
  let (_, engineState) = MainEditorMainView._initEditor((editorState, engineState));
  let engineState =
    engineState |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()));
  let engineState = MainEditorMainBuss.initEngineDirector(engineState);
  (editorState, engineState)
};