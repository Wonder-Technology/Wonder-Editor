open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorInspector ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
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
                () =>
                 BuildComponentTool.buildInspectorComponent(TestToolUI.buildEmptyAppState(),InspectorToolUI.buildFakeAllShowComponentConfig())
                  |> ReactTestTool.createSnapshotAndMatch
              );
              describe(
                "else",
                () => {
                  test(
                    "if currentGameObject is camera, should show transform and cameraController",
                    () => {
                      MainEditorSceneToolEditor.prepareDefaultScene(
                        MainEditorSceneToolEditor.setCameraTobeCurrentGameObject
                      );
                     BuildComponentTool.buildInspectorComponent(TestToolUI.buildEmptyAppState(),InspectorToolUI.buildFakeAllShowComponentConfig())
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "else if currentGameObject is box, should show transform and material",
                    () => {
                      MainEditorSceneToolEditor.prepareDefaultScene(
                        MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
                      );
                     BuildComponentTool.buildInspectorComponent(TestToolUI.buildEmptyAppState(),InspectorToolUI.buildFakeAllShowComponentConfig())
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              )
            }
          );
          describe(
            "test add component workflow",
            () => {
              beforeEach(
                () =>
                  MainEditorSceneToolEditor.prepareDefaultScene(
                    MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
                  )
              );
              test(
                "click the add component button, show addableComponent list",
                () => {
                  let component =
                    BuildComponentTool.buildInspectorComponent(TestToolUI.buildEmptyAppState(),InspectorToolUI.buildFakeAllShowComponentConfig());
                  EventToolUI.triggerComponentEvent(
                    component,
                    OperateComponentEventTool.triggerClickAddComponentEvent
                  );
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "click sourceInstance component, add to inspector",
                () => {
                  let component =
                    BuildComponentTool.buildInspectorComponent(TestToolUI.buildEmptyAppState(),InspectorToolUI.buildFakeAllShowComponentConfig());
                  EventToolUI.triggerComponentEvent(
                    component,
                    OperateComponentEventTool.triggerClickAddComponentEvent
                  );
                  EventToolUI.triggerComponentEvent(
                    component,
                    OperateComponentEventTool.triggerClickAddSourceInstanceEvent
                  );
                  let component2 =
                    BuildComponentTool.buildInspectorComponent(TestToolUI.buildEmptyAppState(),InspectorToolUI.buildFakeAllShowComponentConfig());
                  component2 |> ReactTestTool.createSnapshotAndMatch
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
            () =>
              MainEditorSceneToolEditor.prepareDefaultScene(
                MainEditorSceneToolEditor.setCameraTobeCurrentGameObject
              )
          );
          test(
            "test if specific component not exist, should throw error when parse config from json data",
            () =>
              expect(
                () =>
                  BuildComponentTool.buildInspectorComponent(TestToolUI.buildEmptyAppState(),InspectorToolUI.buildFakeErrorAllShowComponentConfig())
              )
              |> toThrowMessage("specific component:transformError is error")
          );
          test(
            "test if specific component not exist, should throw error when build component",
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