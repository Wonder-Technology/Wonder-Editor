open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("test mainEditor console", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test stub console", () => {
      test(
        "test stub console.log, when execute it should add the message into the widget",
        () => {
          let component = BuildComponentTool.buildConsole();

          Js.log("log message");

          component |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "test stub console.info, when execute it should add the message into the widget",
        () => {
          let component = BuildComponentTool.buildConsole();

          WonderLog.Log.info({j|info message|j});

          component |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "test stub console.warn, when execute it should add the message into the widget",
        () => {
          let component = BuildComponentTool.buildConsole();

          WonderLog.Log.warn({j|warn message|j});

          component |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "test stub console.error, when execute it should add the message into the widget",
        () => {
          let component = BuildComponentTool.buildConsole();

          WonderLog.Log.error(
            WonderLog.Log.buildErrorMessage(
              ~title="error message",
              ~description={j||j},
              ~reason="",
              ~solution={j||j},
              ~params={j||j},
            ),
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "test stub console.trace, when execute it should add the message into the last consoleMessage record",
        () => {
          let component = BuildComponentTool.buildConsole();

          WonderLog.Log.debug(
            WonderLog.Log.buildDebugMessage(
              ~description={j|debug message|j},
              ~params={j||j},
            ),
            StateEditorService.getStateIsDebug(),
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });
  });