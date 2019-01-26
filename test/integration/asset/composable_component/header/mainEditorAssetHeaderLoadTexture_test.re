open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open NodeAssetType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->load texture", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox,  MainEditorSceneTool.notSetCurrentSceneTreeNode);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load texture", () => {
      let _getUploadedTextureNodeId = editorState =>
        Array.unsafe_get(
          RootTreeAssetEditorService.getRootNode(editorState)
          |> FolderNodeAssetService.getChildrenNodes,
          0,
        )
        |> NodeAssetService.getNodeId(~node=_);

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);
      });

      testPromise("set source name", () => {
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
        let imgName = "1.png";

        MainEditorAssetUploadTool.loadOneTexture(~imgName, ())
        |> then_(uploadedTextureNodeId => {
             let editorState = StateEditorService.getState();
             let textureComponent =
               MainEditorAssetTextureNodeTool.getTextureComponent(
                 uploadedTextureNodeId,
                 editorState,
               );
             let engineState = StateEngineService.unsafeGetState();
             let source =
               BasicSourceTextureEngineService.unsafeGetSource(
                 textureComponent,
                 engineState,
               );

             Obj.magic(source)##name |> expect == imgName |> resolve;
           });
      });
    });
  });