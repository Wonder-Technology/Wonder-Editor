open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("update camera job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "update_camera" }
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

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("update all arcballCameraControllers", () =>
      test("update undirty ones", () => {
        _prepareState();
        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

        MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();

        let pos = (0., 0., 0.);
        TransformGameObjectEngineService.setLocalPosition(
          GameObjectTool.getCurrentSceneTreeNodeTransform(),
          pos,
        )
        |> StateLogicService.getAndSetEngineState;

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        TransformGameObjectEngineService.getLocalPosition(
          GameObjectTool.getCurrentSceneTreeNodeTransform(),
        )
        |> StateLogicService.getEngineStateToGetData
        |> expect != (0., 0., 0.);
      })
    );
  });