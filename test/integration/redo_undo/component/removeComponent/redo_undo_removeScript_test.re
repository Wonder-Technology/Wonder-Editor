open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: remove script component", () => {
    let sandbox = getSandboxDefaultVal();

    let _simulate = () =>
      MainEditorInspectorRemoveComponentTool.removeScriptComponent();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      MainEditorInspectorAddComponentTool.addScriptComponent();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () =>
        test("step which from first to zero", () => {
          let addedNodeId = _simulate();

          RedoUndoTool.undoHistoryState();

          GameObjectComponentEngineService.hasScriptComponent(
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == true;
        })
      )
    );

    describe("test redo operate", () =>
      describe("test redo one step", () => {
        test(
          "undo step which from first to zero, redo step which from zero to first",
          () => {
          let addedNodeId = _simulate();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          GameObjectComponentEngineService.hasScriptComponent(
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        });

        describe("fix bug", () =>
          test("shouldn't error", () => {
            let errorStub =
              ConsoleTool.stubError(~sandbox, ~stubLog=false, ());
            let addedNodeId = _simulate();

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            ConsoleTool.judgeNotError(errorStub);
          })
        );
      })
    );
  });