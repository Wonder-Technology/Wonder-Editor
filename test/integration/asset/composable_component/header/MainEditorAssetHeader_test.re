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
      let _triggerClickAssetTreeNode = (component, index) =>
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeNode(index),
        );

      let _triggerClickAssetChildrenNode = (component, index) =>
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeChildrenNode(index),
        );
      describe("test add folder", () => {
        let _triggerAddFolderClick = component =>
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.triggerAddFolderClick,
          );
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
            _triggerAddFolderClick(BuildComponentTool.buildAssetComponent());

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
              _triggerAddFolderClick(
                BuildComponentTool.buildAssetComponent(),
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
          _triggerClickAssetTreeNode(component, 1);
          _triggerAddFolderClick(component);

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test remove tree node", () => {
        let _triggerRemoveFolderClick = component =>
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.triggerRemoveNodeClick,
          );

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
              _triggerClickAssetTreeNode(component, 1);

              component |> ReactTestTool.createSnapshotAndMatch;
            });

            describe("test select folder", () =>
              test(
                "click remove-button should remove folder from assetTreeRoot",
                () => {
                let component = BuildComponentTool.buildAssetComponent();
                _triggerClickAssetTreeNode(component, 1);
                _triggerRemoveFolderClick(component);

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
                  _triggerClickAssetChildrenNode(
                    BuildComponentTool.buildAssetComponent(),
                    2,
                  );
                  _triggerRemoveFolderClick(
                    BuildComponentTool.buildAssetComponent(),
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
                  _triggerClickAssetChildrenNode(
                    BuildComponentTool.buildAssetComponent(),
                    3,
                  );
                  _triggerRemoveFolderClick(
                    BuildComponentTool.buildAssetComponent(),
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

              _triggerClickAssetTreeNode(component, 1);
              _triggerRemoveFolderClick(component);

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

              _triggerClickAssetTreeNode(component, 2);
              _triggerRemoveFolderClick(component);

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
          /* TODO test: set base64 to imageBase64Map */
          /* TODO
              describe(
              "test textureNodeMap",
              () => {
             testPromise(
             "add created texture index to textureNodeMap",
             () => {

              }
             );
               }
              ); */
          testPromise("test textureNodeMap", () =>
            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 StateAssetService.getState()
                 |> TextureNodeMapAssetService.getTextureNodeMap
                 |> Js.Array.filter(item => SparseMapTool.isNotEmpty(item))
                 |> expect == SparseMapTool.make([|[|2|]|] |> Obj.magic)
                 |> Js.Promise.resolve
               )
          );

          /* TODO
              describe(
              "test jsonNodeMap",
              () => {
             testPromise(
             "add json string to jsonNodeMap",
             () => {

              }
             );
               }
              ); */
          testPromise("test jsonNodeMap", () =>
            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 StateAssetService.getState()
                 |> JsonNodeMapAssetService.getJsonNodeMap
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