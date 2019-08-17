open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  /* TODO rename file: LoadUserRepoWpkFileUtils_test.re */
  /* TODO rename to LoadUserRepoWpkFileUtils */
  /* TODO move file to mainEditor/ */
  describe("Header load user wpk file", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);

      MainEditorSceneTool.initState(~sandbox, ());

      /* TODO use empty scene */
      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    /* TODO remove this */
    describe("set editorState isUserLogin to be true", () =>
      describe("load and import user repo wpk file from server", () => {
        beforeEach(() =>
          UserDataTool.setUserData |> StateLogicService.getAndSetEditorState
        );

        testPromise(
          {|
            export fake wpk w1;
            load and import w1;

            sceneTree should has w1->gameObjects;
            |},
          () => {
            MainEditorLeftHeaderTool.addCube();
            let wpkArrayBuffer = ExportPackageTool.exportWPK();

            let fetch =
              BuildFetchTool.buildFakeFetch(
                BuildFetchTool.buildFakeFetchResponse(wpkArrayBuffer),
              );
            let editorState = StateEditorService.getState();
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);

            LoadUserRepoWpkFileUtils.loadUserRepoWpkFile(
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
          },
        );
      })
    );
  });