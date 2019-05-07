open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

open WonderBsMost;

let _ =
  describe("Header AssetBundle->generate all ab", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.prepareScene(sandbox);

      MainEditorAssetTool.buildFakeFileReader();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("generate all ab", () => {
      describe("test buildSelectTreeForGenerateAllAB", () =>
        testPromise("should only has asset bundle assets", () => {
          let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );

          MainEditorAssetUploadTool.loadOneTexture(
            ~imgName="image1.png",
            ~imgSrc="newImgBase64",
            (),
          )
          |> then_(uploadedTextureNodeId =>
               MainEditorAssetUploadTool.loadOneAssetBundle(
                 ~fileName="A.rab",
                 (),
               )
               |> then_(uploadedAssetBundleNodeId =>
                    HeaderAssetBundleTool.GenerateAllAB.buildGenerateAllABModal(
                      ~selectTree=
                        HeaderAssetBundleTool.GenerateAllAB.buildSelectTreeForGenerateAllAB
                        |> StateLogicService.getStateToGetData,
                      ~send=SinonTool.createOneLengthStub(sandbox^),
                      (),
                    )
                    |> BuildComponentTool.buildUI
                    |> ReactTestTool.createSnapshotAndMatch
                    |> resolve
                  )
             );
        })
      );

      describe("test generate all ab from selected single abs", () => {
        let _getZipFilePath = (file, callCount) =>
          file
          |> getCall(callCount)
          |> getArgs
          |> Js.List.hd
          |> OptionService.unsafeGet;

        beforeEach(() => {
          LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
          LoadTool.buildFakeTextEncoder();
          LoadTool.buildFakeURL(sandbox^);

          LoadTool.buildFakeLoadImage(.);

          HeaderAssetBundleTool.GenerateAllAB.prepareDigest(sandbox^);
        });

        describe("test generated abs->relative path", () =>
          testPromise("generated abs->relative path === the path in zip", () => {
            MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

            let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let selectTree =
              HeaderAssetBundleTool.GenerateSingleRAB.buildSelectTreeForGenerateSingleRAB
              |> StateLogicService.getStateToGetData
              |> HeaderAssetBundleTool.setSelectForSelectTree(
                   true,
                   MainEditorAssetMaterialNodeTool.getMaterialName(
                     ~nodeId=addedMaterialNodeId1,
                     (),
                   ),
                 );

            let rab =
              HeaderAssetBundleTool.GenerateSingleRAB.generateSingleRAB(
                ~selectTree,
                (),
              );

            let sab =
              HeaderAssetBundleTool.GenerateSingleSAB.generateSingleSAB();

            MainEditorAssetUploadTool.loadOneAssetBundle(
              ~fileName="A.rab",
              ~assetBundle=rab,
              (),
            )
            |> then_(uploadedRABAssetBundleNodeId => {
                 let addedFolderNodeId1 =
                   MainEditorAssetIdTool.getNewAssetId();
                 MainEditorAssetHeaderOperateNodeTool.addFolder();

                 MainEditorAssetTreeTool.Select.selectFolderNode(
                   ~nodeId=addedFolderNodeId1,
                   (),
                 );

                 MainEditorAssetUploadTool.loadOneAssetBundle(
                   ~fileName="B.sab",
                   ~assetBundle=sab,
                   (),
                 )
                 |> then_(uploadedSABAssetBundleNodeId => {
                      let obj =
                        HeaderTool.buildPublishFakeJsZipCreateFunc(sandbox^);

                      let selectTree =
                        HeaderAssetBundleTool.GenerateAllAB.buildSelectTreeForGenerateAllAB
                        |> StateLogicService.getStateToGetData
                        |> HeaderAssetBundleTool.setSelectForSelectTree(
                             true,
                             MainEditorAssetAssetBundleNodeTool.getName(
                               uploadedRABAssetBundleNodeId,
                             )
                             |> StateLogicService.getEditorState,
                           )
                        |> HeaderAssetBundleTool.setSelectForSelectTree(
                             true,
                             MainEditorAssetAssetBundleNodeTool.getName(
                               uploadedSABAssetBundleNodeId,
                             )
                             |> StateLogicService.getEditorState,
                           );

                      HeaderAssetBundleTool.GenerateAllAB.generateAllABZip(
                        ~selectTree,
                        ~dependencyRelationInputValue=
                          HeaderAssetBundleGenerateAllAB.Method.buildDefaultDependencyRelationInputValue(),
                        ~createZipFunc=() => obj,
                        (),
                      )
                      |> Most.drain
                      |> then_(() => {
                           let file = obj##file;

                           (
                             file |> getCallCount,
                             _getZipFilePath(file, 0),
                             _getZipFilePath(file, 1),
                             _getZipFilePath(file, 2),
                           )
                           |> expect
                           == (
                                3,
                                "A.rab",
                                "New Folder/B.sab",
                                "WonderWAB.wab",
                              )
                           |> resolve;
                         });
                    });
               });
          })
        );

        testPromise("error should be catched by stream", () => {
          let errorMsg = ref("");

          MainEditorAssetUploadTool.loadOneAssetBundle()
          |> then_(uploadedSABAssetBundleNodeId => {
               let obj = HeaderTool.buildPublishFakeJsZipCreateFunc(sandbox^);

               let selectTree =
                 HeaderAssetBundleTool.GenerateAllAB.buildSelectTreeForGenerateAllAB
                 |> StateLogicService.getStateToGetData
                 |> HeaderAssetBundleTool.setSelectForSelectTree(
                      true,
                      MainEditorAssetAssetBundleNodeTool.getName(
                        uploadedSABAssetBundleNodeId,
                      )
                      |> StateLogicService.getEditorState,
                    );

               HeaderAssetBundleTool.GenerateAllAB.generateAllABZip(
                 ~selectTree,
                 ~dependencyRelationInputValue={|
    ttt
    |},
                 ~createZipFunc=() => obj,
                 (),
               )
               |> Most.drain
               |> catch(e => {
                    let message: string = Obj.magic(e)##message;

                    errorMsg := message;

                    () |> Obj.magic;
                  })
               |> then_(() =>
                    errorMsg^ |> expect == "ttt is not defined" |> resolve
                  );
             });
        });
      });
    });
  });