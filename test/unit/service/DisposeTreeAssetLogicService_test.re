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

  describe("test remove texture", () =>
    testPromise(
      {j|
        upload two textures with the same image i1;
        disposeTree;

        the i1->base64 should remove from basicSourceTextureImageDataMap;
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
                    |> BasicSourceTextureImageDataMapAssetEditorService.getData(
                         textureData2.imageDataIndex,
                       )
                    |> Js.Option.isNone,
                  )
                  |> expect == (textureData2.imageDataIndex, true)
                  |> Js.Promise.resolve;
                })
           )
      )
    )
  );

  describe("test remove material", () => {
    beforeEach(() => {
      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
           [
            {
              "name": "default",
              "jobs": [
                  {"name": "init_inspector_engine" }
              ]
            }
          ]
           |},
            ~initJobs=
              {|
           [
              {"name": "init_inspector_engine" }
           ]
           |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;
    });

    testPromise(
      {j|
        add material m1;
        load texture to set m1 material's map;
        disposeTree;

        the m1->base64 should remove from basicSourceTextureImageDataMap;
      |j},
      () => {
        open NodeAssetType;

        let (
          addedMaterialNodeId,
          newMaterialComponent,
          imgCanvasFakeBase64Str,
          (inspectorCanvasDom, imgCanvasDom),
        ) =
          MainEditorLightMaterialForAssetTool.prepareInspectorMaterialSphereAndImgCanvas(
            ~sandbox,
            (),
          );

        MainEditorAssetUploadTool.loadOneTexture()
        |> Js.Promise.then_(uploadedTextureNodeId => {
             MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
               ~currentNodeId=addedMaterialNodeId,
               ~textureNodeId=uploadedTextureNodeId,
               ~material=newMaterialComponent,
               (),
             );

             let {snapshotImageDataIndex} =
               StateEditorService.getState()
               |> OperateTreeAssetEditorService.unsafeFindNodeById(
                    addedMaterialNodeId,
                  )
               |> MaterialNodeAssetService.getNodeData;

             let (editorState, engineState) =
               DisposeTreeAssetLogicService.disposeTree
               |> StateLogicService.getStateToGetData;

             editorState
             |> BasicSourceTextureImageDataMapAssetEditorService.getData(
                  snapshotImageDataIndex,
                )
             |> Js.Option.isNone
             |> expect == true
             |> resolve;
           });
      },
    );
  });
});