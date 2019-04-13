open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

describe("disposeTree", () => {
  let sandbox = getSandboxDefaultVal();

  beforeEach(() => {
    sandbox := createSandbox();
    MainEditorSceneTool.initState(~sandbox, ());

    MainEditorAssetTool.buildFakeImage();
    MainEditorAssetTool.buildFakeFileReader();

    MainEditorSceneTool.prepareScene(sandbox);
  });

  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

  /* TODO test: add "test remove material->image data from imageDataMap" */

  testPromise(
    {j|
      upload two textures with the same image i1;
      disposeTree;

      the i1->base64 should remove from imageDataMap;
    |j},
    () =>
    NodeAssetType.(
      MainEditorAssetUploadTool.loadOneTexture()
      |> Js.Promise.then_(uploadedTextureNodeId1 =>
           MainEditorAssetUploadTool.loadOneTexture()
           |> Js.Promise.then_(uploadedTextureNodeId2 => {
                let editorState = StateEditorService.getState();

                let textureData1 =
                  TextureNodeAssetEditorService.unsafeGetNodeData(
                    uploadedTextureNodeId1,
                    editorState,
                  );
                let textureData2 =
                  TextureNodeAssetEditorService.unsafeGetNodeData(
                    uploadedTextureNodeId1,
                    editorState,
                  );

                let (editorState, engineState) =
                  DisposeTreeAssetLogicService.disposeTree
                  |> StateLogicService.getStateToGetData;

                (
                  textureData1.imageDataIndex,
                  editorState
                  |> ImageDataMapAssetEditorService.getData(
                       textureData2.imageDataIndex,
                     )
                  |> Js.Option.isNone,
                )
                |> expect == (textureData2.imageDataIndex, true)
                |> Js.Promise.resolve;
              })
         )
    )
  );
});