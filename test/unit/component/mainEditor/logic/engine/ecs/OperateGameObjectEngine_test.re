open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine:operate gameObject",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          TestTool.closeContractCheck();
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestTool.initMainEditor(sandbox);
          MainEditorSceneTool.prepareDefaultScene(
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
        "test operate gameObject",
        () => {
          beforeEach(
            () =>
              MainEditorSceneTool.unsafeGetCurrentGameObject()
              |> MainEditorSceneTool.addFakeVboBufferForGameObject
          );
          describe(
            "test add gameObject",
            () => {
              test(
                "add one box gameObject into scene, scene children length should == 5",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.getChildren
                  |> Js.Array.length
                  |> expect == 5
                }
              );
              test(
                "add two box gameObject into scene, scene children length should == 6",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.getChildren
                  |> Js.Array.length
                  |> expect == 6
                }
              )
            }
          );
          describe(
            "test dispose gameObject from engine",
            () =>
              test(
                "disposed current gameObject shouldn't in scene children",
                () => {
                  let currentGameObject = MainEditorSceneTool.unsafeGetCurrentGameObject();
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDispose
                  );
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.getChildren
                  |> Js.Array.includes(currentGameObject)
                  |> expect == false
                }
              )
          );
          /* describe(
            "fix bug",
            () =>
              test(
                "disposed current gameObject shouldn't in scene children",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDispose
                  );
                  MainEditorSceneTool.setFirstBoxTobeCurrentGameObject();
                  MainEditorSceneTool.unsafeGetCurrentGameObject()
                  |> MainEditorSceneTool.addFakeVboBufferForGameObject;
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDispose
                  );
                  MainEditorSceneTool.setFirstBoxTobeCurrentGameObject();
                  MainEditorSceneTool.unsafeGetCurrentGameObject()
                  |> MainEditorSceneTool.addFakeVboBufferForGameObject;
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDispose
                  );
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.getChildren
                  |> WonderLog.Log.print;

                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.getChildren
                  |> WonderLog.Log.print;
                  expect(1) == 1
                }
              )
          ) */
        }
      )
    }
  );