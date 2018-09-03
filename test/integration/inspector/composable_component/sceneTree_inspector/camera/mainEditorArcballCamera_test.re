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
          MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test change arcballCameraController distance", () =>
        describe("test logic", () =>
          test("test change distance should set into engine", () => {
            AddableComponentTool.addArcballCameraInCamera();

            let currentGameObjectArcballCamera =
              GameObjectTool.getCurrentGameObjectArcballCamera();

            let component =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            let value = 21.1;

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorCameraTool.triggerChangeArcballDistance(value),
            );

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorCameraTool.triggerBlurArcballDistance(value),
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
            AddableComponentTool.addArcballCameraInCamera();

            let currentGameObjectArcballCamera =
              GameObjectTool.getCurrentGameObjectArcballCamera();

            let component =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            let value = 11.1;

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorCameraTool.triggerChangeArcballMinDistance(value),
            );

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorCameraTool.triggerBlurArcballMinDistance(value),
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
        "test add shade for transformComponent if has arcballCameraController",
        () =>
        test("test snapshot for transform component", () => {
          AddableComponentTool.addArcballCameraInCamera();
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