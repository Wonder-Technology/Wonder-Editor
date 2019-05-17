open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("header publish local->asset bundle", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.prepareScene(sandbox);
      /* MainEditorSceneTool.createDefaultScene(
           sandbox,
           MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
         ); */
      /* LoadTool.buildFakeTextEncoder();
         LoadTool.buildFakeURL(sandbox^);

         LoadTool.buildFakeLoadImage(.); */

      MainEditorAssetTool.buildFakeFileReader();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test ui", () =>
      testPromise("test show select tree with only asset bundles", () => {
        let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addMaterial();

        let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addFolder();

        MainEditorAssetTreeTool.Select.selectFolderNode(
          ~nodeId=addedFolderNodeId1,
          (),
        );

        MainEditorAssetUploadTool.loadOneAssetBundle(~fileName="A.wab", ())
        |> then_(uploadedAssetBundleNodeId1 =>
             MainEditorAssetUploadTool.loadOneAssetBundle(
               ~fileName="B.sab",
               (),
             )
             |> then_(uploadedAssetBundleNodeId2 =>
                  HeaderPublishLocalAssetBundleTool.buildPublishLocalModal(
                    ~defaultUseAssetBundle=true,
                    (),
                  )
                  |> BuildComponentTool.buildUI
                  |> ReactTestTool.createSnapshotAndMatch
                  |> resolve
                )
           );
      })
    );

    describe("download zip", () =>
      describe("test use assetbundle", () => {
        /* TODO duplicate */
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

        let _prepare =
            (
              ~judgeFunc,
              ~selectTreeForAssetBundle,
              ~useAssetBundle=true,
              (),
            ) => {
          let fakeFetchFunc = _buildFakeFetch(~sandbox, ());

          let obj = HeaderTool.buildPublishFakeJsZipCreateFunc(sandbox^);

          HeaderPublishLocalUtils.Publish.publishZip(
            ("WonderLocal", false),
            (useAssetBundle, selectTreeForAssetBundle),
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

        describe("export selected asset bundles", () => {
          beforeEach(() => {
            LoadTool.buildFakeTextEncoder();

            LoadTool.buildFakeURL(sandbox^);

            LoadTool.buildFakeLoadImage(.);
          });

          testPromise("test", () => {
            let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addFolder();

            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=addedFolderNodeId1,
              (),
            );

            MainEditorAssetUploadTool.loadOneAssetBundle(
              ~fileName="A.wab",
              (),
            )
            |> then_(uploadedAssetBundleNodeId1 =>
                 MainEditorAssetUploadTool.loadOneAssetBundle(
                   ~fileName="B.sab",
                   (),
                 )
                 |> then_(uploadedAssetBundleNodeId2 => {
                      let selectTree =
                        HeaderPublishLocalAssetBundleTool.buildSelectTreeForAssetBundle
                        |> StateLogicService.getStateToGetData
                        |> HeaderPublishLocalAssetBundleTool.setSelectForSelectTree(
                             true,
                             MainEditorAssetAssetBundleNodeTool.getName(
                               uploadedAssetBundleNodeId2,
                             )
                             |> StateLogicService.getEditorState,
                           );

                      _prepare(
                        ~selectTreeForAssetBundle=selectTree,
                        ~judgeFunc=
                          (fetchCount, file) =>
                            file
                            |> getCall(0)
                            |> getArgs
                            |> Js.List.hd
                            |> OptionService.unsafeGet
                            |> expect == "AssetBundles/New Folder/B.sab",
                        (),
                      );
                    })
               );
          });
        });
      })
    );
  });