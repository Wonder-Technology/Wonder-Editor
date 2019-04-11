open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

open NodeAssetType;

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

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;
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