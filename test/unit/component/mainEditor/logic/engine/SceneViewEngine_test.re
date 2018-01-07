open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine: mainEditor scene view",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "test disposeGameObjectChildren",
        () => {
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEngine.clearSceneChildren();
          MainEditorSceneToolEngine.getScene()
          |> MainEditorSceneToolEngine.getChildren
          |> Js.Array.length
          |> expect == 0
        }
      )
    }
  );