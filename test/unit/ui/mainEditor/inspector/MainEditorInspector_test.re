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
          TestTool.initMainEditor(sandbox)
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
                 BuildComponentTool.buildInspectorComponent(TestTool.buildEmptyAppState(),InspectorTool.buildFakeAllShowComponentConfig())
                  |> ReactTestTool.createSnapshotAndMatch
              );
              describe(
                "else",
                () => {
                  test(
                    "if currentGameObject is camera, should show transform and cameraController",
                    () => {
                      MainEditorSceneTool.prepareDefaultScene(
                        MainEditorSceneTool.setCameraTobeCurrentGameObject
                      );
                     BuildComponentTool.buildInspectorComponent(TestTool.buildEmptyAppState(),InspectorTool.buildFakeAllShowComponentConfig())
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "else if currentGameObject is box, should show transform and material",
                    () => {
                      MainEditorSceneTool.prepareDefaultScene(
                        MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                      );
                     BuildComponentTool.buildInspectorComponent(TestTool.buildEmptyAppState(),InspectorTool.buildFakeAllShowComponentConfig())
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
                  MainEditorSceneTool.prepareDefaultScene(
                    MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                  )
              );
              test(
                "click the add component button, show addableComponent list",
                () => {
                  let component =
                    BuildComponentTool.buildInspectorComponent(TestTool.buildEmptyAppState(),InspectorTool.buildFakeAllShowComponentConfig());
                  BaseEventTool.triggerComponentEvent(
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
                    BuildComponentTool.buildInspectorComponent(TestTool.buildEmptyAppState(),InspectorTool.buildFakeAllShowComponentConfig());
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateComponentEventTool.triggerClickAddComponentEvent
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateComponentEventTool.triggerClickAddSourceInstanceEvent
                  );
                  let component2 =
                    BuildComponentTool.buildInspectorComponent(TestTool.buildEmptyAppState(),InspectorTool.buildFakeAllShowComponentConfig());
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
              MainEditorSceneTool.prepareDefaultScene(
                MainEditorSceneTool.setCameraTobeCurrentGameObject
              )
          );
          test(
            "test if specific component not exist, should throw error when parse config from json data",
            () =>
              expect(
                () =>
                  BuildComponentTool.buildInspectorComponent(TestTool.buildEmptyAppState(),InspectorTool.buildFakeErrorAllShowComponentConfig())
              )
              |> toThrowMessage("specific component:transformError is error")
          );
          test(
            "test if specific component not exist, should throw error when build component",
            () =>
              expect(
                () =>
                  InspectorTool.buildComponentUIComponent(
                    ("SceneTree", 0),
                    (TestTool.buildEmptyAppState(), TestTool.getDispatch())
                  )
              )
              |> toThrowMessage("the component: SceneTree not exist")
          )
        }
      )
    }
  );