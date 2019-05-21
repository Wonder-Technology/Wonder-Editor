open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("wdb inspector", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let sceneWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
      sceneWDBArrayBuffer := WDBTool.generateSceneWDB();
    });

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

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test rename", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree,
        )
      );

      testPromise(
        "if rename to the existed name in the same dir, should fail", () => {
        let fileName1 = "BoxTextured1";
        let fileName2 = "BoxTextured2";

        MainEditorAssetUploadTool.loadOneWDB(
          ~fileName=fileName1,
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId1 =>
             MainEditorAssetUploadTool.loadOneWDB(
               ~fileName=fileName2,
               ~arrayBuffer=boxTexturedWDBArrayBuffer^,
               (),
             )
             |> then_(uploadedWDBNodeId2 => {
                  AssetTreeInspectorTool.Rename.renameAssetWDBNode(
                    ~nodeId=uploadedWDBNodeId2,
                    ~name=fileName1,
                    (),
                  );

                  (
                    MainEditorAssetWDBNodeTool.getWDBName(
                      ~nodeId=uploadedWDBNodeId1,
                      (),
                    ),
                    MainEditorAssetWDBNodeTool.getWDBName(
                      ~nodeId=uploadedWDBNodeId2,
                      (),
                    ),
                  )
                  |> expect == (fileName1, fileName2)
                  |> resolve;
                })
           );
      });
    });
    describe("test draw wdb snapshot in didMount", () =>
      test("test", () => {
        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;

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
        let (scene, (cube1, cube3, cube4), cube2) =
          SceneTreeTool.buildFourLayerSceneGraphToEngine(sandbox);

        let engineState = StateEngineService.unsafeGetState();

        engineState 
        |> TransformGameObjectEngineService.setLocalPosition(cube3,(0.2,0.2,0.2))
        |> StateEngineService.setState;


        WDBInspector.Method.didMount(scene);

        /* TODO finish test */
        1 |> expect == 1;
        /* MainEditorAssetUploadTool.loadOneWDB(
             ~arrayBuffer=sceneWDBArrayBuffer^,
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

                WDBInspector.Method.didMount(scene);

                1 |> expect == 1 |> resolve;
              }); */
      })
    );
  });