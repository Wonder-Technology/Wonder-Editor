open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: cameraView set currentCamera", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateSetFirstCameraBeCurrentCamera = () => {
      MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();

      MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
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
    };
    let _afterEach = () => ();

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode to be camera",
      (_simulateSetFirstCameraBeCurrentCamera, _beforeEach,_afterEach),
      BuildComponentForRedoUndoTool.buildCameraView,
    );
  });