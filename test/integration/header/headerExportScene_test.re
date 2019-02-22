open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("header export scene", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if is run", () =>
      test("warn", () => {
        ConsoleTool.notShowMessage();
        let warn =
          createMethodStubWithJsObjSandbox(
            sandbox,
            ConsoleTool.console,
            "warn",
          );
        ControllerTool.run();

        HeaderExportSceneUtils.exportScene("aaa");

        warn
        |> expect
        |> toCalledWith([|"should export scene when stop, but now is run!"|]);
      })
    );

    describe("else", () => {
      beforeEach(() => {
        LoadTool.buildFakeAtob();
        LoadTool.buildFakeBtoa();
        LoadTool.buildFakeTextEncoder();
        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);
        LoadTool.buildFakeLoadImage();
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();
      });

      describe("test isRoot", () =>
        testPromise("set scene gameObject->isRoot to true", () => {
          let (engineState, sceneWDB) =
            ExportSceneTool.exportScene(
              StateEditorService.getState(),
              StateEngineService.unsafeGetState(),
            );

          engineState |> StateEngineService.setState |> ignore;

          MainEditorAssetUploadTool.loadOneWDB(~arrayBuffer=sceneWDB, ())
          |> then_(uploadedWDBNodeId =>
               GameObjectEngineService.getGameObjectIsRoot(
                 MainEditorAssetWDBNodeTool.getWDBGameObject(
                   uploadedWDBNodeId,
                 )
                 |> StateLogicService.getEditorState,
               )
               |> StateLogicService.getEngineStateToGetData
               |> expect == Some(true)
               |> resolve
             );
        })
      );
    });
  });