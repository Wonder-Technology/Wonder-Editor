open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: remove cameraGroup component", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulateRemoveSpecificComponent = () =>
      MainEditorInspectorRemoveComponentTool.removeCameraGroupComponent();

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      let newGameObject = GameObjectTool.getNewGameObjectUid();

      MainEditorSceneTreeHeaderTool.addBox();

      MainEditorInspectorAddComponentTool.addCameraGroupComponent(
        ~gameObject=newGameObject,
        (),
      );

      MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
    };
    let _afterEach = () => ();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateRemoveSpecificComponent, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildInspectorComponent,
    );
  });