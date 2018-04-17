open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "test add gameObject",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestTool.closeContractCheck();
          MainEditorSceneTool.initStateAndGl(sandbox);
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          );
          GameObjectTool.unsafeGetCurrentGameObject()
          |> GameObjectTool.addFakeVboBufferForGameObject
        }
      );
      afterEach(
        () => {
          TestTool.openContractCheck();
          restoreSandbox(refJsObjToSandbox(sandbox^))
        }
      );
      describe(
        "should only change sceneTree ui component",
        () => {
          test(
            "change sceneTree ui component",
            () => {
              let oldSnapShotJson =
                BuildComponentTool.buildSceneTree(
                  SceneTreeTool.buildAppStateSceneGraphFromEngine()
                )
                |> ReactTestTool.createSnapshotJsonStringify;
              BaseEventTool.triggerComponentEvent(
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine()),
                OperateGameObjectEventTool.triggerClickAddBox
              );
              let newSnapShotJson =
                BuildComponentTool.buildSceneTree(
                  SceneTreeTool.buildAppStateSceneGraphFromEngine()
                )
                |> ReactTestTool.createSnapshotJsonStringify;
              expect(oldSnapShotJson) != newSnapShotJson
            }
          );
          test(
            "not change inspector ui component",
            () => {
              let oldSnapShotJson =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig()
                )
                |> ReactTestTool.createSnapshotJsonStringify;
              BaseEventTool.triggerComponentEvent(
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine()),
                OperateGameObjectEventTool.triggerClickAddBox
              );
              let newSnapShotJson =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig()
                )
                |> ReactTestTool.createSnapshotJsonStringify;
              expect(oldSnapShotJson) == newSnapShotJson
            }
          )
        }
      )
    }
  );