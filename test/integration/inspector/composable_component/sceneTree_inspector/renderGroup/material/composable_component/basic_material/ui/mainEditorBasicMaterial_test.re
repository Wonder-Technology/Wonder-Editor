open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorBasicMaterial component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
      });

      PickColorTool.testOperateColorPickToChangeColor(
        sandbox,
        (
          GameObjectTool.getCurrentSceneTreeNodeBasicMaterial,
          MainEditorBasicMaterialTool.changeColor(false),
          BasicMaterialEngineService.getColor,
        ),
      );
    });

    /* TODO refactor move out to MainEditorBasicMaterialForAsset_test */
    describe("test change inspectorEngine value", () => {
      beforeEach(() => {
        MainEditorSceneTool.initInspectorEngineState(
          ~sandbox,
          ~isInitJob=false,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
              ~initPipelines=
                {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
              ~initJobs=
                {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
              (),
            ),
          (),
        );

        StateInspectorEngineService.unsafeGetState()
        |> MainUtils._handleInspectorEngineState
        |> StateInspectorEngineService.setState
        |> ignore;

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
      });

      let _getMaterialSphereBasicMaterial = inspectorEngineState => {
        let (addedMaterialNodeId, materialComponent) =
          MaterialInspectorCanvasTool.createNewMaterial();

        MaterialInspectorTool.changeMaterialType(
          ~material=materialComponent,
          ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
          ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
          ~materialNodeId=addedMaterialNodeId,
          (),
        );

        let inspectorEngine =
          MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
            MaterialDataAssetType.BasicMaterial,
            materialComponent,
            (
              StateEditorService.getState(),
              StateEngineService.unsafeGetState(),
            ),
          );

        InspectorEngineTool.getMaterialSphereBasicMaterial(
          StateEditorService.getState(),
          inspectorEngineState,
        );
      };

      /* TODO refactor: change to "test change basicMaterial asset's value should change materialSphere's basicMaterial value" */
      describe(
        "test change currentSceneTreeNode's basicMaterial value should change materialSphere's basicMaterial value",
        () =>
        test("test change color", () => {
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();

          let materialSphereBasicMaterial =
            _getMaterialSphereBasicMaterial(inspectorEngineState);

          let newColor = {
            "hex": "#7df1e8",
            "rgb": {
              "r": 125,
              "g": 241,
              "b": 232,
            },
          };

          MainEditorBasicMaterialTool.changeColor(
            true,
            GameObjectTool.getCurrentSceneTreeNodeBasicMaterial(),
            newColor,
          );

          inspectorEngineState
          |> BasicMaterialEngineService.getColor(materialSphereBasicMaterial)
          |> Color.getHexString
          |> expect ==
          newColor##hex;
        })
      );
    });
  });