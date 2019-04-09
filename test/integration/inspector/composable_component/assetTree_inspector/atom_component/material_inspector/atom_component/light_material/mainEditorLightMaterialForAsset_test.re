open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open NodeAssetType;

open Js.Promise;

let _ =
  describe("MainEditorLightMaterialForAsset component", () => {
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

        (
          materialSphereLightMaterial,
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
      });

      describe(
        "test change currentSceneTreeNode's lightMaterial value should change materialSphere's  lightMaterial value",
        () => {
          test("test change color", () => {
            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            let (
              materialSphereLightMaterial,
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

            MainEditorLightMaterialForAssetTool.changeColor(
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
            let (
              materialSphereLightMaterial,
              newMaterialComponent,
              addedMaterialNodeId,
            ) =
              _prepareMaterialSphere(inspectorEngineState);

            MainEditorLightMaterialForAssetTool.changeShininess(
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

      describe("test light material create img snapshot for asset", () => {
        let _prepareInspectorMaterialSphereAndImgCanvas = () => {
          let getElementStub =
            SinonTool.createMethodStub(
              sandbox^,
              BuildCanvasTool.documentToJsObj(BuildCanvasTool.document),
              "getElementById",
            );
          let (
            _mainParentDom,
            _mainCanvasDom,
            inspectorParentDom,
            inspectorCanvasDom,
          ) =
            CanvasTool.stubMainCanvasAndInspectorCanvasDom(
              ~sandbox,
              ~getElementStub,
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
          (addedMaterialNodeId, newMaterialComponent, imgCanvasFakeBase64Str);
        };

        beforeEach(() => MainEditorAssetTool.buildFakeImage());
        afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

        describe("create inspector canvas img snapshot", () =>
          describe(
            "clip the inspector canvas img snapshot to create img canvas snapshot",
            () =>
            describe(
              "test exec eventHandler should store the img canvas snapshot to store in imageDataMap",
              () =>
              testPromise(
                "test exec light material close color pick eventHandler", () => {
                let (
                  addedMaterialNodeId,
                  newMaterialComponent,
                  imgCanvasFakeBase64Str,
                ) =
                  _prepareInspectorMaterialSphereAndImgCanvas();

                MainEditorLightMaterialForAssetTool.closeColorPicker(
                  ~currentNodeId=addedMaterialNodeId,
                  ~material=newMaterialComponent,
                  ~color="#7df1e8",
                  (),
                )
                |> then_(_ => {
                     let editorState = StateEditorService.getState();
                     let {imageDataIndex} =
                       editorState
                       |> OperateTreeAssetEditorService.unsafeFindNodeById(
                            addedMaterialNodeId,
                          )
                       |> MaterialNodeAssetService.getNodeData;

                     editorState
                     |> ImageDataMapAssetEditorService.unsafeGetData(
                          imageDataIndex,
                        )
                     |> WonderLog.Log.print
                     |> (
                       ({base64}) =>
                         base64
                         |> OptionService.unsafeGet
                         |> expect == imgCanvasFakeBase64Str
                         |> resolve
                     );
                   });
              })
            )
          )
        );
      });
    });
  });