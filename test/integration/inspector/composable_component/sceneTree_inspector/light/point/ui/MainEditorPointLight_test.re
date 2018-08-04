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
      describe("test change color should set pointLight color", () => {
        describe("test snapshot", () => {
          beforeEach(() => {
            _prepareWithEmptyJob();

            MainEditorSceneTool.createDefaultScene(sandbox, () =>
              MainEditorSceneTool.getDirectionLightInDefaultScene
              |> StateLogicService.getEngineStateToGetData
              |> GameObjectTool.setCurrentSceneTreeNode
            );

            MainEditorLightTool.setLightTypeToBePointLight();
          });

          test("show color picker component for change color", () => {
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;

            let component =
              BuildComponentTool.buildPointLight(
                GameObjectTool.getCurrentGameObjectPointLightComponent(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              PickColorEventTool.triggerShowColorPickEvent,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("close color picker component", () => {
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;

            let component =
              BuildComponentTool.buildPointLight(
                GameObjectTool.getCurrentGameObjectPointLightComponent(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              PickColorEventTool.triggerShowColorPickEvent,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              PickColorEventTool.triggerCloseColorPickEvent,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () => {
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

          test("point light should be changed", () => {
            _prepareWithJob();
            _prepareDefaultSceneAndInit();

            MainEditorLightTool.setLightTypeToBePointLight();

            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentGameObjectPointLightComponent();
            let newColor = {
              "hex": "#7df1e8",
              "rgb": {
                "r": 125,
                "g": 241,
                "b": 232,
              },
            };

            PickColorEventTool.triggerChangePointLightColor(
              currentGameObjectPointLightComponent,
              newColor,
            );

            PointLightEngineService.getPointLightColor(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |> Color.getHexString
            |> expect == newColor##hex;
          });
        });
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