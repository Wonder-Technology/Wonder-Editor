open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: remove cameraGroup component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _simulateRemoveSpecificComponent = () =>
      SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
      |> OperateComponentEventTool.removeComponentFromCurrentGameObject;
    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      HeaderTool.triggerAddBox();

      SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

      let boxComponentCount = ComponentDomTool.getBoxComponentCount();
      let cameraCategoryDomIndex =
        ComponentDomTool.getCameraCategoryDomIndex();
      let cameraGroupTypeDomIndex =
        ComponentDomTool.getCameraGroupTypeDomIndex();

      OperateComponentEventTool.addComponentIntoCurrentGameObject(
        boxComponentCount,
        cameraCategoryDomIndex,
        cameraGroupTypeDomIndex,
      );

      MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();
    };
    let _afterEach = () => ();

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateRemoveSpecificComponent, _beforeEach, _afterEach),
      BuildComponentForRedoUndoTool.buildInspectorComponent,
    );
  });