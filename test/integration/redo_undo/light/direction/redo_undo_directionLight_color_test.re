open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: directionLight color", () => {
    let sandbox = getSandboxDefaultVal();

    let _changeColor = color => {
      let currentGameObjectDirectionLightComponent =
        GameObjectTool.getCurrentSceneTreeNodeDirectionLightComponent();

      let sourceColor =
        MainEditorDirectionLightTool.getColor(
          currentGameObjectDirectionLightComponent,
        );

      MainEditorDirectionLightTool.changeColor(
        currentGameObjectDirectionLightComponent,
        color,
      );

      MainEditorDirectionLightTool.closeColorPicker(
        ~light=currentGameObjectDirectionLightComponent,
        ~color=sourceColor,
        (),
      );
    };

    let _simulateTwiceChangeColor = () => {
      BuildCanvasTool.buildFakeCanvas(sandbox);

      let color1 = {
        "hex": "#7df1e8",
        "rgb": {
          "r": 125,
          "g": 241,
          "b": 232,
        },
      };
      let color2 = {
        "hex": "#1918e8",
        "rgb": {
          "r": 25,
          "g": 24,
          "b": 232,
        },
      };

      _changeColor(color1);
      _changeColor(color2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorSceneTool.createDefaultScene(sandbox, () =>
        MainEditorSceneTool.getDirectionLightInDefaultScene
        |> StateLogicService.getEngineStateToGetData
        |> GameObjectTool.setCurrentSceneTreeNode
      );
      DirectorToolEngine.prepareAndInitAllEnginState();
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeColor, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildDirectionLight,
    );
  });