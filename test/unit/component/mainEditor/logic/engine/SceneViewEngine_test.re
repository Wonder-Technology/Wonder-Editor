open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine: mainEditor scene view",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "test disposeGameObjectChildren",
        () => {
          TestTool.initMainEditor(sandbox);
          MainEditorSceneTool.clearSceneChildren();
          MainEditorSceneTool.unsafeGetScene()
          |> GameObjectTool.getChildren
          |> Js.Array.length
          |> expect == 0
        }
      )
    }
  );