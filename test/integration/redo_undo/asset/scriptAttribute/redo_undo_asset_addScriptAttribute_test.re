open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset add script attribute", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateTwiceAddScriptAttribute = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

      MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
      MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
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
      (_simulateTwiceAddScriptAttribute, _beforeEach, _afterEach),
      BuildComponentTool.buildAssetChildrenNode,
    );
  });