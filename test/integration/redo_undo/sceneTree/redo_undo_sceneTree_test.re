open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: sceneTree",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "get scene tree from engine",
        () => {
          let _simulateTwiceDragEvent = () => {
            let component =
              BuildComponentTool.buildSceneTree(SceneTreeTool.buildAppStateSceneGraphFromEngine());
            BaseEventTool.triggerComponentEvent(component, SceneTreeEventTool.triggerDragStart(2));
            BaseEventTool.triggerComponentEvent(component, SceneTreeEventTool.triggerDragEnter(0));
            BaseEventTool.triggerComponentEvent(component, SceneTreeEventTool.triggerDragDrop(0));
            let component2 =
              BuildComponentTool.buildSceneTree(SceneTreeTool.buildAppStateSceneGraphFromEngine());
            BaseEventTool.triggerComponentEvent(
              component2,
              SceneTreeEventTool.triggerDragStart(1)
            );
            BaseEventTool.triggerComponentEvent(
              component2,
              SceneTreeEventTool.triggerDragEnter(0)
            );
            BaseEventTool.triggerComponentEvent(component2, SceneTreeEventTool.triggerDragDrop(0))
          };
          beforeEach(
            () => {
              TestTool.closeContractCheck();
              MainEditorSceneTool.initStateAndGl(~sandbox, ());
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
              );
              StateHistoryToolEditor.clearAllState()
            }
          );
          afterEach(() => TestTool.openContractCheck());
          describe(
            "test undo operate",
            () => {
              test(
                "test not undo",
                () => {
                  _simulateTwiceDragEvent();
                  BuildComponentTool.buildSceneTree(
                    SceneTreeTool.buildAppStateSceneGraphFromEngine()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              describe(
                "test undo one step",
                () =>
                  test(
                    "step which from second to first",
                    () => {
                      _simulateTwiceDragEvent();
                      /* the undo function not exec */
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test undo two step",
                () =>
                  test(
                    "step which from second to zero",
                    () => {
                      _simulateTwiceDragEvent();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test undo three step",
                () =>
                  test(
                    "if current step is zero, undo should do nothing",
                    () => {
                      _simulateTwiceDragEvent();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          );
          describe(
            "test redo operate",
            () => {
              describe(
                "test redo one step",
                () => {
                  test(
                    "if not exec undo, redo one step should do nothing",
                    () => {
                      _simulateTwiceDragEvent();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "undo step which from second to zero, redo step which from zero to first",
                    () => {
                      _simulateTwiceDragEvent();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              );
              describe(
                "test redo two step",
                () =>
                  test(
                    "undo step which from second to zero, redo step which from zero to second",
                    () => {
                      _simulateTwiceDragEvent();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test redo three step",
                () =>
                  test(
                    "test if current step is last step, redo should do nothing",
                    () => {
                      _simulateTwiceDragEvent();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          )
        }
      );
      describe(
        "fix bug",
        () => {
          let _buildMainEditorMaterialComponent = (materialComponent) =>
            ReactTestRenderer.create(
              <MainEditorBasicMaterial
                store=(TestTool.buildEmptyAppState())
                dispatch=(TestTool.getDispatch())
                materialComponent
              />
            );
          let triggerChangeColorEvent = (value, domChildren) => {
            let article = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
            let input = WonderCommonlib.ArrayService.unsafeGet(article##children, 1);
            BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
          };
          let triggerBlurEvent = (value, domChildren) => {
            let article = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
            let input = WonderCommonlib.ArrayService.unsafeGet(article##children, 1);
            BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value))
          };
          let getColor = () => {
            let material =
              StateLogicService.getEditEngineState()
              |> GameObjectComponentEngineService.getBasicMaterialComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode()
                 );
            BasicMaterialEngineService.getColor(material)
            |> StateLogicService.getEngineStateToGetData
          };
          let execSetCurrentSceneTreeNodeWork = () => {
            let component =
              BuildComponentTool.buildSceneTree(SceneTreeTool.buildAppStateSceneGraphFromEngine());
            BaseEventTool.triggerComponentEvent(component, SceneTreeEventTool.triggerClickEvent(2))
          };
          let execChangeMaterialColorWork = () => {
            let material =
              StateLogicService.getEditEngineState()
              |> GameObjectComponentEngineService.getBasicMaterialComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode()
                 );
            let materialComponent = _buildMainEditorMaterialComponent(material);
            BaseEventTool.triggerComponentEvent(
              materialComponent,
              triggerChangeColorEvent("#c0c0c0")
            );
            BaseEventTool.triggerComponentEvent(materialComponent, triggerBlurEvent("#c0c0c0"))
          };
          let execChangeTransformWork = () => {
            let currentGameObjectTransform = GameObjectTool.getCurrentSceneTreeNodeTransform();
            let transformComponent =
              BuildComponentTool.buildMainEditorTransformComponent(
                TestTool.buildEmptyAppState(),
                currentGameObjectTransform
              );
            BaseEventTool.triggerComponentEvent(
              transformComponent,
              TransformEventTool.triggerChangeXEvent("11.25")
            );
            BaseEventTool.triggerComponentEvent(
              transformComponent,
              TransformEventTool.triggerBlurXEvent("11.25")
            )
          };
          beforeEach(
            () => {
              MainEditorSceneTool.initStateAndGl(~sandbox, ());
              MainEditorSceneTool.createDefaultScene(sandbox, () => ())
            }
          );
          test(
            "the workflow: click treeNote set currentSceneTreeNode -> change material -> change transform x value -> undo, engineState is error",
            () => {
              let color = [|0.4, 0.6, 0.7|];
              execSetCurrentSceneTreeNodeWork();
              execChangeMaterialColorWork();
              execChangeTransformWork();
              StateHistoryToolEditor.undo();
              expect(getColor() |> TypeArrayTool.truncateArray) == color
            }
          )
        }
      )
    }
  );