open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("Header", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test File", () =>
      describe("test Controls", () =>
        describe("test modal content", () => {
          open Header;
          open HeaderType;

          let _test = setOSFunc => {
            setOSFunc();

            SettingTool.setSetting(
              ~hotKeys=[|
                {name: "focus", values: [|"f"|]},
                {name: "undo", values: [|"ctrl+z", "command+z"|]},
              |],
              (),
            ) |> StateEditorService.setState;

            HeaderTool.buildFileComponent(
              ~state=HeaderTool.buildState(~isShowFileControlsModal=true, ()),
              ~send=createEmptyStubWithJsObjSandbox(sandbox),
              (),
            )
            |> BuildComponentTool.buildUI
            |> ReactTestTool.createSnapshotAndMatch;
          };

          test("if os is mac, should show command hot keys", () =>
            _test(DetectOSTool.setOSToBeMac)
          );
          test("else, shouldn't show command hot keys", () =>
            _test(DetectOSTool.setOSToBeWin)
          );
        })
      )
    );
  });