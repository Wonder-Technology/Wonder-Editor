open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: add component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildInspectorComponent = (allShowComponentConfig) =>
        ReactTestRenderer.create(
          <MainEditorInspector
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
            allShowComponentConfig
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test simulate set currentGameObject",
        () => {
          let _buildEngineSceneTree = () =>
            ReactTestRenderer.create(
              <MainEditorSceneTree
                store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
                dispatch=(TestToolUI.getDispatch())
              />
            );
          let _setSpecificGameObject = (clickTreeNodeIndex) => {
            let component = _buildEngineSceneTree();
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
                  let _triggerClickAddComponentEvent = (domChildren) => {
                    let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
                    let button = WonderCommonlib.ArraySystem.unsafeGet(article##children, 0);
                    EventToolUI.triggerClickEvent(button)
                  };
                  let _triggerClickAddSourceInstanceEvent = (domChildren) => {
                    let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
                    let sourceInstanceDiv =
                      WonderCommonlib.ArraySystem.unsafeGet(article##children, 1);
                    EventToolUI.triggerClickEvent(sourceInstanceDiv)
                  };
                  let _simulateAddSourceInstanceComponent = () => {
                    let component =
                      _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
                    EventToolUI.triggerComponentEvent(component, _triggerClickAddComponentEvent);
                    EventToolUI.triggerComponentEvent(
                      component,
                      _triggerClickAddSourceInstanceEvent
                    )
                  };
                  describe(
                    "test undo operate",
                    () => {
                      test(
                        "test not undo",
                        () =>
                          _buildInspectorComponent(
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
                              _buildInspectorComponent(
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
                              _buildInspectorComponent(
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