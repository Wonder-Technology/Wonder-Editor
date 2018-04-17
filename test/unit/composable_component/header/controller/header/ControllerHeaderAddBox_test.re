open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "controller header addBox",
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
          GameObjectTool.unsafeGetCurrentGameObject()
          |> GameObjectTool.addFakeVboBufferForGameObject
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestTool.openContractCheck()
        }
      );
      describe(
        "add box in engine",
        () => {
          test(
            "add one box gameObject, the EditEngineState's children length == 5 and RunEngineState's children length should == 4",
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
          );
          test(
            "add two box gameObject, the EditEngineState's children length == 6 and RunEngineState's children length should == 5",
            () => {
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickAddBox
              );
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
              |> expect == (6, 5)
            }
          )
        }
      );
      describe(
        "add box in sceneTree",
        () =>
          test(
            "add one box gameObject, the sceneTree children should == 4",
            () => {
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickAddBox
              );
              BuildComponentTool.buildSceneTree(SceneTreeTool.buildAppStateSceneGraphFromEngine())
              |> ReactTestTool.createSnapshotAndMatch
            }
          )
      )
    }
  );