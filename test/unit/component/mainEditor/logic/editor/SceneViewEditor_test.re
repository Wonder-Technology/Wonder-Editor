open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "editor: mainEditor scene view",
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
        "get current gameObject,should get scene first gameObject exclude camera",
        () => {
          TestToolUI.initMainEditor(sandbox);
          WonderCommonlib.DebugUtils.logJson(MainEditorSceneToolEditor.getScene());
          let (_, _, currentGameObject) = MainEditorSceneToolEditor.getCurrentGameObject();
          currentGameObject |> expect == 1
        }
      )
    }
  );