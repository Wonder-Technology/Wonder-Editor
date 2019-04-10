open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: lightMaterial shininess", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

    let _changeShininess = value => {
      let currentGameObjectMaterial =
        GameObjectTool.getCurrentSceneTreeNodeLightMaterial();

      MainEditorLightMaterialForGameObjectTool.changeShininess(~value, ());
      MainEditorLightMaterialForGameObjectTool.blurShininess(~value, ());
    };

    let _simulateTwiceChangeShininess = () => {
      let value1 = 1.1;
      let value2 = 12.12;

      _changeShininess(value1);
      _changeShininess(value2);
    };
    let _beforeEach = () =>
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        () => {
          MainEditorAssetTool.initAssetTree();
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
        },
      );

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeShininess, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildLightMaterialForGameObject,
    );
  });