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

      describe("test set value into engineState", () => {
        describe("test change arcballCameraController distance", () => {
          let _getArcballCameraDistance = (component, engineState) =>
            engineState
            |> ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
                 component,
               )
            |. FloatService.truncateFloatValue(5);

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

            StateEngineService.unsafeGetState()
            |> _getArcballCameraDistance(currentGameObjectArcballCamera)
            |> expect == value;
          });
        });

        describe("test change arcballCameraController minDistance", () => {
          let _getArcballCameraMinDistance = (component, engineState) =>
            engineState
            |> ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance(
                 component,
               )
            |. FloatService.truncateFloatValue(5);

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

            StateEngineService.unsafeGetState()
            |> _getArcballCameraMinDistance(currentGameObjectArcballCamera)
            |> expect == value;
          });
        });
      });
    });
  });