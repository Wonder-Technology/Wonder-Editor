open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("init hotKeys job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareKeyboardEvent = (~sandbox, ()) =>
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
                        "name": "init_hotkeys"
                      }
                    ]
                  }
                ]
            |},
            ~initJobs=
              {j|
                [

                    {
                       "name": "init_hotkeys"
                    }
                ]
            |j},
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

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind document hotKeys event", () => {
      let _execKeyboardEvent =
          (
            keyboardDomEventName,
            keyCode,
            ~ctrlKey=false,
            ~altKey=false,
            ~shiftKey=false,
            (),
          ) =>
        EventTool.triggerDomEvent(
          keyboardDomEventName,
          EventTool.getDocument(),
          KeyboardEventTool.buildKeyboardEvent(
            ~ctrlKey,
            ~altKey,
            ~shiftKey,
            ~keyCode,
            (),
          ),
        );

      let triggerRedoHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 89, ~ctrlKey=true, ()) |> ignore;

      let triggerUndoHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 90, ~ctrlKey=true, ()) |> ignore;

      let triggerCloneHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 68, ~ctrlKey=true, ()) |> ignore;

      let triggerDeleteHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 46, ()) |> ignore;

      beforeEach(() => {
        _prepareKeyboardEvent(~sandbox, ());

        MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

        EventTool.buildFakeDocumentSetToWindow();

        MainUtils._handleEngineState |> StateLogicService.getAndSetEngineState;
      });
      afterEach(() => EventTool.restoreHotKeys());

      describe("test bind undo hot-key", () =>
        test("key down ctrl+z, should execute undo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
      describe("test bind clone hot-key", () =>
        test("key down ctrl+d, should execute clone operate", () => {
          triggerCloneHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
      describe("test bind redo hot-key", () =>
        test("key down ctrl+y, should execute redo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();
          triggerUndoHotKeyEvent();
          triggerRedoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test bind delete hot-key", () =>
        test("key down delete, should execute delete operate", () => {
          triggerDeleteHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });
  });