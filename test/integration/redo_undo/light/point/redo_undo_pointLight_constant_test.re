open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: pointLight constant", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeConstant = value => {
      let currentGameObjectPointLightComponent =
        GameObjectTool.getCurrentGameObjectPointLightComponent();
      let component =
        BuildComponentTool.buildPointLight(
          currentGameObjectPointLightComponent,
        );

      let constantDomIndex = MainEditorLightTool.getConstantDomIndex();

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorLightTool.triggerLightComponentChangeEvent(
          constantDomIndex,
          value,
        ),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorLightTool.triggerLightComponentBlurEvent(
          constantDomIndex,
          value,
        ),
      );
    };

    let _simulateTwiceChangeConstant = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      MainEditorLightTool.setLightTypeToBePointLight();

      _changeConstant(value1);
      _changeConstant(value2);
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
      (_simulateTwiceChangeConstant, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildPointLight,
    );
  });