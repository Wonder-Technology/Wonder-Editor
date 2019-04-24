open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("header publish local", () => {
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

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      LoadTool.buildFakeTextEncoder();
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("download zip", () => {
      let _prepare = (~judgeFunc, ~buildFakeFetch, ~useWorker=false, ()) => {
        MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree()
        |> ignore;

        let fakeFetchFunc = buildFakeFetch();

        let obj = HeaderTool.buildPublishFakeJsZipCreateFunc(sandbox^);

        HeaderPublishLocalUtils.Publish.publishZip(
          ("WonderLocal", useWorker),
          () => obj,
          fakeFetchFunc,
        )
        |> then_(_ => {
             let file = obj##file;
             let fetchCount =
               PublishLocalTool.getFetchPackageContentWithoutAssetCountWithDefault();

             judgeFunc(fetchCount, file) |> resolve;
           });
      };

      describe("test default", () => {
        let _buildFakeFetch =
            (
              ~sandbox,
              ~html="html",
              ~js="js",
              ~resLogo=ArrayBuffer.make(20),
              ~resIco=ArrayBuffer.make(30),
              ~dataSetting="dataSetting",
              ~dataInitJobs="dataInitJobs",
              ~dataLoopJobs="dataLoopJobs",
              ~dataInitPipelines="dataInitPipelines",
              ~dataLoopPipelines="dataLoopPipelines",
              ~dataNoWorkerSetting="dataNoWorkerSetting",
              ~dataShaderLibs="dataShaderLibs",
              ~dataShaders="dataShaders",
              (),
            ) => {
          let fetch = createEmptyStubWithJsObjSandbox(sandbox);

          fetch
          |> onCall(0)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 html |> Obj.magic,
               ),
             )
          |> onCall(1)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 js |> Obj.magic,
               ),
             )
          |> onCall(2)
          |> returns(
               BuildFetchTool.buildFakeFetchArrayBufferResponse(
                 sandbox,
                 resLogo |> Obj.magic,
               ),
             )
          |> onCall(3)
          |> returns(
               BuildFetchTool.buildFakeFetchArrayBufferResponse(
                 sandbox,
                 resIco |> Obj.magic,
               ),
             )
          |> onCall(4)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataSetting |> Obj.magic,
               ),
             )
          |> onCall(5)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataInitJobs |> Obj.magic,
               ),
             )
          |> onCall(6)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataLoopJobs |> Obj.magic,
               ),
             )
          |> onCall(7)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataInitPipelines |> Obj.magic,
               ),
             )
          |> onCall(8)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataLoopPipelines |> Obj.magic,
               ),
             )
          |> onCall(9)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataNoWorkerSetting |> Obj.magic,
               ),
             )
          |> onCall(10)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataShaderLibs |> Obj.magic,
               ),
             )
          |> onCall(11)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataShaders |> Obj.magic,
               ),
             );

          fetch;
        };

        let _testText = (callCount, targetText) =>
          _prepare(
            ~judgeFunc=
              (fetchCount, file) =>
                file
                |> getCall(callCount)
                |> getArgs
                |> Js.List.hd
                |> OptionService.unsafeGet
                |> expect == targetText,
            ~buildFakeFetch=_buildFakeFetch(~sandbox),
            ~useWorker=false,
            (),
          );

        testPromise("export index.html", () => _testText(0, "index.html"));
        testPromise("export wd.js", () => _testText(1, "wd.js"));

        describe("export res data", () => {
          testPromise("export logo", () =>
            _testText(2, "res/loading/logo.png")
          );
          testPromise("export ico", () =>
            _testText(3, "res/loading/favicon.ico")
          );
        });

        describe("export config data", () => {
          testPromise("export setting", () =>
            _testText(4, "config/setting.json")
          );
          testPromise("export init jobs", () =>
            _testText(5, "config/no_worker/job/init_jobs.json")
          );
          testPromise("export loop jobs", () =>
            _testText(6, "config/no_worker/job/loop_jobs.json")
          );
          testPromise("export init pipelines", () =>
            _testText(7, "config/no_worker/pipeline/init_pipelines.json")
          );
          testPromise("export loop pipelines", () =>
            _testText(8, "config/no_worker/pipeline/loop_pipelines.json")
          );
          testPromise("export no worker setting", () =>
            _testText(9, "config/no_worker/setting/setting.json")
          );
          testPromise("export shader libs", () =>
            _testText(10, "config/render/shader/shader_libs.json")
          );
          testPromise("export shaders", () =>
            _testText(11, "config/render/shader/shaders.json")
          );
        });

        testPromise("export Scene.wdb", () =>
          _prepare(
            ~judgeFunc=
              (fetchCount, file) =>
                file
                |> getCall(fetchCount)
                |> getArgs
                |> Js.List.hd
                |> OptionService.unsafeGet
                |> expect == "Scene.wdb",
            ~buildFakeFetch=_buildFakeFetch(~sandbox),
            ~useWorker=false,
            (),
          )
        );
      });

      describe("test useWorker", () => {
        let _buildFakeFetch =
            (
              ~sandbox,
              ~html="html",
              ~mainWorkerJs="main worker js",
              ~renderWorkerJs="render worker js",
              ~resLogo=ArrayBuffer.make(20),
              ~resIco=ArrayBuffer.make(30),
              ~dataSetting="dataSetting",
              ~dataInitJobs="dataInitJobs",
              ~dataLoopJobs="dataLoopJobs",
              ~dataInitPipelines="dataInitPipelines",
              ~dataLoopPipelines="dataLoopPipelines",
              ~dataNoWorkerSetting="dataNoWorkerSetting",
              ~dataShaderLibs="dataShaderLibs",
              ~dataShaders="dataShaders",
              ~dataWorkerMainInitJobs="dataWorkerMainInitJobs",
              ~dataWorkerMainLoopJobs="dataWorkerMainLoopJobs",
              ~dataWorkerWorkerJobs="dataWorkerWorkerJobs",
              ~dataWorkerMainInitPipelines="dataWorkerMainInitPipelines",
              ~dataWorkerMainLoopPipelines="dataWorkerMainLoopPipelines",
              ~dataWorkerWorkerPipelines="dataWorkerWorkerPipelines",
              ~dataWorkerSetting="dataWorkerSetting",
              (),
            ) => {
          let fetch = createEmptyStubWithJsObjSandbox(sandbox);

          fetch
          |> onCall(0)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 html |> Obj.magic,
               ),
             )
          |> onCall(1)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 mainWorkerJs |> Obj.magic,
               ),
             )
          |> onCall(2)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 renderWorkerJs |> Obj.magic,
               ),
             )
          |> onCall(3)
          |> returns(
               BuildFetchTool.buildFakeFetchArrayBufferResponse(
                 sandbox,
                 resLogo |> Obj.magic,
               ),
             )
          |> onCall(4)
          |> returns(
               BuildFetchTool.buildFakeFetchArrayBufferResponse(
                 sandbox,
                 resIco |> Obj.magic,
               ),
             )
          |> onCall(5)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataSetting |> Obj.magic,
               ),
             )
          |> onCall(6)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataInitJobs |> Obj.magic,
               ),
             )
          |> onCall(7)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataLoopJobs |> Obj.magic,
               ),
             )
          |> onCall(8)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataInitPipelines |> Obj.magic,
               ),
             )
          |> onCall(9)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataLoopPipelines |> Obj.magic,
               ),
             )
          |> onCall(10)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataNoWorkerSetting |> Obj.magic,
               ),
             )
          |> onCall(11)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataShaderLibs |> Obj.magic,
               ),
             )
          |> onCall(12)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataShaders |> Obj.magic,
               ),
             )
          |> onCall(13)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataWorkerMainInitJobs |> Obj.magic,
               ),
             )
          |> onCall(14)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataWorkerMainLoopJobs |> Obj.magic,
               ),
             )
          |> onCall(15)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataWorkerWorkerJobs |> Obj.magic,
               ),
             )
          |> onCall(16)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataWorkerMainInitPipelines |> Obj.magic,
               ),
             )
          |> onCall(17)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataWorkerMainLoopPipelines |> Obj.magic,
               ),
             )
          |> onCall(18)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataWorkerWorkerPipelines |> Obj.magic,
               ),
             )
          |> onCall(19)
          |> returns(
               BuildFetchTool.buildFakeFetchTextResponse(
                 sandbox,
                 dataWorkerSetting |> Obj.magic,
               ),
             );

          fetch;
        };

        let _testText = (callCount, targetText) =>
          _prepare(
            ~judgeFunc=
              (fetchCount, file) =>
                file
                |> getCall(callCount)
                |> getArgs
                |> Js.List.hd
                |> OptionService.unsafeGet
                |> expect == targetText,
            ~buildFakeFetch=_buildFakeFetch(~sandbox),
            ~useWorker=true,
            (),
          );

        testPromise("export wd.render.worker.js", () =>
          _testText(2, "wd.render.worker.js")
        );
        testPromise("export setting", () =>
          _testText(5, "config/setting.json")
        );
        testPromise("export worker setting", () =>
          _testText(19, "config/worker/setting/setting.json")
        );
      });
    });

    describe("test isRoot", () => {
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

      testPromise("set scene gameObject->isRoot to false", () => {
        let (engineState, sceneWDB) =
          PublishLocalTool.exportScene(
            StateEditorService.getState(),
            StateEngineService.unsafeGetState(),
          );

        engineState |> StateEngineService.setState |> ignore;

        MainEditorAssetUploadTool.loadOneWDB(~arrayBuffer=sceneWDB, ())
        |> then_(uploadedWDBNodeId =>
             GameObjectEngineService.getGameObjectIsRoot(
               MainEditorAssetWDBNodeTool.getWDBGameObject(uploadedWDBNodeId)
               |> StateLogicService.getEditorState,
             )
             |> StateLogicService.getEngineStateToGetData
             |> expect == Some(false)
             |> resolve
           );
      });
    });
  });