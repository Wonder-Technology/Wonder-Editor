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

        let materialSphereBasicMaterial =
          inspectorEngineState
          |> MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
               MaterialDataAssetType.BasicMaterial,
               newMaterialComponent,
               (
                 StateEditorService.getState(),
                 StateEngineService.unsafeGetState(),
               ),
             )
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

      describe("test basic material create img snapshot for asset", () => {
        let _prepareInspectorMaterialSphereAndImgCanvas =
            (~inspectorCanvasWidth=300, ~inspectorCanvasHeight=300, ()) => {
          let getElementStub =
            SinonTool.createMethodStub(
              sandbox^,
              BuildCanvasTool.documentToJsObj(BuildCanvasTool.document),
              "getElementById",
            );
          let (
            _mainParentDom,
            _mainCanvasDom,
            _inspectorParentDom,
            inspectorCanvasDom,
          ) =
            CanvasTool.stubMainCanvasAndInspectorCanvasDom(
              ~sandbox,
              ~getElementStub,
              ~canvasWidth=inspectorCanvasWidth,
              ~canvasHeight=inspectorCanvasHeight,
              (),
            );
          let imgCanvasDom =
            CanvasTool.stubImgCanvasDom(~sandbox, ~getElementStub, ());
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();
          let imgCanvasFakeBase64Str =
            BuildCanvasTool.getImgCanvasFakeBase64Str();

          inspectorCanvasDom##toDataURL
          |> returns(BuildCanvasTool.getInspectorCanvasFakeBase64Str());
          imgCanvasDom##toDataURL |> returns(imgCanvasFakeBase64Str);

          let (
            materialSphereLightMaterial,
            newMaterialComponent,
            addedMaterialNodeId,
          ) =
            _prepareMaterialSphere(inspectorEngineState);
          (
            addedMaterialNodeId,
            newMaterialComponent,
            imgCanvasFakeBase64Str,
            inspectorCanvasDom,
          );
        };

        beforeEach(() => MainEditorAssetTool.buildFakeImage());
        afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

        describe("create img-canvas snapshot", () =>
          describe(
            "clip the inspector-canvas snapshot to create img-canvas snapshot",
            () =>
            describe(
              "test exec eventHandler should store the img canvas snapshot in imageDataMap",
              () =>
              test(
                "test exec basic material close color pick eventHandler", () => {
                let (
                  addedMaterialNodeId,
                  newMaterialComponent,
                  imgCanvasFakeBase64Str,
                  inspectorCanvasDom,
                ) =
                  _prepareInspectorMaterialSphereAndImgCanvas();

                MainEditorBasicMaterialForAssetTool.closeColorPicker(
                  ~currentNodeId=addedMaterialNodeId,
                  ~material=newMaterialComponent,
                  ~color="#7df1e8",
                  (),
                );

                MainEditorBasicMaterialForAssetTool.judgeImgCanvasSnapshotIsStoreInImageDataMap(
                  addedMaterialNodeId,
                  imgCanvasFakeBase64Str,
                );
              })
            )
          )
        );
      });
    });
  });