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
        EditorType.SceneTree,
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
      test("test change color", () => {
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

        StateEngineService.unsafeGetState()
        |> PointLightEngineService.getPointLightColor(
             currentGameObjectPointLightComponent,
           )
        |> Color.getHexString
        |> expect == newColor##hex;
      });

      test("test change intensity", () => {
        let _getPointLightIntensity = (component, engineState) =>
          engineState
          |> PointLightEngineService.getPointLightIntensity(component)
          |. FloatService.truncateFloatValue(5);

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
        StateEngineService.unsafeGetState()
        |> _getPointLightIntensity(currentGameObjectPointLightComponent)
        |> expect == value;
      });
    });
  });