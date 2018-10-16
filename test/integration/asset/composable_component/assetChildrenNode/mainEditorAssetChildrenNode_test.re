open Wonder_jest;

open Expect;

open Expect.Operators;

open CurrentNodeDataType;

open Sinon;

open AssetNodeType;

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
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
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

        let {currentNodeId, nodeType} =
          StateEditorService.getState()
          |> AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData;

        (currentNodeId, nodeType)
        |>
        expect == (
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                      assetTreeData,
                    ),
                    AssetNodeType.Texture,
                  );
      });

      /* test("click json file to be current node", () => {
           let assetTreeData = MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

           assetTreeData
           |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
           |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

           let {currentNodeId, nodeType} =
             StateEditorService.getState()
             |> AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData;

           (currentNodeId, nodeType)
           |>
           expect == (
                       assetTreeData
                       |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonNodeId,
                       AssetNodeType.Json,
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
                      let {currentNodeId, nodeType} =
                        StateEditorService.getState()
                        |> AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData;

                      (currentNodeId, nodeType)
                      |>
                      expect == (
                                  assetTreeData
                                  |> MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId,
                                  AssetNodeType.Folder,
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
                          let currentNodeId =
                            MainEditorAssetNodeTool.getCurrentNodeId();

                          let currentNodeParentId =
                            AssetCurrentNodeParentIdEditorService.unsafeGetCurrentNodeParentId
                            |> StateLogicService.getEditorState;

                          currentNodeId |> expect == currentNodeParentId;
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
  });