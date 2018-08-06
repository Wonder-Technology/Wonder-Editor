open Wonder_jest;

open Expect;

open Expect.Operators;

open AssetNodeType;

open Sinon;

let _ =
  describe("controller mainEditor meshRenderer", () => {
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

    describe("test set value into edit and run engineState", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test meshRenderer change drawMode", () => {
        test("test set drawMode to Lines", () => {
          let lineType = MainEditorMeshRendererTool.getDrawModeLineType();

          MainEditorMeshRendererTool.triggerChangeDrawModeEvent(lineType);

          let meshRenderer = GameObjectTool.getCurrentGameObjectMeshRenderer();

          (
            StateLogicService.getEditEngineState()
            |> MeshRendererEngineService.getDrawMode(
                 DiffComponentTool.getEditEngineComponent(
                   DiffType.MeshRenderer,
                   meshRenderer,
                 ),
               ),
            StateLogicService.getRunEngineState()
            |> MeshRendererEngineService.getDrawMode(meshRenderer),
          )
          |> expect == (lineType, lineType);
        });
        describe("test set drawMode to Triangle_fan", () =>
          test("test logic", () => {
            let triangleFanType =
              MainEditorMeshRendererTool.getDrawModeTriangleFanType();

            MainEditorMeshRendererTool.triggerChangeDrawModeEvent(
              triangleFanType,
            );

            let meshRenderer =
              GameObjectTool.getCurrentGameObjectMeshRenderer();

            (
              StateLogicService.getEditEngineState()
              |> MeshRendererEngineService.getDrawMode(
                   DiffComponentTool.getEditEngineComponent(
                     DiffType.MeshRenderer,
                     meshRenderer,
                   ),
                 ),
              StateLogicService.getRunEngineState()
              |> MeshRendererEngineService.getDrawMode(meshRenderer),
            )
            |> expect == (triangleFanType, triangleFanType);
          })
        );
      });
    });
  });