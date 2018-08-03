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

      describe("test change point light intensity", () => {
        beforeEach(() => {
          _prepareWithEmptyJob();

          MainEditorSceneTool.createDefaultScene(sandbox, () =>
            MainEditorSceneTool.getDirectionLightInDefaultScene
            |> StateLogicService.getEngineStateToGetData
            |> GameObjectTool.setCurrentSceneTreeNode
          );

          MainEditorLightTool.setLightTypeToBePointLight();
        });

        describe("test logic", () =>
          test("test change intensity should set into engine", () => {
            let currentGameObjectPointLightComponent =
              GameObjectTool.getCurrentGameObjectPointLightComponent();
            let component =
              BuildComponentTool.buildPointLight(
                currentGameObjectPointLightComponent,
              );
            let value = 10.1;

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerIntensityChangeEvent(value),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorLightTool.triggerIntensityBlurEvent(value),
            );

            PointLightEngineService.getPointLightIntensity(
              currentGameObjectPointLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(6)
            |> expect == value;
          })
        );
      });
    });
  });