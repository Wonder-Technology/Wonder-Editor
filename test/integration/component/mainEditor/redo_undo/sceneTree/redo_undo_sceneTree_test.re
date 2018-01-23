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
          let _simulateTwiceDragEvent = () => {
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
                "test undo operate",
                () => {
                  test(
                    "not undo",
                    () => {
                      _simulateTwiceDragEvent();
                      let component = _buildEngineSceneTree();
                      let json = ReactTestRenderer.toJSON(component);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  describe(
                    "test undo one step",
                    () =>
                      test(
                        "step from second to first",
                        () => {
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.undo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
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
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  );
                  describe(
                    "test undo three step",
                    () =>
                      test(
                        "if current step is zero, execute undo, not change",
                        () => {
                          _simulateTwiceDragEvent();
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
                "test redo operate",
                () => {
                  describe(
                    "test redo one step",
                    () => {
                      test(
                        "if not exec undo, redo one step, not change",
                        () => {
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.redo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      );
                      test(
                        "undo step from second to zero, redo step from zero to first",
                        () => {
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
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
                          let component = _buildEngineSceneTree();
                          let json = ReactTestRenderer.toJSON(component);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  );
                  describe(
                    "test redo three step",
                    () =>
                      test(
                        "test if current step is last step, execute redo, not change",
                        () => {
                          _simulateTwiceDragEvent();
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