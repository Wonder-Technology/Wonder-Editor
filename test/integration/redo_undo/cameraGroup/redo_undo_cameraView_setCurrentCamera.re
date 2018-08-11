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

      HeaderTool.triggerAddBox();

      SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

      AddableComponentTool.addCameraGroupInBox();
    };
    let _afterEach = () => ();

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode to be camera",
      (_simulateSetFirstCameraBeCurrentCamera, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildCameraView,
    );
  });