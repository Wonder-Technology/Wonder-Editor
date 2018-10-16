open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: directionLight intensity", () => {
    let sandbox = getSandboxDefaultVal();

    let _changeIntensity = value => {
      let light = GameObjectTool.getCurrentGameObjectDirectionLightComponent();

      MainEditorDirectionLightTool.changeIntensityAndBlur(
        ~light,
        ~sourceValue=
          DirectionLightEngineService.getDirectionLightIntensity(
            light,
            StateEngineService.unsafeGetState(),
          ),
        ~targetValue=value,
        (),
      );
    };

    let _simulateTwiceChangeIntensity = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      _changeIntensity(value1);
      _changeIntensity(value2);
    };

    let _beforeEach = () =>
      MainEditorSceneTool.createDefaultScene(sandbox, () =>
        MainEditorSceneTool.getDirectionLightInDefaultScene
        |> StateLogicService.getEngineStateToGetData
        |> GameObjectTool.setCurrentSceneTreeNode
      );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeIntensity, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildDirectionLight,
    );
  });