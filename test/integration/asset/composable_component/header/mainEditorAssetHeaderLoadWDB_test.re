open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->load wdb", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });

    afterEach(() =>
      restoreSandbox(
        refJsObjToSandbox(sandbox^),
        /* StateEditorService.getState()
           |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
           |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
           |> StateEditorService.setState
           |> ignore; */
      )
    );

    describe("test load file", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      testPromise("should not active wdb->camera", () => {
        let engineState = StateEngineService.unsafeGetState();
        let currentCameraGameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(engineState);

        GameViewEditorService.removeActivedBasicCameraView
        |> StateLogicService.getAndSetEditorState;

        let fileName = "Scene";
        let newWDBArrayBuffer =
          MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

        MainEditorAssetTool.fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
        )
        |> then_(_ => {
             let engineState = StateEngineService.unsafeGetState();
             let editorState = StateEditorService.getState();

             (
               GameViewEditorService.getActivedBasicCameraView(editorState),
               MainEditorCameraTool.getCurrentCameraGameObject(engineState),
             )
             |> expect == (None, currentCameraGameObject)
             |> resolve;
           });
      });
      testPromise(
        "test the wdb gameObject and it's children isRender should be false",
        () => {
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
        let fileName = "BoxTextured";
        let newWDBArrayBuffer =
          MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

        MainEditorAssetTool.fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildWDBFileEvent(fileName, newWDBArrayBuffer),
        )
        |> then_(_ => {
             assetTreeDomRecord
             |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
             |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

             let {wdbGameObject}: AssetNodeType.wdbResultType =
               StateEditorService.getState()
               |> AssetWDBNodeMapEditorService.getWDBNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(
                    MainEditorAssetNodeTool.getCurrentNodeId(),
                  );

             GameObjectMeshRendererTool.getAllGameObjectMeshRendererComponent(
               wdbGameObject,
             )
             |> StateLogicService.getEngineStateToGetData
             |> Js.Array.map(meshRender =>
                  MeshRendererEngineService.getMeshRendererIsRender(
                    meshRender,
                  )
                  |> StateLogicService.getEngineStateToGetData
                )
             |> Js.Array.filter(isRender => isRender)
             |> Js.Array.length
             |> expect == 0
             |> resolve;
           });
      });
    });
  });