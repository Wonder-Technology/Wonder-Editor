open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller leftHeader dispose gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test dispose gameObject", () => {
      beforeEach(() =>
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
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
        )
      );

      describe("gameObject should remove from engineState", () =>
        describe("test dispose current gameObject", () => {
          describe("current gameObject should be disposed from scene", () => {
            beforeEach(() =>
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
              )
            );
            test("test scene children shouldn't include it", () => {
              let currentSceneTreeNode =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();

              MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

              StateEngineService.unsafeGetState()
              |> HierarchyGameObjectEngineService.getChildren(
                   MainEditorSceneTool.unsafeGetScene(),
                 )
              |> Js.Array.includes(currentSceneTreeNode)
              |> expect == false;
            });

            describe(
              "if current gameObject or its children has light component", () =>
              describe("test has direction light component", () =>
                describe("should re-init all light material components", () => {
                  let _prepare = () => {
                    let gl = FakeGlToolEngine.getEngineStateGl();
                    let glShaderSource = gl##shaderSource;
                    MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode();

                    glShaderSource;
                  };

                  test("test shaderSource should be called", () => {
                    let glShaderSource = _prepare();

                    MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

                    glShaderSource |> getCallCount |> expect == 2;
                  });
                  test("glsl->DIRECTION_LIGHTS_COUNT should == 0", () => {
                    let glShaderSource = _prepare();

                    MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

                    GLSLToolEngine.contain(
                      GLSLToolEngine.getVsSource(glShaderSource),
                      {|#define DIRECTION_LIGHTS_COUNT 0|},
                    )
                    |> expect == true;
                  });

                  describe("fix bug", () => {
                    beforeEach(() => {
                      MainEditorAssetTool.buildFakeFileReader();
                      MainEditorAssetTool.buildFakeImage();
                    });

                    testPromise(
                      "should re-init material assets which type is lightMaterial",
                      () => {
                      let glShaderSource = _prepare();
                      let assetTreeData =
                        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

                      let addedMaterialNodeId =
                        MainEditorAssetIdTool.getNewAssetId();
                      MainEditorAssetHeaderOperateNodeTool.addMaterial();
                      let material =
                        MainEditorAssetMaterialNodeTool.getMaterialComponent(
                          ~nodeId=addedMaterialNodeId,
                          (),
                        );
                      MainEditorAssetUploadTool.loadOneTexture()
                      |> Js.Promise.then_(uploadedTextureNodeId => {
                           MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                             ~textureNodeId=uploadedTextureNodeId,
                             ~material,
                             (),
                           );

                           let glShaderSourceCallCountBeforeDispose =
                             glShaderSource |> getCallCount;

                           MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

                           (glShaderSource |> getCallCount)
                           - glShaderSourceCallCountBeforeDispose
                           |> expect == 4
                           |> Js.Promise.resolve;
                         });
                    });
                  });
                })
              )
            );
          });

          describe("test should remove current gameObject children", () =>
            test("test engineState should remove it's children", () => {
              let (scene, (cube1, cube3, cube4), cube2) =
                SceneTreeTool.buildFourLayerSceneGraphToEngine(sandbox);
              GameObjectTool.setCurrentSceneTreeNode(cube1);

              let engineState = StateEngineService.unsafeGetState();

              MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

              (
                engineState |> GameObjectTool.isAlive(cube1),
                engineState |> GameObjectTool.isAlive(cube3),
                engineState |> GameObjectTool.isAlive(cube4),
              )
              |> expect == (false, false, false);
            })
          );

          describe("test if current gameObject is Camera", () => {
            describe("test has other cameras after remove", () => {
              let _test = () => {
                let (camera1, camera2, _cube1) =
                  SceneTreeTool.buildTwoCameraSceneGraphToEngine(sandbox);

                MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();

                MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

                (camera1, camera2);
              };

              test("test camera gameObject is disposed", () => {
                let (camera1, _) = _test();

                StateEngineService.unsafeGetState()
                |> GameObjectTool.isAlive(camera1)
                |> expect == false;
              });
              /* test("should mark last scene camera to be active", () => {
                   let (camera1, camera2) = _test();

                   BasicCameraViewEngineService.isActiveBasicCameraView(
                     camera2
                     |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
                          _,
                          StateEngineService.unsafeGetState(),
                        ),
                     StateEngineService.unsafeGetState(),
                   )
                   |> expect == true;
                 }); */
            });

            describe("test has no camera after remove", () => {
              test("test camera gameObject is disposed", () => {
                MainEditorSceneTool.createDefaultScene(
                  sandbox,
                  MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
                );

                MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

                (
                  SceneToolEngine.getSceneAllBasicCameraViews(
                    StateEngineService.unsafeGetState(),
                  )
                  |> Js.Array.length,
                  SceneUtils.doesSceneHasRemoveableCamera(),
                )
                |> expect == (0, false);
              });

              describe("if is run", () =>
                describe(
                  "if basicCameraView is active and gameObject has arcballCameraController",
                  () =>
                  test(
                    "unbind arcballCameraController event for game view", () => {
                    MainEditorSceneTool.createDefaultScene(
                      sandbox,
                      MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
                    );
                    ControllerTool.setIsRun(true);
                    let (engineState, _, cameraController) =
                      GameObjectTool.unsafeGetCurrentSceneTreeNode()
                      |> ArcballCameraControllerToolEngine.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(
                           _,
                           StateEngineService.unsafeGetState(),
                         );
                    engineState |> StateEngineService.setState |> ignore;

                    MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

                    let engineState = StateEngineService.unsafeGetState();
                    ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                      cameraController,
                      engineState,
                    )
                    |> expect == false;
                  })
                )
              );
            });
          });
        })
      );
    });

    describe("test scene tree", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
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

        ControllerTool.stubRequestAnimationFrame(
          createEmptyStubWithJsObjSandbox(sandbox),
        );
        ControllerTool.run();
      });
      test(
        "if not set currentSceneTreeNode, disposed button's disabled props should == true",
        () => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
          SceneTreeEditorService.clearCurrentSceneTreeNode
          |> StateLogicService.getAndSetEditorState;

          BuildComponentTool.buildLeftHeader()
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "if set currentSceneTreeNode, disposed button's disabled props should == false",
        () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
          BuildComponentTool.buildLeftHeader()
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test("dispose current gameObject", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

        BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("fix bug", () => {
      test("dispose gameObject should refresh engine state", () =>
        RefreshEngineStateTool.testRefreshEngineState(
          sandbox,
          () => {
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

            MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();
          },
        )
      );

      describe(
        "dispose gameObject shouldn't cause update_transform_gizmos job error",
        () => {
        let _prepareState = () => {
          MainEditorSceneTool.initStateWithJob(
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
            {
              "name": "init_transform_gizmos"
            }
          ]
        }
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
                               },
{"name": "update_transform_gizmos" }
           ]
         }
       ]
             |},
                (),
              ),
            (),
          );

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
        };

        beforeEach(() => {
          _prepareState();

          StateLogicService.getAndSetEngineState(
            MainUtils._handleEngineState,
          );
        });

        test("test", () => {
          ConsoleTool.notShowMessage();
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );

          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

          error |> expect |> not_ |> toCalled;
        });
      });

      describe(
        "dispose gameObject shouldn't dispose gameObject->material component",
        () => {
        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
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

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
        });

        let _disposeAllSceneGameObjects = () => {
          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

          MainEditorSceneTreeTool.Select.selectGameObject(
            ~gameObject=
              MainEditorSceneTool.getFirstCube
              |> StateLogicService.getEngineStateToGetData,
            (),
          );

          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();
        };

        test("test", () => {
          _disposeAllSceneGameObjects();

          LightMaterialToolEngine.isAlive(
            MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial
            |> StateLogicService.getEditorState,
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == true;
        });
      });

      describe(
        "test dispose gameObject with FlyCameraController component", () =>
        test("shouldn't cause update_camera job error", () => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                ~loopPipelines=
                  {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               },
            {
                "name": "update_camera"
            }
                           ]
                       }
                   ]
               |},
                (),
              ),
            (),
          );
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
          );
          MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();
          ConsoleTool.notShowMessage();
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );

          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

          error |> expect |> not_ |> toCalled;
        })
      );
    });
  });
