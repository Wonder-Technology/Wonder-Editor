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
              TestTool.initMainEditor(sandbox);
              MainEditorSceneTool.prepareDefaultScene(
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              StateHistoryToolEditor.clearAllState()
            }
          );
          afterEach(() => TestTool.openContractCheck());
          describe(
            "test snapshot",
            () => {
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
                        "step from second to first",
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
                        "step from second to zero",
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
                        "undo step from second to zero, redo step from zero to first",
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
                        "undo step from second to zero, redo step from zero to second",
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
          /* TODO describe this bug by english */
          describe(
            "fix bug: \229\155\160\228\184\186change material\230\152\175blur\230\155\180\230\150\176\228\186\134ui, \228\189\134\228\185\139\229\137\141\229\173\152\229\130\168\231\154\132inspector\229\136\157\229\167\139\231\138\182\230\128\129\229\176\177\232\162\171\230\182\136\233\153\164, \230\137\128\228\187\165\233\156\128\232\166\129\229\156\168material\229\142\139\230\160\136\229\137\141\229\142\139\229\133\165inspectorInit",
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
                  StateLogicService.getEngineStateForEdit()
                  |> GameObjectComponentEngineService.getBasicMaterialComponent(
                       MainEditorSceneTool.unsafeGetCurrentGameObject()
                     );
                BasicMaterialEngineService.getColor(material)
                |> StateLogicService.getEngineStateToGetData
              };
              let getTransform = () => {
                let currentGameObjectTransform =
                  MainEditorSceneTool.getCurrentGameObjectTransform();
                TransformEngineService.getLocalPosition(currentGameObjectTransform)
                |> StateLogicService.getEngineStateToGetData
              };
              let execSetCurrentGameObjectWork = () => {
                let component =
                  BuildComponentTool.buildSceneTree(
                    SceneTreeTool.buildAppStateSceneGraphFromEngine()
                  );
                BaseEventTool.triggerComponentEvent(
                  component,
                  SceneTreeEventTool.triggerClickEvent(2)
                )
              };
              let execChangeMaterialColorWork = () => {
                let material =
                  StateLogicService.getEngineStateForEdit()
                  |> GameObjectComponentEngineService.getBasicMaterialComponent(
                       MainEditorSceneTool.unsafeGetCurrentGameObject()
                     );
                let materialComponent = _buildMainEditorMaterialComponent(material);
                BaseEventTool.triggerComponentEvent(
                  materialComponent,
                  triggerChangeColorEvent("#c0c0c0")
                );
                BaseEventTool.triggerComponentEvent(materialComponent, triggerBlurEvent("#c0c0c0"))
              };
              let execChangeTransformWork = () => {
                let currentGameObjectTransform =
                  MainEditorSceneTool.getCurrentGameObjectTransform();
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
              test(
                "the workflow: click treeNote set currentGameObject -> change material -> change transform x value -> undo, engineState is error",
                () => {
                  let color = [|0.4, 0.6, 0.7|];
                  execSetCurrentGameObjectWork();
                  execChangeMaterialColorWork();
                  execChangeTransformWork();
                  StateHistoryToolEditor.undo();
                  expect((getColor())) == (color)
                }
              )
            }
          )
        }
      )
    }
  );