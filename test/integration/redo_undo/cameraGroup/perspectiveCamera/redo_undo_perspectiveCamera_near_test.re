open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: perspectiveCamera near", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeNear = value => {
      let nearDomIndex = MainEditorCameraProjectionTool.getNearDomIndex();

      MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
        nearDomIndex,
        value,
      );
    };

    let _simulateTwiceChangeNear = () => {
      let value1 = 10.112;
      let value2 = 123.12;

      _changeNear(value1);
      _changeNear(value2);
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
      (_simulateTwiceChangeNear, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildCameraProjection,
    );
  });