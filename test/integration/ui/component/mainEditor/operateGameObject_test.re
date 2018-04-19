open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "operate gameObject: header and sceneTree",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(sandbox);
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          beforeEach(() => TestTool.closeContractCheck());
          afterEach(() => TestTool.openContractCheck());
          describe(
            "operate gameObject",
            () => {
              beforeEach(
                () =>
                  MainEditorSceneTool.unsafeGetCurrentGameObject()
                  |> MainEditorSceneTool.addFakeVboBufferForGameObject
              );
              describe(
                "test add gameObject",
                () =>
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
                            BuildComponentTool.buildHeader(
                              SceneTreeTool.buildAppStateSceneGraphFromEngine()
                            ),
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
                            BuildComponentTool.buildHeader(
                              SceneTreeTool.buildAppStateSceneGraphFromEngine()
                            ),
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
              );
              describe(
                "test dispose gameObject",
                () =>
                  describe(
                    "remove currentGameObject should change sceneTree and inspector",
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
                            BuildComponentTool.buildHeader(
                              SceneTreeTool.buildAppStateSceneGraphFromEngine()
                            ),
                            OperateGameObjectEventTool.triggerClickDispose
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
                        "change inspector ui component",
                        () => {
                          let oldSnapShotJson =
                            BuildComponentTool.buildInspectorComponent(
                              TestTool.buildEmptyAppState(),
                              InspectorTool.buildFakeAllShowComponentConfig()
                            )
                            |> ReactTestTool.createSnapshotJsonStringify;
                          BaseEventTool.triggerComponentEvent(
                            BuildComponentTool.buildHeader(
                              SceneTreeTool.buildAppStateSceneGraphFromEngine()
                            ),
                            OperateGameObjectEventTool.triggerClickDispose
                          );
                          let newSnapShotJson =
                            BuildComponentTool.buildInspectorComponent(
                              TestTool.buildEmptyAppState(),
                              InspectorTool.buildFakeAllShowComponentConfig()
                            )
                            |> ReactTestTool.createSnapshotJsonStringify;
                          expect(oldSnapShotJson) != newSnapShotJson
                        }
                      )
                    }
                  )
              )
            }
          )
        }
      )
      /* describe(
           "test logic",
           () =>
             test(
               "the buildSceneGraphDataWithNewGameObject function shouldn't change original array",
               () => {
                 let originSceneGraphArray = OperateGameObjectToolUI.getSceneGraphFromEngine();
                 let oldSceneGraphArray = OperateGameObjectToolUI.getSceneGraphFromEngine();
                 OperateGameObjectToolUI.buildSceneGraphDataWithNewGameObject(
                   OperateGameObjectToolUI.addBox(),
                   oldSceneGraphArray
                 );
                 expect(oldSceneGraphArray) == originSceneGraphArray
               }
             )
         ) */
    }
  );