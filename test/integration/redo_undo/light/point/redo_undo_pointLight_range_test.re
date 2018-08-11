open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: pointLight range", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeRange = value => {
      let currentGameObjectPointLightComponent =
        GameObjectTool.getCurrentGameObjectPointLightComponent();
      let component =
        BuildComponentTool.buildPointLight(
          currentGameObjectPointLightComponent,
        );

            let rangeDomIndex = MainEditorLightTool.getRangeDomIndex();

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerLightComponentChangeEvent(
                rangeDomIndex,
                value,
              ),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerLightComponentBlurEvent(
                rangeDomIndex,
                value,
              ),
            );


    };

    let _simulateTwiceChangeRange = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      MainEditorLightTool.setLightTypeToBePointLight();

      _changeRange(value1);
      _changeRange(value2);
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
      (_simulateTwiceChangeRange, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildPointLight,
    );
  });