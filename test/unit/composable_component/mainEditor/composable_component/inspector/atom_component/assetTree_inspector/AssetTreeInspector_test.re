open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "AssetTreeInspector",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => ArrayService.getNth(index, array);
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          EventListenerTool.buildFakeDom() |> EventListenerTool.stubGetElementByIdReturnFakeDom
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "prepare currentSelectSource",
        () => {
          beforeEach(
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTreeRoot)
              );
              CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.AssetTree)
              |> StateLogicService.getAndSetEditorState
            }
          );
          describe(
            "test component snapshot",
            () => {
              test(
                "if hasn't currentNodeId, show nothing",
                () =>
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
              );
              test(
                "else",
                () => {
                  let component = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.clickAssetTreeNode(2)
                  );
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
          );
          describe(
            "test node rename",
            () => {
              let triggerChangeEvent = (value, domChildren) => {
                let article = _getFromArray(domChildren, 0);
                let div = _getFromArray(article##children, 0);
                let input = _getFromArray(div##children, 3);
                BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
              };
              let triggerBlurEvent = (value, domChildren) => {
                let article = _getFromArray(domChildren, 0);
                let div = _getFromArray(article##children, 0);
                let input = _getFromArray(div##children, 3);
                BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value))
              };
              test(
                "test rename to specific name",
                () => {
                  let component = BuildComponentTool.buildAssetComponent();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    AssetTreeEventTool.clickAssetTreeNode(2)
                  );
                  let newName = "mickeyFolder";
                  let inspectorComponent =
                    BuildComponentTool.buildInspectorComponent(
                      TestTool.buildEmptyAppState(),
                      InspectorTool.buildFakeAllShowComponentConfig()
                    );
                  BaseEventTool.triggerComponentEvent(
                    inspectorComponent,
                    triggerChangeEvent(newName)
                  );
                  BaseEventTool.triggerComponentEvent(
                    inspectorComponent,
                    triggerBlurEvent(newName)
                  );
                  inspectorComponent |> ReactTestTool.createSnapshotAndMatch
                }
              );
              describe(
                "test the root folder can't be rename",
                () =>
                  test(
                    "the root treeNode rename-input disabled should be true",
                    () => {
                      let component = BuildComponentTool.buildAssetComponent();
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.clickRootAssetTreeNode
                      );
                      let inspectorComponent =
                        BuildComponentTool.buildInspectorComponent(
                          TestTool.buildEmptyAppState(),
                          InspectorTool.buildFakeAllShowComponentConfig()
                        );
                      inspectorComponent |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test asset tree children node",
                () =>
                  describe(
                    "if node has postfix",
                    () => {
                      test(
                        "rename input can't show it",
                        () => {
                          let component = BuildComponentTool.buildAssetComponent();
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.clickAssetTreeChildrenNode(3)
                          );
                          let inspectorComponent =
                            BuildComponentTool.buildInspectorComponent(
                              TestTool.buildEmptyAppState(),
                              InspectorTool.buildFakeAllShowComponentConfig()
                            );
                          inspectorComponent |> ReactTestTool.createSnapshotAndMatch
                        }
                      );
                      test(
                        "if rename success, show newName + postfix in the childrenNode",
                        () => {
                          let component = BuildComponentTool.buildAssetComponent();
                          BaseEventTool.triggerComponentEvent(
                            component,
                            AssetTreeEventTool.clickAssetTreeChildrenNode(3)
                          );
                          let newName = "mickey json";
                          let inspectorComponent =
                            BuildComponentTool.buildInspectorComponent(
                              TestTool.buildEmptyAppState(),
                              InspectorTool.buildFakeAllShowComponentConfig()
                            );
                          BaseEventTool.triggerComponentEvent(
                            inspectorComponent,
                            triggerChangeEvent(newName)
                          );
                          BaseEventTool.triggerComponentEvent(
                            inspectorComponent,
                            triggerBlurEvent(newName)
                          );
                          BuildComponentTool.buildAssetComponent()
                          |> ReactTestTool.createSnapshotAndMatch
                        }
                      )
                    }
                  )
              );
              describe(
                "deal with specific case",
                () =>
                  test(
                    "key in '', trigger onBlur, the input value should be original name",
                    () => {
                      let component = BuildComponentTool.buildAssetComponent();
                      BaseEventTool.triggerComponentEvent(
                        component,
                        AssetTreeEventTool.clickAssetTreeNode(2)
                      );
                      let newName = "";
                      let inspectorComponent =
                        BuildComponentTool.buildInspectorComponent(
                          TestTool.buildEmptyAppState(),
                          InspectorTool.buildFakeAllShowComponentConfig()
                        );
                      BaseEventTool.triggerComponentEvent(
                        inspectorComponent,
                        triggerChangeEvent(newName)
                      );
                      BaseEventTool.triggerComponentEvent(
                        inspectorComponent,
                        triggerBlurEvent(newName)
                      );
                      inspectorComponent |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          )
        }
      )
    }
  );