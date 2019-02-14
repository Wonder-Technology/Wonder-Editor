open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
            [
        {
          "name": "default",
          "jobs": [
            {
              "name": "init_transform_gizmos"
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
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();

      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test TransformGizmoCoordinateSystemSwitch", () =>
      test("if current gizmo type is scale, disable ui", () => {
        CurrentTransformGizmoSceneViewEditorService.markScale
        |> StateLogicService.getAndSetEditorState;

        BuildComponentTool.buildController()
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );
  });