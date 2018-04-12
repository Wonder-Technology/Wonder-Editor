open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine: gameObjectUtils",
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
      test(
        "test disposeGameObjectChildren",
        () => {
          MainEditorSceneTool.clearSceneChildren();
          MainEditorSceneTool.unsafeGetScene()
          |> GameObjectTool.getChildren
          |> Js.Array.length
          |> expect == 0
        }
      )
    }
  );