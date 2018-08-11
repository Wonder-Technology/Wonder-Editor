open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: pointLight linear", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeLinear = value => {
      let currentGameObjectPointLightComponent =
        GameObjectTool.getCurrentGameObjectPointLightComponent();
      let component =
        BuildComponentTool.buildPointLight(
          currentGameObjectPointLightComponent,
        );
            let linearDomIndex = MainEditorLightTool.getLinearDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerLightComponentChangeEvent(
                linearDomIndex,
                value,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerLightComponentBlurEvent(
                linearDomIndex,
                value,
              ),
            );
    };

    let _simulateTwiceChangeLinear = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      MainEditorLightTool.setLightTypeToBePointLight();

      _changeLinear(value1);
      _changeLinear(value2);
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
      (_simulateTwiceChangeLinear, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildPointLight,
    );
  });