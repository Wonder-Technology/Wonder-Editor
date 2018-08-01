open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: rename", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    let _simulateTwiceChangeName = () => {
      let inspectorComponent =
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildAppStateSceneGraphFromEngine(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        );
      let name1 = "gameObject1";
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameChangeEvent(name1),
      );
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameBlurEvent(name1),
      );
      let name2 = "gameObject2";
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameChangeEvent(name2),
      );
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        GameObjectRenameTool.triggerRenameBlurEvent(name2),
      );
    };

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeName, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildInspectorComponent,
    );
  });