open Wonder_jest;

let _ =
  describe("MainEditorAssetHeader->remove wdb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    open Js.Promise;

    let sandbox = getSandboxDefaultVal();
    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let sceneWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
      sceneWDBArrayBuffer := WDBTool.generateSceneWDB();
    });

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isBuildFakeDom=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );

      MainEditorAssetTool.buildFakeFileReader();
      MainEditorAssetTool.buildFakeImage();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);

      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      {|drag asset wdb into scene;
              select wdb to be currentNode;
              click remove-button;
              |},
      () => {
        testPromise(
          "cloned gameObjects of the asset wdb in the scene tree should be removed",
          () =>
          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               MainEditorSceneTreeTool.Drag.dragAssetWDBToSceneTree(
                 ~wdbNodeId=uploadedWDBNodeId,
                 (),
               );

               MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
                 ~wdbNodeId=uploadedWDBNodeId,
                 (),
               );

               BuildComponentTool.buildSceneTree(
                 TestTool.buildAppStateSceneGraphFromEngine(),
               )
               |> ReactTestTool.createSnapshotAndMatch
               |> resolve;
             })
        );
        testPromise("the geometry of the asset wdb should be removed", () =>
          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               MainEditorSceneTreeTool.Drag.dragAssetWDBToSceneTree(
                 ~wdbNodeId=uploadedWDBNodeId,
                 (),
               );

               MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
                 ~wdbNodeId=uploadedWDBNodeId,
                 (),
               );

               MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();

               let component =
                 BuildComponentTool.buildGeometry(
                   ~geometryComponent=
                     GameObjectTool.getCurrentGameObjectGeometry(),
                   ~isShowGeometryGroup=true,
                   (),
                 );

               component |> ReactTestTool.createSnapshotAndMatch |> resolve;
             })
        );
      },
    );

    testPromise(
      {|load BoxTextured.wdb;
              remove BoxTextured.wdb;
              load Scene.wdb;
              load BoxTextured.wdb;

              the MainEditorAssetChildrenNode panel should show "Scene","Boxtextured"
                |},
      () => {
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;

        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
               ~wdbNodeId=uploadedWDBNodeId,
               (),
             );

             MainEditorAssetUploadTool.loadOneWDB(
               ~arrayBuffer=sceneWDBArrayBuffer^,
               (),
             )
             |> then_(_ =>
                  MainEditorAssetUploadTool.loadOneWDB(
                    ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                    (),
                  )
                  |> then_(_ =>
                       BuildComponentTool.buildAssetComponent()
                       |> ReactTestTool.createSnapshotAndMatch
                       |> resolve
                     )
                );
           });
      },
    );
  });