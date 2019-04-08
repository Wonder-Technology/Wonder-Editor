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
        == ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces();
      });
      test("test set init,dispose event function", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
        let editorState = StateEditorService.getState();
        let jsObjStr =
          ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(
            ~initFunc=Some((. script, api, state) => state),
            ~disposeFunc=Some((. script, api, state) => state),
            (),
          );

        let eventFunctionName =
          ScriptEventFunctionInspectorTool.getEventFunctionName(
            addedNodeId,
            editorState,
          );
        ScriptEventFunctionInspectorTool.updateEventFunctionData(
          addedNodeId,
          eventFunctionName,
          jsObjStr,
        );

        ScriptEventFunctionInspectorTool.getEventFunctionDataJsObjStr(
          addedNodeId,
        )
        |> StateLogicService.getEditorState
        |> expect == jsObjStr;
      });

      describe("handle error", () =>
        test("if eventFunctionJsObjStr is wrong data, error", () => {
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

          let editorState = StateEditorService.getState();
          let jsObjStr = "aaa";
          ScriptEventFunctionInspectorTool.updateEventFunctionData(
            addedNodeId,
            ScriptEventFunctionInspectorTool.getEventFunctionName(
              addedNodeId,
              editorState,
            ),
            jsObjStr,
          );

          error |> expect |> toCalledWith([|"aaa is not defined"|]);
        })
      );

      describe("test update script attribute in all script components", () => {
        beforeEach(() =>
          ScriptEventFunctionInspectorTool.TestUpdateScriptEventFunctionInAllScriptComponents.createDefaultSceneAndAddScriptComponent(
            sandbox,
          )
        );

        test("test update one script component", () => {
          let (script, addedNodeId) =
            ScriptEventFunctionInspectorTool.TestUpdateScriptEventFunctionInAllScriptComponents.prepareForOneScriptComponent(
              sandbox,
            );
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

          ScriptToolEngine.unsafeGetScriptEventFunctionData(
            script,
            eventFunctionName,
          )
          |> StateLogicService.getEngineStateToGetData
          |> ScriptEventFunctionInspector.Method.convertEventFunctionDataToJsObjStr
          |> StringTool.removeNewLinesAndSpaces
          |> expect == jsObjStr;
        });
      });
    });
  });