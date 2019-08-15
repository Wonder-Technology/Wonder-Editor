open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("test console unread count", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("should show unread count in bottom header", () => {
      beforeEach(() => BuildComponentTool.buildBottom() |> ignore);

      test("if console one message, unread count should + 1", () => {
        open AppStore;

        let uiState =
          ConsoleStoreTool.buildStore(
            ~currentComponentType=BottomShowComponentStore.Project,
            (),
          );

        ConsoleUtils.warn({j|warn message|j})
        |> StateLogicService.getEditorState;

        BuildComponentTool.buildBottomHeader(
          ~uiState=TestTool.buildEmptyAppState(),
          (),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test(
        {|
        1.warn
        2.show Console ui

        unread count should be clear to 0
        |},
        () => {
          let uiState =
            ConsoleStoreTool.buildStore(
              ~currentComponentType=BottomShowComponentStore.Console,
              (),
            );

          ConsoleUtils.warn({j|warn message|j})
          |> StateLogicService.getEditorState;

          let component = BuildComponentTool.buildConsole(~uiState, ());

          BuildComponentTool.buildBottomHeader(~uiState, ())
          |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });
  });