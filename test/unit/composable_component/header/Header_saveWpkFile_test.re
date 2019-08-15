open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("Header save wpk file", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("set editorState isUserLogin to be true", () => {
      beforeEach(() => StateEditorService.setIsUserLogin(true));

      describe("store user data to editorState", () => {
        beforeEach(() =>
          UserDataTool.setUserData |> StateLogicService.getAndSetEditorState
        );

        describe("if is run", () => {
          beforeEach(() => ControllerTool.setIsRun(true));

          testPromise("log warn message", () => {
            DomTool.stubFakeDomForGetElementById(
              sandbox,
              "appMessage",
              DomTool.buildFakeDiv(""),
            );
            let fetchFunc =
              BuildFetchTool.buildFakeFetchWithInit(
                BuildFetchTool.buildFakeFetchSucessResponse,
              );
            let warn =
              createMethodStubWithJsObjSandbox(
                sandbox,
                ConsoleTool.console,
                "warn",
              );

            HeaderFileSaveUtils.savePackage(fetchFunc)
            |> WonderBsMost.Most.drain
            |> Js.Promise.then_(_ => warn |> expect |> toCalledOnce |> resolve);
          });
        });

        describe("else", () =>
          describe("convert wpk file save to server", () =>
            testPromise("load wpk file", () => {
              MainEditorLeftHeaderTool.addCube();
              let wpkArrayBuffer = ExportPackageTool.exportWPK();

              let fetchFunc =
                BuildFetchTool.buildFakeFetch(
                  BuildFetchTool.buildFakeFetchResponse(wpkArrayBuffer),
                );
              let editorState = StateEditorService.getState();
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);

              Header.Method.loadUserRepoWpkFile(
                dispatchFuncStub,
                fetchFunc,
                editorState,
              )
              |> WonderBsMost.Most.drain
              |> Js.Promise.then_(_ =>
                   BuildComponentTool.buildSceneTree(
                     TestTool.buildEmptyAppState(),
                   )
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve
                 );
            })
          )
        );
      });
    });
  });