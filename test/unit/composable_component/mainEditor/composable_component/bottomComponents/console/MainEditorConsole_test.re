open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("MainEditorConsole", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test stub console", () => {
      beforeEach(() => BuildComponentTool.buildBottom() |> ignore);

      test("console.log should add the message into content", () => {
        ConsoleUtils.log({j|message|j}) |> StateLogicService.getEditorState;

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.info should add the message into content", () => {
        ConsoleUtils.info({j|message|j}) |> StateLogicService.getEditorState;

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.warn should add the message into content", () => {
        ConsoleUtils.warn({j|message|j}) |> StateLogicService.getEditorState;

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.debug should add the message into content", () => {
        ConsoleUtils.debug(
          LogUtils.buildDebugMessage(
            ~description={j|debug|j},
            ~params={j||j},
          ),
          true,
        )
        |> StateLogicService.getEditorState;

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.error should add the message into content", () => {
        ConsoleUtils.error({j|message|j}) |> StateLogicService.getEditorState;

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.trace should invoke Error.captureStackTrace", () => {
        let errorObj = ConsoleTool.buildFakeError(sandbox^);

        ConsoleUtils.error({j|message|j}) |> StateLogicService.getEditorState;

        errorObj##captureStackTrace |> expect |> toCalledOnce;
      });
      

      describe("limit showed messages' count", () => {
        let _log = count => ();

        test("limit max 99", () => {
          WonderCommonlib.ArrayService.range(0, 100)
          |> Js.Array.forEach(_ =>
               ConsoleUtils.log({j|message|j})
               |> StateLogicService.getEditorState
             );

          BuildComponentTool.buildConsole()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });
    });
  });