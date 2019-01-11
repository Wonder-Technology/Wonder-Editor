open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: change geometry", () => {
    let sandbox = getSandboxDefaultVal();

    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

    let _simulateChangeGeometry = () =>
      MainEditorGeometryTool.changeGeometry(
        ~sourceGeometry=GameObjectTool.getCurrentGameObjectGeometry(),
        ~targetGeometry=
          MainEditorGeometryTool.getDefaultSphereGeometryComponent(),
        (),
      );

    let _beforeEach = () =>
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    let _afterEach = () => ();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoOneStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateChangeGeometry, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildGeometry,
    );
  });