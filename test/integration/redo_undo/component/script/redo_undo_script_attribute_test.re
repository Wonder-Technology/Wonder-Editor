open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: script component->attribute", () => {
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

    describe("test add script attribute", () => {
      let _simulate = () => {
        let script = GameObjectTool.getCurrentSceneTreeNodeScript();
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        MainEditorScriptAttributeTool.addScriptAttribute(
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

    describe("test set field's defaultValue and blur", () => {
      let _simulate = () => {
        let script = GameObjectTool.getCurrentSceneTreeNodeScript();

        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );

        MainEditorScriptAttributeTool.addScriptAttribute(
          ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );

        let engineState = StateEngineService.unsafeGetState();
        let attributeName =
          ScriptAttributeInspectorTool.getAttributeName(
            addedNodeId,
            engineState,
          );
        let attribute =
          ScriptAttributeInspectorTool.getAttribute(addedNodeId, engineState);
        let (fieldName, field) =
          ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
          |> StateLogicService.getEditorState
          |> ArrayService.unsafeGetFirst;

        let oldDefaultValue =
          ScriptAttributeInspectorTool.unsafeGetScriptAttributeFieldDefaultValue(
            addedNodeId,
            fieldName,
          )
          |> StateLogicService.getEditorState;

        let newDefaultValue = 1.1;

        engineState |> StateEngineService.setState |> ignore;

        MainEditorScriptAttributeTool.changeScriptAttributeFieldDefaultValueFloat(
          script,
          attributeName,
          fieldName,
          attribute,
          newDefaultValue,
        );

        MainEditorScriptAttributeTool.blurScriptAttributeFieldDefaultValueFloat(
          script,
          attributeName,
          fieldName,
          attribute,
          oldDefaultValue
          |> Wonderjs.ScriptAttributeType.scriptAttributeValueToFloat,
        );

        (
          script,
          attributeName,
          fieldName,
          (
            oldDefaultValue,
            newDefaultValue
            |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue,
          ),
        );
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from first to zero", () => {
            let (
              script,
              attributeName,
              fieldName,
              (oldDefaultValue, newDefaultValue),
            ) =
              _simulate();

            RedoUndoTool.undoHistoryState();

            ScriptAttributeFieldTool.unsafeGetScriptAttributeFieldDefaultValue(
              script,
              attributeName,
              fieldName,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == oldDefaultValue;
          })
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            "undo step which from first to zero, redo step which from zero to first",
            () => {
            let (
              script,
              attributeName,
              fieldName,
              (oldDefaultValue, newDefaultValue),
            ) =
              _simulate();

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            ScriptAttributeFieldTool.unsafeGetScriptAttributeFieldDefaultValue(
              script,
              attributeName,
              fieldName,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == newDefaultValue;
          })
        )
      );
    });

    describe("test change script attribute", () => {
      let _simulate = () => {
        let script = GameObjectTool.getCurrentSceneTreeNodeScript();

        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        MainEditorScriptAttributeTool.addScriptAttribute(
          ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );

        let targetScriptAttributeNodeId =
          MainEditorScriptTool.getUnUsedScriptAttributeNodeIds(script)
          |> StateLogicService.getStateToGetData
          |> ArrayService.unsafeGetFirst;

        MainEditorScriptAttributeTool.handleChangeScriptAttributeForChange(
          ~script,
          ~currentScriptAttributeNodeId=
            MainEditorScriptTool.getScriptAllAttributeNodeIds(script)
            |> StateLogicService.getStateToGetData
            |> ArrayService.unsafeGetFirst,
          ~targetScriptAttributeNodeId,
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

    describe("test remove script attribute", () => {
      let _simulate = () => {
        let script = GameObjectTool.getCurrentSceneTreeNodeScript();
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        MainEditorScriptAttributeTool.addScriptAttribute(
          ~script,
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );

        let attributeName =
          ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
          |> StateLogicService.getEditorState;

        MainEditorScriptAttributeTool.removeScriptAttribute(
          ~script,
          ~attributeName,
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