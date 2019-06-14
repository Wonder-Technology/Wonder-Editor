open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorBasicMaterialForAsset component", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test change inspectorEngine value", () => {
      let _prepareMaterialSphere = inspectorEngineState => {
        let (addedMaterialNodeId, newMaterialComponent) =
          MaterialInspectorCanvasTool.createNewMaterial();

        MaterialInspectorTool.changeMaterialType(
          ~material=newMaterialComponent,
          ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
          ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
          ~materialNodeId=addedMaterialNodeId,
          (),
        );

        let (editorState, (inspectorEngineState, _)) =
          inspectorEngineState
          |> MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
               MaterialDataAssetType.BasicMaterial,
               newMaterialComponent,
               StateEditorService.getState(),
               StateEngineService.unsafeGetState(),
             );

        editorState |> StateEditorService.setState |> ignore;

        let materialSphereBasicMaterial =
          inspectorEngineState
          |> InspectorEngineTool.getMaterialSphereBasicMaterial(
               StateEditorService.getState(),
             );

        (
          materialSphereBasicMaterial,
          newMaterialComponent,
          addedMaterialNodeId,
        );
      };

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

        MainEditorBasicMaterialForGameObjectTool.changeMaterialTypeToBeBasicMaterial();
      });

      describe(
        "test change basicMaterial asset's value should change materialSphere's basicMaterial's value",
        () =>
        test("test change color", () => {
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();
          let (
            materialSphereBasicMaterial,
            newMaterialComponent,
            addedMaterialNodeId,
          ) =
            _prepareMaterialSphere(inspectorEngineState);
          let newColor = {
            "hex": "#7df1e8",
            "rgb": {
              "r": 125,
              "g": 241,
              "b": 232,
            },
          };

          MainEditorBasicMaterialForAssetTool.changeColor(
            newMaterialComponent,
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