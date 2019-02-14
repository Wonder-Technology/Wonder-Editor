open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("material inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test rename material", () => {
      test(
        "if type is basicMaterial, rename to default basic material name should not work",
        () => {
          ConsoleTool.notShowMessage();

          let addedMaterialNodeId = MaterialAssetTool.addOneBasicMaterial();

          let newName = MainEditorMaterialTool.getDefaultBasicMaterialName();

          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId,
            ~name=newName,
            (),
          );

          MainEditorAssetChildrenNodeTool.selectMaterialNode(
            ~nodeId=addedMaterialNodeId,
            (),
          );

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "if type is lightMaterial, rename to default light material name should not work",
        () => {
          ConsoleTool.notShowMessage();

          let addedMaterialNodeId = MaterialAssetTool.addOneLightMaterial();

          let newName = MainEditorMaterialTool.getDefaultLightMaterialName();

          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId,
            ~name=newName,
            (),
          );

          MainEditorAssetChildrenNodeTool.selectMaterialNode(
            ~nodeId=addedMaterialNodeId,
            (),
          );

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );

      describe("fix bug", () =>
        test("if rename the same name, shouldn't warn", () => {
          ConsoleTool.notShowMessage();

          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "warn",
            );

          let addedMaterialNodeId = MaterialAssetTool.addOneLightMaterial();

          let editorState = StateEditorService.getState();
          let engineState = StateEngineService.unsafeGetState();

          let {materialComponent, type_}: NodeAssetType.materialNodeData =
            OperateTreeAssetEditorService.unsafeFindNodeById(
              addedMaterialNodeId,
              editorState,
            )
            |> MaterialNodeAssetService.getNodeData;

          let newName =
            NodeNameAssetLogicService.getMaterialNodeName(
              ~material=materialComponent,
              ~type_,
              ~engineState,
            );

          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId,
            ~name=newName,
            (),
          );

          warn |> expect |> not_ |> toCalled;
        })
      );
    });
  });