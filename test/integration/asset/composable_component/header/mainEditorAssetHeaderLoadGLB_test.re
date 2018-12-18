open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->load glb", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedGLBArrayBuffer = ref(Obj.magic(1));
    /* let truckWDBArrayBuffer = ref(Obj.magic(1));
       let sceneWDBArrayBuffer = ref(Obj.magic(1)); */

    beforeAll(() =>
      boxTexturedGLBArrayBuffer := GLBTool.getGLBArrayBuffer("BoxTextured")
    );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load glb", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeTextEncoder();
        LoadTool.buildFakeURL(sandbox^);
        LoadTool.buildFakeLoadImage(.);
      });

      testPromise("convert glb to wdb and load", () =>
        MainEditorAssetUploadTool.loadOneGLB(
          ~arrayBuffer=boxTexturedGLBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             let editorState = StateEditorService.getState();
             let engineState = StateEngineService.unsafeGetState();
             let wdbGameObject =
               MainEditorAssetWDBNodeTool.getWDBGameObject(
                 uploadedWDBNodeId,
                 editorState,
               );

             LoadWDBTool.getBoxTexturedMeshGameObjectFromAssetNode(
               uploadedWDBNodeId,
               (editorState, engineState),
             )
             |> GameObjectEngineService.getGameObjectName(_, engineState)
             |> expect == Some("Mesh")
             |> resolve;
           })
      );
    });
  });