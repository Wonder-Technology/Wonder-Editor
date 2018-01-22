open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: sceneTree",
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
        "get scene tree from engine",
        () => {
          let _buildEngineSceneTree = () =>
            ReactTestRenderer.create(
              <MainEditorSceneTree
                store=(SceneTreeToolUI.buildAppStateSceneGraphFromEngine())
                dispatch=(TestToolUI.getDispatch())
              />
            );
          let _dragTreeNodeToTargetTreeNode = () => {
            let component = _buildEngineSceneTree();
            EventToolUI.triggerComponentEvent(component, SceneTreeEventUtils.triggerDragStart(2));
            EventToolUI.triggerComponentEvent(component, SceneTreeEventUtils.triggerDragEnter(0));
            EventToolUI.triggerComponentEvent(component, SceneTreeEventUtils.triggerDragDrop(0));
            let component2 = _buildEngineSceneTree();
            EventToolUI.triggerComponentEvent(component2, SceneTreeEventUtils.triggerDragStart(1));
            EventToolUI.triggerComponentEvent(component2, SceneTreeEventUtils.triggerDragEnter(0));
            EventToolUI.triggerComponentEvent(component2, SceneTreeEventUtils.triggerDragDrop(0))
          };
          beforeEach(
            () => {
              TestToolEditor.closeContractCheck();
              TestToolUI.initMainEditor(sandbox);
              MainEditorSceneToolEditor.prepareDefaultScene(
                MainEditorSceneToolEditor.setBoxTobeCurrentGameObject
              );
              StateHistoryToolEditor.clearAllState()
            }
          );
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "test snapshot",
            () => {
              describe(
                "test undo step",
                () => {
                  test(
                    "test no undo",
                    () => {
                      _dragTreeNodeToTargetTreeNode();
                      let component = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  describe(
                    "undo one step",
                    () =>
                      test(
                        "undo step from second to first",
                        () => {
                          _dragTreeNodeToTargetTreeNode();
                          StateHistoryToolEditor.undo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  );
                  describe(
                    "undo two step",
                    () =>
                      test(
                        "undo step from second to zero",
                        () => {
                          _dragTreeNodeToTargetTreeNode();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  );
                  describe(
                    "undo three step",
                    () =>
                      test(
                        "test if current step is zero, execute undo, not change",
                        () => {
                          _dragTreeNodeToTargetTreeNode();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  )
                }
              );
              describe(
                "test redo step",
                () => {
                  describe(
                    "redo one step",
                    () =>
                      test(
                        "undo step from second to zero, redo step from zero to first",
                        () => {
                          _dragTreeNodeToTargetTreeNode();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  );
                  describe(
                    "redo two step",
                    () =>
                      test(
                        "undo step from second to zero, redo step from zero to second",
                        () => {
                          _dragTreeNodeToTargetTreeNode();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  );
                  describe(
                    "redo three step",
                    () =>
                      test(
                        "test if current step is last step, execute redo, not change",
                        () => {
                          _dragTreeNodeToTargetTreeNode();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
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
  );