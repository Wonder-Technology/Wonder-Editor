open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: ambientLight", () => {
    let sandbox = getSandboxDefaultVal();

    let _changeColorAndPushUndoStack = value => {
      let sourceColor = ControllerTool.getColor();

      ControllerTool.changeColor(value);

      ControllerTool.closeColorPicker(~color=sourceColor, ());
    };

    let _simulateTwiceChangeAmbientLight = () => {
      BuildCanvasTool.buildFakeCanvas(sandbox);

      let color1 = PickColorTool.buildColor1();
      let color2 = PickColorTool.buildColor2();

      _changeColorAndPushUndoStack(color1);
      _changeColorAndPushUndoStack(color2);
    };

    let _beforeEach = () =>
      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
               [
           {
             "name": "default",
             "jobs": [
               {
                 "name": "init_transform_gizmos"
               }
             ]
           }
         ]
               |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.prepareGl(sandbox);

      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceChangeAmbientLight, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildController,
    );
  });