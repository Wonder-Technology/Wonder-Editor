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
          MainEditorSceneTool.initStateAndGl(sandbox);
          MainEditorSceneTool.createDefaultScene(
            sandbox,
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
                StateLogicService.getEditEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length,
                StateLogicService.getRunEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length
              )
              |> expect == (5, 4)
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
                StateLogicService.getEditEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length,
                StateLogicService.getRunEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length
              )
              |> expect == (3, 2)
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
                StateLogicService.getEditEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.includes(currentGameObject),
                StateLogicService.getRunEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.includes(currentGameObject)
              )
              |> expect == (false, false)
            }
          )
        }
      )
    }
  );