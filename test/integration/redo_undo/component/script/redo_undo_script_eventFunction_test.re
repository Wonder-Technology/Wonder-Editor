open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: script component->event function", () => {
    let sandbox = getSandboxDefaultVal();

    let _createCurrentSceneTreeNodeInspectorSnapshotAndMatch = () => {
      MainEditorSceneTreeTool.Select.selectGameObject(
        ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        (),
      );
      BuildComponentTool.buildScriptComponent(
        ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
        (),
      )
      |> ReactTestTool.createSnapshotAndMatch;
    };

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      MainEditorInspectorAddComponentTool.addScriptComponent();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test add script event function", () => {
      let _simulate = () => {
        let script = GameObjectTool.getCurrentSceneTreeNodeScript();
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

        MainEditorScriptEventFunctionTool.addScriptEventFunction(
          ~script,
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from first to zero", () => {
            _simulate();

            RedoUndoTool.undoHistoryState();

            _createCurrentSceneTreeNodeInspectorSnapshotAndMatch();
          })
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            "undo step which from first to zero, redo step which from zero to first",
            () => {
            _simulate();

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            _createCurrentSceneTreeNodeInspectorSnapshotAndMatch();
          })
        )
      );
    });

    describe("test change script event function", () => {
      let _simulate = () => {
        let script = GameObjectTool.getCurrentSceneTreeNodeScript();

        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

        MainEditorScriptEventFunctionTool.addScriptEventFunction(
          ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );

        let targetScriptEventFunctionNodeId =
          MainEditorScriptEventFunctionTool.getUnUsedScriptEventFunctionNodeIds(
            script,
          )
          |> StateLogicService.getStateToGetData
          |> ArrayService.unsafeGetFirst;

        MainEditorScriptEventFunctionTool.handleChangeScriptEventFunction(
          ~script,
          ~currentScriptEventFunctionNodeId=
            MainEditorScriptTool.getScriptAllEventFunctionNodeIds(script)
            |> StateLogicService.getStateToGetData
            |> ArrayService.unsafeGetFirst,
          ~targetScriptEventFunctionNodeId,
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from first to zero", () => {
            _simulate();

            RedoUndoTool.undoHistoryState();

            _createCurrentSceneTreeNodeInspectorSnapshotAndMatch();
          })
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            "undo step which from first to zero, redo step which from zero to first",
            () => {
            _simulate();

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            _createCurrentSceneTreeNodeInspectorSnapshotAndMatch();
          })
        )
      );
    });

    describe("test remove script event function", () => {
      let _simulate = () => {
        let script = GameObjectTool.getCurrentSceneTreeNodeScript();
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

        MainEditorScriptEventFunctionTool.addScriptEventFunction(
          ~script,
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );

        let eventFunctionName =
          ScriptEventFunctionInspectorTool.getEventFunctionName(addedNodeId)
          |> StateLogicService.getEditorState;

        MainEditorScriptEventFunctionTool.removeScriptEventFunction(
          ~script,
          ~eventFunctionName,
          ~dispatchFunc=SinonTool.createOneLengthStub(sandbox^),
          (),
        );
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from first to zero", () => {
            _simulate();

            RedoUndoTool.undoHistoryState();

            _createCurrentSceneTreeNodeInspectorSnapshotAndMatch();
          })
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            "undo step which from first to zero, redo step which from zero to first",
            () => {
            _simulate();

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            _createCurrentSceneTreeNodeInspectorSnapshotAndMatch();
          })
        )
      );
    });
  });