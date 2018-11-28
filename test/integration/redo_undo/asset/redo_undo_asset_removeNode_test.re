open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset remove node", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateTwiceRemoveFolder = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildTwoFolderAssetTree();

      MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
        ~folderNodeId=
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
            assetTreeData,
          ),
        (),
      );

      MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
        ~folderNodeId=
          MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getSecondFolderNodeId(
            assetTreeData,
          ),
        (),
      );
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };

    let _afterEach = () => restoreSandbox(refJsObjToSandbox(sandbox^));

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceRemoveFolder, _beforeEach, _afterEach),
      BuildComponentTool.buildAssetComponent,
    );
  });