open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("Header AssetBundle", () => {
    let sandbox = getSandboxDefaultVal();

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

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test generate single rab", () =>
      describe("test buildSelectTreeForGenerateSingleRAB", () => {
        /* TODO add more tests */

        let truckWDBArrayBuffer = ref(Obj.magic(1));

        beforeAll(() =>
          truckWDBArrayBuffer := WDBTool.convertGLBToWDB("CesiumMilkTruck")
        );

        beforeEach(() => {
          MainEditorAssetTool.buildFakeFileReader();
          MainEditorAssetTool.buildFakeImage();

          LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
          LoadTool.buildFakeURL(sandbox^);

          LoadTool.buildFakeLoadImage(.);
        });

        testPromise("test1", () => {
          let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addMaterial();

          let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetTreeTool.Select.selectFolderNode(
            ~nodeId=addedFolderNodeId1,
            (),
          );

          MainEditorAssetUploadTool.loadOneTexture(
            ~imgName="image1.png",
            ~imgSrc="newImgBase64",
            (),
          )
          |> then_(uploadedTextureNodeId =>
               MainEditorAssetUploadTool.loadOneWDB(
                 ~fileName="Truck",
                 ~arrayBuffer=truckWDBArrayBuffer^,
                 (),
               )
               |> then_(uploadedWDBNodeId =>
                    HeaderAssetBundleTool.buildGenerateSingleRABModal(
                      ~selectTree=
                        HeaderAssetBundleTool.buildSelectTreeForGenerateSingleRAB
                        |> StateLogicService.getStateToGetData,
                      ~send=SinonTool.createOneLengthStub(sandbox^),
                      (),
                    )
                    |> BuildComponentTool.buildUI
                    |> ReactTestTool.createSnapshotAndMatch
                    |> resolve
                  )
             );
        });
        test("test2", () => {
          MainEditorAssetHeaderOperateNodeTool.addFolder();

          MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

          HeaderAssetBundleTool.buildGenerateSingleRABModal(
            ~selectTree=
              HeaderAssetBundleTool.buildSelectTreeForGenerateSingleRAB
              |> StateLogicService.getStateToGetData,
            ~send=SinonTool.createOneLengthStub(sandbox^),
            (),
          )
          |> BuildComponentTool.buildUI
          |> ReactTestTool.createSnapshotAndMatch
        });
      })
    );
  });