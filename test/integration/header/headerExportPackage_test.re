open Wonder_jest;

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

      MainEditorAssetHeaderWDBTool.buildFakeTextEncoder();
      MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

      MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test export zip", () => {
      let _prepare = judgeFunc => {
        MainEditorAssetTool.buildTwoLayerAssetTreeRootTest() |> ignore;

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
        testPromise("test first node is folder and second node is json", () =>
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
                          "Assets/newJson.json",
                          "json result",
                          {"binary": true} |> Obj.magic,
                        ],
                      )
          )
        );
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

    /* TODO remove? */
    describe("test exported wdb", () => {
      let _buildAssetTreeRoot = () => {
        /* open AssetTreeTwoLayerTypeTool; */

        open MainEditorAssetTool;

        let (rootId, editorState) =
          StateEditorService.getState() |> _increaseIndex;
        let (id1, editorState) = editorState |> _increaseIndex;
        /* let (id2, editorState) = editorState |> _increaseIndex; */

        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             id: rootId,
             type_: Folder,
             children: [||],
           })
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(rootId, None)
        |> addTextureIntoNodeMap(id1, rootId, "texture1")
        /* |> addTextureIntoNodeMap(id2, rootId, "texture2") */
        |> AssetTreeRootEditorService.setAssetTreeRoot({
             id: rootId,
             type_: Folder,
             children: [|
               {id: id1, type_: Texture, children: [||]},
               /* {id: id2, type_: Texture, children: [||]}, */
             |],
           })
        |> StateEditorService.setState;

        /* {
             root: 0,
             firstLayer: {
               length: 1,
               folderDomIndexArr: [||],
               jsonDomIndexArr: [||],
               textureData: {
                 domIndexArr: [|1|],
                 lastIndex: 0,
               },
             },
             treeNodeIdData: {
               folderNodeIdArr: [|rootId|],
               jsonNodeIdArr: [||],
               textureNodeIdArr: [|id1|],
             },
           } */
        (1 - 1, id1);
      };

      /* TODO refactor: move to import test */
      testPromise("aaa", () => {
        let (domIndex, id) = _buildAssetTreeRoot();

        let engineState = StateEngineService.unsafeGetState();

        let lightMaterial =
          engineState
          |> MainEditorSceneTool.getFirstBox
          |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
               _,
               engineState,
             );

        /* MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();

           domIndex |> MainEditorMaterialTool.triggerFileDragStartEvent;

           MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial(); */

        /* TODO refactor */
        LightMaterialDragTextureEventHandler.CustomEventHandler.handleSelfLogic(
          (Obj.magic(-1), createEmptyStubWithJsObjSandbox(sandbox)),
          lightMaterial,
          id,
        );

        let fakeFetchFunc = ExportPackageTool.buildFakeFetch(~sandbox, ());

        let obj = HeaderTool.buildExportFakeJsZipCreateFunc(sandbox^);

        HeaderExportUtils.exportPackage(() => obj, fakeFetchFunc)
        |> then_(_ => {
             let file = obj##file;
             let fetchCount =
               ExportPackageTool.getFetchPackageContentWithoutAssetCount();

             let wdb =
               file
               |> getCall(fetchCount + 2)
               |> getArgs
               |> Js.List.nth(_, 1)
               |> OptionService.unsafeGet;

             StateEditorService.getState()
             |> AssetTreeEditorService.deepDisposeAssetTreeRoot
             |> StateEditorService.setState
             |> ignore;

             wdb
             |> HeaderImportUtils._handleImportWDB("Scene.wdb")
             |> then_(_ => {
                  let engineState = StateEngineService.unsafeGetState();

                  engineState
                  |> MainEditorSceneTool.getFirstBox
                  |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                       _,
                       engineState,
                     )
                  |> LightMaterialEngineService.getLightMaterialDiffuseMap(
                       _,
                       engineState,
                     )
                  |> expect == Some(1)
                  |> resolve;
                });
           });
      });
    });
  });