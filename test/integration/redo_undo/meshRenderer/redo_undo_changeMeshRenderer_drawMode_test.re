open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: change meshRenderer drawMode", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

    let _simulateChangeTwiceDrawMode = () => {
      let lineType = MainEditorMeshRendererTool.getDrawModeLineType();

      MainEditorMeshRendererTool.changeMode(~value=lineType, ());

      let triangleFanType =
        MainEditorMeshRendererTool.getDrawModeTriangleFanType();

      MainEditorMeshRendererTool.changeMode(~value=triangleFanType, ());
    };

    let _beforeEach = () =>
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        () => {
          MainEditorAssetTool.initAssetTree();
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
        },
      );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateChangeTwiceDrawMode, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildMeshRenderer,
    );
  });