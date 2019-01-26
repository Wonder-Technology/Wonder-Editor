open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("redo_undo: drag wdb to canvas", () => {
    let sandbox = getSandboxDefaultVal();

    let cubeTexturedWDBArrayBuffer = ref(Obj.magic(1));

    let _simulateTwiceDragEvent = testFunc =>
      MainEditorAssetUploadTool.loadOneWDB(
        ~arrayBuffer=cubeTexturedWDBArrayBuffer^,
        (),
      )
      |> then_(uploadedWDBNodeId => {
           GameObjectTool.clearCurrentSceneTreeNode();

           CanvasTool.Drag.dragWDBAsset(~wdbNodeId=uploadedWDBNodeId, ());

           MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

           CanvasTool.Drag.dragWDBAsset(~wdbNodeId=uploadedWDBNodeId, ());

           testFunc();
         });

    beforeAll(() =>
      cubeTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("CubeTextured")
    );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () =>
        testPromise("step which from second to first", () =>
          _simulateTwiceDragEvent(() => {
            RedoUndoTool.undoHistoryState();

            BuildComponentTool.buildSceneTree(
              TestTool.buildEmptyAppState(),
            )
            |> ReactTestTool.createSnapshotAndMatch
            |> resolve;
          })
        )
      )
    );
  });