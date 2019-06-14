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

      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

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
        |> toCalledWith([|"should operate when stop, but now is run!"|]);
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