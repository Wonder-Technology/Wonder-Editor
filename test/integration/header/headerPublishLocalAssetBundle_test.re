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
        let _prepare =
            (~judgeFunc, ~selectTreeForAssetBundle, ~useAssetBundle=true, ()) => {
          let fakeFetchFunc = PublishLocalTool.buildFakeFetch(~sandbox, ());

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
                        |> SelectTreeTool.setSelectForSelectTree(
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