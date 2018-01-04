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
        "test getCurrentGameObject method,should get scene first gameObject exclude camera",
        () => {
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEngine.getCurrentGameObject() |> expect == 1
        }
      );
      test(
        "test disposeGameObjectChildren",
        () => {
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEngine.clearSceneChildren();
          MainEditorSceneToolEngine.getScene()
          |> WonderCommonlib.DebugUtils.log
          |> MainEditorSceneToolEngine.getChildren
          |> Js.Array.length
          |> expect == 0
        }
      )
    }
  );