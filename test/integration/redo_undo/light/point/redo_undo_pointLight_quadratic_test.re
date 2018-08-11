open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: pointLight quadratic", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeQuadratic = value => {
      let currentGameObjectPointLightComponent =
        GameObjectTool.getCurrentGameObjectPointLightComponent();
      let component =
        BuildComponentTool.buildPointLight(
          currentGameObjectPointLightComponent,
        );

            let quadraticDomIndex = MainEditorLightTool.getQuadraticDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerLightComponentChangeEvent(
                quadraticDomIndex,
                value,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerLightComponentBlurEvent(
                quadraticDomIndex,
                value,
              ),
            );


    };

    let _simulateTwiceChangeQuadratic = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      MainEditorLightTool.setLightTypeToBePointLight();

      _changeQuadratic(value1);
      _changeQuadratic(value2);
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
      (_simulateTwiceChangeQuadratic, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildPointLight,
    );
  });