let initEngineMain = MainEditorBuss.initEngineMain;

let initEditor = MainEditorView._initEditor;

let init = (sandbox) => {
  let editorState = StateTool.createEditorState();
  let engineState = MainEditorBuss.initEngineMain();
  let (_, engineState) = MainEditorView._initEditor((editorState, engineState));
  let engineState =
    engineState |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()));
  let engineState = MainEditorBuss.initEngineDirector(engineState);
  (editorState, engineState)
};