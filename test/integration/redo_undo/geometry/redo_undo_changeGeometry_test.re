open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: change geometry", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) => ArrayService.unsafeGetNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _simulateChangeGeometry = () => {
      let component =
        BuildComponentTool.buildGeometry(
          TestTool.buildEmptyAppState(),
          GameObjectTool.getCurrentGameObjectGeometry(),
        );

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorGeometryTool.triggerClickShowGeometryGroup,
      );

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorGeometryTool.getSphereDomIndex()
        |> MainEditorGeometryTool.triggerClickSpecificGeometry,
      );
    };

    let _beforeEach = () =>
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
    let _afterEach = () => ();

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateChangeGeometry, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildGeometry,
    );
  });