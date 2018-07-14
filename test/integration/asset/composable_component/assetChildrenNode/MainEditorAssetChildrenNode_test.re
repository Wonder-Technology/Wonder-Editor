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

    /*
         TODO remove AssetHeader_test -> describe("test imageBase64Map", () =>

         TODO add integration test: add "show texture->source by loaded  base64" case:

         load texture + show texture:
     imgSrc should be base64 got on load texture

         */

    describe("test set current node", () => {
      test("click texture file to be current node", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

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
          MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
        |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

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
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
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
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;
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
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;
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