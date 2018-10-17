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
          ConsoleTool.markTestConsole();

          let addedMaterialNodeId = MaterialAssetTool.addOneBasicMaterial();

          let newName = MainEditorMaterialTool.getDefaultBasicMaterialName();

          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId,
            ~name=newName,
            (),
          );

          MainEditorAssetTreeTool.Select.selectMaterialNode(
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
          ConsoleTool.markTestConsole();

          let addedMaterialNodeId = MaterialAssetTool.addOneLightMaterial();

          let newName = MainEditorMaterialTool.getDefaultLightMaterialName();

          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId,
            ~name=newName,
            (),
          );

          MainEditorAssetTreeTool.Select.selectMaterialNode(
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
    });
  });