open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetFileContent",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test ui component",
        () => {
          test(
            "if not set currentTreeNode, show nothing",
            () =>
              BuildComponentTool.buildAssetFileContentComponent()
              |> ReactTestTool.createSnapshotAndMatch
          );
          describe(
            "else, show currentTreeNode's files",
            () => {
              test(
                "if currentTreeNode have no file, show nothing",
                () => {
                  MainEditorAssetTool.setFolder1ToBeCurrentTreeNode();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else, show files",
                () => {
                  MainEditorAssetTool.setFolder2ToBeCurrentTreeNode();
                  BuildComponentTool.buildAssetFileContentComponent()
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          )
        }
      )
    }
  );