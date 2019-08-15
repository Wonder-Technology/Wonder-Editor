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

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
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

        describe("else", () => {
          beforeEach(() => ControllerTool.setIsRun(false));

          testPromise("convert wpk file save to server", () => {
            let fetchFunc =
              BuildFetchTool.buildFakeFetchWithInit(
                BuildFetchTool.buildFakeFetchSucessResponse,
              );

            CryptoTool.stubCrypto(.);

            let log =
              createMethodStubWithJsObjSandbox(
                sandbox,
                ConsoleTool.console,
                "log",
              );

            HeaderFileSaveUtils.savePackage(fetchFunc)
            |> WonderBsMost.Most.drain
            |> Js.Promise.then_(_ => log |> expect |> toCalledTwice |> resolve);
          });
        });
      });
    });
  });