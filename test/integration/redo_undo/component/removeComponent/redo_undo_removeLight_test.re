open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: remove light component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _simulateRemoveSpecificComponent = () =>
      SceneTreeNodeDomTool.OperateDefaultScene.getLightComponentFromDirectionLight()
      |> OperateComponentEventTool.removeComponentFromCurrentGameObject;
    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setDirectionLightGameObjectTobeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    };
    let _afterEach = () => ();

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateRemoveSpecificComponent, _beforeEach, _afterEach),
      BuildComponentForRedoUndoTool.buildInspectorComponent,
    );
  });