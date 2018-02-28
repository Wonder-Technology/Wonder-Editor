open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: add gameObject",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _getFromArray = (array, index) => OperateArrayUtils.getNth(index, array);
      let _buildHeaderComponent = () =>
        ReactTestRenderer.create(
          <Header
            store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
            dispatch=(TestToolUI.getDispatch())
          />
        );
      let _buildEngineSceneTree = () =>
        ReactTestRenderer.create(
          <MainEditorSceneTree
            store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
            dispatch=(TestToolUI.getDispatch())
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
              let _triggerClickAddBox = (domChildren) => {
                let addBoxDiv = _getFromArray(domChildren, 2);
                let addBoxButton = _getFromArray(addBoxDiv##children, 0);
                EventToolUI.triggerClickEvent(addBoxButton)
              };
              let _simulateTwiceClickAddGameObject = () => {
                let headerComponent = _buildHeaderComponent();
                EventToolUI.triggerComponentEvent(headerComponent, _triggerClickAddBox);
                EventToolUI.triggerComponentEvent(headerComponent, _triggerClickAddBox)
              };
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
                "test operate addGameObject",
                () => {
                  describe(
                    "test undo operate",
                    () => {
                      test(
                        "test not undo",
                        () => {
                          _simulateTwiceClickAddGameObject();
                          _buildEngineSceneTree() |> ReactTestTool.createSnapshotAndMatch
                        }
                      );
                      describe(
                        "test undo one step",
                        () =>
                          test(
                            "undo step from second to first",
                            () => {
                              _simulateTwiceClickAddGameObject();
                              StateHistoryToolEditor.undo();
                              _buildEngineSceneTree() |> ReactTestTool.createSnapshotAndMatch
                            }
                          )
                      );
                      describe(
                        "test undo two step",
                        () =>
                          test(
                            "step from second to zero",
                            () => {
                              _simulateTwiceClickAddGameObject();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              _buildEngineSceneTree() |> ReactTestTool.createSnapshotAndMatch
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
                        () =>
                          test(
                            "undo step from second to zero,redo step from zero to first",
                            () => {
                              _simulateTwiceClickAddGameObject();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.redo();
                              _buildEngineSceneTree() |> ReactTestTool.createSnapshotAndMatch
                            }
                          )
                      );
                      describe(
                        "test redo two step",
                        () =>
                          test(
                            "undo step from second to zero,redo step from zero to second",
                            () => {
                              _simulateTwiceClickAddGameObject();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.redo();
                              StateHistoryToolEditor.redo();
                              _buildEngineSceneTree() |> ReactTestTool.createSnapshotAndMatch
                            }
                          )
                      )
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