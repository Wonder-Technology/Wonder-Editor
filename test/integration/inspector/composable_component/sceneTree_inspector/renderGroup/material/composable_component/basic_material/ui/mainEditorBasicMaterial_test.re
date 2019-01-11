open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorBasicMaterial component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
      });

      PickColorTool.testOperateColorPickToChangeColor(
        sandbox,
        BuildComponentForCurryTool.buildBasicMaterial,
        (
          GameObjectTool.getCurrentGameObjectBasicMaterial,
          MainEditorBasicMaterialTool.changeColor,
          BasicMaterialEngineService.getColor,
        ),
      );
    });
  });