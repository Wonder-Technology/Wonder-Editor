open Wonder_jest;

open Expect;

open Expect.Operators;

open AssetNodeType;

open Sinon;

let _ =
  describe("mainEditor meshRenderer", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    });

    describe("test meshRenderer change drawMode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        )
      );
      describe("test set drawMode to Lines", () => {
        test("test snapshot", () => {
          let lineType = MainEditorMeshRendererTool.getDrawModeLineType();

          MainEditorMeshRendererTool.triggerChangeDrawModeEvent(lineType);

          BuildComponentTool.buildMeshRenderer(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test logic", () => {
          let lineType = MainEditorMeshRendererTool.getDrawModeLineType();

          MainEditorMeshRendererTool.triggerChangeDrawModeEvent(lineType);

          let meshRenderer = GameObjectTool.getCurrentGameObjectMeshRenderer();

          MeshRendererEngineService.getDrawMode(meshRenderer)
          |> StateLogicService.getEngineStateToGetData
          |> expect == lineType;
        });
      });
      describe("test set drawMode to Points", () => {
        test("test snapshot", () => {
          let pointType = MainEditorMeshRendererTool.getDrawModePointType();

          MainEditorMeshRendererTool.triggerChangeDrawModeEvent(pointType);

          BuildComponentTool.buildMeshRenderer(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test logic", () => {
          let pointType = MainEditorMeshRendererTool.getDrawModePointType();

          MainEditorMeshRendererTool.triggerChangeDrawModeEvent(pointType);

          let meshRenderer = GameObjectTool.getCurrentGameObjectMeshRenderer();

          MeshRendererEngineService.getDrawMode(meshRenderer)
          |> StateLogicService.getEngineStateToGetData
          |> expect == pointType;
        });
      });
      describe("test set drawMode to Triangle_fan", () => {
        test("test snapshot", () => {
          let triangleFanType =
            MainEditorMeshRendererTool.getDrawModeTriangleFanType();

          MainEditorMeshRendererTool.triggerChangeDrawModeEvent(
            triangleFanType,
          );

          BuildComponentTool.buildMeshRenderer(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test logic", () => {
          let triangleFanType =
            MainEditorMeshRendererTool.getDrawModeTriangleFanType();

          MainEditorMeshRendererTool.triggerChangeDrawModeEvent(
            triangleFanType,
          );

          let meshRenderer = GameObjectTool.getCurrentGameObjectMeshRenderer();

          MeshRendererEngineService.getDrawMode(meshRenderer)
          |> StateLogicService.getEngineStateToGetData
          |> expect == triangleFanType;
        });
      });
    });
  });