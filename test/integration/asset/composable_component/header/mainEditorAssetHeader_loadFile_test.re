open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });

    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    });

    describe("test load file", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();
      });

      describe("test snapshot", () =>
        describe("if not select specific treeNode", () =>
          testPromise("load file should add into root node children", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            MainEditorAssetTool.fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> then_(_ =>
                 BuildComponentTool.buildAssetComponent()
                 |> ReactTestTool.createSnapshotAndMatch
                 |> resolve
               );
          })
        )
      );

      describe("test logic", () => {
        describe("test should add into root node children", () =>
          testPromise("test children node length", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;
            let uploadFileLength = 2;
            let originChildrenLen =
              StateEditorService.getState()
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length;

            MainEditorAssetTool.fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> then_(_ =>
                 StateEditorService.getState()
                 |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
                 |> (root => root.children)
                 |> Js.Array.length
                 |> (lastLen => lastLen - originChildrenLen)
                 |> expect == uploadFileLength
                 |> resolve
               );
          })
        );

        describe("test should add into nodeMap", () => {
          describe("test imageBase64Map", () => {
            testPromise("add image base64 to imageBase64Map", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let imgBase64 = "newImgBase64";

              MainEditorAssetTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(~imgSrc=imgBase64, ()),
              )
              |> then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeTextureNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   StateEditorService.getState()
                   |> AssetImageBase64MapEditorService.getImageBase64Map
                   |> WonderCommonlib.SparseMapService.unsafeGet(
                        MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId(),
                      )
                   |> expect == imgBase64
                   |> resolve;
                 });
            });
            testPromise(
              "test show texture image, get it base64 from imageBase64Map", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;
              let imgBase64 = "newImgBase64";

              MainEditorAssetTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(~imgSrc=imgBase64, ()),
              )
              |> then_(_ =>
                   BuildComponentTool.buildAssetComponent()
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve
                 );
            });
          });

          describe("test textureNodeMap", () =>
            testPromise("add created texture index to textureNodeMap", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              MainEditorAssetTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(),
              )
              |> then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeTextureNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId()
                   |>
                   expect == MainEditorAssetNodeTool.OperateTwoLayer.getUploadedTextureIndex(
                               assetTreeDomRecord,
                             )
                   |> resolve;
                 });
            })
          );

          describe("test jsonNodeMap", () =>
            testPromise("add json string to jsonNodeMap", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let jsonName = "newLoadJson.json";
              let jsonResult = "I'm the result";

              MainEditorAssetTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(~jsonName, ~jsonResult, ()),
              )
              |> then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeJsonNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   let {name, jsonResult}: AssetNodeType.jsonResultType =
                     StateEditorService.getState()
                     |> AssetJsonNodeMapEditorService.getJsonNodeMap
                     |> WonderCommonlib.SparseMapService.unsafeGet(
                          MainEditorAssetNodeTool.getCurrentNodeId(),
                        );

                   (name, jsonResult)
                   |> expect == (jsonName, jsonResult)
                   |> resolve;
                 });
            })
          );

          describe("test wdbNodeMap", () => {
            beforeEach(() => {
              MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
                MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
              );
              MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

              MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
            });

            testPromise(
              "add name, wdbGameObject, wdbArrayBuffer to wdbNodeMap", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let fileName = "BoxTextured";
              let newWdbArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);
              let defaultSceneNewGameObjectId =
                SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectId();

              MainEditorAssetTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
              )
              |> then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeWdbNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   let {name, wdbGameObject, wdbArrayBuffer}: AssetNodeType.wdbResultType =
                     StateEditorService.getState()
                     |> AssetWdbNodeMapEditorService.getWdbNodeMap
                     |> WonderCommonlib.SparseMapService.unsafeGet(
                          MainEditorAssetNodeTool.getCurrentNodeId(),
                        );

                   (name, wdbGameObject, wdbArrayBuffer)
                   |>
                   expect == (
                               fileName,
                               defaultSceneNewGameObjectId,
                               newWdbArrayBuffer,
                             )
                   |> resolve;
                 });
            });
            testPromise(
              "test the wdb gameObject and it's children isRender should be false",
              () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let fileName = "BoxTextured";
              let newWdbArrayBuffer =
                MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

              MainEditorAssetTool.fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
              )
              |> then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeWdbNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   let {wdbGameObject}: AssetNodeType.wdbResultType =
                     StateEditorService.getState()
                     |> AssetWdbNodeMapEditorService.getWdbNodeMap
                     |> WonderCommonlib.SparseMapService.unsafeGet(
                          MainEditorAssetNodeTool.getCurrentNodeId(),
                        );

                   GameObjectMeshRendererTool.getAllGameObjectMeshRendererComponent(
                     wdbGameObject,
                   )
                   |> StateLogicService.getEngineStateToGetData
                   |> Js.Array.map(meshRender =>
                        MeshRendererEngineService.getMeshRendererIsRender(
                          meshRender,
                        )
                        |> StateLogicService.getEngineStateToGetData
                      )
                   |> Js.Array.filter(isRender => isRender)
                   |> Js.Array.length
                   |> expect == 0
                   |> resolve;
                 });
            });
          });
        });
      });

      describe("deal with specific case", () => {
        let _getErrorTypeFile = () =>
          AssetTreeNodeUtils.getUploadFileType("aaa.bb");

        test("if upload error file type, should error", () => {
          let component = BuildComponentTool.buildConsole();
          let errorStub =
            createMethodStub(sandbox^, ConsoleTool.console, "error");

          AssetTreeNodeUtils.handleSpecificFuncByTypeSync(
            _getErrorTypeFile(),
            (() => (), () => (), () => ()),
          );

          errorStub
          |> expect
          |> toCalledWith([|
               "\n  Error:\n\n  title\n  handleSpecificFuncByType\n\n  description\n  the load file type is error\n\n  reason\n  \n\n  solution\n  \n\n  params\n  \n\n   ",
             |]);
        });
      });
    });
  });