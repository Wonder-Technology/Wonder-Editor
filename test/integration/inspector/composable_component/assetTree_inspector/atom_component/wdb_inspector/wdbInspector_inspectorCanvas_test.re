open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("wdb inspector: inspector canvas", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let sceneWDBArrayBuffer = ref(Obj.magic(1));

    let _didMount = (currentNodeId, editorState) =>
      WDBInspector.Method.didMount(
        currentNodeId,
        MainEditorAssetWDBNodeTool.getWDBGameObject(
          currentNodeId,
          editorState,
        ),
        TestTool.getDispatch(),
      );

    let _getInspectorCameraArcballCameraControllerDistance =
        inspectorEngineState =>
      inspectorEngineState
      |> InspectorEngineTool.unsafeGetSceneFirstCamera
      |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
           _,
           inspectorEngineState,
         )
      |> ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
           _,
           inspectorEngineState,
         );

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
      sceneWDBArrayBuffer := WDBTool.generateSceneWDBWithArcballCameraController();
    });

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      WDBInspectorTool.prepareInspectorEngineState(~sandbox, ());

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );

      MainEditorAssetTool.buildFakeFileReader();
      MainEditorAssetTool.buildFakeImage();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);
      LoadTool.buildFakeLoadImage(.);
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test didMount", () => {
      describe("restore arcball camer controllear", () => {
        beforeEach(() => {
          let _ =
            InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());
          ();
        });

        testPromise("restore it's phi,theta", () =>
          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let editorState = StateEditorService.getState();

               _didMount(uploadedWDBNodeId, editorState);

               InspectorCanvasTool.ArcballCameraController.getAngleData
               |> StateLogicService.getInspectorEngineStateToGetData
               |> expect == InspectorCanvasTool.ArcballCameraController.getDefaultAngleData()
               |> resolve;
             })
        );
        testPromise("update arcball camera controller", () => {
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
                ~loopPipelines=
                  {|
                [
                 {
                   "name": "default",
                   "jobs": [
                       {"name": "update_camera" }
                   ]
                 }
               ]
                |},
                ~loopJobs=
                  {|
                [
                       {"name": "update_camera" }
                ]
                |},
                (),
              ),
            (),
          );
          MainUtils._handleInspectorEngineState
          |> StateLogicService.getAndSetInspectorEngineState;

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let editorState = StateEditorService.getState();

               _didMount(uploadedWDBNodeId, editorState);

               InspectorCanvasTool.ArcballCameraController.getGameObjectTransformLocalPosition
               |> StateLogicService.getInspectorEngineStateToGetData
               |> expect == (0., 0.12, 1.64)
               |> resolve;
             });
        });
      });

      describe("clone wdb gameObject show in inspector-canvas", () => {
        testPromise(
          "test clone wdb gameObject should add into container gameObject", () => {
          let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
            InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let editorState = StateEditorService.getState();
               let engineState = StateEngineService.unsafeGetState();
               let inspectorEngineState =
                 StateInspectorEngineService.unsafeGetState();

               let newGameObject =
                 GameObjectTool.getNewGameObject(
                   ~engineState=inspectorEngineState,
                   (),
                 );

               _didMount(uploadedWDBNodeId, editorState);

               let containerGameObjectFirstChild =
                 (editorState, inspectorEngineState)
                 |> InspectorEngineTool.getWDBGameObject
                 |> OptionService.unsafeGet;

               containerGameObjectFirstChild
               |> expect == newGameObject
               |> resolve;
             });
        });
        testPromise("test inspector canvas camera distance", () => {
          let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
            InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let editorState = StateEditorService.getState();
               let engineState = StateEngineService.unsafeGetState();

               let inspectorEngineState =
                 StateInspectorEngineService.unsafeGetState();
               let oldCameraArcballControllerDistance =
                 inspectorEngineState
                 |> _getInspectorCameraArcballCameraControllerDistance;

               _didMount(uploadedWDBNodeId, editorState);

               let inspectorEngineState =
                 StateInspectorEngineService.unsafeGetState();

               let newCameraArcballControllerDistance =
                 inspectorEngineState
                 |> _getInspectorCameraArcballCameraControllerDistance
                 |> FloatService.truncateFloatValue(_, 1);

               (
                 oldCameraArcballControllerDistance,
                 newCameraArcballControllerDistance,
               )
               |> expect
               == (InspectorCanvasUtils.getCameraDefaultDistance(), 1.6)
               |> resolve;
             });
        });

        describe("clone the wdb gameObject and all children", () =>
          describe("cloned gameObject data should equal to source one", () => {
            let _getSceneFirstCubeFirstChild =
                (sceneWDBGameObject, engineState) =>
              engineState
              |> HierarchyGameObjectEngineService.getChildren(
                   sceneWDBGameObject,
                 )
              |> ArrayService.unsafeGetFirst
              |> HierarchyGameObjectEngineService.getChildren(_, engineState)
              |> ArrayService.unsafeGetFirst;

            testPromise(
              "test cloned-gameObject's all children length and name", () => {
              let (
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                InspectorCanvasTool.prepareInspectorAndImgCanvas(
                  ~sandbox,
                  (),
                );

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=sceneWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let editorState = StateEditorService.getState();
                   let engineState = StateEngineService.unsafeGetState();
                   let inspectorEngineState =
                     StateInspectorEngineService.unsafeGetState();

                   let sceneWDBGameObject =
                     MainEditorAssetWDBNodeTool.getWDBGameObject(
                       uploadedWDBNodeId,
                       editorState,
                     );

                   _didMount(uploadedWDBNodeId, editorState);

                   let inspectorClonedGameObject =
                     (editorState, inspectorEngineState)
                     |> InspectorEngineTool.getWDBGameObject
                     |> OptionService.unsafeGet;

                   (
                     engineState
                     |> HierarchyGameObjectEngineService.getChildren(
                          sceneWDBGameObject,
                        )
                     |> Js.Array.length,
                     engineState
                     |> _getSceneFirstCubeFirstChild(sceneWDBGameObject)
                     |> GameObjectEngineService.unsafeGetGameObjectName(
                          _,
                          engineState,
                        ),
                   )
                   |> expect
                   == (
                        inspectorEngineState
                        |> HierarchyGameObjectEngineService.getChildren(
                             inspectorClonedGameObject,
                           )
                        |> Js.Array.length,
                        inspectorEngineState
                        |> _getSceneFirstCubeFirstChild(
                             inspectorClonedGameObject,
                           )
                        |> GameObjectEngineService.unsafeGetGameObjectName(
                             _,
                             inspectorEngineState,
                           ),
                      )
                   |> resolve;
                 });
            });
            testPromise("test cloned-gameObject's transform", () => {
              let (
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                InspectorCanvasTool.prepareInspectorAndImgCanvas(
                  ~sandbox,
                  (),
                );

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=sceneWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let editorState = StateEditorService.getState();
                   let engineState = StateEngineService.unsafeGetState();
                   let inspectorEngineState =
                     StateInspectorEngineService.unsafeGetState();

                   let sceneWDBGameObject =
                     MainEditorAssetWDBNodeTool.getWDBGameObject(
                       uploadedWDBNodeId,
                       editorState,
                     );

                   _didMount(uploadedWDBNodeId, editorState);

                   let inspectorClonedGameObject =
                     (editorState, inspectorEngineState)
                     |> InspectorEngineTool.getWDBGameObject
                     |> OptionService.unsafeGet;

                   let sceneFirstCubeFirstChild =
                     engineState
                     |> _getSceneFirstCubeFirstChild(sceneWDBGameObject);
                   let inspectorClonedSceneFirstCubeFirstChild =
                     inspectorEngineState
                     |> _getSceneFirstCubeFirstChild(
                          inspectorClonedGameObject,
                        );

                   (
                     engineState
                     |> TransformGameObjectEngineService.getLocalPosition(
                          sceneFirstCubeFirstChild,
                        ),
                     engineState
                     |> TransformGameObjectEngineService.getLocalScale(
                          sceneFirstCubeFirstChild,
                        ),
                     engineState
                     |> TransformGameObjectEngineService.getLocalRotation(
                          sceneFirstCubeFirstChild,
                        ),
                   )
                   |> expect
                   == (
                        inspectorEngineState
                        |> TransformGameObjectEngineService.getLocalPosition(
                             inspectorClonedSceneFirstCubeFirstChild,
                           ),
                        inspectorEngineState
                        |> TransformGameObjectEngineService.getLocalScale(
                             inspectorClonedSceneFirstCubeFirstChild,
                           ),
                        inspectorEngineState
                        |> TransformGameObjectEngineService.getLocalRotation(
                             inspectorClonedSceneFirstCubeFirstChild,
                           ),
                      )
                   |> resolve;
                 });
            });
            testPromise("test cloned-gameObject's geometry if exist", () => {
              let (
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                InspectorCanvasTool.prepareInspectorAndImgCanvas(
                  ~sandbox,
                  (),
                );

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=sceneWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let editorState = StateEditorService.getState();
                   let engineState = StateEngineService.unsafeGetState();
                   let inspectorEngineState =
                     StateInspectorEngineService.unsafeGetState();

                   let sceneWDBGameObject =
                     MainEditorAssetWDBNodeTool.getWDBGameObject(
                       uploadedWDBNodeId,
                       editorState,
                     );

                   _didMount(uploadedWDBNodeId, editorState);

                   let inspectorClonedGameObject =
                     (editorState, inspectorEngineState)
                     |> InspectorEngineTool.getWDBGameObject
                     |> OptionService.unsafeGet;

                   let sceneFirstCube =
                     engineState
                     |> HierarchyGameObjectEngineService.getChildren(
                          sceneWDBGameObject,
                        )
                     |> ArrayService.unsafeGetFirst;
                   let inspectorClonedSceneFirstCube =
                     inspectorEngineState
                     |> HierarchyGameObjectEngineService.getChildren(
                          inspectorClonedGameObject,
                        )
                     |> ArrayService.unsafeGetFirst;

                   (
                     engineState
                     |> GeometryEngineService.unsafeGetGeometryVertices(
                          sceneFirstCube,
                        ),
                     engineState
                     |> GeometryEngineService.unsafeGetGeometryNormals(
                          sceneFirstCube,
                        ),
                     engineState
                     |> GeometryEngineService.unsafeGetGeometryTexCoords(
                          sceneFirstCube,
                        ),
                     engineState
                     |> GeometryEngineService.getGeometryIndices16(
                          sceneFirstCube,
                        ),
                     engineState
                     |> GeometryEngineService.getGeometryIndices32(
                          sceneFirstCube,
                        ),
                   )
                   |> expect
                   == (
                        inspectorEngineState
                        |> GeometryEngineService.unsafeGetGeometryVertices(
                             inspectorClonedSceneFirstCube,
                           ),
                        inspectorEngineState
                        |> GeometryEngineService.unsafeGetGeometryNormals(
                             inspectorClonedSceneFirstCube,
                           ),
                        inspectorEngineState
                        |> GeometryEngineService.unsafeGetGeometryTexCoords(
                             inspectorClonedSceneFirstCube,
                           ),
                        inspectorEngineState
                        |> GeometryEngineService.getGeometryIndices16(
                             inspectorClonedSceneFirstCube,
                           ),
                        inspectorEngineState
                        |> GeometryEngineService.getGeometryIndices32(
                             inspectorClonedSceneFirstCube,
                           ),
                      )
                   |> resolve;
                 });
            });
            testPromise("test cloned-gameObject's meshRenderer if exist", () => {
              let (
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                InspectorCanvasTool.prepareInspectorAndImgCanvas(
                  ~sandbox,
                  (),
                );

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=sceneWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let editorState = StateEditorService.getState();
                   let engineState = StateEngineService.unsafeGetState();
                   let inspectorEngineState =
                     StateInspectorEngineService.unsafeGetState();

                   let sceneWDBGameObject =
                     MainEditorAssetWDBNodeTool.getWDBGameObject(
                       uploadedWDBNodeId,
                       editorState,
                     );

                   _didMount(uploadedWDBNodeId, editorState);

                   let inspectorClonedGameObject =
                     (editorState, inspectorEngineState)
                     |> InspectorEngineTool.getWDBGameObject
                     |> OptionService.unsafeGet;

                   let sceneFirstCube =
                     engineState
                     |> HierarchyGameObjectEngineService.getChildren(
                          sceneWDBGameObject,
                        )
                     |> ArrayService.unsafeGetFirst;
                   let inspectorClonedSceneFirstCube =
                     inspectorEngineState
                     |> HierarchyGameObjectEngineService.getChildren(
                          inspectorClonedGameObject,
                        )
                     |> ArrayService.unsafeGetFirst;

                   engineState
                   |> MeshRendererEngineService.getDrawMode(
                        engineState
                        |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                             sceneFirstCube,
                           ),
                      )
                   |> expect
                   == (
                        inspectorEngineState
                        |> MeshRendererEngineService.getDrawMode(
                             inspectorEngineState
                             |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                                  inspectorClonedSceneFirstCube,
                                ),
                           )
                      )
                   |> resolve;
                 });
            });
          })
        );
      });

      describe("create wdb snapshot", () => {
        testPromise("clear img canvas", () => {
          let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
            InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());

          let editorState = StateEditorService.getState();
          let imgContext =
            editorState |> ImgContextImgCanvasEditorService.unsafeGetImgContext;
          let clearRect =
            CanvasType.convertContextToJsObj(imgContext)##clearRect;

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let callCount = clearRect |> getCallCount;

               let editorState = StateEditorService.getState();

               _didMount(uploadedWDBNodeId, editorState);

               clearRect
               |> getCall(callCount)
               |> expect
               |> toCalledWith([|0., 0., 50., 50.|])
               |> resolve;
             });
        });

        describe("clip the inspector-canvas snapshot", () =>
          testPromise(
            "img-canvas's drawImage calledWith inspector-canvas's clip area and img-canvas snapshot area",
            () => {
              let (
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                InspectorCanvasTool.prepareInspectorAndImgCanvas(
                  ~sandbox,
                  ~inspectorCanvasWidth=371,
                  ~inspectorCanvasHeight=300,
                  (),
                );

              let editorState = StateEditorService.getState();
              let imgContext =
                editorState
                |> ImgContextImgCanvasEditorService.unsafeGetImgContext;
              let drawImage =
                CanvasType.convertContextToJsObj(imgContext)##drawImage;

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let callCount = drawImage |> getCallCount;

                   let editorState = StateEditorService.getState();

                   _didMount(uploadedWDBNodeId, editorState);

                   drawImage
                   |> getCall(callCount)
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
                 });
            },
          )
        );

        describe("store snapshot in imageDataMap", () =>
          testPromise(
            "should store img canvas snapshot in imageDataMap's base64", () => {
            let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
              InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());

            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=sceneWDBArrayBuffer^,
              (),
            )
            |> then_(uploadedWDBNodeId => {
                 let editorState = StateEditorService.getState();
                 let engineState = StateEngineService.unsafeGetState();

                 _didMount(uploadedWDBNodeId, editorState);

                 let {imageDataIndex}: wdbNodeData =
                   editorState
                   |> OperateTreeAssetEditorService.unsafeFindNodeById(
                        uploadedWDBNodeId,
                      )
                   |> WDBNodeAssetService.getNodeData;

                 editorState
                 |> ImageDataMapAssetEditorService.unsafeGetData(
                      imageDataIndex,
                    )
                 |> (
                   ({base64}) =>
                     base64
                     |> OptionService.unsafeGet
                     |> expect == imgCanvasFakeBase64Str
                     |> resolve
                 );
               });
          })
        );

        testPromise("dispatch Project", () => {
          let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
            InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());

          let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=sceneWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let callCount = dispatchFuncStub |> getCallCount;

               let editorState = StateEditorService.getState();

               _didMount(uploadedWDBNodeId, editorState);

               dispatchFuncStub
               |> getCall(callCount)
               |> expect
               |> toCalledWith([|
                    AppStore.UpdateAction(Update([|UpdateStore.Project|])),
                  |])
               |> resolve;
             });
        });
      });
    });

    describe("test willUnmount", () => {
      describe("dispose container->wdbGameObjects", () =>
        testPromise(
          "the container gameObject children array should be empty", () => {
          let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
            InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=sceneWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let editorState = StateEditorService.getState();

               let sceneWDBGameObject =
                 MainEditorAssetWDBNodeTool.getWDBGameObject(
                   uploadedWDBNodeId,
                   editorState,
                 );

               _didMount(uploadedWDBNodeId, editorState);
               WDBInspector.Method.willUnmount();

               let inspectorEngineState =
                 StateInspectorEngineService.unsafeGetState();
               let editorState = StateEditorService.getState();
               let containerGameObject =
                 ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject(
                   editorState,
                 );

               inspectorEngineState
               |> HierarchyGameObjectEngineService.getChildren(
                    containerGameObject,
                  )
               |> Js.Array.length
               |> expect == 0
               |> resolve;
             });
        })
      );

      describe("reallocate cpu memory", () =>
        describe("reallocate geometry", () =>
          describe("if geometry buffer is used >= 50%, reallocate", () =>
            testPromise("pack type array", () => {
              TestTool.ignoreError(sandbox);
              WDBInspectorTool.prepareInspectorEngineState(
                ~sandbox,
                ~buffer=
                  SettingToolEngine.buildBufferConfigStr(
                    ~geometryPointCount=80,
                    (),
                  ),
                (),
              );

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                (),
              )
              |> then_(_ =>
                   MainEditorAssetUploadTool.loadOneWDB(
                     ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                     (),
                   )
                   |> then_(_ => {
                        let vertices =
                          StateInspectorEngineService.unsafeGetState()
                          |> GeometryToolEngine.getVertices;

                        vertices
                        |> Js.Typed_array.Float32Array.slice(
                             ~start=72,
                             ~end_=75,
                           )
                        |> expect
                        == Js.Typed_array.Float32Array.make([|0., 0., 0.|])
                        |> resolve;
                      })
                 );
            })
          )
        )
      );

      testPromise(
        "set inspector canvas camera arcball controller distance to default",
        () => {
        let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
          InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());

        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=sceneWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             let editorState = StateEditorService.getState();

             let sceneWDBGameObject =
               MainEditorAssetWDBNodeTool.getWDBGameObject(
                 uploadedWDBNodeId,
                 editorState,
               );

             _didMount(uploadedWDBNodeId, editorState);
             WDBInspector.Method.willUnmount();

             let inspectorEngineState =
               StateInspectorEngineService.unsafeGetState();
             let editorState = StateEditorService.getState();
             let newCameraArcballControllerDistance =
               inspectorEngineState
               |> _getInspectorCameraArcballCameraControllerDistance
               |> FloatService.truncateFloatValue(_, 1);

             newCameraArcballControllerDistance
             |> expect == InspectorCanvasUtils.getCameraDefaultDistance()
             |> resolve;
           });
      });
    });
  });