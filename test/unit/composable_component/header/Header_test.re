open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Header",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestTool.closeContractCheck();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
          )
        }
      );
      afterEach(
        () => {
          TestTool.openContractCheck();
          restoreSandbox(refJsObjToSandbox(sandbox^))
        }
      );
      describe(
        "test operate gameObject",
        () =>
          describe(
            "test dispose gameObject",
            () => {
              beforeEach(
                () =>
                  GameObjectTool.unsafeGetCurrentSceneTreeNode()
                  |> GameObjectTool.addFakeVboBufferForGameObject
              );
              test(
                "if not set current gameObject, log error message and continue",
                () => {
                  let error = createMethodStubWithJsObjSandbox(sandbox, Console.console, "error");
                  GameObjectTool.clearCurrentSceneTreeNode();
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob
                  );
                  LogTool.getMessage(error)
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
                    OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob
                  );
                  GameObjectTool.getCurrentSceneTreeNode() |> Js.Option.isNone |> expect == true
                }
              )
            }
          )
      )
    }
  );