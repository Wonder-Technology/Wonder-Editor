open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("Canvas", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test drag wdb", () => {
      let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

      beforeAll(() =>
        boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
      );

      beforeEach(() => {
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;

        MainEditorAssetTool.buildFakeFileReader();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);

        MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      describe("test drag wdb to scene", () =>
        testPromise("if current sceneTree node is None, add to scene", () =>
          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               GameObjectTool.clearCurrentSceneTreeNode();

               CanvasTool.Drag.dragWDBAsset(~wdbNodeId=uploadedWDBNodeId, ());

               BuildComponentTool.buildSceneTree(
                 TestTool.buildEmptyAppState(),
               )
               |> ReactTestTool.createSnapshotAndMatch
               |> resolve;
             })
        )
      );

      describe("test drag wdb to gameObject", () =>
        testPromise("should add to current sceneTree node's children", () =>
          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

               CanvasTool.Drag.dragWDBAsset(~wdbNodeId=uploadedWDBNodeId, ());

               BuildComponentTool.buildSceneTree(
                 TestTool.buildEmptyAppState(),
               )
               |> ReactTestTool.createSnapshotAndMatch
               |> resolve;
             })
        )
      );
    });
  });