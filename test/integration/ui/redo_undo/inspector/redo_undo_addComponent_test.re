open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: add component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "prepare first step: set currentGameObject",
        () => {
          let _setSpecificGameObject = (clickTreeNodeIndex) => {
            let component =
              BuildComponentTool.buildSceneTree(
                SceneTreeTool.buildAppStateSceneGraphFromEngine()
              );
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex)
            )
          };
          describe(
            "test snapshot",
            () => {
              beforeEach(
                () => {
                  TestTool.closeContractCheck();
                  TestTool.initMainEditor(sandbox);
                  MainEditorSceneTool.prepareDefaultScene(() => ());
                  StateHistoryToolEditor.clearAllState();
                  _setSpecificGameObject(1)
                }
              );
              afterEach(() => TestTool.openContractCheck());
              describe(
                "test addComponent",
                () => {
                  let _simulateAddSourceInstanceComponent = () => {
                    let component =
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig()
                      );
                    BaseEventTool.triggerComponentEvent(
                      component,
                      OperateComponentEventTool.triggerClickAddComponentEvent
                    );
                    BaseEventTool.triggerComponentEvent(
                      component,
                      OperateComponentEventTool.triggerClickAddSourceInstanceEvent
                    )
                  };
                  describe(
                    "test undo operate",
                    () => {
                      test(
                        "test not undo",
                        () =>
                          BuildComponentTool.buildInspectorComponent(
                            TestTool.buildEmptyAppState(),
                            InspectorTool.buildFakeAllShowComponentConfig()
                          )
                          |> ReactTestTool.createSnapshotAndMatch
                      );
                      describe(
                        "test undo one step",
                        () =>
                          test(
                            "undo step from first to zero",
                            () => {
                              _simulateAddSourceInstanceComponent();
                              StateHistoryToolEditor.undo();
                              BuildComponentTool.buildInspectorComponent(
                                TestTool.buildEmptyAppState(),
                                InspectorTool.buildFakeAllShowComponentConfig()
                              )
                              |> ReactTestTool.createSnapshotAndMatch
                            }
                          )
                      )
                    }
                  );
                  describe(
                    "test redo operate",
                    () =>
                      describe(
                        "test redo one step",
                        () =>
                          test(
                            "undo step from first to zero, redo step from zero to first",
                            () => {
                              _simulateAddSourceInstanceComponent();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.redo();
                              BuildComponentTool.buildInspectorComponent(
                                TestTool.buildEmptyAppState(),
                                InspectorTool.buildFakeAllShowComponentConfig()
                              )
                              |> ReactTestTool.createSnapshotAndMatch
                            }
                          )
                      )
                  )
                }
              )
            }
          )
        }
      )
    }
  );