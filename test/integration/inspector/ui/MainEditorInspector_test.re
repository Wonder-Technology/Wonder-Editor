open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorInspector",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          EventListenerTool.buildFakeDom() |> EventListenerTool.stubGetElementByIdReturnFakeDom
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "change source to show it's inspector",
        () => {
          beforeEach(
            () =>
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorAssetTool.initAssetTree(MainEditorAssetTool.buildTwoLayerAssetTreeRoot)
              )
          );
          test(
            "if not set currentSelectSource, show nothing",
            () =>
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig()
              )
              |> ReactTestTool.createSnapshotAndMatch
          );
          describe(
            "else set currentSelectSource is SceneTree",
            () => {
              beforeEach(
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
                  );
                  CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.SceneTree)
                  |> StateLogicService.getAndSetEditorState
                }
              );
              test(
                "show currentSceneTreeNode component",
                () =>
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
              )
            }
          );
          describe(
            "else set currentSelectSource is Asset",
            () => {
              beforeEach(
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorAssetTool.initAssetTree(
                      MainEditorAssetTool.buildTwoLayerAssetTreeRoot
                    )
                  );
                  CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.Asset)
                  |> StateLogicService.getAndSetEditorState
                }
              );
              test(
                "show currentNodeId's asset node component",
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
          )
        }
      )
    }
  );