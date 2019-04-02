open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("script attribute inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test snapshot", () =>
      test("test add one field", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );

        BuildComponentTool.buildScriptAttributeInspectorComponent(
          ~currentNodeId=addedNodeId,
          ~name=
            ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
            |> StateLogicService.getEditorState,
          ~attribute=
            ScriptAttributeInspectorTool.getAttribute(addedNodeId)
            |> StateLogicService.getEditorState,
          (),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );

    describe("test add field", () =>
      test("test add two field", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );
        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );

        ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
        |> StateLogicService.getEditorState
        |> Js.Array.length
        |> expect == 2;
      })
    );

    describe("test set field data", () =>
      test("test change field type from int to float", () => {
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
        )
        |> StateLogicService.getAndSetEditorState;

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
    );

    describe("test remove field", () =>
      test("test remove one field", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );
        ScriptAttributeInspectorTool.addDefaultField(
          ~sandbox,
          ~nodeId=addedNodeId,
          (),
        );

        let (fieldName, _) =
          ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
          |> StateLogicService.getEditorState
          |> ArrayService.unsafeGetFirst;
        ScriptAttributeInspectorTool.updateScriptAttributeNodeByRemoveFieldData(
          addedNodeId,
          fieldName,
        )
        |> StateLogicService.getAndSetEditorState;

        ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
        |> StateLogicService.getEditorState
        |> Js.Array.length
        |> expect == 1;
      })
    );
  });