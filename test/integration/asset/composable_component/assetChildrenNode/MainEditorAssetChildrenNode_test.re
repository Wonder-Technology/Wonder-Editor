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
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateAssetService.getState()
      |> CurrentNodeDataAssetService.clearCurrentNodeData
      |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
      |> StateAssetService.setState
      |> ignore;
    });

    describe("test set current node", () => {
      test("click texture file to be current node", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRootTest();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

        let {currentNodeId, nodeType} =
          StateAssetService.getState()
          |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData;

        (currentNodeId, nodeType)
        |>
        expect == (
                    assetTreeDomRecord
                    |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureNodeId,
                    AssetNodeType.Texture,
                  );
      });

      test("click json file to be current node", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRootTest();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
        MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode(3);

        let {currentNodeId, nodeType} =
          StateAssetService.getState()
          |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData;

        (currentNodeId, nodeType)
        |>
        expect == (
                    assetTreeDomRecord
                    |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonNodeId,
                    AssetNodeType.Json,
                  );
      });

      describe("test click folder", () => {
        describe("test single click", () => {
          testPromise("test set folder to be current node", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRootTest();
            let fakeDom =
              EventListenerTool.buildFakeDom()
              |> EventListenerTool.stubGetElementByIdReturnFakeDom;

            BuildComponentTool.buildAssetChildrenNode(10);

            EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
            Js.Promise.make((~resolve, ~reject) =>
              Timeout.setTimeout(
                () => {
                  EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                  /* TODO use unsafeGetCurrentNodeData */
                  resolve(.
                    {
                      let {currentNodeId, nodeType} =
                        StateAssetService.getState()
                        |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData;

                      (currentNodeId, nodeType)
                      |>
                      expect == (
                                  assetTreeDomRecord
                                  |> MainEditorAssetNodeTool.OperateTwoLayer.getSecondFolderNodeId,
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
            MainEditorAssetTool.buildTwoLayerAssetTreeRootTest() |> ignore;
            let fakeDom =
              EventListenerTool.buildFakeDom()
              |> EventListenerTool.stubGetElementByIdReturnFakeDom;

            BuildComponentTool.buildAssetChildrenNode(10);

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
            MainEditorAssetTool.buildTwoLayerAssetTreeRootTest() |> ignore;
            let fakeDom =
              EventListenerTool.buildFakeDom()
              |> EventListenerTool.stubGetElementByIdReturnFakeDom;

            BuildComponentTool.buildAssetChildrenNode(10);

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
                            CurrentNodeParentIdAssetService.unsafeGetCurrentNodeParentId
                            |> StateLogicService.getAssetState;

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