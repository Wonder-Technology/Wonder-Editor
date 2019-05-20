open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset script attribute->add default field", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateOnceUpdateScriptAttributeData = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
      let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

      MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

      ScriptAttributeInspectorTool.addDefaultField(
        ~sandbox,
        ~nodeId=addedNodeId,
        (),
      );

      let attributeName =
        ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
        |> StateLogicService.getEditorState;

      let attribute =
        ScriptAttributeInspectorTool.getAttribute(addedNodeId)
        |> StateLogicService.getEditorState;

      addedNodeId;
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () =>
        test("step which from first to zero", () => {
          let addedNodeId = _simulateOnceUpdateScriptAttributeData();

          RedoUndoTool.undoHistoryState();

          BuildComponentTool.buildScriptAttributeInspectorComponent(
            ~currentNodeId=addedNodeId,
            (),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );

    describe("test redo operate", () =>
      describe("test redo one step", () =>
        test(
          "undo step which from first to zero, redo step which from zero to first",
          () => {
          let addedNodeId = _simulateOnceUpdateScriptAttributeData();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          BuildComponentTool.buildScriptAttributeInspectorComponent(
            ~currentNodeId=addedNodeId,
            (),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      )
    );
  });