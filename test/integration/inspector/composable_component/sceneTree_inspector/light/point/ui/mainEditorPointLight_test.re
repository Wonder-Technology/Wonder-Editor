open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorPointLight", () => {
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
          MainEditorLightTool.setLightTypeToBePointLight();
        });

        PickColorEventTool.testOperateColorPickToChangeColor(
          sandbox,
          BuildComponentForCurryTool.buildPointLight,
          (
            GameObjectTool.getCurrentGameObjectPointLightComponent,
            PickColorEventTool.triggerChangePointLightColor,
            PointLightEngineService.getPointLightColor,
          ),
        );
      });

      describe("test pointLight's attribute set in engine", () => {
        beforeEach(() => {
          _prepareWithEmptyJob();

          MainEditorSceneTool.createDefaultScene(sandbox, () =>
            MainEditorSceneTool.getDirectionLightInDefaultScene
            |> StateLogicService.getEngineStateToGetData
            |> GameObjectTool.setCurrentSceneTreeNode
          );

          MainEditorLightTool.setLightTypeToBePointLight();
        });

        describe("test change point light intensity", () =>
          test("test change intensity should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentGameObjectPointLightComponent();
            let component =
              BuildComponentTool.buildPointLight(
                currentGameObjectPointLightComponent,
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

            PointLightEngineService.getPointLightIntensity(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
        describe("test change point light constant", () =>
          test("test change constant should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentGameObjectPointLightComponent();
            let component =
              BuildComponentTool.buildPointLight(
                currentGameObjectPointLightComponent,
              );
            let value = 10.1;

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

            PointLightEngineService.getPointLightConstant(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
        describe("test change point light linear", () =>
          test("test change linear should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentGameObjectPointLightComponent();
            let component =
              BuildComponentTool.buildPointLight(
                currentGameObjectPointLightComponent,
              );
            let value = 10.1;

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

            PointLightEngineService.getPointLightLinear(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
        describe("test change point light quadratic", () =>
          test("test change quadratic should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentGameObjectPointLightComponent();
            let component =
              BuildComponentTool.buildPointLight(
                currentGameObjectPointLightComponent,
              );
            let value = 10.1;

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

            PointLightEngineService.getPointLightQuadratic(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
        describe("test change point light range", () =>
          test("test change range should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentGameObjectPointLightComponent();
            let component =
              BuildComponentTool.buildPointLight(
                currentGameObjectPointLightComponent,
              );
            let value = 10.1;

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

            PointLightEngineService.getPointLightRange(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
      });
    });
  });