open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("wdb inspector", () => {
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

    let _prepareInspectorEngineState =
        (~buffer=SettingToolEngine.buildBufferConfigStr(), ()) => {
      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~buffer,
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
                    {
                        "name": "dispose"

                    }
                  ]
                }
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
    };

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
      sceneWDBArrayBuffer := WDBTool.generateSceneWDB();
    });

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      _prepareInspectorEngineState();

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

    describe("test rename", () =>
      testPromise(
        "if rename to the existed name in the same dir, should fail", () => {
        let fileName1 = "BoxTextured1";
        let fileName2 = "BoxTextured2";

        MainEditorAssetUploadTool.loadOneWDB(
          ~fileName=fileName1,
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId1 =>
             MainEditorAssetUploadTool.loadOneWDB(
               ~fileName=fileName2,
               ~arrayBuffer=boxTexturedWDBArrayBuffer^,
               (),
             )
             |> then_(uploadedWDBNodeId2 => {
                  AssetTreeInspectorTool.Rename.renameAssetWDBNode(
                    ~nodeId=uploadedWDBNodeId2,
                    ~name=fileName1,
                    (),
                  );

                  (
                    MainEditorAssetWDBNodeTool.getWDBName(
                      ~nodeId=uploadedWDBNodeId1,
                      (),
                    ),
                    MainEditorAssetWDBNodeTool.getWDBName(
                      ~nodeId=uploadedWDBNodeId2,
                      (),
                    ),
                  )
                  |> expect == (fileName1, fileName2)
                  |> resolve;
                })
           );
      })
    );

    describe("test didMount", () => {
      describe("clone wdb gameObject show in inspector-canvas", () => {
        testPromise(
          "test clone wdb gameObject should add into container gameObject", () => {
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
               == (
                    DefaultSceneInspectorEngineUtils.getCameraDefaultDistance(),
                    1.6,
                  )
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
                addedMaterialNodeId,
                newMaterialComponent,
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
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
                addedMaterialNodeId,
                newMaterialComponent,
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
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
                addedMaterialNodeId,
                newMaterialComponent,
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
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
                addedMaterialNodeId,
                newMaterialComponent,
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
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
      describe("dispose wdbGameObject", () =>
        testPromise(
          "the container gameObject children array should be empty", () => {
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
              _prepareInspectorEngineState(
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
             |> expect
             == DefaultSceneInspectorEngineUtils.getCameraDefaultDistance()
             |> resolve;
           });
      });
    });
  });