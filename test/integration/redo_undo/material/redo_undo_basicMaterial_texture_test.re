open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: basicMaterial texture", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test simulate set currentSceneTreeNode", () => {
      let _simulateTwiceDragTexture = assetTreeDomRecord => {
        let assetComponent = BuildComponentTool.buildAssetComponent();
        let firstTextureDomIndex =
          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex;
        let secondTextureDomIndex =
          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getSecondTextureDomIndex;

        BaseEventTool.triggerComponentEvent(
          assetComponent,
          BasicMaterialEventTool.triggerFileDragStartEvent(
            firstTextureDomIndex,
          ),
        );
        let inspectorComponent =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragEnterEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragDropEvent,
        );
        let assetComponent2 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          assetComponent2,
          BasicMaterialEventTool.triggerFileDragStartEvent(
            secondTextureDomIndex,
          ),
        );
        let inspectorComponent2 =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent2,
          BasicMaterialEventTool.triggerTextureDragEnterEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent2,
          BasicMaterialEventTool.triggerTextureDragDropEvent,
        );
      };
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          () => {
            MainEditorAssetTool.initAssetTree();
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();
          },
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });
      afterEach(() =>
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );
      describe("test not remove texture", () => {
        describe("test undo operate", () => {
          test("test not undo", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
            _simulateTwiceDragTexture(assetTreeDomRecord);

            BuildComponentTool.buildMaterialComponent(
              GameObjectTool.getCurrentGameObjectMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          describe("test undo one step", () =>
            test("step which from second to first", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              _simulateTwiceDragTexture(assetTreeDomRecord);

              StateHistoryToolEditor.undo();

              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
          describe("test undo two step", () =>
            test("step which from second to zero", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              _simulateTwiceDragTexture(assetTreeDomRecord);

              StateHistoryToolEditor.undo();
              StateHistoryToolEditor.undo();

              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
        });
        describe("test redo operate", () => {
          describe("test redo one step", () => {
            test("if not exec undo, redo one step, not change", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              _simulateTwiceDragTexture(assetTreeDomRecord);

              StateHistoryToolEditor.redo();

              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test(
              "undo step which from second to zero, redo step which from zero to first",
              () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              _simulateTwiceDragTexture(assetTreeDomRecord);

              StateHistoryToolEditor.undo();
              StateHistoryToolEditor.undo();
              StateHistoryToolEditor.redo();

              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });
          describe("test redo two step", () =>
            test(
              "undo step which from second to zero, redo step which from zero to second",
              () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              _simulateTwiceDragTexture(assetTreeDomRecord);

              StateHistoryToolEditor.undo();
              StateHistoryToolEditor.undo();
              StateHistoryToolEditor.redo();
              StateHistoryToolEditor.redo();

              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
          describe("test redo three step", () =>
            test(
              "test if current step is last step, execute redo, not change", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              _simulateTwiceDragTexture(assetTreeDomRecord);

              StateHistoryToolEditor.undo();
              StateHistoryToolEditor.undo();
              StateHistoryToolEditor.redo();
              StateHistoryToolEditor.redo();
              StateHistoryToolEditor.redo();

              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
        });
      });

      describe("test remove texture", () => {
        let _triggerRemoveTextureClickEvent = domChildren => {
          let textureArticle = _getFromArray(domChildren, 1);
          let button = _getFromArray(textureArticle##children, 3);
          BaseEventTool.triggerClickEvent(button);
        };

        describe("test undo operate", () => {
          test("test not undo", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

            _simulateTwiceDragTexture(assetTreeDomRecord);
            BaseEventTool.triggerComponentEvent(
              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              ),
              _triggerRemoveTextureClickEvent,
            );

            BuildComponentTool.buildMaterialComponent(
              GameObjectTool.getCurrentGameObjectMaterial(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          describe("test undo one step", () =>
            test("step which from first to zero", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              _simulateTwiceDragTexture(assetTreeDomRecord);

              BaseEventTool.triggerComponentEvent(
                BuildComponentTool.buildMaterialComponent(
                  GameObjectTool.getCurrentGameObjectMaterial(),
                ),
                _triggerRemoveTextureClickEvent,
              );

              StateHistoryToolEditor.undo();

              BuildComponentTool.buildMaterialComponent(
                GameObjectTool.getCurrentGameObjectMaterial(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
          describe("test redo operate", () =>
            describe("test redo one step", () => {
              test("if not exec undo, redo one step, not change", () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                _simulateTwiceDragTexture(assetTreeDomRecord);

                BaseEventTool.triggerComponentEvent(
                  BuildComponentTool.buildMaterialComponent(
                    GameObjectTool.getCurrentGameObjectMaterial(),
                  ),
                  _triggerRemoveTextureClickEvent,
                );

                StateHistoryToolEditor.redo();

                BuildComponentTool.buildMaterialComponent(
                  GameObjectTool.getCurrentGameObjectMaterial(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              });
              test(
                "undo step which from first to zero, redo step which from zero to first",
                () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                _simulateTwiceDragTexture(assetTreeDomRecord);

                BaseEventTool.triggerComponentEvent(
                  BuildComponentTool.buildMaterialComponent(
                    GameObjectTool.getCurrentGameObjectMaterial(),
                  ),
                  _triggerRemoveTextureClickEvent,
                );

                StateHistoryToolEditor.undo();
                StateHistoryToolEditor.redo();

                BuildComponentTool.buildMaterialComponent(
                  GameObjectTool.getCurrentGameObjectMaterial(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              });
            })
          );
        });
      });
    });
  });