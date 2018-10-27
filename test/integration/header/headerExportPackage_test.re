/* open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("header export package", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

      LoadTool.buildFakeTextEncoder();
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test export zip", () => {
      let _prepare = judgeFunc => {
        /* MainEditorAssetTool.buildTwoLayerAssetTreeRootTest() |> ignore; */

        MainEditorAssetTreeTool.BuildAssetTree.All.ThreeLayer.buildFolderAndTextureAndMaterialAssetTree()
        |> ignore;

        let fakeFetchFunc = ExportPackageTool.buildFakeFetch(~sandbox, ());

        let obj = HeaderTool.buildExportFakeJsZipCreateFunc(sandbox^);

        HeaderExportUtils.exportPackage(() => obj, fakeFetchFunc)
        |> then_(_ => {
             let file = obj##file;
             let fetchCount =
               ExportPackageTool.getFetchPackageContentWithoutAssetCount();

             judgeFunc(fetchCount, file) |> resolve;
           });
      };

      let _testText = (callCount, targetText) =>
        _prepare((fetchCount, file) =>
          file
          |> getCall(callCount)
          |> getArgs
          |> Js.List.hd
          |> OptionService.unsafeGet
          |> expect == targetText
        );

      describe("export assets folder's all node", () => {
        /* testPromise("test first node is folder and second node is folder", () =>
          _prepare((fetchCount, file) =>
            (
              file |> getCall(fetchCount) |> getArgs,
              file |> getCall(fetchCount + 1) |> getArgs,
            )
            |>
            expect == (
                        [
                          "Assets/newFolder",
                          0 |> Obj.magic,
                          {"dir": true} |> Obj.magic,
                        ],
                        [
                          "Assets/newFolder/newFolder",
                          0 |> Obj.magic,
                          {"dir": true} |> Obj.magic,
                        ],
                      )
          )
        ); */
        testPromise("export index.html", () => _testText(0, "index.html"));
        testPromise("export wd.min.js", () => _testText(1, "wd.min.js"));

        describe("export res data", () => {
          testPromise("export fnt", () =>
            _testText(2, "res/loading/Lato-Regular-64.fnt")
          );
          testPromise("export image", () =>
            _testText(3, "res/loading/lato.png")
          );
          testPromise("export logo", () =>
            _testText(4, "res/loading/logo.png")
          );
          testPromise("export ico", () =>
            _testText(5, "res/loading/favicon.ico")
          );
        });

        describe("export config data", () => {
          testPromise("export setting", () =>
            _testText(6, "config/setting.json")
          );
          testPromise("export init jobs", () =>
            _testText(7, "config/no_worker/job/init_jobs.json")
          );
          testPromise("export loop jobs", () =>
            _testText(8, "config/no_worker/job/loop_jobs.json")
          );
          testPromise("export init pipelines", () =>
            _testText(9, "config/no_worker/pipeline/init_pipelines.json")
          );
          testPromise("export loop pipelines", () =>
            _testText(10, "config/no_worker/pipeline/loop_pipelines.json")
          );
          testPromise("export no worker setting", () =>
            _testText(11, "config/no_worker/setting/setting.json")
          );
          testPromise("export shader libs", () =>
            _testText(12, "config/render/shader/shader_libs.json")
          );
          testPromise("export shaders", () =>
            _testText(13, "config/render/shader/shaders.json")
          );
        });

        testPromise("export Scene.wdb", () =>
          _prepare((fetchCount, file) =>
            file
            |> getCall(fetchCount + 2)
            |> getArgs
            |> Js.List.hd
            |> OptionService.unsafeGet
            |> expect == "Scene.wdb"
          )
        );
        testPromise("export Assets.json", () =>
          _prepare((fetchCount, file) =>
            file
            |> getCall(fetchCount + 3)
            |> getArgs
            |> Js.List.hd
            |> OptionService.unsafeGet
            |> expect == "Assets.json"
          )
        );
      });
    });
  }); */