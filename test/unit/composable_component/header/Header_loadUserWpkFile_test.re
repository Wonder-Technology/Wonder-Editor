open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("Header load user wpk file", () => {
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

        describe("fetch get user repo wpk file from server", () =>
          testPromise("load wpk file", () => {
            MainEditorLeftHeaderTool.addCube();
            let wpkArrayBuffer = ExportPackageTool.exportWPK();

            let fetch =
              BuildFetchTool.buildFakeFetch(
                BuildFetchTool.buildFakeFetchResponse(wpkArrayBuffer),
              );
            let editorState = StateEditorService.getState();
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);

            Header.Method.loadUserRepoWpkFile(
              dispatchFuncStub,
              fetch,
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
        );
      });
    });
  });