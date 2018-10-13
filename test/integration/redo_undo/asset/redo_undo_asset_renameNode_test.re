open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset rename node", () => {
    let sandbox = getSandboxDefaultVal();

    let _getAssetFolderName = nodeId =>
      MainEditorAssetFolderNodeTool.getFolderName(
        nodeId,
        StateEditorService.getState(),
      );

    let _simulateTwiceChangeName = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildTwoFolderAssetTree();
      let nodeId =
        MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
          assetTreeData,
        );
      let name1 = "mickeyFolder1";
      let name2 = "mickeyFolder2";

      AssetTreeInspectorTool.Rename.renameAssetFolderNode(
        ~nodeId,
        ~name=name1,
        (),
      );
      AssetTreeInspectorTool.Rename.renameAssetFolderNode(
        ~nodeId,
        ~name=name2,
        (),
      );

      (nodeId, (name1, name2));
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.Asset,
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () => {
      test("test not undo", () => {
        let (nodeId, (name1, name2)) = _simulateTwiceChangeName();

        _getAssetFolderName(nodeId) |> expect == name2;
      });

      describe("test undo one step", () =>
        test("step which from second to first", () => {
          let (nodeId, (name1, name2)) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();

          _getAssetFolderName(nodeId) |> expect == name1;
        })
      );

      describe("test undo two step", () =>
        test("step which from second to zero", () => {
          let sourceName =
            MainEditorAssetFolderNodeTool.getDefaultFolderName();
          let (nodeId, (name1, name2)) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.undoHistoryState();

          _getAssetFolderName(nodeId) |> expect == sourceName;
        })
      );
    });

    describe("test redo operate", () => {
      describe("test redo one step", () =>
        test(
          "undo step which from second to zero, redo step which from zero to first",
          () => {
          let (nodeId, (name1, name2)) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          _getAssetFolderName(nodeId) |> expect == name1;
        })
      );

      describe("test redo two step", () =>
        test(
          "undo step which from second to zero,redo step which from zero to second",
          () => {
          let (nodeId, (name1, name2)) = _simulateTwiceChangeName();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();
          RedoUndoTool.redoHistoryState();

          _getAssetFolderName(nodeId) |> expect == name2;
        })
      );
    });
  });