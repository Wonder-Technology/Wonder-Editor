open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: add cameraGroup component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _simulateAddSpecificComponent = () => {
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
    };
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
    };
    let _afterEach = () => ();

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateAddSpecificComponent, _beforeEach, _afterEach),
      BuildComponentForRedoUndoTool.buildInspectorComponent,
    );
  });