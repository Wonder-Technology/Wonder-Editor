open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorLightMaterial", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

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
      });
      let _getMaterialSphereLightMaterial = inspectorEngineState => {
        let (addedMaterialNodeId, newMaterialComponent) =
          MaterialInspectorCanvasTool.createNewMaterial();

        let materialSphereLightMaterial =
          inspectorEngineState
          |> MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
               MaterialDataAssetType.LightMaterial,
               newMaterialComponent,
               (
                 StateEditorService.getState(),
                 StateEngineService.unsafeGetState(),
               ),
             )
          |> InspectorEngineTool.getMaterialSphereLightMaterial(
               StateEditorService.getState(),
             );
        (materialSphereLightMaterial, newMaterialComponent);
      };
      describe(
        "test change currentSceneTreeNode's lightMaterial value should change materialSphere's  lightMaterial value",
        () => {
          test("test change color", () => {
            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();

            let (materialSphereLightMaterial, newMaterialComponent) =
              _getMaterialSphereLightMaterial(inspectorEngineState);

            let newColor = {
              "hex": "#7df1e8",
              "rgb": {
                "r": 125,
                "g": 241,
                "b": 232,
              },
            };

            MainEditorLightMaterialTool.changeColorWithInspectorEngineState(
              newMaterialComponent,
              newColor,
            );

            inspectorEngineState
            |> LightMaterialEngineService.getLightMaterialDiffuseColor(
                 materialSphereLightMaterial,
               )
            |> Color.getHexString
            |> expect ==
            newColor##hex;
          });
          test("test change shininess", () => {
            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            let shininessValue = 20.5;

            let (materialSphereLightMaterial, newMaterialComponent) =
              _getMaterialSphereLightMaterial(inspectorEngineState);

            MainEditorLightMaterialTool.changeShininessWithInspectorEngineState(
              ~material=newMaterialComponent,
              ~value=shininessValue,
              (),
            );

            inspectorEngineState
            |> LightMaterialEngineService.getLightMaterialShininess(
                 materialSphereLightMaterial,
               )
            |> expect == shininessValue;
          });
        },
      );
    });
  });