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
          TestToolEditor.closeContractCheck();
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEditor.prepareDefaultScene(
            MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestToolEditor.openContractCheck()
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
                    "current gameObject should haven't sourceInstance before add it",
                    () =>
                      expect(
                        MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                        |> MainEditorComponentToolEngine.hasSourceInstanceComponent
                      )
                      == false
                  );
                  test(
                    "current gameObject should have sourceInstance component after add it",
                    () => {
                      let component =
                        BuildComponentTool.buildInspectorComponent(
                          TestToolUI.buildEmptyAppState(),
                          InspectorToolUI.buildFakeAllShowComponentConfig()
                        );
                      EventToolUI.triggerComponentEvent(
                        component,
                        OperateComponentEventTool.triggerClickAddComponentEvent
                      );
                      EventToolUI.triggerComponentEvent(
                        component,
                        OperateComponentEventTool.triggerClickAddSourceInstanceEvent
                      );
                      expect(
                        MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                        |> MainEditorComponentToolEngine.hasSourceInstanceComponent
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