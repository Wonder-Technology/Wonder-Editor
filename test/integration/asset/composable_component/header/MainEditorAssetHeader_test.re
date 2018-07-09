open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test operate treeNode", () => {
      describe("test add folder", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
            ),
          )
        );
        afterEach(() =>
          StateAssetService.getState()
          |> CurrentNodeDataAssetService.clearCurrentNodeData
          |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
          |> StateAssetService.setState
          |> ignore
        );

        describe(
          "if not select specific treeNode, add folder into root treeNode", () => {
          test("test snapshot", () => {
            let component = BuildComponentTool.buildAssetComponent();
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeEventTool.triggerAddFolderClick,
            );
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          describe("test logic", () => {
            test("test asset children length before add folder", () =>
              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 5
            );

            test("test asset children length after add folder", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerAddFolderClick,
              );
              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 6;
            });
          });
        });

        test("else, add folder into specific treeNode", () => {
          let component = BuildComponentTool.buildAssetComponent();
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.clickAssetTreeNode(1),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.triggerAddFolderClick,
          );
          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test remove tree node", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
            ),
          )
        );
        afterEach(() =>
          StateAssetService.getState()
          |> CurrentNodeDataAssetService.clearCurrentNodeData
          |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
          |> StateAssetService.setState
          |> ignore
        );

        test(
          "if not select specific treeNode, remove-button's disabled props should == true ",
          () =>
          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch
        );

        describe("else", () => {
          describe("test snapshot", () => {
            test("remove-button's disabled props should == false", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(1),
              );
              component |> ReactTestTool.createSnapshotAndMatch;
            });

            describe("test select folder", () =>
              test(
                "click remove-button should remove folder from assetTreeRoot",
                () => {
                let component = BuildComponentTool.buildAssetComponent();
                BaseEventTool.triggerComponentEvent(
                  component,
                  AssetTreeEventTool.clickAssetTreeNode(1),
                );
                BaseEventTool.triggerComponentEvent(
                  component,
                  AssetTreeEventTool.triggerRemoveNodeClick,
                );
                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );

            describe("test select file", () => {
              test(
                  "select texture;
                click remove-button;
                should remove it from assetTreeRoot",
                  () => {
                    let component = BuildComponentTool.buildAssetComponent();
                    BaseEventTool.triggerComponentEvent(
                      component,
                      AssetTreeEventTool.clickAssetTreeChildrenNode(2),
                    );
                    let component2 = BuildComponentTool.buildAssetComponent();
                    BaseEventTool.triggerComponentEvent(
                      component2,
                      AssetTreeEventTool.triggerRemoveNodeClick,
                    );
                    BuildComponentTool.buildAssetComponent()
                    |> ReactTestTool.createSnapshotAndMatch;
                  },
                );

              test(
                "select json is currentNode;
                click remove-button;
                should remove it from assetTreeRoot",
                () => {
                  let component = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.clickAssetTreeChildrenNode(3),
                  );
                  let component2 = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component2,
                    AssetTreeEventTool.triggerRemoveNodeClick,
                  );
                  BuildComponentTool.buildAssetComponent()
                  |> ReactTestTool.createSnapshotAndMatch;
                },
              );
            });
          });

          describe("test logic", () => {
            beforeEach(() =>
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(
                  MainEditorAssetTool.buildThreeLayerAssetTreeRoot,
                ),
              )
            );
            afterEach(() =>
              StateAssetService.getState()
              |> CurrentNodeDataAssetService.clearCurrentNodeData
              |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
              |> StateAssetService.setState
              |> ignore
            );
            test("test assetTree root length before remove", () =>
              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 2
            );

            test("test remove node from aseetTreeRoot", () => {
              let component = BuildComponentTool.buildAssetComponent();

              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(1),
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerRemoveNodeClick,
              );
              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 1;
            });

            test("test remove node should change NodeMap", () => {
              let (
                normalFolderNodeMap,
                normalJsonNodeMap,
                normalTextureNodeMap,
              ) =
                MainEditorAssetTool.getAssetNodeTypeNodeMaps
                |> StateLogicService.getAssetState;

              let component = BuildComponentTool.buildAssetComponent();

              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeNode(2),
              );
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.triggerRemoveNodeClick,
              );

              let (newFolderNodeMap, newJsonNodeMap, newTextureNodeMap) =
                MainEditorAssetTool.getAssetNodeTypeNodeMaps
                |> StateLogicService.getAssetState;

              (newFolderNodeMap, newJsonNodeMap, newTextureNodeMap)
              |>
              expect != (
                          normalFolderNodeMap,
                          normalJsonNodeMap,
                          normalTextureNodeMap,
                        );
            });
          });
        });
      });
    });

    describe("test load file", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        )
      );
      afterEach(() =>
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> MainEditorAssetTool.clearNodeMap
        |> StateAssetService.setState
        |> ignore
      );

      describe("test snapshot", () =>
        describe("if not select specific treeNode", () =>
          testPromise("load file should add into root node children", () => {
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();

            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 BuildComponentTool.buildAssetComponent()
                 |> ReactTestTool.createSnapshotAndMatch
                 |> Js.Promise.resolve
               );
          })
        )
      );
      describe("test logic", () => {
        describe("test should add into root node children", () =>
          testPromise("test children node length", () => {
            let normalChildrenLen =
              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length;
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();

            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 StateAssetService.getState()
                 |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
                 |> (root => root.children)
                 |> Js.Array.length
                 |> (lastLen => lastLen - normalChildrenLen)
                 |> expect == 2
                 |> Js.Promise.resolve
               );
          })
        );

        describe("test should add into nodeMap", () => {
          beforeEach(() => {
            StateAssetService.getState()
            |> MainEditorAssetTool.clearNodeMap
            |> StateAssetService.setState
            |> ignore;
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();
          });
          testPromise("test textureNodeMap", () =>
            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 StateAssetService.getState()
                 |> TextureNodeMapAssetService.unsafeGetTextureNodeMap
                 |> Js.Array.filter(item => SparseMapTool.isNotEmpty(item))
                 |> expect == SparseMapTool.make([|[|2|]|] |> Obj.magic)
                 |> Js.Promise.resolve
               )
          );
          testPromise("test jsonNodeMap", () =>
            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 StateAssetService.getState()
                 |> JsonNodeMapAssetService.unsafeGetJsonNodeMap
                 |> Js.Array.filter(item => SparseMapTool.isNotEmpty(item))
                 |>
                 expect == SparseMapTool.make(
                             [|[|"loadJson.json", "newJson.json"|]|]
                             |> Obj.magic,
                           )
                 |> Js.Promise.resolve
               )
          );
        });
      });
    });
  });