open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: add renderGroup component", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateAddSpecificComponent = () =>
      MainEditorInspectorAddComponentTool.addRenderGroupComponent();

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;
    };
    let _afterEach = () => ();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateAddSpecificComponent, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildInspectorComponent,
    );
  });