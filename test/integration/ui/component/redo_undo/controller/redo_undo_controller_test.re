open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: controller engine",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test simulate set currentGameObject",
        () =>
          describe(
            "test snapshot",
            () => {
              beforeEach(
                () => {
                  TestTool.closeContractCheck();
                  TestTool.createAndSetEditorAndEngineStateAndCreateAndSetScene(sandbox);
                  TestToolEngine.setFakeGl(sandbox);
                  AllMaterialToolEngine.prepareForInit();
                  MainEditorSceneTool.createDefaultScene(
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
                "test controller workflow",
                () => {
                  let _execAddGameObjectWithCount = (count) => {
                    let component =
                      BuildComponentTool.buildHeader(
                        SceneTreeTool.buildAppStateSceneGraphFromEngine()
                      );
                    for (x in 1 to count) {
                      BaseEventTool.triggerComponentEvent(
                        component,
                        OperateGameObjectEventTool.triggerClickAddBox
                      )
                    }
                  };
                  test(
                    "init default scene, sceneTree children == 4",
                    () =>
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 4
                  );
                  test(
                    "add two gameObject, sceneTree children == 6",
                    () => {
                      _execAddGameObjectWithCount(2);
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 6
                    }
                  );
                  test(
                    "undo one step, sceneTree children == 5",
                    () => {
                      _execAddGameObjectWithCount(2);
                      StateHistoryToolEditor.undo();
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 5
                    }
                  );
                  test(
                    "click run button,store all stack, add three gameObject, sceneTree children == 8",
                    () => {
                      _execAddGameObjectWithCount(2);
                      ControllerTool.run();
                      _execAddGameObjectWithCount(3);
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 8
                    }
                  );
                  test(
                    "undo one step, sceneTree children == 7",
                    () => {
                      _execAddGameObjectWithCount(2);
                      ControllerTool.run();
                      _execAddGameObjectWithCount(3);
                      StateHistoryToolEditor.undo();
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 7
                    }
                  );
                  test(
                    "redo one step, sceneTree children == 8",
                    () => {
                      _execAddGameObjectWithCount(2);
                      ControllerTool.run();
                      _execAddGameObjectWithCount(3);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 8
                    }
                  );
                  test(
                    "click stop button,restore all stack, sceneTree children == 5",
                    () => {
                      _execAddGameObjectWithCount(2);
                      ControllerTool.run();
                      _execAddGameObjectWithCount(3);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      ControllerTool.stop();
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 5
                    }
                  );
                  test(
                    "undo one step, back to the initial state,sceneTree children == 4",
                    () => {
                      _execAddGameObjectWithCount(2);
                      ControllerTool.run();
                      _execAddGameObjectWithCount(3);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      ControllerTool.stop();
                      StateHistoryToolEditor.undo();
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 4
                    }
                  );
                  test(
                    "redo two step, sceneTree children == 6",
                    () => {
                      _execAddGameObjectWithCount(2);
                      ControllerTool.run();
                      _execAddGameObjectWithCount(3);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      ControllerTool.stop();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      StateLogicService.getEngineStateForEdit()
                      |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                      |> Js.Array.length
                      |> expect == 6
                    }
                  )
                }
              )
            }
          )
      )
    }
  );