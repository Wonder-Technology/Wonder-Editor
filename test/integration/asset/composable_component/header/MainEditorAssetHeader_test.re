open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorAssetHeader",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          EventListenerTool.buildFakeDom() |> EventListenerTool.stubGetElementByIdReturnFakeDom;
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTreeRoot)
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test operate treeNode",
        () => {
          describe(
            "test add folder",
            () => {
              test(
                "if not select specific treeNode, add folder into root treeNode",
                () => {
                  let component = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.triggerAddFolderClick
                  );
                  BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "else, add folder into specific treeNode",
                () => {
                  let component = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.clickAssetTreeNode(1)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.triggerAddFolderClick
                  );
                  BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          );
          describe(
            "test remove tree node",
            () => {
              test(
                "if not select specific treeNode, remove-button's disabled props should == true ",
                () =>
                  BuildComponentTool.buildAssetComponent() |> ReactTestTool.createSnapshotAndMatch
              );
              describe(
                "else",
                () => {
                  test(
                    "remove-button's disabled props should == false",
                    () => {
                      let component = BuildComponentTool.buildAssetComponent();
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.clickAssetTreeNode(1)
                      );
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  describe(
                    "test select folder",
                    () =>
                      test(
                        "click remove-button should remove folder from assetTreeRoot",
                        () => {
                          let component = BuildComponentTool.buildAssetComponent();
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.clickAssetTreeNode(1)
                          );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.triggerRemoveNodeClick
                          );
                          BuildComponentTool.buildAssetComponent()
                          |> ReactTestTool.createSnapshotAndMatch
                        }
                      )
                  );
                  describe(
                    "test select file",
                    () => {
                      test(
                        "select img;
                        click remove-button;
                        should remove it from assetTreeRoot",
                        () => {
                          let component = BuildComponentTool.buildAssetComponent();
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.clickAssetTreeChildrenNode(2)
                          );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.triggerRemoveNodeClick
                          );
                          BuildComponentTool.buildAssetComponent()
                          |> ReactTestTool.createSnapshotAndMatch
                        }
                      );
                      test(
                        "select json is currentNode;
                        click remove-button;
                        should remove it from assetTreeRoot",
                        () => {
                          let component = BuildComponentTool.buildAssetComponent();
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.clickAssetTreeChildrenNode(3)
                          );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.triggerRemoveNodeClick
                          );
                          BuildComponentTool.buildAssetComponent()
                          |> ReactTestTool.createSnapshotAndMatch
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      );
      describe(
        "test load file",
        () =>
          testPromise(
            "test load file into assetTreeRoot",
            () => {
              MainEditorAssetTool.buildFakeFileReader();
              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                Some(1),
                BaseEventTool.buildFileEvent()
              )
              |> Js.Promise.then_(
                   (_) =>
                     BuildComponentTool.buildAssetComponent()
                     |> ReactTestTool.createSnapshotAndMatch
                     |> Js.Promise.resolve
                 )
            }
          )
      )
    }
  );