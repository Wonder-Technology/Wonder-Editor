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
      describe(
        "test current gameObject",
        () => {
          test(
            "if not set currentGameObject, there hasn't currentGameObject",
            () => {
              TestToolUI.initMainEditor(sandbox);
              MainEditorInspectorToolEditor.hasCurrentGameObject() |> expect == false
            }
          );
          describe(
            "else can get currentGameObject",
            () => {
              let gameObject = 2;
              beforeEach(
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorInspectorToolEditor.setCurrentGameObject(gameObject) 
                }
              );
              test(
                "the hasCurrentGameObject should == true",
                () => MainEditorInspectorToolEditor.hasCurrentGameObject() |> expect == true 
              );
              test(
                "the currentGameObject should == the set one",
                () => MainEditorInspectorToolEditor.getCurrentGameObject() |> expect == gameObject 
              );
            }
          );
          /* todo test gameObject components */
        }
      )
    }
  );