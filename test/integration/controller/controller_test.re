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

        BuildComponentTool.buildController(false)
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );

    describe("test controller -> currentRepo and repoList component", () => {
      beforeEach(() => {
        SettingTool.setSetting(
          ~debug=Some({isDebug: true, isTestLocal: true}),
          (),
        )
        |> StateEditorService.setState
        |> ignore;

        UserDataTool.setUserData |> StateLogicService.getAndSetEditorState;
      });

      describe("if not show repo list modal", () =>
        test("test snapshot", () =>
          BuildComponentTool.buildController(false)
          |> ReactTestTool.createSnapshotAndMatch
        )
      );
      describe("else, show repo list modal", () =>
        test("test snapshot", () =>
          BuildComponentTool.buildController(true)
          |> ReactTestTool.createSnapshotAndMatch
        )
      );
    });
  });