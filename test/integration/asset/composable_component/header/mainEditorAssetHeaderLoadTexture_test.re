open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->load texture", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load texture", () => {
      let _getUploadedTextureNodeId = editorState => {
        let root =
          editorState |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot;

        let {id} as textureNode = root.children[0];

        id;
      };

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();

        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      testPromise("set source name", () => {
        MainEditorAssetTool.buildEmptyAssetTreeRoot() |> ignore;
        let imgName = "1.png";

        MainEditorAssetTool.fileLoad(
          TestTool.getDispatch(),
          BaseEventTool.buildOneTextureFileEvent(~imgName, ()),
        )
        |> then_(_ => {
             let editorState = StateEditorService.getState();
             let nodeId = _getUploadedTextureNodeId(editorState);
             let textureComponent =
               MainEditorAssetTextureNodeTool.getTextureComponent(
                 nodeId,
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