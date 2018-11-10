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

      ConsoleTool.markTestConsole();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test stub console", () => {
      beforeEach(() => BuildComponentTool.buildConsole() |> ignore);

      test("console.log should add the message into content", () => {
        ConsoleUtils.log({j|message|j});

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.info should add the message into content", () => {
        ConsoleUtils.info({j|message|j});

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.warn should add the message into content", () => {
        ConsoleUtils.warn({j|message|j});

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.error should add the message into content", () => {
        ConsoleUtils.error({j|message|j});

        BuildComponentTool.buildConsole()
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("console.trace should invoke Error.captureStackTrace", () => {
        let errorObj = ConsoleTool.buildFakeError(sandbox^);

        ConsoleUtils.error({j|message|j});

        errorObj##captureStackTrace |> expect |> toCalledOnce;
      });
    });
  });