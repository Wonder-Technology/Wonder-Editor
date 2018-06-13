open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "controller inspector component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          TestTool.closeContractCheck();
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.SceneTree)
          |> StateLogicService.getAndSetEditorState;
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode
          );
          ControllerTool.stubRequestAnimationFrame(createEmptyStubWithJsObjSandbox(sandbox));
          ControllerTool.run()
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestTool.openContractCheck()
        }
      );
      describe(
        "test add component",
        () => {
          describe(
            "test add component in engine",
            () =>
              describe(
                "test add sourceInstance component",
                () => {
                  test(
                    "current gameObject shouldn't have sourceInstance component before add it",
                    () =>
                      (
                        StateLogicService.getEditEngineState()
                        |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                             GameObjectTool.unsafeGetCurrentSceneTreeNode()
                           ),
                        StateLogicService.getRunEngineState()
                        |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                             GameObjectTool.unsafeGetCurrentSceneTreeNode()
                           )
                      )
                      |> expect == (false, false)
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
                      (
                        StateLogicService.getEditEngineState()
                        |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                             DiffComponentTool.getEditEngineComponent(
                               DiffType.GameObject,
                               GameObjectTool.unsafeGetCurrentSceneTreeNode()
                             )
                           ),
                        StateLogicService.getRunEngineState()
                        |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                             GameObjectTool.unsafeGetCurrentSceneTreeNode()
                           )
                      )
                      |> expect == (true, true)
                    }
                  )
                }
              )
          );
          describe(
            "test add component in inspector",
            () =>
              describe(
                "test add sourceInstance component",
                () =>
                  test(
                    "inspector should show sourceInstance component",
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
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
          )
        }
      )
    }
  );