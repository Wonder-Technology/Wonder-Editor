open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: perspectiveCamera aspect", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeAspect = value => {
      let aspectDomIndex = MainEditorCameraProjectionTool.getAspectDomIndex();

      MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
        aspectDomIndex,
        value,
      );
    };

    let _simulateTwiceChangeAspect = () => {
      let value1 = 10.112;
      let value2 = 123.12;

      _changeAspect(value1);
      _changeAspect(value2);
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
      (_simulateTwiceChangeAspect, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildCameraProjection,
    );
  });