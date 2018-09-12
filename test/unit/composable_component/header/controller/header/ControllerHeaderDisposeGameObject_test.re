open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller header dispose gameObject", () => {
    let sandbox = getSandboxDefaultVal();
    let _triggerClickDispose = component =>
      BaseEventTool.triggerComponentEvent(
        component,
        OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
      );

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test dispose gameObject", () => {
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
      describe("gameObject should remove from engineState", () =>
        describe("test dispose current gameObject", () => {
          describe("current gameObject should be disposed from scene", () => {
            beforeEach(() =>
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
              )
            );
            test("test scene children shouldn't include it", () => {
              let currentSceneTreeNode =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();
              let component =
                BuildComponentTool.buildHeader(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                );

              _triggerClickDispose(component);

              StateEngineService.unsafeGetState()
              |> GameObjectUtils.getChildren(
                   MainEditorSceneTool.unsafeGetScene(),
                 )
              |> Js.Array.includes(currentSceneTreeNode)
              |> expect == false;
            });

            describe(
              "if current gameObject or its children has light component", () =>
              describe("test has direction light component", () =>
                describe(
                  "should re-init all light material components in the scene",
                  () => {
                  let _prepare = () => {
                    let component =
                      BuildComponentTool.buildHeader(
                        TestTool.buildAppStateSceneGraphFromEngine(),
                      );
                    let gl = FakeGlToolEngine.getEngineStateGl();
                    let glShaderSource = gl##shaderSource;
                    MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode();

                    (component, glShaderSource);
                  };

                  test("test shaderSource should be called", () => {
                    let (component, glShaderSource) = _prepare();

                    BaseEventTool.triggerComponentEvent(
                      component,
                      OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
                    );

                    glShaderSource |> getCallCount |> expect == 4;
                  });
                  test("glsl->DIRECTION_LIGHTS_COUNT should == 0", () => {
                    let (component, glShaderSource) = _prepare();

                    BaseEventTool.triggerComponentEvent(
                      component,
                      OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
                    );

                    GLSLToolEngine.contain(
                      GLSLToolEngine.getVsSource(glShaderSource),
                      {|#define DIRECTION_LIGHTS_COUNT 0|},
                    )
                    |> expect == true;
                  });
                })
              )
            );
          });
          describe("test should remove current gameObject children", () =>
            test("test engineState should remove it's children", () => {
              let (box1, box2, box3, box4) =
                SceneTreeTool.buildFourLayerSceneAndGetBox(sandbox);

              let engineState = StateEngineService.unsafeGetState();
              let component =
                BuildComponentTool.buildHeader(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                );
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
              );

              (
                engineState |> GameObjectTool.isAlive(box1),
                engineState |> GameObjectTool.isAlive(box3),
                engineState |> GameObjectTool.isAlive(box4),
              )
              |> expect == (false, false, false);
            })
          );
          describe("test if current gameObject is Camera", () => {
            test("test if camera count > 1, could remove specific camera", () => {
              let (camera1, _camera2, _box1) =
                SceneTreeTool.buildTwoCameraSceneGraphToEngine(sandbox);

              SceneTreeNodeDomTool.OperateTwoCamera.getFirstCameraDomIndex()
              |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

              let component =
                BuildComponentTool.buildHeader(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                );
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
              );

              StateEngineService.unsafeGetState()
              |> GameObjectTool.isAlive(camera1)
              |> expect == false;
            });

            test("else, can't dispose last camera", () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
              );

              (
                MainEditorSceneTool.unsafeGetScene()
                |> GameObjectTool.getChildren
                |> Js.Array.filter(gameObject =>
                     CameraEngineService.hasCameraGroup(gameObject)
                     |> StateLogicService.getEngineStateToGetData
                   )
                |> Js.Array.length,
                SceneUtils.doesSceneHasRemoveableCamera(),
              )
              |> expect == (1, false);
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
          MainEditorSceneTool.createDefaultScene(sandbox, () => ());
          SceneEditorService.clearCurrentSceneTreeNode
          |> StateLogicService.getAndSetEditorState;

          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "if set currentSceneTreeNode, disposed button's disabled props should == false",
        () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          );
          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test("dispose current gameObject", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );

        let component =
          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          );

        _triggerClickDispose(component);

        BuildComponentTool.buildSceneTree(
          TestTool.buildAppStateSceneGraphFromEngine(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });

    describe("fix bug", () =>
      test(
        "dispose gameObject should re-render edit canvas and run canvas", () => {
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
                                "name": "clear_color"
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
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
        let gl = FakeGlToolEngine.getGl(StateEngineService.unsafeGetState());

        let component =
          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          );

        _triggerClickDispose(component);

        gl##clearColor |> getCallCount |> expect == 1;
      })
    );
  });