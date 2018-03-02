open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine:Header component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEditor.prepareDefaultScene(
            MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test logic",
        () => {
          beforeEach(() => TestToolEditor.closeContractCheck());
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "test operate gameObject",
            () =>
              describe(
                "test dispose gameObject",
                () => {
                  beforeEach(
                    () =>
                      MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                      |> MainEditorSceneToolEditor.addFakeVboBufferForGameObject
                  );
                  test(
                    "if not set current gameObject, log error message and continue",
                    () => {
                      let error =
                        createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                      MainEditorSceneToolEditor.clearCurrentGameObject();
                      let component = BuildComponentTool.buildHeader(SceneTreeToolUI.buildAppStateSceneGraphFromEngine());
                      EventToolUI.triggerComponentEvent(
                        component,
                        OperateGameObjectEventTool.triggerClickDispose
                      );
                      LogToolUI.getErrorMessage(error)
                      |> expect
                      |> toContain("current gameObject should exist, but actual is None")
                    }
                  );
                  test(
                    "else, remove current gameObject from editorState",
                    () => {
                      let component = BuildComponentTool.buildHeader(SceneTreeToolUI.buildAppStateSceneGraphFromEngine());
                      EventToolUI.triggerComponentEvent(
                        component,
                        OperateGameObjectEventTool.triggerClickDispose
                      );
                      MainEditorSceneToolEditor.getCurrentGameObject()
                      |> Js.Option.isNone
                      |> expect == true
                    }
                  )
                }
              )
          )
        }
      )
    }
  );