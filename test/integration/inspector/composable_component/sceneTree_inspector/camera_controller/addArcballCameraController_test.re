open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test add arcballCameraController", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

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

    describe("if is run", () => {
      describe(
        "if gameObject has basicCameraView and basicCameraView is active ", () =>
        test("bind arcballCameraController event for game view", () => {
          ControllerTool.setIsRun(true);
          let currentBasicCameraView =
            GameObjectTool.unsafeGetCurrentSceneTreeNode()
            |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
                 _,
                 StateEngineService.unsafeGetState(),
               );
          let engineState =
            BasicCameraViewEngineService.activeBasicCameraView(
              currentBasicCameraView,
              StateEngineService.unsafeGetState(),
            );
          engineState |> StateEngineService.setState |> ignore;
          AddableComponentTool.addArcballCameraInCamera();

          let engineState = StateEngineService.unsafeGetState();
          let currentArcballCameraController =
            GameObjectTool.unsafeGetCurrentSceneTreeNode()
            |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                 _,
                 StateEngineService.unsafeGetState(),
               );
          ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
            currentArcballCameraController,
            engineState,
          )
          |> expect == true;
        })
      );

      describe("else", () =>
        test("not bind event for game view", () => {
          ControllerTool.setIsRun(true);
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();

          AddableComponentTool.addArcballCameraInBox();

          let engineState = StateEngineService.unsafeGetState();
          let currentSceneTreeNode =
            GameObjectTool.unsafeGetCurrentSceneTreeNode();
          engineState
          |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
               currentSceneTreeNode,
             )
          |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
               engineState,
             )
          |> expect == false;
        })
      );
    });
  });