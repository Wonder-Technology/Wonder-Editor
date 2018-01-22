open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: transform",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildMainEditorTransformComponent = (transformComponent) =>
        ReactTestRenderer.create(
          <MainEditorTransform
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
            transformComponent
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test set currentGameObject",
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
              SceneTreeEventUtils.triggerClickEvent(clickTreeNodeIndex)
            );
            MainEditorSceneToolEditor.unsafeGetCurrentGameObject() |> ignore
          };
          beforeEach(
            () => {
              TestToolEditor.closeContractCheck();
              StateHistoryToolEditor.clearAllState();
              MainEditorSceneToolEditor.prepareDefaultScene(
                MainEditorSceneToolEditor.setBoxTobeCurrentGameObject
              );
              _setSpecificGameObject(1)
            }
          );
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "test snapshot",
            () => {
              describe(
                "undo operator",
                () => {
                  test(
                    "test no undo",
                    () => {
                      let currentGameObjectTransform =
                        MainEditorSceneToolEditor.getCurrentGameObjectTransform();
                      let component =
                        _buildMainEditorTransformComponent(currentGameObjectTransform);
                      EventToolUI.triggerComponentEvent(
                        component,
                        TransformEventUtils.triggerChangeXEvent("11.25")
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        TransformEventUtils.triggerBlurXEvent("11.25")
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        TransformEventUtils.triggerChangeYEvent("15")
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        TransformEventUtils.triggerBlurYEvent("15")
                      );
                      let component2 =
                        _buildMainEditorTransformComponent(currentGameObjectTransform);
                      let json = ReactTestRenderer.toJSON(component2);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  describe(
                    "undo one step",
                    () =>
                      test(
                        "undo step from second to first",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneToolEditor.getCurrentGameObjectTransform();
                          let component =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeXEvent("11.25")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurXEvent("11.25")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeYEvent("15")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurYEvent("15")
                          );
                          StateHistoryToolEditor.undo();
                          let component2 =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          let json = ReactTestRenderer.toJSON(component2);
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
                          let currentGameObjectTransform =
                            MainEditorSceneToolEditor.getCurrentGameObjectTransform();
                          let component =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeXEvent("11.25")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurXEvent("11.25")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeYEvent("15")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurYEvent("15")
                          );
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          let component2 =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          let json = ReactTestRenderer.toJSON(component2);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  )
                }
              );
              describe(
                "redo operator",
                () => {
                  describe(
                    "redo one step",
                    () =>
                      test(
                        "undo step from second to zero, redo step from zero to first",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneToolEditor.getCurrentGameObjectTransform();
                          let component =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeZEvent("1.2512")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurZEvent("1.2512")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeYEvent("-2.213")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurYEvent("-2.213")
                          );
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          let component2 =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          let json = ReactTestRenderer.toJSON(component2);
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
                          let currentGameObjectTransform =
                            MainEditorSceneToolEditor.getCurrentGameObjectTransform();
                          let component =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeZEvent("25.11")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurZEvent("25.11")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeYEvent("15.12")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurYEvent("15.12")
                          );
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          let component2 =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          let json = ReactTestRenderer.toJSON(component2);
                          toMatchSnapshot(expect(json))
                        }
                      )
                  );
                  describe(
                    "redo three step",
                    () =>
                      test(
                        "undo step from second to zero, redo step from zero to thrid",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneToolEditor.getCurrentGameObjectTransform();
                          let component =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeZEvent("25.11")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurZEvent("25.11")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerChangeYEvent("15.12")
                          );
                          EventToolUI.triggerComponentEvent(
                            component,
                            TransformEventUtils.triggerBlurYEvent("15.12")
                          );
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          let component2 =
                            _buildMainEditorTransformComponent(currentGameObjectTransform);
                          let json = ReactTestRenderer.toJSON(component2);
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