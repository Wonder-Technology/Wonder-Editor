open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open NodeAssetType;

open Js.Promise;

let _ =
  describe("MainEditorAssetChildrenNode", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
      |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
      |> StateEditorService.setState
      |> ignore;
    });

    describe("test set current node", () => {
      test("click texture file to be current node", () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        MainEditorAssetChildrenNodeTool.selectTextureNode(
          ~nodeId=
            MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
              assetTreeData,
            ),
          (),
        );

        let currentNodeId =
          StateEditorService.getState()
          |> MainEditorAssetNodeTool.unsafeGetCurrentNodeId;

        currentNodeId
        |>
        expect == MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                    assetTreeData,
                  );
      });

      /* test("click json file to be current node", () => {
           let assetTreeData = MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

           assetTreeData
           |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
           |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

           let {currentNodeId, nodeType} =
             StateEditorService.getState()
             |> CurrentNodeDataAssetEditorService.unsafeGetCurrentNodeData;

           (currentNodeId, nodeType)
           |>
           expect == (
                       assetTreeData
                       |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonNodeId,
                       NodeAssetType.Json,
                     );
         }); */

      describe("test click folder", () => {
        describe("test single click", () => {
          testPromise("test set folder to be current node", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

            let fakeDom =
              EventListenerTool.buildFakeDom()
              |> EventListenerTool.stubGetElementByIdReturnFakeDom;

            BuildComponentTool.buildAssetChildrenNode(~debounceTime=10, ());

            EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
            Js.Promise.make((~resolve, ~reject) =>
              Timeout.setTimeout(
                () => {
                  EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                  resolve(.
                    {
                      let currentNodeId =
                        StateEditorService.getState()
                        |> MainEditorAssetNodeTool.unsafeGetCurrentNodeId;

                      currentNodeId
                      |>
                      expect == (
                                  assetTreeData
                                  |> MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId
                                );
                    },
                  );
                },
                20,
              )
            );
          });
          testPromise("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
            let fakeDom =
              EventListenerTool.buildFakeDom()
              |> EventListenerTool.stubGetElementByIdReturnFakeDom;

            BuildComponentTool.buildAssetChildrenNode(~debounceTime=10, ());

            EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
            Js.Promise.make((~resolve, ~reject) =>
              Timeout.setTimeout(
                () => {
                  EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                  resolve(.
                    BuildComponentTool.buildAssetComponent()
                    |> ReactTestTool.createSnapshotAndMatch,
                  );
                },
                20,
              )
            );
          });
        });

        testPromise(
          "double click folder, set folder to be currentAssetNodeParent and currentNode(are the same)",
          () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();

            let fakeDom =
              EventListenerTool.buildFakeDom()
              |> EventListenerTool.stubGetElementByIdReturnFakeDom;

            BuildComponentTool.buildAssetChildrenNode(~debounceTime=10, ());

            EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
            Js.Promise.make((~resolve, ~reject) =>
              Timeout.setTimeout(
                () => {
                  EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                  Timeout.setTimeout(
                    () => {
                      EventListenerTool.triggerEvent(
                        fakeDom,
                        "mousedown",
                        {},
                      );
                      resolve(.
                        {
                          let editorState = StateEditorService.getState();

                          NodeAssetService.isNodeEqualById(
                            ~sourceNode=
                              MainEditorAssetNodeTool.unsafeGetCurrentNode(
                                editorState,
                              ),
                            ~targetNode=
                              MainEditorAssetNodeTool.unsafeGetSelectedFolderNodeInAssetTree(
                                editorState,
                              ),
                          )
                          |> expect == true;
                        },
                      );
                    },
                    20,
                  );
                },
                5,
              )
            );
          },
        );
      });
    });

    describe("test asse tree node->isShowChildren", () =>
      describe("test double click folder", () =>
        test("folder->parent folder->isShowChildren should set to true", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );

          let addedFolderNodeId2 = addedFolderNodeId1 |> succ;

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId2,
            (),
          );

          let addedFolderNodeId3 = addedFolderNodeId2 |> succ;

          MainEditorAssetHeaderOperateNodeTool.addFolder();

          OperateTreeAssetEditorService.setNodeIsShowChildren(
            addedFolderNodeId1,
            false,
          )
          |> StateLogicService.getAndSetEditorState;

          FolderBoxTool.onDoubleClick(~nodeId=addedFolderNodeId2, ());

          FolderNodeAssetService.getIsShowChildren(
            OperateTreeAssetEditorService.unsafeFindNodeById(
              addedFolderNodeId1,
              StateEditorService.getState(),
            ),
          )
          |> expect == true;
        })
      )
    );

    describe("test show order", () => {
      let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

      beforeAll(() =>
        boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
      );

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);

        MainEditorAssetTool.buildFakeImage();
      });

      testPromise(
        {|
        order should be:
        1)for different type_:folder,wdb,material,texture;
        2)for the same type_:sort by firstname alphabetically
        |},
        () => {
          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          let addedMaterialNodeId1 = addedFolderNodeId1 |> succ;
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let addedFolderNodeId2 = addedMaterialNodeId1 |> succ;
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          let addedMaterialNodeId2 = addedFolderNodeId2 |> succ;
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let wdbName1 = "C_WDB";

          MainEditorAssetUploadTool.loadOneWDB(
            ~fileName=wdbName1,
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId1 => {
               let imgName1 = "BImage.png";
               MainEditorAssetUploadTool.loadOneTexture(~imgName=imgName1, ())
               |> then_(uploadedTextureNodeId1 => {
                    let wdbName2 = "A_WDB";

                    MainEditorAssetUploadTool.loadOneWDB(
                      ~fileName=wdbName2,
                      ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                      (),
                    )
                    |> then_(uploadedWDBNodeId2 => {
                         let imgName2 = "AImage.jpg";
                         MainEditorAssetUploadTool.loadOneTexture(
                           ~imgName=imgName2,
                           (),
                         )
                         |> then_(uploadedTextureNodeId2 => {
                              AssetTreeInspectorTool.Rename.renameAssetFolderNode(
                                ~nodeId=addedFolderNodeId1,
                                ~name="FFolder",
                                (),
                              );
                              AssetTreeInspectorTool.Rename.renameAssetFolderNode(
                                ~nodeId=addedFolderNodeId2,
                                ~name="AFolder",
                                (),
                              );

                              AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
                                ~nodeId=addedMaterialNodeId1,
                                ~name="CMaterial",
                                (),
                              );
                              AssetTreeInspectorTool.Rename.renameAssetMaterialNode(
                                ~nodeId=addedMaterialNodeId2,
                                ~name="AMaterial",
                                (),
                              );

                              BuildComponentTool.buildAssetChildrenNode()
                              |> ReactTestTool.createSnapshotAndMatch
                              |> resolve;
                            });
                       });
                  });
             });
        },
      );
    });
  });