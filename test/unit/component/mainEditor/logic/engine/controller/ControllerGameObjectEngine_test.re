open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine:controller gameObject",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          TestTool.closeContractCheck();
          sandbox := createSandbox();
          TestTool.initMainEditor(sandbox);
          MainEditorSceneTool.prepareDefaultScene(
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          );
          MainEditorSceneTool.unsafeGetCurrentGameObject()
          |> MainEditorSceneTool.addFakeVboBufferForGameObject
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestTool.openContractCheck()
        }
      );
      describe(
        "test add gameObject",
        () =>
          test(
            "add one box gameObject, the engineStateForEdit and engineStateForRun's children length should == 5",
            () => {
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickAddBox
              );
              (
                StateLogicService.getEngineStateForEdit()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                |> Js.Array.length,
                StateLogicService.getEngineStateForRun()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetRunScene())
                |> Js.Array.length
              )
              |> expect == (5, 5)
            }
          )
      );
      describe(
        "test dispose gameObject from engine",
        () => {
          test(
            "dispose current gameObject, the engineStateForEdit and engineStateForRun's children length should == 3",
            () => {
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDispose
              );
              (
                StateLogicService.getEngineStateForEdit()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                |> Js.Array.length,
                StateLogicService.getEngineStateForRun()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetRunScene())
                |> Js.Array.length
              )
              |> expect == (3, 3)
            }
          );
          test(
            "disposed current gameObject shouldn't in engineStateForEdit and engineStateForRun's children",
            () => {
              let currentGameObject = MainEditorSceneTool.unsafeGetCurrentGameObject();
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDispose
              );
              (
                StateLogicService.getEngineStateForEdit()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetEditScene())
                |> Js.Array.includes(currentGameObject),
                StateLogicService.getEngineStateForRun()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetRunScene())
                |> Js.Array.includes(currentGameObject)
              )
              |> expect == (false, false)
            }
          )
        }
      )
    }
  );