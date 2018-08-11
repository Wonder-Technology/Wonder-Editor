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
      describe("test change color should set directionLight color", () => {
        describe("test snapshot", () => {
          beforeEach(() => {
            _prepareWithEmptyJob();

            MainEditorSceneTool.createDefaultScene(sandbox, () =>
              MainEditorSceneTool.getDirectionLightInDefaultScene
              |> StateLogicService.getEngineStateToGetData
              |> GameObjectTool.setCurrentSceneTreeNode
            );
          });

          test("show color picker component for change color", () => {
/* TODO encapsulate to function */
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;







            let component =
              BuildComponentTool.buildDirectionLight(
                GameObjectTool.getCurrentGameObjectDirectionLightComponent(),
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
              BuildComponentTool.buildDirectionLight(
                GameObjectTool.getCurrentGameObjectDirectionLightComponent(),
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

          test("direction light should be changed", () => {
            _prepareWithJob();
            _prepareDefaultSceneAndInit();

            let currentGameObjectDirectionLightComponent =
              GameObjectTool.getCurrentGameObjectDirectionLightComponent();
            let newColor = {
              "hex": "#7df1e8",
              "rgb": {
                "r": 125,
                "g": 241,
                "b": 232,
              },
            };

            PickColorEventTool.triggerChangeDirectionLightColor(
              currentGameObjectDirectionLightComponent,
              newColor,
            );

            DirectionLightEngineService.getDirectionLightColor(
              currentGameObjectDirectionLightComponent,
            )
            |> StateLogicService.getEngineStateToGetData
            |> Color.getHexString
            |> expect == newColor##hex;
          });
        });
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
            |. FloatService.truncateFloatValue(6)
            |> expect == value;
          })
        );
      });
    });
  });