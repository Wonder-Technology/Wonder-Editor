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
    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
    );
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load file", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);
      });

      testPromise("should not active wdb->camera", () => {
        let engineState = StateEngineService.unsafeGetState();
        let currentCameraGameObject =
          MainEditorCameraTool.getCurrentCameraGameObject(engineState);

        GameViewEditorService.removeActivedBasicCameraView
        |> StateLogicService.getAndSetEditorState;

        let fileName = "Scene";

        MainEditorAssetUploadTool.loadOneWDB(
          ~fileName,
          ~arrayBuffer=WDBTool.generateSceneWDB(),
          (),
        )
        |> then_(uploadedWDBNodeId => {
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
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
        let fileName = "BoxTextured";

        MainEditorAssetUploadTool.loadOneWDB(
          ~fileName,
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             let {wdbGameObject}: AssetNodeType.wdbResultType =
               StateEditorService.getState()
               |> AssetWDBNodeMapEditorService.getWDBNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(
                    uploadedWDBNodeId,
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