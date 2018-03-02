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
        "test operate gameObject",
        () => {
          beforeEach(
            () =>
              MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
              |> MainEditorSceneToolEditor.addFakeVboBufferForGameObject
          );
          describe(
            "test add gameObject",
            () => {
              test(
                "add one box gameObject into scene, scene children length should == 5",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                    );
                  EventToolUI.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  MainEditorSceneToolEngine.unsafeGetScene()
                  |> MainEditorSceneToolEngine.getChildren
                  |> Js.Array.length
                  |> expect == 5
                }
              );
              test(
                "add two box gameObject into scene, scene children length should == 6",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                    );
                  EventToolUI.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  EventToolUI.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  MainEditorSceneToolEngine.unsafeGetScene()
                  |> MainEditorSceneToolEngine.getChildren
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
                  let currentGameObject = MainEditorSceneToolEditor.unsafeGetCurrentGameObject();
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                    );
                  EventToolUI.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDispose
                  );
                  MainEditorSceneToolEngine.unsafeGetScene()
                  |> MainEditorSceneToolEngine.getChildren
                  |> Js.Array.includes(currentGameObject)
                  |> expect == false
                }
              )
          )
        }
      )
    }
  );