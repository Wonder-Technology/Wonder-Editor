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
      let _testPointLightChangeAndBlurValue =
          (value, changePointLightValueAndBlurFunc, getValueFunc) => {
        let currentGameObjectPointLightComponent =
          GameObjectTool.getCurrentSceneTreeNodePointLightComponent();

        changePointLightValueAndBlurFunc(
          ~light=currentGameObjectPointLightComponent,
          ~sourceValue=
            PointLightEngineService.getPointLightIntensity(
              currentGameObjectPointLightComponent,
              StateEngineService.unsafeGetState(),
            ),
          ~targetValue=value,
          (),
        );

        (
          StateEngineService.unsafeGetState()
          |> getValueFunc(currentGameObjectPointLightComponent)
        )
        ->(FloatService.truncateFloatValue(5))
        |> expect == value;
      };

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
        |> expect ==
        newColor##hex;
      });

      test("test change intensity", () => {
        let value = 10.1;

        _testPointLightChangeAndBlurValue(
          value,
          MainEditorPointLightTool.changeIntensityAndBlur,
          PointLightEngineService.getPointLightIntensity,
        );
      });

      test("test change constant", () => {
        let value = 13.1;

        _testPointLightChangeAndBlurValue(
          value,
          MainEditorPointLightTool.changeConstantAndBlur,
          PointLightEngineService.getPointLightConstant,
        );
      });

      test("test change linear", () => {
        let value = 23.1;

        _testPointLightChangeAndBlurValue(
          value,
          MainEditorPointLightTool.changeLinearAndBlur,
          PointLightEngineService.getPointLightLinear,
        );
      });

      test("test change quadratic", () => {
        let value = 13.1;

        _testPointLightChangeAndBlurValue(
          value,
          MainEditorPointLightTool.changeQuadraticAndBlur,
          PointLightEngineService.getPointLightQuadratic,
        );
      });

      test("test change range", () => {
        let value = 18.9;

        _testPointLightChangeAndBlurValue(
          value,
          MainEditorPointLightTool.changeRangeAndBlur,
          PointLightEngineService.getPointLightRange,
        );
      });
    });
  });