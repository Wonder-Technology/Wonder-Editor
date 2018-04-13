open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine: mainEditor inspector",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test current gameObject",
        () => {
          test(
            "if not set currentGameObject, there hasn't currentGameObject",
            () => {
              MainEditorSceneTool.createDefaultScene(sandbox, () => ());
              GameObjectTool.hasCurrentGameObject() |> expect == false
            }
          );
          describe(
            "else can get currentGameObject",
            () => {
              let gameObject = 2;
              beforeEach(
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                  );
                  GameObjectTool.setCurrentGameObject(gameObject)
                }
              );
              test(
                "the hasCurrentGameObject should == true",
                () => GameObjectTool.hasCurrentGameObject() |> expect == true
              );
              test(
                "the currentGameObject should == the set one",
                () => GameObjectTool.unsafeGetCurrentGameObject() |> expect == gameObject
              )
            }
          )
          /* todo test gameObject components */
        }
      )
    }
  );