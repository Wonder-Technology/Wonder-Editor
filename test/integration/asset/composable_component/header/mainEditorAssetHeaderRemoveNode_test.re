open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

let _ =
  describe("MainEditorAssetHeader->remove node", () => {
    let sandbox = getSandboxDefaultVal();
    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let sceneWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
      sceneWDBArrayBuffer := WDBTool.generateSceneWDB();
    });

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

    describe("test remove tree node", () => {
      test(
        "if not select specific treeNode, remove-button's disabled props should == true ",
        () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree,
          );

          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );

      describe("else", () => {
        test("remove-button's disabled props should == false", () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree,
          );

          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                assetTreeData,
              ),
            (),
          );

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });

        describe("test select folder", () => {
          beforeEach(() =>
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorAssetTool.initAssetTree,
            )
          );

          test(
            "click remove-button should remove folder from assetTreeRoot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
            let component = BuildComponentTool.buildAssetComponent();

            MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
              ~folderNodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test select file", () => {
          beforeEach(() =>
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorAssetTool.initAssetTree,
            )
          );

          describe("test texture", () => {
            describe(
              {|select texture;
            click remove-button;
            |},
              () =>
              test("should remove it from assetTreeRoot", () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

                MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                  ~textureNodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                      assetTreeData,
                    ),
                  (),
                );

                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );

            describe(
              {|select texture;
            drag texture to set gameObject material map;
            select texture;
            click remove-button;
            |},
              () =>
              describe("should remove it from engineState", () => {
                beforeEach(() => {
                  CurrentSelectSourceEditorService.setCurrentSelectSource(
                    EditorType.SceneTree,
                  )
                  |> StateLogicService.getAndSetEditorState;
                  MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
                });

                describe("should remove it from scene->materials", ()
                  /* test("test remove basicMaterial->map", () => {
                       let currentGameObject =
                         GameObjectTool.unsafeGetCurrentSceneTreeNode();
                       BasicMaterialToolEngine.replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose(
                         currentGameObject,
                       )
                       |> StateLogicService.getAndSetEngineState;

                       _exec();

                       MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
                       let basicMaterial =
                         GameObjectTool.getCurrentGameObjectBasicMaterial();
                       let engineState = StateEngineService.unsafeGetState();
                       BasicMaterialEngineService.getBasicMaterialMap(
                         basicMaterial,
                         engineState,
                       )
                       |> expect == None;
                     }); */
                  =>
                    describe("test remove lightMaterial->diffuseMap", () => {
                      let _drag = assetTreeData =>
                        MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
                          ~textureNodeId=
                            MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                              assetTreeData,
                            ),
                          (),
                        );

                      let _remove = assetTreeData =>
                        MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                          ~textureNodeId=
                            MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                              assetTreeData,
                            ),
                          (),
                        );

                      test("test one gameObject use one material", () => {
                        let assetTreeData =
                          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

                        _drag(assetTreeData);
                        _remove(assetTreeData);

                        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
                        let lightMaterial =
                          GameObjectTool.getCurrentGameObjectLightMaterial();
                        let engineState = StateEngineService.unsafeGetState();
                        LightMaterialEngineService.getLightMaterialDiffuseMap(
                          lightMaterial,
                          engineState,
                        )
                        |> expect == None;
                      });

                      describe("test two gameObjects use one material", () =>
                        test("test gameObjects are in scene", () => {
                          let currentGameObject =
                            GameObjectTool.unsafeGetCurrentSceneTreeNode();
                          let engineState =
                            StateEngineService.unsafeGetState();
                          let oldMaterial =
                            engineState
                            |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                                 currentGameObject,
                               );
                          let secondBoxGameObject =
                            engineState
                            |> MainEditorSceneTool.getBoxByIndex(1);
                          let engineState =
                            engineState
                            |> LightMaterialToolEngine.replaceGameObjectLightMaterial(
                                 secondBoxGameObject,
                                 oldMaterial,
                               );
                          engineState |> StateEngineService.setState |> ignore;

                          let assetTreeData =
                            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
                          _drag(assetTreeData);
                          MainEditorSceneTool.setSecondBoxToBeCurrentSceneTreeNode();
                          _drag(assetTreeData);
                          _remove(assetTreeData);

                          let engineState =
                            StateEngineService.unsafeGetState();
                          let newMaterial1 =
                            engineState
                            |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                                 currentGameObject,
                               );
                          let newMaterial2 =
                            engineState
                            |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                                 secondBoxGameObject,
                               );

                          (
                            LightMaterialEngineService.getLightMaterialDiffuseMap(
                              newMaterial1,
                              engineState,
                            ),
                            LightMaterialEngineService.getLightMaterialDiffuseMap(
                              newMaterial2,
                              engineState,
                            ),
                          )
                          |> expect == (None, None);
                        })
                      );
                    })
                  );
              })
            );
          });

          describe("test select wdb", () => {
            open Js.Promise;

            beforeEach(() => {
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

              LoadTool.buildFakeTextDecoder(
                LoadTool.convertUint8ArrayToBuffer,
              );

              LoadTool.buildFakeURL(sandbox^);

              LoadTool.buildFakeLoadImage(.);

              SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox)
              |> ignore;
            });

            describe(
              {|drag asset wdb into scene;
              select wdb to be currentNode;
              click remove-button;
              |},
              () => {
                testPromise(
                  "cloned gameObjects of the asset wdb in the scene tree should be removed",
                  () => {
                    MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
                    |> ignore;

                    let fileName = "BoxTextured";

                    MainEditorAssetUploadTool.loadOneWDB(
                      ~fileName,
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
                  },
                );
                testPromise(
                  "the geometry of the asset wdb should be removed", () => {
                  MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
                  |> ignore;
                  let fileName = "BoxTextured";

                  MainEditorAssetUploadTool.loadOneWDB(
                    ~fileName,
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

                       component
                       |> ReactTestTool.createSnapshotAndMatch
                       |> resolve;
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
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
                |> ignore;
                let fileName = "BoxTextured";

                MainEditorAssetUploadTool.loadOneWDB(
                  ~fileName,
                  ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                  (),
                )
                |> then_(uploadedWDBNodeId => {
                  WonderLog.Log.print("aaa") |> ignore;
                     MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
                       ~wdbNodeId=uploadedWDBNodeId,
                       (),
                     );

                     let fileName = "Scene";

                     MainEditorAssetUploadTool.loadOneWDB(
                       ~fileName,
                       ~arrayBuffer=sceneWDBArrayBuffer^,
                       (),
                     )
                     |> then_(_ => {
                  WonderLog.Log.print("bbb") |> ignore;
                          let fileName = "BoxTextured";

                          MainEditorAssetUploadTool.loadOneWDB(
                            ~fileName,
                            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                            (),
                          )
                          |> then_(_ =>
                               BuildComponentTool.buildAssetComponent()
                               |> ReactTestTool.createSnapshotAndMatch
                               |> resolve
                             );
                        });
                   });
              },
            );
          });

          describe(
            "test removed asset node, the id should be added into removedAssetIdArray",
            () =>
            describe("test remove first folder", () => {
              beforeEach(() =>
                MainEditorSceneTool.createDefaultScene(
                  sandbox,
                  MainEditorAssetTool.initAssetTree,
                )
              );

              test("test the folderId should add into removedAssetIdArray", () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
                let removedFolderNodeId =
                  MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                    assetTreeData,
                  );

                MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
                  ~folderNodeId=removedFolderNodeId,
                  (),
                );

                StateEditorService.getState()
                |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
                |> expect == [|removedFolderNodeId|];
              });
              test("test add a new folder, use the removed id", () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
                let removedFolderNodeId =
                  MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                    assetTreeData,
                  );

                MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
                  ~folderNodeId=removedFolderNodeId,
                  (),
                );
                MainEditorAssetHeaderOperateNodeTool.addFolder();

                StateEditorService.getState()
                |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
                |> (root => root.children)
                |> ArrayService.unsafeGetLast
                |> (assetNode => assetNode.nodeId)
                |> expect == removedFolderNodeId;
              });
              test(
                "test add two new folders, use the removed id and generate one new id",
                () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
                let removedFolderNodeId =
                  MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                    assetTreeData,
                  );

                MainEditorAssetHeaderOperateNodeTool.removeFolderNode(
                  ~folderNodeId=removedFolderNodeId,
                  (),
                );
                MainEditorAssetHeaderOperateNodeTool.addFolder();
                MainEditorAssetHeaderOperateNodeTool.addFolder();

                StateEditorService.getState()
                |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
                |> (root => root.children)
                |> Js.Array.sliceFrom(-2)
                |> Js.Array.map(assetNode => assetNode.nodeId)
                |>
                expect == [|removedFolderNodeId, removedFolderNodeId |> succ|];
              });
            })
          );
        });
      });
    });
  });