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
      InspectorCanvasTool.prepareInspectorEngineState(sandbox);

      CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ()) |> ignore;
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

      describe("fix bug", () => {
        test("if rename to the same name, should warn", () => {
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

          warn |> expect |> toCalledOnce;
        });
        test("if rename to the existed name in the same dir, should fail", () => {
          let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();
          let addedMaterialNodeId2 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let newName = "materialName";
          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId1,
            ~name=newName,
            (),
          );
          let material2OldName =
            MainEditorAssetMaterialNodeTool.getMaterialName(
              ~nodeId=addedMaterialNodeId2,
              (),
            );
          AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
            ~nodeId=addedMaterialNodeId2,
            ~name=newName,
            (),
          );

          (
            MainEditorAssetMaterialNodeTool.getMaterialName(
              ~nodeId=addedMaterialNodeId1,
              (),
            ),
            MainEditorAssetMaterialNodeTool.getMaterialName(
              ~nodeId=addedMaterialNodeId2,
              (),
            ),
          )
          |> expect == (newName, material2OldName);
        });
      });
    });

    describe("change material type", () =>
      test(
        "if source material has no gameObject, still dispose source material",
        () => {
        let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addMaterial();
        let materialComponent1 =
          MainEditorAssetMaterialNodeTool.getMaterialComponent(
            ~nodeId=addedMaterialNodeId1,
            (),
          );

        MainEditorAssetChildrenNodeTool.selectMaterialNode(
          ~nodeId=addedMaterialNodeId1,
          (),
        );
        MaterialInspectorTool.changeMaterialType(
          ~material=materialComponent1,
          ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
          ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
          ~materialNodeId=addedMaterialNodeId1,
          (),
        );

        LightMaterialToolEngine.isAlive(materialComponent1)
        |> StateLogicService.getEngineStateToGetData
        |> expect == false;
      })
    );
  });