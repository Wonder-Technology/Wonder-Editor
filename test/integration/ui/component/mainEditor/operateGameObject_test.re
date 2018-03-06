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
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox);
          MainEditorSceneToolEditor.prepareDefaultScene(
            MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          beforeEach(() => TestToolEditor.closeContractCheck());
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "operate gameObject",
            () => {
              beforeEach(
                () =>
                  MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                  |> MainEditorSceneToolEditor.addFakeVboBufferForGameObject
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
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                            )
                            |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            BuildComponentTool.buildHeader(
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                            ),
                            OperateGameObjectEventTool.triggerClickAddBox
                          );
                          let newSnapShotJson =
                            BuildComponentTool.buildSceneTree(
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
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
                              TestToolUI.buildEmptyAppState(),
                              InspectorToolUI.buildFakeAllShowComponentConfig()
                            )
                            |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            BuildComponentTool.buildHeader(
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                            ),
                            OperateGameObjectEventTool.triggerClickAddBox
                          );
                          let newSnapShotJson =
                            BuildComponentTool.buildInspectorComponent(
                              TestToolUI.buildEmptyAppState(),
                              InspectorToolUI.buildFakeAllShowComponentConfig()
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
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                            )
                            |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            BuildComponentTool.buildHeader(
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                            ),
                            OperateGameObjectEventTool.triggerClickDispose
                          );
                          let newSnapShotJson =
                            BuildComponentTool.buildSceneTree(
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
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
                              TestToolUI.buildEmptyAppState(),
                              InspectorToolUI.buildFakeAllShowComponentConfig()
                            )
                            |> ReactTestTool.createSnapshotJsonStringify;
                          EventToolUI.triggerComponentEvent(
                            BuildComponentTool.buildHeader(
                              SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                            ),
                            OperateGameObjectEventTool.triggerClickDispose
                          );
                          let newSnapShotJson =
                            BuildComponentTool.buildInspectorComponent(
                              TestToolUI.buildEmptyAppState(),
                              InspectorToolUI.buildFakeAllShowComponentConfig()
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
      );
      describe(
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
      )
    }
  );