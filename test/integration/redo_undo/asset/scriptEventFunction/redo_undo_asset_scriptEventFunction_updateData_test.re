open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset script event function->update data", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateOnceUpdateScriptEventFunctionData = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
      let addedNodeId = MainEditorAssetIdTool.getNewAssetId();

      MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

      let jsObjStr =
        ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(
          ~initFunc=Some((. script, api, state) => state),
          ~disposeFunc=Some((. script, api, state) => state),
          (),
        );

      let eventFunctionName =
        ScriptEventFunctionInspectorTool.getEventFunctionName(addedNodeId)
        |> StateLogicService.getEditorState;

      ScriptEventFunctionInspectorTool.updateEventFunctionData(
        addedNodeId,
        eventFunctionName,
        jsObjStr,
      );

      (addedNodeId, eventFunctionName, jsObjStr);
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
          let (addedNodeId, eventFunctionName, jsObjStr) =
            _simulateOnceUpdateScriptEventFunctionData();

          RedoUndoTool.undoHistoryState();

          ScriptEventFunctionInspectorTool.getEventFunctionDataJsObjStr(
            addedNodeId,
          )
          |> StateLogicService.getEditorState
          |> expect
          == ScriptEventFunctionInspectorTool.buildDefaultEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces();
        })
      )
    );

    describe("test redo operate", () =>
      describe("test redo one step", () =>
        test(
          "undo step which from first to zero, redo step which from zero to first",
          () => {
          let (addedNodeId, eventFunctionName, jsObjStr) =
            _simulateOnceUpdateScriptEventFunctionData();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          ScriptEventFunctionInspectorTool.getEventFunctionDataJsObjStr(
            addedNodeId,
          )
          |> StateLogicService.getEditorState
          |> expect == jsObjStr;
        })
      )
    );
  });