open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector point light", () => {
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
      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set value into engineState", () => {
      beforeEach(() => {
        _prepareWithJob();
        _prepareDefaultSceneAndInit();

        MainEditorLightTool.setLightTypeToBePointLight();
      });

      test("test change color", () => {
        let currentGameObjectPointLightComponent =
          GameObjectTool.getCurrentSceneTreeNodePointLightComponent();
        let newColor = {
          "hex": "#7df1e8",
          "rgb": {
            "r": 125,
            "g": 241,
            "b": 232,
          },
        };

        MainEditorPointLightTool.changeColor(
          currentGameObjectPointLightComponent,
          newColor,
        );

        StateEngineService.unsafeGetState()
        |> PointLightEngineService.getPointLightColor(
             currentGameObjectPointLightComponent,
           )
        |> Color.getHexString
        |> expect == newColor##hex;
      });

      test("test change intensity", () => {
        let currentGameObjectPointLightComponent =
          GameObjectTool.getCurrentSceneTreeNodePointLightComponent();
        let value = 10.1;

        MainEditorPointLightTool.changeIntensityAndBlur(
          ~light=currentGameObjectPointLightComponent,
          ~sourceValue=
            PointLightEngineService.getPointLightIntensity(
              currentGameObjectPointLightComponent,
              StateEngineService.unsafeGetState(),
            ),
          ~targetValue=value,
          (),
        );

        StateEngineService.unsafeGetState()
        |> PointLightEngineService.getPointLightIntensity(
             currentGameObjectPointLightComponent,
           )
        |. FloatService.truncateFloatValue(5)
        |> expect == value;
      });
    });
  });