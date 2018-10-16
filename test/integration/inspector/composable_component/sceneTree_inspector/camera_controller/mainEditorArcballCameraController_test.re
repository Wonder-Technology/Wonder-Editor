open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditor ArcballCameraController", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode to be camera", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test change arcballCameraController distance", () =>
        describe("test logic", () =>
          test("test change distance should set into engine", () => {
            MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
            let currentGameObjectArcballCamera =
              GameObjectTool.getCurrentGameObjectArcballCamera();
            let value = 21.1;

            MainEditorArcballCameraControllerTool.changeDistanceAndBlur(
              ~cameraController=currentGameObjectArcballCamera,
              ~value,
              (),
            );

            ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
              currentGameObjectArcballCamera,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        )
      );

      describe("test change arcballCameraController minDistance", () =>
        describe("test logic", () =>
          test("test change minDistance should set into engine", () => {
            MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
            let currentGameObjectArcballCamera =
              GameObjectTool.getCurrentGameObjectArcballCamera();
            let value = 11.1;

            MainEditorArcballCameraControllerTool.changeMinDistanceAndBlur(
              ~cameraController=currentGameObjectArcballCamera,
              ~value,
              (),
            );

            ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance(
              currentGameObjectArcballCamera,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        )
      );

      describe(
        "add shade dom for transformComponent if has arcballCameraController",
        () =>
        test("test snapshot for transform component", () => {
          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          let component =
            BuildComponentTool.buildMainEditorTransformComponent(
              TestTool.buildEmptyAppState(),
              currentGameObjectTransform,
            );
          component |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });
  });