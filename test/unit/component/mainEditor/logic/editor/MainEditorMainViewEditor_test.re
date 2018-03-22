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
          
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "fixbug",
        () =>
          test(
            "the main loop shouldn't change editorState",
            () => {
              TestTool.initMainEditor(sandbox);
              MainEditorSceneTool.unsafeGetScene()
              |> GameObjectTool.getChildren
              |> ArrayService.getFirst
              |> MainEditorSceneTool.setCurrentGameObject;
              let engineState = StateLogicService.getEngineStateForEdit();
              let editorState = StateEditorService.getState();
              LoopEngineService.loopSetState(20.0, engineState);
              let newEditorState = StateEditorService.getState();
              expect(editorState) == newEditorState
            }
          )
      )
    }
  );