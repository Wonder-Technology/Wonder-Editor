open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: inspector",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildMainEditorInspector = () =>
        ReactTestRenderer.create(
          <MainEditorInspector
            store=(TestToolUI.buildEmptyAppState())
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
                "test undo operate",
                () => {
                  test(
                    "test not undo",
                    () => {
                      let component = _buildMainEditorInspector();
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
                          StateHistoryToolEditor.undo();
                          let component = _buildMainEditorInspector();
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
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          let component = _buildMainEditorInspector();
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