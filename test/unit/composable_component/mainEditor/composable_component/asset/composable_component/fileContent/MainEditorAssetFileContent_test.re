open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetFileContent",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
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
      );
      describe(
        "test set currentFile",
        () => {
          let _triggerImgClickEvent = (domChildren) => {
            let fileArticle = _getFromArray(domChildren, 0);
            BaseEventTool.triggerClickEvent(fileArticle)
          };
          let _triggerJsonClickEvent = (domChildren) => {
            let fileArticle = _getFromArray(domChildren, 1);
            BaseEventTool.triggerClickEvent(fileArticle)
          };
          beforeEach(
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTree)
              );
              AssetEditorService.clearCurrentFile |> StateLogicService.getEditorState |> ignore
            }
          );
          test(
            "click img file to set currentFile",
            () => {
              MainEditorAssetTool.setFolder2ToBeCurrentTreeNode();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerImgClickEvent);
              StateEditorService.getState()
              |> AssetEditorService.unsafeGetCurrentFile
              |> expect == MainEditorAssetTool.imgFileId
            }
          );
          test(
            "click json file to set currentFile",
            () => {
              MainEditorAssetTool.setFolder2ToBeCurrentTreeNode();
              let component = BuildComponentTool.buildAssetFileContentComponent();
              BaseEventTool.triggerComponentEvent(component, _triggerJsonClickEvent);
              StateEditorService.getState()
              |> AssetEditorService.unsafeGetCurrentFile
              |> expect == MainEditorAssetTool.jsonFileId
            }
          )
        }
      )
    }
  );