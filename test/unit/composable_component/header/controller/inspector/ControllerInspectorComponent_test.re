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
      describe("test add component in edit and run engine", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
          )
        );

        describe("test add arcballCameraController", () =>
        /* TODO test add arcball if no cameraGroup */
          test(
            "test is run, add arcballCameraController in active camera, the active camera should bind event in runEngineState",
            () => {
              ControllerTool.run();

              AddableComponentTool.addArcballCameraInCamera();

              let editEngineState = StateLogicService.getEditEngineState();
              let runEngineState = StateLogicService.getRunEngineState();
              let currentSceneTreeNode =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();

              (
                editEngineState
                |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                     StateLogicService.getEditEngineComponent(
                       DiffType.GameObject,
                       currentSceneTreeNode,
                     ),
                   )
                |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                     editEngineState,
                   ),
                runEngineState
                |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                     currentSceneTreeNode,
                   )
                |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                     runEngineState,
                   ),
              )
              |> expect == (false, true);
            },
          )
        );
        describe("test add cameraGroup", () =>
          test(
            "test is run, if the currentGameObject has arcballCameraController, add cameraGroup should bind event",
            () => {
              HeaderTool.triggerAddBox();

              SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
              |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
              AddableComponentTool.addArcballCameraInBox();

              ControllerTool.run();

              addCameraGroupInBoxWithOneComponent();
              let editEngineState = StateLogicService.getEditEngineState();
              let runEngineState = StateLogicService.getRunEngineState();
              let currentSceneTreeNode =
                GameObjectTool.unsafeGetCurrentSceneTreeNode();

              (
                editEngineState
                |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                     StateLogicService.getEditEngineComponent(
                       DiffType.GameObject,
                       currentSceneTreeNode,
                     ),
                   )
                |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                     editEngineState,
                   ),
                runEngineState
                |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                     currentSceneTreeNode,
                   )
                |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                     runEngineState,
                   ),
              )
              |> expect == (false, true);
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
            MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
          )
        );
        test(
          "test is run, remove currentGameObject arcballCameraController, the gameObject shouldn't bind event",
          () => {
            AddableComponentTool.addArcballCameraInCamera();

            ControllerTool.run();

            SceneTreeNodeDomTool.OperateDefaultScene.getArcballCameraComponentFromCamera()
            |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

            let editEngineState = StateLogicService.getEditEngineState();
            let runEngineState = StateLogicService.getRunEngineState();
            let currentSceneTreeNode =
              GameObjectTool.unsafeGetCurrentSceneTreeNode();
            (
              editEngineState
              |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                   StateLogicService.getEditEngineComponent(
                     DiffType.GameObject,
                     currentSceneTreeNode,
                   ),
                 ),
              runEngineState
              |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                   currentSceneTreeNode,
                 ),
            )
            |> expect == (false, false);
          },
        );
      });
      describe("test remove cameraGroup", () =>
        test("test click run, remove active cameraGroup will unbind event if it has arcballCameraController, set last cameraGroup to be active, and bind event if has arcballCameraController", () => {
          let (camera1, camera2) =
            AddableComponentTool.getTwoAddedArcballCameraControllerCamera(
              sandbox,
            );

          ControllerTool.run();

          SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
          |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

          let runEngineState = StateLogicService.getRunEngineState();

          (
            runEngineState
            |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                 camera1,
               )
            |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                 runEngineState,
               ),
            runEngineState
            |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                 camera2
               )
            |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                 runEngineState,
               ),
          )
          |> expect == (true, false);
        })
      );
    });
  });