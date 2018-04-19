open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "defaultScene: compute diff value ",
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
          )
        }
      );
      afterEach(
        () => {
          TestTool.openContractCheck();
          restoreSandbox(refJsObjToSandbox(sandbox^))
        }
      );
      describe(
        "test change currentGameObject color",
        () =>
          test(
            "change currentGameObject material color shouldn't change editCamera box material color",
            () => {
              let editEngineState = StateLogicService.getEditEngineState();
              let editCamera =
                MainEditorSceneTool.unsafeGetScene()
                |> GameObjectTool.getEditEngineChildren
                |> Js.Array.filter(
                     (gameObject) => CameraEngineService.isCamera(gameObject, editEngineState)
                   )
                |> ArrayService.getNth(1)
                |> GameObjectTool.getEditEngineChildren
                |> ArrayService.getFirst;
              let material =
                editEngineState
                |> GameObjectComponentEngineService.getBasicMaterialComponent(editCamera);
              let color = editEngineState |> BasicMaterialEngineService.getColor(material);
              let currentGameObjectMaterial = GameObjectTool.getCurrentGameObjectMaterial();
              let value = "#c0c0c0";
              let component = BuildComponentTool.buildMaterialComponent(currentGameObjectMaterial);
              /* TODO all: move to tool */
              BaseEventTool.triggerComponentEvent(
                component,
                MaterialEventTool.triggerOnChangeEvent(value)
              );
              BaseEventTool.triggerComponentEvent(
                component,
                MaterialEventTool.triggerOnBlurEvent(value)
              );
              editEngineState |> BasicMaterialEngineService.getColor(material) |> expect == color
            }
          )
      )
    }
  );