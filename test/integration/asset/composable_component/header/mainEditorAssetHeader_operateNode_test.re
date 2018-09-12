open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

let _ =
  describe("MainEditorAssetHeader", () => {
    let sandbox = getSandboxDefaultVal();
    let _triggerAddFolderClick =
        (~component=BuildComponentTool.buildAssetComponent(), ()) =>
      BaseEventTool.triggerComponentEvent(
        BuildComponentTool.buildAssetComponent(),
        AssetTreeEventTool.triggerAddFolderClick,
      );

    let _triggerRemoveNodeClick = component =>
      BaseEventTool.triggerComponentEvent(
        component,
        AssetTreeEventTool.triggerRemoveNodeClick,
      );

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

    describe("test operate treeNode", () => {
      describe("test add folder", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(sandbox, () => ())
        );

        describe(
          "if not select specific treeNode, add folder into root treeNode", () => {
          test("test snapshot", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            _triggerAddFolderClick();

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          describe("test logic", () => {
            test("the added folder parentId should be root treeNode id", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              _triggerAddFolderClick();

              let {parentId}: AssetNodeType.folderResultType =
                MainEditorAssetTreeNodeTool.getAddedFolderResult(
                  assetTreeDomRecord,
                );

              parentId
              |> OptionService.unsafeGet
              |>
              expect == (
                          StateEditorService.getState()
                          |> AssetTreeRootEditorService.getRootTreeNodeId
                        );
            });

            test("aaa", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let component = BuildComponentTool.buildAssetComponent();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
              |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                   component,
                 );
              _triggerRemoveNodeClick(component);

              _triggerAddFolderClick();
              _triggerAddFolderClick();
              _triggerAddFolderClick();

              BuildComponentTool.buildAssetTree()
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });
        });
        describe("else", () => {
          test("add folder into specific treeNode", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let component = BuildComponentTool.buildAssetComponent();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
            |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                 component,
               );

            _triggerAddFolderClick(~component, ());

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("add material into specific treeNode", () => {
            let component = BuildComponentTool.buildAssetComponent();

            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeEventTool.triggerAddMaterialClick,
            );

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });

      describe("test remove tree node", () => {
        test(
          "if not select specific treeNode, remove-button's disabled props should == true ",
          () => {
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorAssetTool.initAssetTree,
            );

            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

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

            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            let component = BuildComponentTool.buildAssetComponent();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
            |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                 component,
               );

            component |> ReactTestTool.createSnapshotAndMatch;
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
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let component = BuildComponentTool.buildAssetComponent();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
              |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                   component,
                 );
              _triggerRemoveNodeClick(component);

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

            test(
              "select texture;
                click remove-button;
                should remove it from assetTreeRoot",
              () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
                |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                _triggerRemoveNodeClick(
                  BuildComponentTool.buildAssetComponent(),
                );

                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );

            test(
              "select json to be currentNode;
                click remove-button;
                should remove it from assetTreeRoot",
              () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
                |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                _triggerRemoveNodeClick(
                  BuildComponentTool.buildAssetComponent(),
                );

                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );
            /* TODO should store clone gameObject in editorState */

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

                MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
                  MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
                );

                MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

                MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);

                SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);
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
                      let assetTreeDomRecord =
                        MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                      let fileName = "BoxTextured";
                      let newWDBArrayBuffer =
                        MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(
                          fileName,
                        );

                      MainEditorAssetTool.fileLoad(
                        TestTool.getDispatch(),
                        BaseEventTool.buildWDBFileEvent(
                          fileName,
                          newWDBArrayBuffer,
                        ),
                      )
                      |> then_(_ => {
                           let component =
                             BuildComponentTool.buildSceneTree(
                               TestTool.buildAppStateSceneGraphFromEngine(),
                             );
                           let rootDivDomIndex =
                             SceneTreeNodeDomTool.OperateThreeLayer.getRootDivDomIndex();

                           assetTreeDomRecord
                           |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                           |> MainEditorMaterialTool.triggerFileDragStartEvent;

                           BaseEventTool.triggerComponentEvent(
                             component,
                             SceneTreeEventTool.triggerDragDropDiv(
                               rootDivDomIndex,
                             ),
                           );

                           assetTreeDomRecord
                           |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                           |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                           _triggerRemoveNodeClick(
                             BuildComponentTool.buildAssetComponent(),
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
                    let assetTreeDomRecord =
                      MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                    let fileName = "BoxTextured";
                    let newWDBArrayBuffer =
                      MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(
                        fileName,
                      );

                    MainEditorAssetTool.fileLoad(
                      TestTool.getDispatch(),
                      BaseEventTool.buildWDBFileEvent(
                        fileName,
                        newWDBArrayBuffer,
                      ),
                    )
                    |> then_(_ => {
                         let component =
                           BuildComponentTool.buildSceneTree(
                             TestTool.buildAppStateSceneGraphFromEngine(),
                           );
                         let rootDivDomIndex =
                           SceneTreeNodeDomTool.OperateThreeLayer.getRootDivDomIndex();

                         assetTreeDomRecord
                         |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                         |> MainEditorMaterialTool.triggerFileDragStartEvent;

                         BaseEventTool.triggerComponentEvent(
                           component,
                           SceneTreeEventTool.triggerDragDropDiv(
                             rootDivDomIndex,
                           ),
                         );

                         assetTreeDomRecord
                         |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                         |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                         _triggerRemoveNodeClick(
                           BuildComponentTool.buildAssetComponent(),
                         );

                         MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();

                         let component =
                           BuildComponentTool.buildGeometry(
                             TestTool.buildEmptyAppState(),
                             GameObjectTool.getCurrentGameObjectGeometry(),
                           );

                         BaseEventTool.triggerComponentEvent(
                           component,
                           MainEditorGeometryTool.triggerClickShowGeometryGroup,
                         );

                         component
                         |> ReactTestTool.createSnapshotAndMatch
                         |> resolve;
                       });
                  });
                },
              );

              testPromise(
                {|select BoxTextured.wdb to be currentNode;
              click remove-button;
              load Scene.wdb;
              load BoxTextured.wdb;

              the MainEditorAssetChildrenNode panel should show "Scene","Boxtextured"
                |},
                () => {
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                  let fileName = "BoxTextured";
                  let newWDBArrayBuffer =
                    MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

                  MainEditorAssetTool.fileLoad(
                    TestTool.getDispatch(),
                    BaseEventTool.buildWDBFileEvent(
                      fileName,
                      newWDBArrayBuffer,
                    ),
                  )
                  |> then_(_ => {
                       assetTreeDomRecord
                       |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                       |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                       _triggerRemoveNodeClick(
                         BuildComponentTool.buildAssetComponent(),
                       );

                       let fileName = "Scene";
                       let newWDBArrayBuffer =
                         MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(
                           fileName,
                         );

                       MainEditorAssetTool.fileLoad(
                         TestTool.getDispatch(),
                         BaseEventTool.buildWDBFileEvent(
                           fileName,
                           newWDBArrayBuffer,
                         ),
                       )
                       |> then_(_ => {
                            let fileName = "BoxTextured";
                            let newWDBArrayBuffer =
                              MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(
                                fileName,
                              );

                            MainEditorAssetTool.fileLoad(
                              TestTool.getDispatch(),
                              BaseEventTool.buildWDBFileEvent(
                                fileName,
                                newWDBArrayBuffer,
                              ),
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
              testPromise(
                "the geometry of the asset wdb should be removed", () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                let fileName = "BoxTextured";
                let newWDBArrayBuffer =
                  MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

                MainEditorAssetTool.fileLoad(
                  TestTool.getDispatch(),
                  BaseEventTool.buildWDBFileEvent(
                    fileName,
                    newWDBArrayBuffer,
                  ),
                )
                |> then_(_ => {
                     let component =
                       BuildComponentTool.buildSceneTree(
                         TestTool.buildAppStateSceneGraphFromEngine(),
                       );
                     let rootDivDomIndex =
                       SceneTreeNodeDomTool.OperateThreeLayer.getRootDivDomIndex();

                     assetTreeDomRecord
                     |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                     |> MainEditorMaterialTool.triggerFileDragStartEvent;

                     BaseEventTool.triggerComponentEvent(
                       component,
                       SceneTreeEventTool.triggerDragDropDiv(rootDivDomIndex),
                     );

                     assetTreeDomRecord
                     |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                     |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                     _triggerRemoveNodeClick(
                       BuildComponentTool.buildAssetComponent(),
                     );

                     MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();

                     let component =
                       BuildComponentTool.buildGeometry(
                         TestTool.buildEmptyAppState(),
                         GameObjectTool.getCurrentGameObjectGeometry(),
                       );

                     BaseEventTool.triggerComponentEvent(
                       component,
                       MainEditorGeometryTool.triggerClickShowGeometryGroup,
                     );

                     component
                     |> ReactTestTool.createSnapshotAndMatch
                     |> resolve;
                   });
              });
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

                test(
                  "test the folderId should add into removedAssetIdArray", () => {
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                  let component = BuildComponentTool.buildAssetComponent();
                  let removedfirstFolderNodeId =
                    assetTreeDomRecord
                    |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderNodeId;

                  assetTreeDomRecord
                  |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
                  |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                       component,
                     );
                  _triggerRemoveNodeClick(component);

                  StateEditorService.getState()
                  |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
                  |> expect == [|removedfirstFolderNodeId|];
                });
                test("test add a new folder, use the removed id", () => {
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                  let component = BuildComponentTool.buildAssetComponent();
                  let removedfirstFolderNodeId =
                    assetTreeDomRecord
                    |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderNodeId;

                  assetTreeDomRecord
                  |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
                  |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                       component,
                     );
                  _triggerRemoveNodeClick(component);

                  BaseEventTool.triggerComponentEvent(
                    BuildComponentTool.buildAssetComponent(),
                    AssetTreeEventTool.triggerAddFolderClick,
                  );

                  StateEditorService.getState()
                  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
                  |> (root => root.children)
                  |> ArrayService.unsafeGetLast
                  |> (assetNode => assetNode.id)
                  |> expect == removedfirstFolderNodeId;
                });
                test(
                  "test add two new folders, use the removed id and generate one new id",
                  () => {
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                  let component = BuildComponentTool.buildAssetComponent();
                  let removedfirstFolderNodeId =
                    assetTreeDomRecord
                    |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderNodeId;

                  assetTreeDomRecord
                  |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
                  |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                       component,
                     );
                  _triggerRemoveNodeClick(component);

                  BaseEventTool.triggerComponentEvent(
                    BuildComponentTool.buildAssetComponent(),
                    AssetTreeEventTool.triggerAddFolderClick,
                  );
                  BaseEventTool.triggerComponentEvent(
                    BuildComponentTool.buildAssetComponent(),
                    AssetTreeEventTool.triggerAddFolderClick,
                  );

                  StateEditorService.getState()
                  |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
                  |> (root => root.children)
                  |> Js.Array.sliceFrom(-2)
                  |> Js.Array.map(assetNode => assetNode.id)
                  |> expect == [|removedfirstFolderNodeId, 9|];
                });
              })
            );
          });
        });
      });
    });
  });