open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine:operate component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          TestTool.closeContractCheck();
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(sandbox);
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestTool.openContractCheck()
        }
      );
      describe(
        "test operate component",
        () =>
          describe(
            "test add component",
            () =>
              describe(
                "test add sourceInstance component",
                () => {
                  test(
                    "current gameObject should not have sourceInstance before add it",
                    () =>
                      expect(
                        MainEditorSceneTool.unsafeGetCurrentGameObject()
                        |> MainEditorComponentTool.hasSourceInstanceComponent
                      )
                      == false
                  );
                  test(
                    "current gameObject should have sourceInstance component after add it",
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
                      expect(
                        MainEditorSceneTool.unsafeGetCurrentGameObject()
                        |> MainEditorComponentTool.hasSourceInstanceComponent
                      )
                      == true
                    }
                  )
                }
              )
          )
      )
    }
  );