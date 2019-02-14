open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector direction light", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareDefaultSceneAndInit = () => {
      MainEditorSceneTool.createDefaultScene(sandbox, () =>
        MainEditorSceneTool.getDirectionLightInDefaultScene
        |> StateLogicService.getEngineStateToGetData
        |> GameObjectTool.setCurrentSceneTreeNode
      );

      DirectorToolEngine.prepareAndInitAllEnginState();

      ControllerTool.run();
    };
    let _prepareWithEmptyJob = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
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

    beforeEach(() => {
      sandbox := createSandbox();

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set value into engineState", () => {
      let _getDirectionLightIntensity = (component, engineState) =>
        engineState
        |> DirectionLightEngineService.getDirectionLightIntensity(component)
        |. FloatService.truncateFloatValue(5);

      beforeEach(() => {
        _prepareWithJob();
        _prepareDefaultSceneAndInit();
      });

      test("test change color", () => {
        let currentGameObjectDirectionLightComponent =
          GameObjectTool.getCurrentSceneTreeNodeDirectionLightComponent();
        let newColor = {
          "hex": "#7df1e8",
          "rgb": {
            "r": 125,
            "g": 241,
            "b": 232,
          },
        };

        MainEditorDirectionLightTool.changeColor(
          currentGameObjectDirectionLightComponent,
          newColor,
        );

        StateEngineService.unsafeGetState()
        |> DirectionLightEngineService.getDirectionLightColor(
             currentGameObjectDirectionLightComponent,
           )
        |> Color.getHexString
        |> expect == newColor##hex;
      });

      test("test change intensity", () => {
        let currentGameObjectDirectionLightComponent =
          GameObjectTool.getCurrentSceneTreeNodeDirectionLightComponent();
        let value = 10.1;

        MainEditorDirectionLightTool.changeIntensityAndBlur(
          ~light=currentGameObjectDirectionLightComponent,
          ~sourceValue=
            DirectionLightEngineService.getDirectionLightIntensity(
              currentGameObjectDirectionLightComponent,
              StateEngineService.unsafeGetState(),
            ),
          ~targetValue=value,
          (),
        );

        StateEngineService.unsafeGetState()
        |> _getDirectionLightIntensity(
             currentGameObjectDirectionLightComponent,
           )
        |> expect == value;
      });
    });
  });