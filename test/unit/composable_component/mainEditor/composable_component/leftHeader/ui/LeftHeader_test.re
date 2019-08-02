open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("LeftHeader", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test operate gameObject", () => {
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

      describe("test add gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox)
        );

        describe("test add emptyGameObject", () =>
          test(
            "the added emptyGameObject should only has transform component", () => {
            let engineState = StateEngineService.unsafeGetState();

            let newGameObject = GameObjectTool.getNewGameObject();

            MainEditorLeftHeaderTool.addEmptyGameObject();

            MainEditorSceneTreeTool.Select.selectGameObject(
              ~gameObject=newGameObject,
              (),
            );

            (
              engineState
              |> GameObjectComponentEngineService.hasTransformComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
              engineState
              |> GameObjectComponentEngineService.hasMeshRendererComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
            )
            |> expect == (true, false);
          })
        );

        describe("test added gameObject's parent", () => {
          test(
            "if has currentSceneTreeNode, added gameObject should add into currentSceneTreeNode",
            () => {
              let engineState = StateEngineService.unsafeGetState();
              let newGameObject = GameObjectTool.getNewGameObject();

              MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
              MainEditorLeftHeaderTool.addEmptyGameObject();

              engineState
              |> HierarchyGameObjectEngineService.getParentGameObject(
                   newGameObject,
                 )
              |> OptionService.unsafeGet
              |> expect
              == (
                   SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
                   |> StateLogicService.getEditorState
                 );
            },
          );
          test("else, added gameObject should add into scene gameObject", () => {
            SceneTreeEditorService.clearCurrentSceneTreeNode
            |> StateLogicService.getAndSetEditorState;

            let engineState = StateEngineService.unsafeGetState();

            let newGameObject = GameObjectTool.getNewGameObject();

            MainEditorLeftHeaderTool.addEmptyGameObject();

            engineState
            |> HierarchyGameObjectEngineService.getParentGameObject(
                 newGameObject,
               )
            |> OptionService.unsafeGet
            |> expect == SceneEngineService.getSceneGameObject(engineState);
          });
        });
      });

      describe("test dispose gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          )
        );
        test(
          "if not set current gameObject, log error message and continue", () => {
          ConsoleTool.notShowMessage();
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );
          GameObjectTool.clearCurrentSceneTreeNode();

          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

          ConsoleTool.getMessage(error)
          |> expect
          |> toContain("current gameObject should exist, but actual is None");
        });

        describe("else", () =>
          test("remove current gameObject from editorState", () => {
            MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          })
        );

        describe("fix bug", () => {
          let _prepareState = () => {
            MainEditorSceneTool.initStateWithJob(
              ~sandbox,
              ~isBuildFakeDom=false,
              ~isInitJob=false,
              ~noWorkerJobRecord=
                NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                  ~loopPipelines=
                    {|
                      [
                        {
                        "name": "default",
                          "jobs": [
                        {"name": "dispose" },
                        {"name": "prepare_render_game_view" }
                            ]
                          }
                      ]
                  |},
                  ~loopJobs=
                    {|
                        [
                          {"name": "dispose" },
                          {"name": "prepare_render_game_view" }
                        ]
                  |},
                  (),
                ),
              (),
            );

            MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
          };

          test(
            "remove actived camera's parent gameObject should dispose camera",
            () => {
            PrepareRenderViewJobTool.prepare(_prepareState);
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();
            let activedCamera =
              MainEditorSceneTool.getCameraInDefaultScene(engineState);
            MainEditorSceneTreeTool.Drag.dragGameObjectToBeTargetSib(
              ~sourceGameObject=activedCamera,
              ~targetGameObject=MainEditorSceneTool.getFirstCube(engineState),
              (),
            );

            let engineState = StateEngineService.unsafeGetState();
            MainEditorSceneTreeTool.Select.selectGameObject(
              ~gameObject=MainEditorSceneTool.getFirstCube(engineState),
              (),
            );
            MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

            (
              activedCamera
              |> GameObjectToolEngine.isAlive(
                   _,
                   StateEngineService.unsafeGetState(),
                 ),
              GameViewEditorService.getActivedBasicCameraView(
                StateEditorService.getState(),
              ),
            )
            |> expect == (false, None);
          });
        });
      });

      describe("fix bug", () =>
        test(
          "remove gameObject has children;
            the children should be removed together;",
          () => {
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
          },
        )
      );

      describe("test clone gameObject", () => {
        test(
          "test clone one gameObject, the cloned gameObject should add into its parent children",
          () => {
            let (scene, (cube1, cube4), cube2, cube3) =
              SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

            cube4 |> GameObjectTool.setCurrentSceneTreeNode;

            MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

            let clonedGameObject = cube4 |> succ;

            GameObjectTool.getChildren(cube1)
            |> StateLogicService.getEngineStateToGetData
            |> Js.Array.includes(clonedGameObject)
            |> expect == true;
          },
        );
        test("test the cloned gameObject should be currentSceneTreeNode", () => {
          let (scene, (cube1, cube4), cube2, cube3) =
            SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

          cube4 |> GameObjectTool.setCurrentSceneTreeNode;

          MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

          let clonedGameObject = cube4 |> succ;

          StateEditorService.getState()
          |> SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
          |> expect == clonedGameObject;
        });

        describe("test clone gameObject componentMap", () => {
          test(
            "test cloned gameObject rebuild components should add into componentMap",
            () => {
            let (scene, (cube1, cube4), cube2, cube3) =
              SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

            cube4 |> GameObjectTool.setCurrentSceneTreeNode;

            MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

            let clonedGameObject = cube4 |> succ;

            StateEditorService.getState()
            |> InspectorEditorService.getComponentTypeMap
            |> WonderCommonlib.ImmutableSparseMapService.get(
                 clonedGameObject,
               )
            |> Js.Option.isSome
            |> expect == true;
          });
          test(
            "test cloned gameObject components should === target gameObject components ",
            () => {
            let (scene, (cube1, cube4), cube2, cube3) =
              SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

            cube4 |> GameObjectTool.setCurrentSceneTreeNode;

            MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

            let editorState = StateEditorService.getState();
            let targetGameObjectComponentArray =
              editorState
              |> InspectorEditorService.getComponentTypeMap
              |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(cube4);

            let clonedGameObject = cube4 |> succ;

            let clonedGameObjectComponentArray =
              editorState
              |> InspectorEditorService.getComponentTypeMap
              |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
                   clonedGameObject,
                 );

            targetGameObjectComponentArray
            |> expect == clonedGameObjectComponentArray;
          });
        });

        describe(
          "test if clone gameObject or its children has light component", () => {
          beforeEach(() =>
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setDirectionLightGameObjectToBeCurrentSceneTreeNode,
            )
          );
          describe("test has direction light component", () =>
            describe("should re-init all light material components", () => {
              let _prepare = () => {
                let gl = FakeGlToolEngine.getEngineStateGl();
                let glShaderSource = gl##shaderSource;

                glShaderSource;
              };

              test("test shaderSource should be called", () => {
                let glShaderSource = _prepare();

                MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

                glShaderSource |> getCallCount |> expect == 2;
              });
              test("glsl->DIRECTION_LIGHTS_COUNT should == 2", () => {
                let glShaderSource = _prepare();

                MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

                GLSLToolEngine.contain(
                  GLSLToolEngine.getVsSource(glShaderSource),
                  {|#define DIRECTION_LIGHTS_COUNT 2|},
                )
                |> expect == true;
              });
            })
          );
          /* TODO need pass this test */
          /* describe("test has point light component", () =>
               describe(
                 "should re-init all light material components in the scene", () => {
                 let _prepare = () => {
                   let gl = FakeGlToolEngine.getEngineStateGl();
                   let glShaderSource = gl##shaderSource;

                   glShaderSource;
                 };

                 test("glsl->POINT_LIGHTS_COUNT should == 2", () => {
                   MainEditorLightTool.setLightTypeToBePointLight();

                   let glShaderSource = _prepare();

                   MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

                   GLSLToolEngine.contain(
                     GLSLToolEngine.getVsSource(glShaderSource),
                     {|#define POINT_LIGHTS_COUNT 2|},
                   )
                   |> expect == true;
                 });
               })
             ); */
        });
        /* TODO test redo-undo */
      });
    });
  });