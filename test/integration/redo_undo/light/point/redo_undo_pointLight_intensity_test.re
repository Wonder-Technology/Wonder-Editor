open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: pointLight intensity", () => {
    let sandbox = getSandboxDefaultVal();

    let _changeIntensity = value => {
      let light = GameObjectTool.getCurrentSceneTreeNodePointLightComponent();

      MainEditorPointLightTool.changeIntensityAndBlur(
        ~light,
        ~sourceValue=
          PointLightEngineService.getPointLightIntensity(
            light,
            StateEngineService.unsafeGetState(),
          ),
        ~targetValue=value,
        (),
      );
    };

    let _simulateTwiceChangeIntensity = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      MainEditorLightTool.setLightTypeToBePointLight();

      _changeIntensity(value1);
      _changeIntensity(value2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorSceneTool.createDefaultScene(sandbox, () =>
        MainEditorSceneTool.getDirectionLightInDefaultScene
        |> StateLogicService.getEngineStateToGetData
        |> GameObjectTool.setCurrentSceneTreeNode
      );
      DirectorToolEngine.prepareAndInitAllEnginState();
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeIntensity, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildPointLight,
    );
  });