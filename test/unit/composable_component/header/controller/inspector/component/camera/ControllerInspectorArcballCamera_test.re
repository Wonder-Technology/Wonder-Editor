open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("controller inspector arcballCameraController", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateAndGl(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode to be camera", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setCameraTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test set value into edit and run engineState", () => {
        describe("test change arcballCameraController distance", () => {
          let _getArcballCameraDistance = (component, engineState) =>
            engineState
            |> ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
                 component,
               )
            |. FloatService.truncateFloatValue(6);
          test("test change distance should set into engine", () => {
            MainEditorCameraTool.addArcballCameraComponentToCamera();

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

            (
              StateLogicService.getEditEngineState()
              |> _getArcballCameraDistance(
                   DiffComponentTool.getEditEngineComponent(
                     DiffType.ArcballCameraController,
                     currentGameObjectArcballCamera,
                   ),
                 ),
              StateLogicService.getRunEngineState()
              |> _getArcballCameraDistance(currentGameObjectArcballCamera),
            )
            |> expect == (value, value);
          });
        });

        describe("test change arcballCameraController minDistance", () => {
          let _getArcballCameraMinDistance = (component, engineState) =>
            engineState
            |> ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance(
                 component,
               )
            |. FloatService.truncateFloatValue(6);

          test("test change minDistance should set into engine", () => {
            MainEditorCameraTool.addArcballCameraComponentToCamera();

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

            (
              StateLogicService.getEditEngineState()
              |> _getArcballCameraMinDistance(
                   DiffComponentTool.getEditEngineComponent(
                     DiffType.ArcballCameraController,
                     currentGameObjectArcballCamera,
                   ),
                 ),
              StateLogicService.getRunEngineState()
              |> _getArcballCameraMinDistance(currentGameObjectArcballCamera),
            )
            |> expect == (value, value);
          });
        });
      });
    });
  });