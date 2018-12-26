open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open NodeAssetType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->load file", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
    );
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
      |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
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
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
            |> ignore;

            MainEditorAssetUploadTool.loadOneTexture()
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
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
            |> ignore;
            let uploadFileLength = 1;
            let originChildrenLen =
              StateEditorService.getState()
              |> RootTreeAssetEditorService.getRootNode
              |> FolderNodeAssetService.getChildrenNodes
              |> Js.Array.length;

            MainEditorAssetUploadTool.loadOneTexture()
            |> then_(_ =>
                 StateEditorService.getState()
                 |> RootTreeAssetEditorService.getRootNode
                 |> FolderNodeAssetService.getChildrenNodes
                 |> Js.Array.length
                 |> (lastLen => lastLen - originChildrenLen)
                 |> expect == uploadFileLength
                 |> resolve
               );
          })
        );

        describe("test should add into nodeMap", () => {
          describe("test imageNodeMap", () => {
            testPromise("add image base64 to imageNodeMap", () => {
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
              |> ignore;
              let imgBase64 = "newImgBase64";

              MainEditorAssetUploadTool.loadOneTexture(~imgSrc=imgBase64, ())
              |> then_(uploadedTextureNodeId => {
                   MainEditorAssetChildrenNodeTool.selectTextureNode(
                     ~nodeId=uploadedTextureNodeId,
                     (),
                   );

                   let editorState = StateEditorService.getState();
                   let {base64}: ImageDataType.imageData =
                     ImageDataMapTool.getDataByTextureNode(
                       MainEditorAssetNodeTool.unsafeGetCurrentNode(
                         editorState,
                       ),
                       editorState,
                     );

                   base64
                   |> OptionService.unsafeGet
                   |> expect == imgBase64
                   |> resolve;
                 });
            });
            testPromise(
              "test show texture image, get it base64 from imageNodeMap", () => {
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
              |> ignore;
              let imgBase64 = "newImgBase64";

              MainEditorAssetUploadTool.loadOneTexture(~imgSrc=imgBase64, ())
              |> then_(uploadedTextureNodeId =>
                   BuildComponentTool.buildAssetComponent()
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve
                 );
            });
          });

          describe("test textureNodeMap", () =>
            testPromise("add created texture index to textureNodeMap", () => {
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
              |> ignore;

              MainEditorAssetUploadTool.loadOneTexture()
              |> then_(uploadedTextureNodeId => {
                   MainEditorAssetChildrenNodeTool.selectTextureNode(
                     ~nodeId=uploadedTextureNodeId,
                     (),
                   );

                   MainEditorAssetNodeTool.getTextureComponentFromCurrentNodeId()
                   |> expect == 0
                   |> resolve;
                 });
            })
          );

          /* describe("test jsonNodeMap", () => {
               testPromise("add json string to jsonNodeMap", () => {
                 let assetTreeData =
                   MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                 let jsonName = "newLoadJson.json";
                 let jsonResult = "I'm the result";

                 MainEditorAssetTool.fileLoad(
                   TestTool.getDispatch(),
                   BaseEventTool.buildFileEvent(~jsonName, ~jsonResult, ()),
                 )
                 |> then_(_ => {
                      assetTreeData
                      |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedSecondNodeDomIndex
                      |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

                      let {name, jsonResult}: NodeAssetType.jsonResultType =
                        StateEditorService.getState()
                        |> AssetJsonNodeMapEditorService.getJsonNodeMap
                        |> WonderCommonlib.SparseMapService.unsafeGet(
                             MainEditorAssetNodeTool.getCurrentNodeId(),
                           );

                      (name, jsonResult)
                      |> expect == (jsonName, jsonResult)
                      |> resolve;
                    });
               });
               testPromise(
                 "test load two same json file, the second json file name should be rebuild",
                 () => {
                   let assetTreeData =
                     MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                   let jsonName = "newLoadJson";
                   let jsonResult = "I'm the result";

                   MainEditorAssetTool.fileLoad(
                     TestTool.getDispatch(),
                     BaseEventTool.buildTwoJsonFileEvent(
                       ~jsonName,
                       ~jsonResult,
                       (),
                     ),
                   )
                   |> then_(_ => {
                        assetTreeData
                        |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedSecondNodeDomIndex
                        |> MainEditorAssetChildrenNodeTool.clickAssetChildrenNodeToSetCurrentNode;

                        let {name, jsonResult}: NodeAssetType.jsonResultType =
                          StateEditorService.getState()
                          |> AssetJsonNodeMapEditorService.getJsonNodeMap
                          |> WonderCommonlib.SparseMapService.unsafeGet(
                               MainEditorAssetNodeTool.getCurrentNodeId(),
                             );

                        (name, jsonResult)
                        |> expect == (jsonName ++ " 1", jsonResult)
                        |> resolve;
                      });
                 },
               );
             }); */

          describe("test wdbNodeMap", () => {
            beforeEach(() => {
              LoadTool.buildFakeTextDecoder(
                LoadTool.convertUint8ArrayToBuffer,
              );
              LoadTool.buildFakeURL(sandbox^);

              LoadTool.buildFakeLoadImage(.);
            });

            testPromise("add name, wdbGameObject to wdbNodeMap", () => {
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
              |> ignore;
              let fileName = "BoxTextured";
              let defaultSceneNewGameObjectUid =
                SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectUid();

              MainEditorAssetUploadTool.loadOneWDB(
                ~fileName,
                ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let editorState = StateEditorService.getState();

                   let {name, wdbGameObject}: NodeAssetType.wdbNodeData =
                     OperateTreeAssetEditorService.unsafeFindNodeById(
                       uploadedWDBNodeId,
                       editorState,
                     )
                     |> WDBNodeAssetService.getNodeData;

                   (name, wdbGameObject)
                   |> expect == (fileName, defaultSceneNewGameObjectUid)
                   |> resolve;
                 });
            });
          });
        });
      });

      describe("deal with specific case", () => {
        let _getErrorTypeFile = () =>
          LoadAssetUtils.getUploadAssetType("aaa.bb");

        test("if upload error file type, should error", () => {
          ConsoleTool.notShowMessage();
          let component = BuildComponentTool.buildConsole();
          let errorStub =
            createMethodStub(sandbox^, ConsoleTool.console, "error");

          LoadAssetUtils._handleAssetSpecificFuncByTypeSync(
            _getErrorTypeFile(),
            (() => (), () => (), () => (), () => ()),
          );

          ConsoleTool.judgeError("type is error", errorStub);
        });
      });
    });
  });