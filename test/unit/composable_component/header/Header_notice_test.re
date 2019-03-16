open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("Header Notice", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorDatabaseTool.buildFakeLocalStorage();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test show notice", () =>
      describe("if localStorage have no welcomeUser key", ()
        =>
          test(
            "show welcome user notice, should not show version upgrade notice",
            () =>
            BuildComponentTool.buildHeaderNotice()
            |> ReactTestTool.createSnapshotAndMatch
          )
        )
        /* describe("else", () => {
             describe("if localStorage have no version key", () =>
               test("show version upgrade notice", () => {
                 LocalStorage.setValue(
                   HeaderNotice.Method.getWelComeUserKey(),
                   "ok",
                 );

                 BuildComponentTool.buildHeaderNotice()
                 |> ReactTestTool.createSnapshotAndMatch;
               })
             );

             describe("else, if localStorage version !== current version", () =>
               test("show version upgrade notice", () => {
                 LocalStorage.setValue(
                   HeaderNotice.Method.getWelComeUserKey(),
                   "ok",
                 );
                 LocalStorage.setValue(
                   HeaderNotice.Method.getVersionKey(),
                   "0.0.0",
                 );

                 BuildComponentTool.buildHeaderNotice()
                 |> ReactTestTool.createSnapshotAndMatch;
               })
             );
           }); */
    );
  });