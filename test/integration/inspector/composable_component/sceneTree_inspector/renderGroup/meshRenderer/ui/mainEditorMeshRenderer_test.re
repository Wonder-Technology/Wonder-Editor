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
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

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

          MainEditorMeshRendererTool.changeMode(~value=lineType, ());

          BuildComponentTool.buildMeshRenderer(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test logic", () => {
          let lineType = MainEditorMeshRendererTool.getDrawModeLineType();

          MainEditorMeshRendererTool.changeMode(~value=lineType, ());

          let meshRenderer = GameObjectTool.getCurrentGameObjectMeshRenderer();

          MeshRendererEngineService.getDrawMode(meshRenderer)
          |> StateLogicService.getEngineStateToGetData
          |> expect == lineType;
        });
      });
      describe("test set drawMode to Points", () => {
        test("test snapshot", () => {
          let pointType = MainEditorMeshRendererTool.getDrawModePointType();

          MainEditorMeshRendererTool.changeMode(~value=pointType, ());

          BuildComponentTool.buildMeshRenderer(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test logic", () => {
          let pointType = MainEditorMeshRendererTool.getDrawModePointType();

          MainEditorMeshRendererTool.changeMode(~value=pointType, ());

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

          MainEditorMeshRendererTool.changeMode(~value=triangleFanType, ());

          BuildComponentTool.buildMeshRenderer(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });

        test("test logic", () => {
          let triangleFanType =
            MainEditorMeshRendererTool.getDrawModeTriangleFanType();

          MainEditorMeshRendererTool.changeMode(~value=triangleFanType, ());

          let meshRenderer = GameObjectTool.getCurrentGameObjectMeshRenderer();

          MeshRendererEngineService.getDrawMode(meshRenderer)
          |> StateLogicService.getEngineStateToGetData
          |> expect == triangleFanType;
        });
      });
    });
  });