open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorInspector ui component",
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
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          describe(
            "test show component",
            () => {
              test(
                "if hasn't currentGameObject, show nothing",
                () => {
                  let component =
                    _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              );
              describe(
                "esle",
                () => {
                  test(
                    "if currentGameObject is camera, should show transform and cameraController",
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      MainEditorSceneToolEditor.prepareDefaultScene(
                        MainEditorSceneToolEditor.setCameraTobeCurrentGameObject
                      );
                      let component =
                        _buildInspectorComponent(
                          InspectorToolUI.buildFakeAllShowComponentConfig()
                        );
                      let json = ReactTestRenderer.toJSON(component);
                      toMatchSnapshot(expect(json))
                    }
                  );
                  test(
                    "else if currentGameObject is box, should show transform and material",
                    () => {
                      TestToolUI.initMainEditor(sandbox);
                      MainEditorSceneToolEditor.prepareDefaultScene(
                        MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
                      );
                      let component =
                        _buildInspectorComponent(
                          InspectorToolUI.buildFakeAllShowComponentConfig()
                        );
                      let json = ReactTestRenderer.toJSON(component);
                      toMatchSnapshot(expect(json))
                    }
                  )
                }
              )
            }
          );
          describe(
            "test add component workflow",
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
              beforeEach(
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorSceneToolEditor.prepareDefaultScene(
                    MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
                  )
                }
              );
              test(
                "click the add component button, show addableComponent list",
                () => {
                  let component =
                    _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
                  EventToolUI.triggerComponentEvent(component, _triggerClickAddComponentEvent);
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              );
              test(
                "click sourceInstance component, add to inspector",
                () => {
                  let component =
                    _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
                  EventToolUI.triggerComponentEvent(component, _triggerClickAddComponentEvent);
                  EventToolUI.triggerComponentEvent(
                    component,
                    _triggerClickAddSourceInstanceEvent
                  );
                  let component2 =
                    _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
                  let json = ReactTestRenderer.toJSON(component2);
                  toMatchSnapshot(expect(json))
                }
              )
            }
          )
        }
      );
      describe(
        "deal with specific case",
        () => {
          beforeEach(
            () => {
              TestToolUI.initMainEditor(sandbox);
              MainEditorSceneToolEditor.prepareDefaultScene(
                MainEditorSceneToolEditor.setCameraTobeCurrentGameObject
              )
            }
          );
          test(
            "test if config is error, should throw error",
            () =>
              expect(
                () =>
                  _buildInspectorComponent(InspectorToolUI.buildFakeErrorAllShowComponentConfig())
              )
              |> toThrowMessage("specific component:transformError is error")
          );
          test(
            "test if specific component not exist, should throw error",
            () =>
              expect(
                () =>
                  InspectorToolUI.buildComponentUIComponent(
                    ("SceneTree", 0),
                    (TestToolUI.buildEmptyAppState(), TestToolUI.getDispatch())
                  )
              )
              |> toThrowMessage("the component: SceneTree not exist")
          )
        }
      )
    }
  );