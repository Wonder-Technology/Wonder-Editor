open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorBasicMaterialForGameObject component", () => {
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

        MainEditorBasicMaterialForGameObjectTool.changeMaterialTypeToBeBasicMaterial();
      });

      PickColorTool.testOperateColorPickToChangeColor(
        sandbox,
        (
          GameObjectTool.getCurrentSceneTreeNodeBasicMaterial,
          MainEditorBasicMaterialForGameObjectTool.changeColor,
          BasicMaterialEngineService.getColor,
        ),
      );
    });
  });