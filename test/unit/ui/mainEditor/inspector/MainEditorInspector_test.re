open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorInspector ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
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
                  TestTool.initMainEditor(sandbox);
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              describe(
                "else",
                () => {
                  beforeEach(
                    () => TestTool.createAndSetEditorAndEngineStateAndCreateAndSetScene(sandbox)
                  );
                  test(
                    "if currentGameObject is camera, should show transform and basicCameraView and perspectiveCameraProjection",
                    () => {
                      MainEditorSceneTool.createDefaultScene(
                        MainEditorSceneTool.setCameraTobeCurrentGameObject
                      );
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "else if currentGameObject is box, should show transform and basicMaterial",
                    () => {
                      MainEditorSceneTool.createDefaultScene(
                        MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                      );
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig()
                      )
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
                () => {
                  TestTool.createAndSetEditorAndEngineStateAndCreateAndSetScene(sandbox);
                  MainEditorSceneTool.createDefaultScene(
                    MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                  )
                }
              );
              test(
                "click the add component button, show addableComponent list",
                () => {
                  let component =
                    BuildComponentTool.buildInspectorComponent(
                      TestTool.buildEmptyAppState(),
                      InspectorTool.buildFakeAllShowComponentConfig()
                    );
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
                    BuildComponentTool.buildInspectorComponent(
                      TestTool.buildEmptyAppState(),
                      InspectorTool.buildFakeAllShowComponentConfig()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateComponentEventTool.triggerClickAddComponentEvent
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateComponentEventTool.triggerClickAddSourceInstanceEvent
                  );
                  let component2 =
                    BuildComponentTool.buildInspectorComponent(
                      TestTool.buildEmptyAppState(),
                      InspectorTool.buildFakeAllShowComponentConfig()
                    );
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
            () => {
              TestTool.createAndSetEditorAndEngineStateAndCreateAndSetScene(sandbox);
              MainEditorSceneTool.createDefaultScene(
                MainEditorSceneTool.setCameraTobeCurrentGameObject
              )
            }
          );
          test(
            "test if specific component not exist, should throw error when parse config from json data",
            () =>
              expect(
                () =>
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeErrorAllShowComponentConfig()
                  )
              )
              |> toThrowMessageRe([%re {|/specific\scomponent.+is\serror/mg|}])
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