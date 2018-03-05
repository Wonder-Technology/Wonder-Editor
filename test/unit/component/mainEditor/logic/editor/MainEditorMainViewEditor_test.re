open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "editor: mainEditor mainView",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "fixbug",
        () =>
          test(
            "the main loop shouldn't change editorState",
            () => {
              TestToolUI.initMainEditor(sandbox);
              MainEditorSceneToolEngine.unsafeGetScene()
              |> MainEditorSceneToolEngine.getChildren
              |> OperateArrayUtils.getFirst
              |> MainEditorSceneToolEditor.setCurrentGameObject;
              let (editorState, engineState) = StateFacade.prepareState();
              MainEditorMainView.loopSetState(20.0, engineState);
              let (newEditorState, newEngineState) = StateFacade.prepareState();
              expect(editorState) == newEditorState
            }
          )
      )
    }
  );