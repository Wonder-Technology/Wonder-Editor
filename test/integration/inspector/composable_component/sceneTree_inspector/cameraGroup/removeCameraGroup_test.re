open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test remove camera group", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
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
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test has no camera group after remove ", () =>
      describe("test remove current camera group", () => {
        test("should remove from inspector", () => {
          SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
          |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test("should remove activedBasicCameraView from editorState", () => {
          SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
          |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

          GameViewEditorService.getActivedBasicCameraView(
            StateEditorService.getState(),
          )
          |> expect == None;
        });

        describe("if is run", () =>
          describe(
            "if basicCameraView is active and gameObject has arcballCameraController",
            () =>
            test("unbind arcballCameraController event for game view", () => {
              ControllerTool.setIsRun(true);
              let (engineState, _, cameraController) =
                GameObjectTool.unsafeGetCurrentSceneTreeNode()
                |> ArcballCameraControllerToolEngine.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(
                     _,
                     StateEngineService.unsafeGetState(),
                   );
              engineState |> StateEngineService.setState |> ignore;

              SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
              |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

              let engineState = StateEngineService.unsafeGetState();
              ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                cameraController,
                engineState,
              )
              |> expect == false;
            })
          )
        );
      })
    );

    describe("test still has other camera groups after remove ", () => {
      beforeEach(() => {
        HeaderTool.triggerAddBox();

        SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
        |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

        AddableComponentTool.addCameraGroupInBox();
      });

      test(
        "test remove cameraGroup component, should remove from inspector", () => {
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
        SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
        |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test(
        "test if not remove cameraGroup component, current gameObject should has it",
        () =>
        CameraEngineService.hasCameraGroup(
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> StateLogicService.getEngineStateToGetData
        |> expect == true
      );
      test(
        "test remove cameraGroup component, current gameObject shouldn't has it",
        () => {
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
        SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
        |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

        CameraEngineService.hasCameraGroup(
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> StateLogicService.getEngineStateToGetData
        |> expect == false;
      });
      test(
        "test remove current cameraGroup, should mark last scene camera to be active",
        () => {
        let lastBasicCameraView =
          GameObjectTool.unsafeGetCurrentSceneTreeNode()
          |> GameObjectComponentEngineService.getBasicCameraViewComponent(
               _,
               StateEngineService.unsafeGetState(),
             );
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();

        SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
        |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

        GameViewEditorService.getActivedBasicCameraView(
          StateEditorService.getState(),
        )
        |> expect == Some(lastBasicCameraView);
      });

      describe("if is run", () =>
        describe(
          "if basicCameraView is active and gameObject has arcballCameraController",
          () => {
          test("unbind arcballCameraController event for game view", () => {
            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
            ControllerTool.setIsRun(true);
            let (engineState, _, cameraController) =
              GameObjectTool.unsafeGetCurrentSceneTreeNode()
              |> ArcballCameraControllerToolEngine.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(
                   _,
                   StateEngineService.unsafeGetState(),
                 );
            engineState |> StateEngineService.setState |> ignore;

            SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            let engineState = StateEngineService.unsafeGetState();
            ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
              cameraController,
              engineState,
            )
            |> expect == false;
          });
          test(
            "bind last scene camera -> arcballCameraController event for game view",
            () => {
            let lastCameraGameObject =
              GameObjectTool.unsafeGetCurrentSceneTreeNode();
            let (engineState, _, lastArcballCameraController) =
              ArcballCameraControllerToolEngine.addGameObjectArcballCameraControllerComponent(
                lastCameraGameObject,
                StateEngineService.unsafeGetState(),
              );
            engineState |> StateEngineService.setState |> ignore;
            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
            ControllerTool.setIsRun(true);
            let (engineState, _, _) =
              GameObjectTool.unsafeGetCurrentSceneTreeNode()
              |> ArcballCameraControllerToolEngine.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(
                   _,
                   StateEngineService.unsafeGetState(),
                 );
            engineState |> StateEngineService.setState |> ignore;

            SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
              lastArcballCameraController,
              StateEngineService.unsafeGetState(),
            )
            |> expect == true;
          });
        })
      );
    });
  });