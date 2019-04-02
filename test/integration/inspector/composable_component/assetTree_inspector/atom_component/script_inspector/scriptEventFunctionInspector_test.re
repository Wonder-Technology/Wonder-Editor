open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("script event function inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("set event function data", () => {
      test("default data is empty closure function which returm {}", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

        ScriptEventFunctionInspectorTool.getEventFunctionDataJsObjStr(
          addedNodeId,
        )
        |> StateLogicService.getEditorState
        |> expect
        == ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr();
      });
      test("test set init,dispose event function", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
        let editorState = StateEditorService.getState();
        let jsObjStr =
          ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
            ~initFunc=Some((. script, api, state) => state),
            ~disposeFunc=Some((. script, api, state) => state),
            (),
          );
        ScriptEventFunctionInspectorTool.updateEventFunctionData(
          addedNodeId,
          ScriptEventFunctionInspectorTool.getEventFunctionName(
            addedNodeId,
            editorState,
          ),
          jsObjStr,
        );

        ScriptEventFunctionInspectorTool.getEventFunctionDataJsObjStr(
          addedNodeId,
        )
        |> StateLogicService.getEditorState
        |> expect == jsObjStr;
      });
    });
  });