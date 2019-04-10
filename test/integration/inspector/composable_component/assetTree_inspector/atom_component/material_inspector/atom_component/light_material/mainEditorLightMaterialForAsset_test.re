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
            (inspectorCanvasDom, imgCanvasDom),
          );
        };

        beforeEach(() => MainEditorAssetTool.buildFakeImage());
        afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

        describe("create img-canvas snapshot", () =>
          describe(
            "clip the inspector-canvas snapshot to create img-canvas snapshot",
            () => {
            beforeEach(() => {
              MainEditorAssetTool.buildFakeFileReader();
              MainEditorAssetTool.buildFakeImage();
            });

            describe(
              "create img-canvas snapshot after materialInspector component didMount",
              () => {
              testPromise(
                "test dispatch Inspector before img-canvas drawImage", () => {
                let dispatchFuncStub =
                  ReactTool.createDispatchFuncStub(sandbox);

                let (
                  addedMaterialNodeId,
                  newMaterialComponent,
                  imgCanvasFakeBase64Str,
                  (inspectorCanvasDom, imgCanvasDom),
                ) =
                  _prepareInspectorMaterialSphereAndImgCanvas();

                MainEditorAssetUploadTool.loadOneTexture()
                |> Js.Promise.then_(uploadedTextureNodeId =>
                     MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                       ~currentNodeId=addedMaterialNodeId,
                       ~textureNodeId=uploadedTextureNodeId,
                       ~material=newMaterialComponent,
                       (),
                     )
                   )
                |> Js.Promise.then_(_ => {
                     let getContext = imgCanvasDom##getContext;
                     let drawImageFuncStub = getContext()##drawImage;

                     dispatchFuncStub
                     |> withOneArg(
                          AppStore.UpdateAction(
                            Update([|UpdateStore.Inspector|]),
                          ),
                        )
                     |> calledBefore(_, drawImageFuncStub)
                     |> expect == true
                     |> resolve;
                   });
              });

              describe("test create img-canvas snapshot size", () =>
                test(
                  "test img-canvas drawImage callWith inspector-canvas's clip area and img-canvas snapshot area",
                  () => {
                    let (
                      addedMaterialNodeId,
                      newMaterialComponent,
                      imgCanvasFakeBase64Str,
                      (inspectorCanvasDom, imgCanvasDom),
                    ) =
                      _prepareInspectorMaterialSphereAndImgCanvas(
                        ~inspectorCanvasWidth=371,
                        ~inspectorCanvasHeight=300,
                        (),
                      );

                    MainEditorLightMaterialForAssetTool.closeColorPicker(
                      ~currentNodeId=addedMaterialNodeId,
                      ~material=newMaterialComponent,
                      ~color="#7df1e8",
                      (),
                    );
                    let inspectorCanvasSnapshot =
                      BuildCanvasTool.getInspectorCanvasFakeBase64Str();
                    let editorState = StateEditorService.getState();

                    let imgContext =
                      editorState
                      |> ImgContextImgCanvasEditorService.unsafeGetImgContext;

                    CanvasType.convertContextToJsObj(imgContext)##drawImage
                    |> expect
                    |> toCalledWith([|
                         inspectorCanvasDom |> Obj.magic,
                         85.5,
                         50.,
                         200.,
                         200.,
                         0.,
                         0.,
                         50.,
                         50.,
                       |]);
                  },
                )
              );

              describe(
                "test exec eventHandler should store the img canvas snapshot in imageDataMap",
                () => {
                  test(
                    "test exec light material close color pick eventHandler",
                    () => {
                    let (
                      addedMaterialNodeId,
                      newMaterialComponent,
                      imgCanvasFakeBase64Str,
                      (inspectorCanvasDom, imgCanvasDom),
                    ) =
                      _prepareInspectorMaterialSphereAndImgCanvas();

                    MainEditorLightMaterialForAssetTool.closeColorPicker(
                      ~currentNodeId=addedMaterialNodeId,
                      ~material=newMaterialComponent,
                      ~color="#7df1e8",
                      (),
                    );

                    MainEditorLightMaterialForAssetTool.judgeImgCanvasSnapshotIsStoreInImageDataMap(
                      addedMaterialNodeId,
                      imgCanvasFakeBase64Str,
                    );
                  });
                  test(
                    "test exec light material shininess blur eventHandler", () => {
                    let (
                      addedMaterialNodeId,
                      newMaterialComponent,
                      imgCanvasFakeBase64Str,
                      (inspectorCanvasDom, imgCanvasDom),
                    ) =
                      _prepareInspectorMaterialSphereAndImgCanvas();

                    MainEditorLightMaterialForAssetTool.blurShininess(
                      ~currentNodeId=addedMaterialNodeId,
                      ~material=newMaterialComponent,
                      ~value=15.5,
                      (),
                    );

                    MainEditorLightMaterialForAssetTool.judgeImgCanvasSnapshotIsStoreInImageDataMap(
                      addedMaterialNodeId,
                      imgCanvasFakeBase64Str,
                    );
                  });
                  testPromise(
                    "test exec light material dragToSetLightMaterialTexture eventHandler",
                    () => {
                    let (
                      addedMaterialNodeId,
                      newMaterialComponent,
                      imgCanvasFakeBase64Str,
                      (inspectorCanvasDom, imgCanvasDom),
                    ) =
                      _prepareInspectorMaterialSphereAndImgCanvas();

                    MainEditorAssetUploadTool.loadOneTexture()
                    |> Js.Promise.then_(uploadedTextureNodeId =>
                         MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                           ~currentNodeId=addedMaterialNodeId,
                           ~textureNodeId=uploadedTextureNodeId,
                           ~material=newMaterialComponent,
                           (),
                         )
                       )
                    |> Js.Promise.then_(_ =>
                         MainEditorLightMaterialForAssetTool.judgeImgCanvasSnapshotIsStoreInImageDataMap(
                           addedMaterialNodeId,
                           imgCanvasFakeBase64Str,
                         )
                         |> resolve
                       );
                  });
                  testPromise(
                    "test exec light material removeTexture eventHandler", () => {
                    let (
                      addedMaterialNodeId,
                      newMaterialComponent,
                      imgCanvasFakeBase64Str,
                      (inspectorCanvasDom, imgCanvasDom),
                    ) =
                      _prepareInspectorMaterialSphereAndImgCanvas();

                    MainEditorAssetUploadTool.loadOneTexture()
                    |> Js.Promise.then_(uploadedTextureNodeId => {
                         MainEditorLightMaterialForAssetTool.dragAssetTextureToMapNotCreateImgCanvasSnapshot(
                           ~textureNodeId=uploadedTextureNodeId,
                           ~material=newMaterialComponent,
                           (),
                         );

                         MainEditorLightMaterialForAssetTool.removeTexture(
                           ~currentNodeId=addedMaterialNodeId,
                           ~material=newMaterialComponent,
                           (),
                         );
                       })
                    |> Js.Promise.then_(_ =>
                         MainEditorLightMaterialForAssetTool.judgeImgCanvasSnapshotIsStoreInImageDataMap(
                           addedMaterialNodeId,
                           imgCanvasFakeBase64Str,
                         )
                         |> resolve
                       );
                  });
                },
              );
            });
          })
        );
      });
    });
  });