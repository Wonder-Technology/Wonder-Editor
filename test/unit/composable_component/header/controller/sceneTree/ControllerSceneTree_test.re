open Wonder_jest;


open Expect;
open Expect.Operators;

open Sinon;

let _ =
  describe(
    "controller sceneTree",
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
          ControllerTool.setRequest(createEmptyStubWithJsObjSandbox(sandbox));
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
        "test set parent in engine",
        () =>
          test(
            "drag treeNode into target treeNode, set draged gameObject's parent to be target gameObject",
            () => {
              TestTool.openContractCheck();
              let targetRunGameObject =
                StateLogicService.getRunEngineState() |> MainEditorSceneTool.getBoxByIndex(0);
              let dragedRunGameObject =
                StateLogicService.getRunEngineState() |> MainEditorSceneTool.getBoxByIndex(1);
              let targetEditGameObject =
                StateLogicService.getEditEngineState() |> MainEditorSceneTool.getBoxByIndex(0);
              let dragedEditGameObject =
                StateLogicService.getEditEngineState() |> MainEditorSceneTool.getBoxByIndex(1);
              let component =
                BuildComponentTool.buildSceneTree(
                  SceneTreeTool.buildAppStateSceneGraphFromEngine()
                );
              BaseEventTool.triggerComponentEvent(
                component,
                SceneTreeEventTool.triggerDragStart(2)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                SceneTreeEventTool.triggerDragEnter(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                SceneTreeEventTool.triggerDragLeave(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                SceneTreeEventTool.triggerDragOver(1)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                SceneTreeEventTool.triggerDragDrop(1)
              );
              (
                GameObjectUtils.getParent(
                  dragedRunGameObject,
                  StateLogicService.getRunEngineState()
                ),
                GameObjectUtils.getParent(
                  dragedEditGameObject,
                  StateLogicService.getEditEngineState()
                )
              )
              |> expect == (targetRunGameObject, targetEditGameObject)
            }
          )
      )
    }
  );