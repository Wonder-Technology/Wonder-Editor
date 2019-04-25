open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset script attribute->operate field", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test rename field", () => {
      let _simulate = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );

        let (fieldName, _) =
          ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
          |> StateLogicService.getEditorState
          |> ArrayService.unsafeGetFirst;

        let newFieldName = "aaa";

        ScriptAttributeInspectorTool.renameField(
          ~sandbox,
          ~nodeId=addedNodeId,
          ~oldName=fieldName,
          ~newName=newFieldName,
          (),
        );

        (addedNodeId, (fieldName, newFieldName));
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from first to zero", () => {
            let (addedNodeId, (oldFieldName, newFieldName)) = _simulate();

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
            let (addedNodeId, (oldFieldName, newFieldName)) = _simulate();

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

    describe("test set field data", () => {
      let _simulate = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );

        let (fieldName, field) =
          ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
          |> StateLogicService.getEditorState
          |> ArrayService.unsafeGetFirst;
        ScriptAttributeInspectorTool.updateScriptAttributeNodeByReplaceFieldData(
          addedNodeId,
          (
            fieldName,
            ScriptAttributeInspectorTool.buildFieldJsObjStr(
              ~type_="float",
              ~defaultValue=0.1,
            ),
          ),
        );

        (addedNodeId, (fieldName, field));
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from first to zero", () => {
            let (addedNodeId, (fieldName, oldField)) = _simulate();

            RedoUndoTool.undoHistoryState();

            ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
            |> StateLogicService.getEditorState
            |> ArrayService.unsafeGetFirst
            |> expect == (fieldName, oldField);
          })
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            "undo step which from first to zero, redo step which from zero to first",
            () => {
            let (addedNodeId, (oldFieldName, newFieldName)) = _simulate();

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
            |> StateLogicService.getEditorState
            |> ArrayService.unsafeGetFirst
            |> expect
            == (
                 ScriptAttributeNodeNameAssetService.getNewFieldName(),
                 ScriptAttributeInspectorTool.buildField(
                   ~type_=Wonderjs.ScriptAttributeType.Float,
                   ~defaultValue=0.1,
                 ),
               );
          })
        )
      );
    });

    describe("test remove field", () => {
      let _simulate = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );

        let (fieldName, field) =
          ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
          |> StateLogicService.getEditorState
          |> ArrayService.unsafeGetFirst;

        ScriptAttributeInspectorTool.updateScriptAttributeNodeByRemoveFieldData(
          ~sandbox,
          ~nodeId=addedNodeId,
          ~fieldName,
          (),
        );

        addedNodeId;
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from first to zero", () => {
            let addedNodeId = _simulate();

            RedoUndoTool.undoHistoryState();

            ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
            |> StateLogicService.getEngineStateToGetData
            |> Js.Array.length
            |> expect > 0;
          })
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            "undo step which from first to zero, redo step which from zero to first",
            () => {
            let addedNodeId = _simulate();

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
            |> StateLogicService.getEngineStateToGetData
            |> Js.Array.length
            |> expect == 0;
          })
        )
      );
    });
  });