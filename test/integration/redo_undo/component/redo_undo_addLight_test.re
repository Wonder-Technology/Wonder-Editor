open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: add light component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _simulateAddLightComponent = () => {
      let boxComponentCount = ComponentDomTool.getBoxComponentCount();
      let renderingCategoryDomIndex =
        ComponentDomTool.getRenderingCategoryDomIndex();
      let lightTypeDomIndex = ComponentDomTool.getLightTypeDomIndex();

      OperateComponentEventTool.addComponentIntoCurrentGameObject(
        boxComponentCount,
        renderingCategoryDomIndex,
        lightTypeDomIndex,
      );
    };
    let _beforeEach = () => {
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
    };

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateAddLightComponent, _beforeEach),
      BuildComponentForRedoUndoTool.buildInspectorComponent,
    );
  });