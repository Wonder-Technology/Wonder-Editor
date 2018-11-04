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

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      {|drag wdb asset into scene;
              select wdb to be currentNode;
              click remove-button;
              |},
      () => {
        describe("test cloned gameObjects of the wdb asset", () => {
          testPromise("cloned gameObjects shouldn't be removed", () => {
            MainEditorSceneTool.prepareScene(sandbox);

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
               });
          });

          describe("cloned gameObjects->geometrys should be disposed", () => {
            testPromise("test engine", () => {
              MainEditorSceneTool.prepareScene(sandbox);

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   MainEditorSceneTreeTool.Drag.dragAssetWDBToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );
                   MainEditorSceneTreeTool.Drag.dragAssetWDBToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );

                   MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );

                   let engineState = StateEngineService.unsafeGetState();

                   let clonedGameObjectsWhoHasGeometryWhenCloned =
                     LoadWDBTool.getBoxTexturedMeshGameObjects(engineState);

                   clonedGameObjectsWhoHasGeometryWhenCloned
                   |> Js.Array.map(gameObject =>
                        GameObjectComponentEngineService.hasGeometryComponent(
                          gameObject,
                          engineState,
                        )
                      )
                   |> expect == [|false, false|]
                   |> resolve;
                 });
            });
            testPromise("test snapshot", () => {
              MainEditorSceneTool.prepareScene(sandbox);

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   MainEditorSceneTreeTool.Drag.dragAssetWDBToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );
                   MainEditorSceneTreeTool.Drag.dragAssetWDBToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );

                   MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );

                   let engineState = StateEngineService.unsafeGetState();

                   let clonedGameObjectsWhoHasGeometryWhenCloned =
                     LoadWDBTool.getBoxTexturedMeshGameObjects(engineState);

                   engineState |> StateEngineService.setState |> ignore;

                   MainEditorSceneTreeTool.Select.selectGameObject(
                     ~gameObject=
                       clonedGameObjectsWhoHasGeometryWhenCloned
                       |> ArrayService.unsafeGetFirst,
                     (),
                   );

                   BuildComponentTool.buildInspectorComponent(
                     TestTool.buildEmptyAppState(),
                     InspectorTool.buildFakeAllShowComponentConfig(),
                   )
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve;
                 });
            });
          });
        });

        testPromise("the geometry of the wdb asset should be removed", () => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

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
             });
        });
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
        MainEditorSceneTool.prepareScene(sandbox);

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