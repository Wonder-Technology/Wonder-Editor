open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: pointLight itensity", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeItensity = value => {
      let currentGameObjectPointLightComponent =
        GameObjectTool.getCurrentGameObjectPointLightComponent();
      let component =
        BuildComponentTool.buildPointLight(
          currentGameObjectPointLightComponent,
        );

      let intensityDomIndex = MainEditorLightTool.getIntensityDomIndex();

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorLightTool.triggerLightComponentChangeEvent(
          intensityDomIndex,
          value,
        ),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorLightTool.triggerLightComponentBlurEvent(
          intensityDomIndex,
          value,
        ),
      );
    };

    let _simulateTwiceChangeItensity = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      MainEditorLightTool.setLightTypeToBePointLight();

      _changeItensity(value1);
      _changeItensity(value2);
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

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeItensity, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildPointLight,
    );
  });