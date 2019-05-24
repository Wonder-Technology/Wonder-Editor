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

      describe("test material sphere's snapshot", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeImage();
          MainEditorAssetTool.buildFakeFileReader();
        });
        afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

        describe("create material sphere's snapshot", () => {
          describe("drag texture", () => {
            let _prepareAndExec =
                (~inspectorCanvasWidth=371, ~inspectorCanvasHeight=300, ()) => {
              let (
                addedMaterialNodeId,
                newMaterialComponent,
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
                  ~sandbox,
                  ~inspectorCanvasWidth,
                  ~inspectorCanvasHeight,
                  (),
                );

              MainEditorAssetUploadTool.loadOneTexture()
              |> Js.Promise.then_(uploadedTextureNodeId =>
                   MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                     ~currentNodeId=addedMaterialNodeId,
                     ~textureNodeId=uploadedTextureNodeId,
                     ~material=newMaterialComponent,
                     (),
                   )
                 )
              |> Js.Promise.then_(() =>
                   (
                     addedMaterialNodeId,
                     newMaterialComponent,
                     imgCanvasFakeBase64Str,
                     (inspectorCanvasDom, imgCanvasDom),
                   )
                   |> resolve
                 );
            };

            describe(
              "redraw inspector canvas in MaterialInspector->didMount", () =>
              testPromise("dispatch Inspector", () => {
                let dispatchFuncStub =
                  ReactTool.createDispatchFuncStub(sandbox);

                _prepareAndExec()
                |> Js.Promise.then_(_ =>
                     dispatchFuncStub
                     |> withOneArg(
                          AppStore.UpdateAction(
                            Update([|UpdateStore.Inspector|]),
                          ),
                        )
                     |> getCallCount
                     |> expect == 1
                     |> resolve
                   );
              })
            );

            testPromise("clear img canvas", () =>
              _prepareAndExec()
              |> Js.Promise.then_(_ => {
                   let editorState = StateEditorService.getState();

                   let imgContext =
                     editorState
                     |> ImgContextImgCanvasEditorService.unsafeGetImgContext;

                   CanvasType.convertContextToJsObj(imgContext)##clearRect
                   |> expect
                   |> toCalledWith([|0., 0., 50., 50.|])
                   |> resolve;
                 })
            );

            describe("clip the inspector-canvas snapshot", () => {
              testPromise(
                "img-canvas's drawImage calledWith inspector-canvas's clip area and img-canvas snapshot area",
                () =>
                _prepareAndExec()
                |> Js.Promise.then_(
                     (
                       (
                         addedMaterialNodeId,
                         newMaterialComponent,
                         imgCanvasFakeBase64Str,
                         (inspectorCanvasDom, imgCanvasDom),
                       ),
                     ) => {
                     let getContext = imgCanvasDom##getContext;
                     let drawImageFuncStub = getContext()##drawImage;

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
                        |])
                     |> resolve;
                   })
              );

              testPromise("clip should after dispatch Inspector", () => {
                let dispatchFuncStub =
                  ReactTool.createDispatchFuncStub(sandbox);

                _prepareAndExec()
                |> Js.Promise.then_(
                     (
                       (
                         addedMaterialNodeId,
                         newMaterialComponent,
                         imgCanvasFakeBase64Str,
                         (inspectorCanvasDom, imgCanvasDom),
                       ),
                     ) => {
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
            });

            describe("clip the inspector-canvas snapshot", () => {
              testPromise(
                "img-canvas's drawImage calledWith inspector-canvas's clip area and img-canvas snapshot area",
                () =>
                _prepareAndExec()
                |> Js.Promise.then_(
                     (
                       (
                         addedMaterialNodeId,
                         newMaterialComponent,
                         imgCanvasFakeBase64Str,
                         (inspectorCanvasDom, imgCanvasDom),
                       ),
                     ) => {
                     let getContext = imgCanvasDom##getContext;
                     let drawImageFuncStub = getContext()##drawImage;

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
                        |])
                     |> resolve;
                   })
              );

              testPromise("clip should after dispatch Inspector", () => {
                let dispatchFuncStub =
                  ReactTool.createDispatchFuncStub(sandbox);

                _prepareAndExec()
                |> Js.Promise.then_(
                     (
                       (
                         addedMaterialNodeId,
                         newMaterialComponent,
                         imgCanvasFakeBase64Str,
                         (inspectorCanvasDom, imgCanvasDom),
                       ),
                     ) => {
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
            });
          });

          describe("close color picker", () =>
            describe("clip the inspector-canvas snapshot", () =>
              test(
                "img-canvas's drawImage calledWith inspector-canvas's clip area and img-canvas snapshot area",
                () => {
                  let (
                    addedMaterialNodeId,
                    newMaterialComponent,
                    imgCanvasFakeBase64Str,
                    (inspectorCanvasDom, imgCanvasDom),
                  ) =
                    MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
                      ~sandbox,
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

                  let getContext = imgCanvasDom##getContext;
                  let drawImageFuncStub = getContext()##drawImage;
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
            )
          );
        });

        describe("store snapshot in imageDataMap", () => {
          describe("drag texture", () =>
            describe(
              "test exec light material dragToSetLightMaterialTexture eventHandler",
              () => {
              testPromise(
                "should store img canvas snapshot in imageDataMap's base64", () => {
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
              test(
                "should set imageDataMap's uint8Array and blobObjectURL is None",
                () => {
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

                MainEditorLightMaterialForAssetTool.closeColorPicker(
                  ~currentNodeId=addedMaterialNodeId,
                  ~material=newMaterialComponent,
                  ~color="#7df1e8",
                  (),
                );

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
                |> (
                  ({base64, uint8Array, blobObjectURL}) =>
                    (
                      base64 |> Js.Option.isSome,
                      uint8Array |> Js.Option.isSome,
                      blobObjectURL |> Js.Option.isSome,
                    )
                    |> expect == (true, false, false)
                );
              });
            })
          );

          describe("remove texture", () =>
            testPromise(
              "test exec light material removeTexture eventHandler", () => {
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
            })
          );

          describe("close color picker", () =>
            test(
              "test exec light material close color picker eventHandler", () => {
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
            })
          );

          describe("blur shininess", () =>
            test("test exec light material shininess blur eventHandler", () => {
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
            })
          );
        });
      });
    });
  });