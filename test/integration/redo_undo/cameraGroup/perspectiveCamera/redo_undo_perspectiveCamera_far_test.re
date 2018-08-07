open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: perspectiveCamera far", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeFar = value => {
      let farDomIndex = MainEditorCameraProjectionTool.getFarDomIndex();

      MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
        farDomIndex,
        value,
      );
    };

    let _simulateTwiceChangeFar = () => {
      let value1 = 10.112;
      let value2 = 123.12;

      _changeFar(value1);
      _changeFar(value2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
      );
      DirectorToolEngine.prepareAndInitAllEnginState();
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeFar, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildCameraProjection,
    );
  });