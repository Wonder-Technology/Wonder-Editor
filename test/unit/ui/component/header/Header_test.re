open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Header ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          
          TestTool.initMainEditor(sandbox);
          MainEditorSceneTool.prepareDefaultScene(
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          beforeEach(() => TestTool.closeContractCheck());
          afterEach(() => TestTool.openContractCheck());
          test(
            "header ui component",
            () =>
              BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine())
              |> ReactTestTool.createSnapshotAndMatch
          )
        }
      )
    }
  );