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
          MainEditorSceneTool.initStateAndGl(sandbox);
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test logic",
        () => {
          beforeEach(() => TestTool.closeContractCheck());
          afterEach(() => TestTool.openContractCheck());
          describe(
            "test operate gameObject",
            () =>
              describe(
                "test dispose gameObject",
                () => {
                  beforeEach(
                    () =>
                      GameObjectTool.unsafeGetCurrentGameObject()
                      |> GameObjectTool.addFakeVboBufferForGameObject
                  );
                  test(
                    "if not set current gameObject, log error message and continue",
                    () => {
                      let error =
                        createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                      GameObjectTool.clearCurrentGameObject();
                      let component =
                        BuildComponentTool.buildHeader(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        OperateGameObjectEventTool.triggerClickDispose
                      );
                      LogTool.getErrorMessage(error)
                      |> expect
                      |> toContain("current gameObject should exist, but actual is None")
                    }
                  );
                  test(
                    "else, remove current gameObject from editorState",
                    () => {
                      let component =
                        BuildComponentTool.buildHeader(
                          SceneTreeTool.buildAppStateSceneGraphFromEngine()
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        OperateGameObjectEventTool.triggerClickDispose
                      );
                      GameObjectTool.getCurrentGameObject()
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