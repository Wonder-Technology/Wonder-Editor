open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetHeader",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            () => MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)()
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test ui component",
        () =>
          test(
            "test snapshot",
            () =>
              BuildComponentTool.buildAssetHeaderComponent()
              |> ReactTestTool.createSnapshotAndMatch
          )
      )
    }
  );