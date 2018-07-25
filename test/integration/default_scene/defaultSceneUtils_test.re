open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("defaultScene: compute diff value ", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.closeContractCheck();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
    });
    afterEach(() => {
      TestTool.openContractCheck();
      restoreSandbox(refJsObjToSandbox(sandbox^));
    });
    describe("test change currentSceneTreeNode color", () => {
      let getEditCameraBoxColor = editEngineState => {
        let editCameraFirstChild =
          MainEditorSceneTool.unsafeGetScene()
          |> GameObjectTool.getEditEngineChildren
          |> Js.Array.filter(gameObject =>
               CameraEngineService.isCamera(gameObject, editEngineState)
             )
          |> ArrayService.getNth(1)
          |> GameObjectTool.getEditEngineChildren
          |> ArrayService.getFirst;

        editEngineState
        |> GameObjectComponentEngineService.getLightMaterialComponent(
             editCameraFirstChild,
           )
        |. 
    LightMaterialEngineService.getLightMaterialDiffuseColor(editEngineState);
      };

      test(
        "change currentSceneTreeNode material color shouldn't change editCamera box editrCameraMaterial color",
        () => {
          let editEngineState = StateLogicService.getEditEngineState();
          let editCameraBoxNormalColor = getEditCameraBoxColor(editEngineState);

          let currentGameObjectMaterial =
            GameObjectTool.getCurrentGameObjectLightMaterial();
          let newColor = {
            "hex": "#7df1e8",
            "rgb": {
              "r": 125,
              "g": 241,
              "b": 232,
            },
          };

          PickColorEventTool.triggerChangeLightColor(
            currentGameObjectMaterial,
            newColor,
          );

          let editCameraBoxNewColor = getEditCameraBoxColor(editEngineState);

          editCameraBoxNewColor |> expect == editCameraBoxNormalColor;
        },
      );
    });
  });