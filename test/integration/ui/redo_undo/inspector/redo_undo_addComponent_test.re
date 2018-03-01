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
                SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
              );
            EventToolUI.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex)
            )
          };
          describe(
            "test snapshot",
            () => {
              beforeEach(
                () => {
                  TestToolEditor.closeContractCheck();
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorSceneToolEditor.prepareDefaultScene(() => ());
                  StateHistoryToolEditor.clearAllState();
                  _setSpecificGameObject(1)
                }
              );
              afterEach(() => TestToolEditor.openContractCheck());
              describe(
                "test addComponent",
                () => {
                  let _simulateAddSourceInstanceComponent = () => {
                    let component =
                      BuildComponentTool.buildInspectorComponent(
                        TestToolUI.buildEmptyAppState(),
                        InspectorToolUI.buildFakeAllShowComponentConfig()
                      );
                    EventToolUI.triggerComponentEvent(
                      component,
                      OperateComponentEventTool.triggerClickAddComponentEvent
                    );
                    EventToolUI.triggerComponentEvent(
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
                            TestToolUI.buildEmptyAppState(),
                            InspectorToolUI.buildFakeAllShowComponentConfig()
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
                                TestToolUI.buildEmptyAppState(),
                                InspectorToolUI.buildFakeAllShowComponentConfig()
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
                                TestToolUI.buildEmptyAppState(),
                                InspectorToolUI.buildFakeAllShowComponentConfig()
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