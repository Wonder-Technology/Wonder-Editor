open Wonder_jest;

let _ =
  describe(
    "editor: mainEditor scene view",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
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
          let (_, _, currentGameObject) =
            MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
          currentGameObject |> expect == 1
        }
      )
    }
  );