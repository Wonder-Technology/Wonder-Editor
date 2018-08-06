open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: change meshRenderer drawMode", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) => ArrayService.getNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _simulateChangeTwiceDrawMode = () => {
      let lineType = MainEditorMeshRendererTool.getDrawModeLineType();

      MainEditorMeshRendererTool.triggerChangeDrawModeEvent(lineType);

      let triangleFanType =
        MainEditorMeshRendererTool.getDrawModeTriangleFanType();

      MainEditorMeshRendererTool.triggerChangeDrawModeEvent(triangleFanType);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        () => {
          MainEditorAssetTool.initAssetTree();
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();
        },
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateChangeTwiceDrawMode, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildMeshRenderer,
    );
  });