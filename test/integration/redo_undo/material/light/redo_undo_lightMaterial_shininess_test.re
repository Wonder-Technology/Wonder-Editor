open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: lightMaterial texture", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeShininess = value => {
      let currentGameObjectMaterial =
        GameObjectTool.getCurrentGameObjectLightMaterial();

      let component =
        BuildComponentTool.buildLightMaterial(currentGameObjectMaterial);

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorMaterialTool.triggerShininessChangeEvent(value),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorMaterialTool.triggerShininessBlurEvent(value),
      );
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
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();
        },
      );

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeShininess, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildLightMaterial,
    );
  });