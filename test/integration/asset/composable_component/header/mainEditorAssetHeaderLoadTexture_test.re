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
      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load texture", () => {
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

      describe("set source format", () => {
        let _test = (imgName, targetFormat) => {
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;

          MainEditorAssetUploadTool.loadOneTexture(~imgName, ())
          |> then_(uploadedTextureNodeId => {
               let editorState = StateEditorService.getState();
               let textureComponent =
                 MainEditorAssetTextureNodeTool.getTextureComponent(
                   uploadedTextureNodeId,
                   editorState,
                 );
               let engineState = StateEngineService.unsafeGetState();

               BasicSourceTextureEngineService.getFormat(
                 textureComponent,
                 engineState,
               )
               |> expect == targetFormat
               |> resolve;
             });
        };

        testPromise("set jpg texture to rgb format", () =>
          _test("1.jpg", Wonderjs.TextureType.Rgb)
        );
        testPromise("set jpeg texture to rgb format", () =>
          _test("1.jpeg", Wonderjs.TextureType.Rgb)
        );
        testPromise("set png texture to rgba format", () =>
          _test("1.png", Wonderjs.TextureType.Rgba)
        );
      });
    });
  });