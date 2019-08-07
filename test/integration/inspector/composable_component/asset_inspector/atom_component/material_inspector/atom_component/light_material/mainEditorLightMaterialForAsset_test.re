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
        "test change currentSceneTreeNode's lightMaterial value should change materialSphere's lightMaterial value",
        () => {
          test("test change color", () => {
            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            let (
              inspectorEngineState,
              materialSphereLightMaterial,
              newMaterialComponent,
              addedMaterialNodeId,
            ) =
              MainEditorLightMaterialForAssetTool.prepareMaterialSphere(
                inspectorEngineState,
              );

            inspectorEngineState
            |> StateInspectorEngineService.setState
            |> ignore;

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

            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
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
              inspectorEngineState,
              materialSphereLightMaterial,
              newMaterialComponent,
              addedMaterialNodeId,
            ) =
              MainEditorLightMaterialForAssetTool.prepareMaterialSphere(
                inspectorEngineState,
              );
            inspectorEngineState
            |> StateInspectorEngineService.setState
            |> ignore;

            MainEditorLightMaterialForAssetTool.changeShininess(
              ~material=newMaterialComponent,
              ~value=shininessValue,
              (),
            );

            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            inspectorEngineState
            |> LightMaterialEngineService.getLightMaterialShininess(
                 materialSphereLightMaterial,
               )
            |> expect == shininessValue;
          });
        },
      );

      describe("redraw inspector canvas", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeImage();
          MainEditorAssetTool.buildFakeFileReader();
        });
        afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

        describe("drag texture", () =>
          testPromise("dispatch Inspector", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);

            let (
              addedMaterialNodeId,
              newMaterialComponent,
              imgCanvasFakeBase64Str,
              (inspectorCanvasDom, imgCanvasDom),
            ) =
              MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
                ~sandbox,
                (),
              );

            MainEditorAssetUploadTool.loadOneTexture()
            |> Js.Promise.then_(uploadedTextureNodeId => {
                 MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                   ~currentNodeId=addedMaterialNodeId,
                   ~textureNodeId=uploadedTextureNodeId,
                   ~material=newMaterialComponent,
                   (),
                 );

                 dispatchFuncStub
                 |> withOneArg(
                      AppStore.UpdateAction(
                        Update([|UpdateStore.Inspector|]),
                      ),
                    )
                 |> getCallCount
                 |> expect == 1
                 |> resolve;
               });
          })
        );

        describe("remove texture", () =>
          testPromise("dispatch Inspector", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);

            let (
              addedMaterialNodeId,
              newMaterialComponent,
              imgCanvasFakeBase64Str,
              (inspectorCanvasDom, imgCanvasDom),
            ) =
              MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
                ~sandbox,
                (),
              );

            MainEditorAssetUploadTool.loadOneTexture()
            |> Js.Promise.then_(uploadedTextureNodeId => {
                 MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                   ~currentNodeId=addedMaterialNodeId,
                   ~textureNodeId=uploadedTextureNodeId,
                   ~material=newMaterialComponent,
                   (),
                 );

                 MainEditorLightMaterialForAssetTool.removeTexture(
                   ~currentNodeId=uploadedTextureNodeId,
                   ~material=newMaterialComponent,
                   (),
                 );

                 dispatchFuncStub
                 |> withOneArg(
                      AppStore.UpdateAction(
                        Update([|UpdateStore.Inspector|]),
                      ),
                    )
                 |> getCallCount
                 |> expect == 2
                 |> resolve;
               });
          })
        );
      });
    });
  });