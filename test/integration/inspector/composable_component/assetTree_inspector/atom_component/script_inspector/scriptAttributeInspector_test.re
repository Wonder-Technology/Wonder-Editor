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

    describe("test add field", () => {
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
      });

      describe("test update script attribute in all script components", () => {
        beforeEach(() =>
          ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.createDefaultSceneAndAddScriptComponent(
            sandbox,
          )
        );

        test("test update one script component", () => {
          let (script, addedNodeId, fieldName) =
            ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
              sandbox,
            );

          ScriptAttributeInspectorTool.addDefaultField(
            ~sandbox,
            ~nodeId=addedNodeId,
            (),
          );

          let attributeName =
            ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
            |> StateLogicService.getEditorState;

          ScriptToolEngine.getScriptAttributeEntries(script, attributeName)
          |> StateLogicService.getEngineStateToGetData
          |> Js.Array.length
          |> expect == 2;
        });
      });
    });

    describe("test set field data", () => {
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
        );

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
      });

      describe("handle error", () =>
        test("if data is wrong, error", () => {
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );
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
            (fieldName, "aaa"),
          );

          error |> expect |> toCalled;
        })
      );

      describe("test update script attribute in all script components", () => {
        beforeEach(() =>
          ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.createDefaultSceneAndAddScriptComponent(
            sandbox,
          )
        );

        test("if only change field default value, not update", () => {
          let (script, addedNodeId, fieldName) =
            ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
              sandbox,
            );

          ScriptAttributeInspectorTool.updateScriptAttributeNodeByReplaceFieldData(
            addedNodeId,
            (
              fieldName,
              ScriptAttributeInspectorTool.buildFieldJsObjStr(
                ~type_=ScriptAttributeInspectorTool.getDefaultFieldType(),
                ~defaultValue=0.1,
              ),
            ),
          );

          let attributeName =
            ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
            |> StateLogicService.getEditorState;
          ScriptAttributeFieldTool.getScriptAttributeFieldDefaultValue(
            script,
            attributeName,
            fieldName,
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect
          == ScriptAttributeInspectorTool.getDefaultFieldDefaultValue();
        });

        describe("if change field type, update", () => {
          test("test update one script component", () => {
            let (script, addedNodeId, fieldName) =
              ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
                sandbox,
              );

            ScriptAttributeInspectorTool.updateScriptAttributeNodeByReplaceFieldData(
              addedNodeId,
              (
                fieldName,
                ScriptAttributeInspectorTool.buildFieldJsObjStr(
                  ~type_="int",
                  ~defaultValue=0,
                ),
              ),
            );

            let attributeName =
              ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
              |> StateLogicService.getEditorState;
            ScriptAttributeFieldTool.getScriptAttributeFieldType(
              script,
              attributeName,
              fieldName,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == Wonderjs.ScriptAttributeType.Int;
          });
          test("test update two script components", () => {
            let ((script1, script2), addedNodeId, fieldName) =
              ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForTwoScriptComponents(
                sandbox,
              );

            ScriptAttributeInspectorTool.updateScriptAttributeNodeByReplaceFieldData(
              addedNodeId,
              (
                fieldName,
                ScriptAttributeInspectorTool.buildFieldJsObjStr(
                  ~type_="int",
                  ~defaultValue=0,
                ),
              ),
            );

            let attributeName =
              ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
              |> StateLogicService.getEditorState;

            (
              ScriptAttributeFieldTool.getScriptAttributeFieldType(
                script1,
                attributeName,
                fieldName,
              )
              |> StateLogicService.getEngineStateToGetData,
              ScriptAttributeFieldTool.getScriptAttributeFieldType(
                script2,
                attributeName,
                fieldName,
              )
              |> StateLogicService.getEngineStateToGetData,
            )
            |> expect
            == (
                 Wonderjs.ScriptAttributeType.Int,
                 Wonderjs.ScriptAttributeType.Int,
               );
          });
        });
      });
    });

    describe("test remove field", () => {
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
          ~sandbox,
          ~nodeId=addedNodeId,
          ~fieldName,
          (),
        );

        ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
        |> StateLogicService.getEditorState
        |> Js.Array.length
        |> expect == 1;
      });

      describe("test update script attribute in all script components", () => {
        beforeEach(() =>
          ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.createDefaultSceneAndAddScriptComponent(
            sandbox,
          )
        );

        test("test update one script component", () => {
          let (script, addedNodeId, fieldName) =
            ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
              sandbox,
            );

          ScriptAttributeInspectorTool.updateScriptAttributeNodeByRemoveFieldData(
            ~sandbox,
            ~nodeId=addedNodeId,
            ~fieldName,
            (),
          );

          let attributeName =
            ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
            |> StateLogicService.getEditorState;

          ScriptToolEngine.getScriptAttributeEntries(script, attributeName)
          |> StateLogicService.getEngineStateToGetData
          |> Js.Array.length
          |> expect == 0;
        });
      });
    });

    describe("test rename field", () => {
      let _prepare = sandbox => {
        let warn =
          createMethodStubWithJsObjSandbox(
            sandbox,
            ConsoleTool.console,
            "warn",
          );
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

        let entries =
          ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
          |> StateLogicService.getEditorState;

        let (field1Name, _) = entries |> ArrayService.unsafeGetFirst;

        let (field2Name, _) = entries |> ArrayService.unsafeGetNth(1);

        (addedNodeId, field1Name, field2Name, warn);
      };

      test("if name not change, shouldn't warn", () => {
        let (addedNodeId, field1Name, field2Name, warn) = _prepare(sandbox);

        ScriptAttributeInspectorTool.renameField(
          ~sandbox,
          ~nodeId=addedNodeId,
          ~oldName=field1Name,
          ~newName=field1Name,
          (),
        );

        warn |> expect |> not_ |> toCalled;
      });

      describe("if rename to the existed field name of the attribute", () => {
        test(
          "if rename to the existed field name of the attribute, should fail",
          () => {
          let (addedNodeId, field1Name, field2Name, warn) =
            _prepare(sandbox);

          ScriptAttributeInspectorTool.renameField(
            ~sandbox,
            ~nodeId=addedNodeId,
            ~oldName=field1Name,
            ~newName=field2Name,
            (),
          );

          warn |> expect |> toCalledOnce;
        });
        test(
          "if rename to the existed field name of the attribute, should send",
          () => {
          let (addedNodeId, field1Name, field2Name, warn) =
            _prepare(sandbox);

          let send = SinonTool.createOneLengthStub(sandbox^);
          ScriptAttributeInspectorTool.renameField(
            ~sandbox,
            ~nodeId=addedNodeId,
            ~oldName=field1Name,
            ~newName=field2Name,
            ~send,
            (),
          );

          send |> expect |> toCalledOnce;
        });
      });

      test("sort attribute entries by field name", () => {
        let (addedNodeId, field1Name, field2Name, warn) = _prepare(sandbox);

        ScriptAttributeInspectorTool.renameField(
          ~sandbox,
          ~nodeId=addedNodeId,
          ~oldName=field1Name,
          ~newName="zzz",
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
      });

      describe("test update script attribute in all script components", () =>
        test("test update one script component", () => {
          ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.createDefaultSceneAndAddScriptComponent(
            sandbox,
          );
          let script = GameObjectTool.getCurrentSceneTreeNodeScript();
          let (addedNodeId, field1Name, field2Name, warn) =
            _prepare(sandbox);
          MainEditorScriptAttributeTool.addScriptAttribute(
            ~script,
            ~send=SinonTool.createOneLengthStub(sandbox^),
            (),
          );
          let newName = "zzz";

          ScriptAttributeInspectorTool.renameField(
            ~sandbox,
            ~nodeId=addedNodeId,
            ~oldName=field1Name,
            ~newName,
            (),
          );

          let attributeName =
            ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
            |> StateLogicService.getEditorState;
          ScriptToolEngine.getScriptAttributeFieldNames(script, attributeName)
          |> StateLogicService.getEngineStateToGetData
          |> Js.Array.sortInPlace
          |> expect == ([|newName, field2Name|] |> Js.Array.sortInPlace);
        })
      );
    });
  });