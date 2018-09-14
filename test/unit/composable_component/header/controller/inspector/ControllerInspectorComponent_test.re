open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector component", () => {
    let addCameraGroupInBoxWithOneComponent = () => {
      let boxComponentCount = ComponentDomTool.getBoxComponentCount() + 1;
      let cameraCategoryDomIndex =
        ComponentDomTool.getCameraCategoryDomIndex();
      let cameraGroupTypeDomIndex =
        ComponentDomTool.getCameraGroupTypeDomIndex();

      OperateComponentEventTool.addComponentIntoCurrentGameObject(
        boxComponentCount,
        cameraCategoryDomIndex,
        cameraGroupTypeDomIndex,
      );
    };
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test add component", () =>
      describe("test add component in engine", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
          )
        );

        describe("test add arcballCameraController", () => {
          test(
            "test is run, add arcballCameraController in box, and the box haven't cameraGroup, the box shouldn't bind event",
            () => {
              ControllerTool.run();

              MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
              AddableComponentTool.addArcballCameraInBox();

              let engineState = StateEngineService.unsafeGetState();
              let currentSceneTreeNode =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();

              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   currentSceneTreeNode,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                   engineState,
                 )
              |> expect == false;
            },
          );
          /* TODO pass test */
          test(
            "test is run, add arcballCameraController in active camera, the active camera should bind event",
            () => {
              ControllerTool.run();

              AddableComponentTool.addArcballCameraInCamera();

              let engineState = StateEngineService.unsafeGetState();
              let currentSceneTreeNode =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();

              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   currentSceneTreeNode,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                   engineState,
                 )
              |> expect == true;
            },
          );
        });

        describe("test add cameraGroup", ()
          /* TODO pass test */
          =>
            test(
              "test is run, if the currentGameObject has arcballCameraController, add cameraGroup should bind event",
              () => {
                HeaderTool.triggerAddBox();

                SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
                |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
                AddableComponentTool.addArcballCameraInBox();

                ControllerTool.run();

                addCameraGroupInBoxWithOneComponent();
                let engineState = StateEngineService.unsafeGetState();
                let currentSceneTreeNode =
                  GameObjectTool.unsafeGetCurrentSceneTreeNode();

                engineState
                |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                     currentSceneTreeNode,
                   )
                |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                     engineState,
                   )
                |> expect == true;
              },
            )
          );
      })
    );

    describe("test remove component", () => {
      describe("test remove arcballCameraController", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
          )
        );
        test(
          "test is run, remove currentGameObject arcballCameraController, the gameObject shouldn't bind event",
          () => {
            AddableComponentTool.addArcballCameraInCamera();

            ControllerTool.run();

            SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            let engineState = StateEngineService.unsafeGetState();
            let currentSceneTreeNode =
              GameObjectTool.unsafeGetCurrentSceneTreeNode();

            engineState
            |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                 currentSceneTreeNode,
               )
            |> expect == false;
          },
        );
      });
      describe("test remove cameraGroup", () =>
        test(
          "test click run, remove active cameraGroup will unbind event if it has arcballCameraController, set last cameraGroup to be active, and bind event if has arcballCameraController",
          () => {
            let (camera1, camera2) =
              AddableComponentTool.getTwoAddedArcballCameraControllerCamera(
                sandbox,
              );

            ControllerTool.run();

            SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            let engineState = StateEngineService.unsafeGetState();

            (
              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                   engineState,
                 ),
              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                   engineState,
                 ),
            )
            |> expect == (true, false);
          },
        )
      );
    });
  });