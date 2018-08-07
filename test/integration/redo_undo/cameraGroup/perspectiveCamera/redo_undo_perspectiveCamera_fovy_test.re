open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: perspectiveCamera fovy", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeFovy = value => {
      let fovyDomIndex = MainEditorCameraProjectionTool.getFovyDomIndex();

      MainEditorCameraProjectionTool.triggerPerspectiveCameraChangeAndBlurEvent(
        fovyDomIndex,
        value,
      );
    };

    let _simulateTwiceChangeFovy = () => {
      let value1 = 10.112;
      let value2 = 123.12;

      _changeFovy(value1);
      _changeFovy(value2);
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
      (_simulateTwiceChangeFovy, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildCameraProjection,
    );
  });