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
      describe(
        "gameObject should remove from editEngineState and runEngineState", () =>
        describe("test dispose current gameObject", () => {
          describe("current gameObject should be disposed from scene", () => {
            beforeEach(() =>
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
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

              (
                StateLogicService.getEditEngineState()
                |> GameObjectUtils.getChildren(
                     MainEditorSceneTool.unsafeGetScene(),
                   )
                |> Js.Array.includes(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       currentSceneTreeNode,
                     ),
                   ),
                StateLogicService.getRunEngineState()
                |> GameObjectUtils.getChildren(
                     MainEditorSceneTool.unsafeGetScene(),
                   )
                |> Js.Array.includes(currentSceneTreeNode),
              )
              |> expect == (false, false);
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
                    let (editGl, runGl) =
                      FakeGlToolEngine.getEditEngineStateGlAndRunEngineStateGl();
                    let editGlShaderSource = editGl##shaderSource;
                    let runGlShaderSource = runGl##shaderSource;
                    MainEditorSceneTool.setDirectionLightGameObjectTobeCurrentSceneTreeNode();

                    (component, editGlShaderSource, runGlShaderSource);
                  };

                  test("test shaderSource should be called", () => {
                    let (component, editGlShaderSource, runGlShaderSource) =
                      _prepare();

                    BaseEventTool.triggerComponentEvent(
                      component,
                      OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
                    );

                    (
                      editGlShaderSource |> getCallCount,
                      runGlShaderSource |> getCallCount,
                    )
                    |> expect == (6, 4);
                  });
                  test("glsl->DIRECTION_LIGHTS_COUNT should == 0", () => {
                    let (component, editGlShaderSource, runGlShaderSource) =
                      _prepare();

                    BaseEventTool.triggerComponentEvent(
                      component,
                      OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
                    );

                    (
                      GLSLToolEngine.contain(
                        GLSLToolEngine.getVsSource(editGlShaderSource),
                        {|#define DIRECTION_LIGHTS_COUNT 0|},
                      ),
                      GLSLToolEngine.contain(
                        GLSLToolEngine.getVsSource(runGlShaderSource),
                        {|#define DIRECTION_LIGHTS_COUNT 0|},
                      ),
                    )
                    |> expect == (true, true);
                  });
                })
              )
            );
          });
          describe("test should remove current gameObject children", () =>
            test("test ee and re engineState should remove it's children", () => {
              let (box1, box2, box3, box4) =
                SceneTreeTool.buildFourLayerSceneAndGetBox();

              let editEngineState = StateLogicService.getEditEngineState();
              let runEngineState = StateLogicService.getRunEngineState();
              let component =
                BuildComponentTool.buildHeader(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                );
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
              );

              (
                editEngineState
                |> GameObjectTool.isAlive(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       box1,
                     ),
                   ),
                editEngineState
                |> GameObjectTool.isAlive(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       box3,
                     ),
                   ),
                editEngineState
                |> GameObjectTool.isAlive(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       box4,
                     ),
                   ),
                runEngineState |> GameObjectTool.isAlive(box1),
                runEngineState |> GameObjectTool.isAlive(box3),
                runEngineState |> GameObjectTool.isAlive(box4),
              )
              |> expect == (false, false, false, false, false, false);
            })
          );
          describe("test if current gameObject is Camera", () => {
            test("test if camera count > 1, could remove specific camera", () => {
              let (camera1, _camera2, _box1) =
                SceneTreeTool.buildTwoCameraSceneGraphToEngine();

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

              (
                StateLogicService.getEditEngineState()
                |> GameObjectTool.isAlive(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       camera1,
                     ),
                   ),
                StateLogicService.getRunEngineState()
                |> GameObjectTool.isAlive(camera1),
              )
              |> expect == (false, false);
            });

            test("else, can't dispose last camera", () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
              );

              (
                MainEditorSceneTool.unsafeGetScene()
                |> GameObjectTool.getChildren
                |> Js.Array.filter(gameObject =>
                     CameraEngineService.isCamera(gameObject)
                     |> StateLogicService.getEngineStateToGetData
                   )
                |> Js.Array.length,
                HeaderUtils.doesSceneHasRemoveableCamera(),
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
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
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
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
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
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );
        let eeGl =
          FakeGlToolEngine.getGl(StateLogicService.getEditEngineState());
        let reGl =
          FakeGlToolEngine.getGl(StateLogicService.getEditEngineState());

        let component =
          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          );

        _triggerClickDispose(component);

        (eeGl##clearColor |> getCallCount, reGl##clearColor |> getCallCount)
        |> expect == (1, 1);
      })
    );
  });