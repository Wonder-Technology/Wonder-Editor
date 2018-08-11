open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorDirectionLight", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareWithEmptyJob = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      let _prepareDefaultSceneAndInit = () => {
        MainEditorSceneTool.createDefaultScene(sandbox, () =>
          MainEditorSceneTool.getDirectionLightInDefaultScene
          |> StateLogicService.getEngineStateToGetData
          |> GameObjectTool.setCurrentSceneTreeNode
        );
        DirectorToolEngine.prepareAndInitAllEnginState();
      };

      let _prepareWithJob = () => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      };
      describe("test change color", () => {
        beforeEach(() => {
          _prepareWithJob();
          _prepareDefaultSceneAndInit();
        });

        PickColorEventTool.testOperateColorPickToChangeColor(
          sandbox,
          BuildComponentForCurryTool.buildDirectionLight,
          (
            GameObjectTool.getCurrentGameObjectDirectionLightComponent,
            PickColorEventTool.triggerChangeDirectionLightColor,
            DirectionLightEngineService.getDirectionLightColor,
          ),
        );
      });

      describe("test change direction light intensity", () => {
        beforeEach(() => {
          _prepareWithEmptyJob();

          MainEditorSceneTool.createDefaultScene(sandbox, () =>
            MainEditorSceneTool.getDirectionLightInDefaultScene
            |> StateLogicService.getEngineStateToGetData
            |> GameObjectTool.setCurrentSceneTreeNode
          );
        });

        describe("test logic", () =>
          test("test change intensity should set into engine", () => {
            let currentGameObjectDirectionLightComponent =
              GameObjectTool.getCurrentGameObjectDirectionLightComponent();
            let component =
              BuildComponentTool.buildDirectionLight(
                currentGameObjectDirectionLightComponent,
              );
            let value = 10.1;
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

            DirectionLightEngineService.getDirectionLightIntensity(
              currentGameObjectDirectionLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
      });
    });
  });