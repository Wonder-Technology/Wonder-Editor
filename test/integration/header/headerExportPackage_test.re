open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("header export package", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("optimize", () => {
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

      testPromise("set builded image uint8Array to editorState", () =>
        MainEditorAssetUploadTool.loadOneTexture()
        |> then_(uploadedTextureNodeId => {
             let wpkArrayBuffer = ExportPackageTool.exportWPK();

             let editorState = StateEditorService.getState();

             editorState
             |> TextureNodeMapAssetEditorService.getValidValues
             |> Js.Array.filter(({image}: AssetNodeType.textureResultType) =>
                  ImageNodeMapAssetEditorService.getUint8Array(
                    image,
                    ImageNodeMapAssetEditorService.getImageNodeMap(
                      editorState,
                    ),
                  )
                  |> Js.Option.isSome
                )
             |> Js.Array.length
             |> expect == 1
             |> resolve;
           })
      );
    });
  });