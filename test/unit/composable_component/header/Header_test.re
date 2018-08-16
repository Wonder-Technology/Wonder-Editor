open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

let _ =
  describe("Header", () => {
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
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          )
        );
        describe("test add emptyGameObject", () =>
          test(
            "the added emptyGameObject should only has transform component", () => {
            let engineStateToGetData = StateLogicService.getRunEngineState();

            HeaderTool.triggerAddEmptyGameObject();

            SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
            |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

            (
              engineStateToGetData
              |> GameObjectComponentEngineService.hasTransformComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
              engineStateToGetData
              |> GameObjectComponentEngineService.hasMeshRendererComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
            )
            |> expect == (true, false);
          })
        );
      });
      describe("test dispose gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          )
        );
        test(
          "if not set current gameObject, log error message and continue", () => {
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );
          GameObjectTool.clearCurrentSceneTreeNode();
          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          BaseEventTool.triggerComponentEvent(
            component,
            OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
          );
          LogTool.getMessage(error)
          |> expect
          |> toContain("current gameObject should exist, but actual is None");
        });

        describe("else", () =>
          test("remove current gameObject from editorState", () => {
            let component =
              BuildComponentTool.buildHeader(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
            );
            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          })
        );
      });

      describe("fix bug", () => {
        test(
          "remove gameObject has children;
            the children should be removed together;",
          () => {
            let (box1, box2, box3, box4) =
              SceneTreeTool.buildFourLayerSceneAndGetBox(sandbox);

            let engineStateToGetData = StateLogicService.getRunEngineState();

            let component =
              BuildComponentTool.buildHeader(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
            );

            (
              engineStateToGetData |> GameObjectTool.isAlive(box1),
              engineStateToGetData |> GameObjectTool.isAlive(box3),
              engineStateToGetData |> GameObjectTool.isAlive(box4),
            )
            |> expect == (false, false, false);
          },
        );

        describe("test remove cameraGroup gameObject", () => {
          beforeEach(() =>
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
            )
          );
          describe(
            "test if not add other cameraGroup, can't remove last cameraGroup",
            () =>
            test("test remove last cameraGroup, should throw warn message", () =>
              expect(() => {
                MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();

                let component =
                  BuildComponentTool.buildHeader(
                    TestTool.buildAppStateSceneGraphFromEngine(),
                  );
                BaseEventTool.triggerComponentEvent(
                  component,
                  OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
                );
              })
              |> toThrowMessageRe(
                   [%re
                     {|/First argument to Node.prototype.appendChild must be a Node/img|}
                   ],
                 )
            )
          );
          describe("test add other cameraGroup", () => {
            beforeEach(() => {
              HeaderTool.triggerAddBox();

              SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
              |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

              AddableComponentTool.addCameraGroupInBox();
            });
            test(
              "test remove current cameraGroup, should set last unActive cameraGroup is currentCamera",
              () => {
                let oldCurrentCameraView =
                  BasicCameraViewEngineService.getActiveBasicCameraView
                  |> StateLogicService.getEngineStateToGetData;

                let component =
                  BuildComponentTool.buildHeader(
                    TestTool.buildAppStateSceneGraphFromEngine(),
                  );
                BaseEventTool.triggerComponentEvent(
                  component,
                  OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
                );

                let newCurrentCameraView =
                  BasicCameraViewEngineService.getActiveBasicCameraView
                  |> StateLogicService.getEngineStateToGetData;

                expect(newCurrentCameraView) != oldCurrentCameraView;
              },
            );
          });
        });
      });
    });

    describe("test ambient light", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );
      });
      describe("test snapshot", () =>
        test("show color picker component for change color", () => {
          BuildCanvasTool.buildFakeCanvas(sandbox);

          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );

          BaseEventTool.triggerComponentEvent(
            component,
            OperateComponentEventTool.triggerShowColorPickEvent,
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        })
      );
      test("test change color should set into engine", () => {
        let newColor = {
          "hex": "#7df1e8",
          "rgb": {
            "r": 125,
            "g": 241,
            "b": 232,
          },
        };

        Header.Method.changeColor(newColor);

        SceneEngineService.getAmbientLightColor
        |> StateLogicService.getEngineStateToGetData
        |> Color.getHexString
        |> expect == newColor##hex;
      });
    });
  });