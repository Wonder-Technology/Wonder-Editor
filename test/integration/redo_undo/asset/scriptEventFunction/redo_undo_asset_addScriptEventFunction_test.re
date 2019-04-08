open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset add script event function", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateTwiceAddScriptEventFunction = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

      MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
      MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
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
      (_simulateTwiceAddScriptEventFunction, _beforeEach, _afterEach),
      BuildComponentTool.buildAssetChildrenNode,
    );
  });