open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: directionLight itensity", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeItensity = value => {
      let component = BuildComponentForRedoUndoTool.buildDirectionLight();

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorLightTool.triggerIntensityChangeEvent(value),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorLightTool.triggerIntensityBlurEvent(value),
      );
    };

    let _simulateTwiceChangeItensity = () => {
      let value1 = 10.1;
      let value2 = 12.12;

      _changeItensity(value1);
      _changeItensity(value2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(sandbox, () =>
        MainEditorSceneTool.getDirectionLightInDefaultScene
        |> StateLogicService.getEngineStateToGetData
        |> GameObjectTool.setCurrentSceneTreeNode
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeItensity, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildDirectionLight
    );
  });