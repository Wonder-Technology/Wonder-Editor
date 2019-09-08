open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

open NodeAssetType;

let _ =
  describe("header export package", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let sceneWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
      sceneWDBArrayBuffer := WDBTool.generateSceneWDBWithArcballCameraController();
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

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if is run", () =>
      test("warn", () => {
        ConsoleTool.notShowMessage();
        let warn =
          createMethodStubWithJsObjSandbox(
            sandbox,
            ConsoleTool.console,
            "warn",
          );
        ControllerTool.run();

        HeaderExportPackageUtils.exportPackage("aaa");

        warn
        |> expect
        |> toCalledWith([|
             "should operate when stop, but now is run!",
           |]);
      })
    );

    describe("else", () => {
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

      describe("optimize", () =>
        testPromise("set builded image uint8Array to editorState", () =>
          MainEditorAssetUploadTool.loadOneTexture()
          |> then_(uploadedTextureNodeId => {
               let wpkArrayBuffer = ExportPackageTool.exportWPK();

               let editorState = StateEditorService.getState();

               BasicSourceTypeTextureNodeAssetEditorService.findAllBasicSourceTypeTextureNodes(editorState)
               |> Js.Array.filter(node => {
                    let {uint8Array}: ImageDataType.imageData =
                      BasicSourceTextureImageDataMapTool.getDataByTextureNode(
                        node,
                        editorState,
                      );

                    uint8Array |> Js.Option.isSome;
                  })
               |> Js.Array.length
               |> expect == 1
               |> resolve;
             })
        )
      );

      describe("test isRoot", () =>
        testPromise("set scene gameObject->isRoot to false", () => {
          let wpkArrayBuffer = ExportPackageTool.exportWPK();

          ImportPackageTool.testImportPackageWithoutExport(
            ~wpkArrayBuffer,
            ~testFunc=
              () => {
                let engineState = StateEngineService.unsafeGetState();

                GameObjectEngineService.getGameObjectIsRoot(
                  SceneEngineService.getSceneGameObject(engineState),
                  engineState,
                )
                |> expect == Some(false)
                |> resolve;
              },
            (),
          );
        })
      );

      describe("test export all materials->snapshot", () => {
        test(
          "add new material m1;
           export;

           should convert m1->snapshot->default base64 to uint8Array;",
          () => {
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            ExportPackageTool.exportWPK() |> ignore;

            let editorState = StateEditorService.getState();

            let {snapshotImageDataIndex}: materialNodeData =
              editorState
              |> OperateTreeAssetEditorService.unsafeFindNodeById(
                   addedMaterialNodeId,
                 )
              |> MaterialNodeAssetService.getNodeData;

            editorState
            |> BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(snapshotImageDataIndex)
            |> (
              ({base64, uint8Array}) =>
                uint8Array
                |> OptionService.unsafeGet
                |> expect
                == BufferUtils.convertBase64ToUint8Array(
                     ExportPackageTool.getDefaultSnapshotBase64(),
                   )
            );
          },
        );
        test(
          "add new material m1;
             change m1 color;
             close color picker;
             export;

           should convert m1->snapshot->default base64 to uint8Array;",
          () => {
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

            MainEditorLightMaterialForAssetTool.closeColorPicker(
              ~currentNodeId=addedMaterialNodeId,
              ~material=newMaterialComponent,
              ~color="#7df1e8",
              (),
            );

            ExportPackageTool.exportWPK() |> ignore;

            let editorState = StateEditorService.getState();

            let {snapshotImageDataIndex}: materialNodeData =
              editorState
              |> OperateTreeAssetEditorService.unsafeFindNodeById(
                   addedMaterialNodeId,
                 )
              |> MaterialNodeAssetService.getNodeData;

            editorState
            |> BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(snapshotImageDataIndex)
            |> (
              ({base64, uint8Array}) =>
                uint8Array
                |> OptionService.unsafeGet
                |> expect
                == BufferUtils.convertBase64ToUint8Array(
                     ExportPackageTool.getDefaultSnapshotBase64(),
                   )
            );
          },
        );
      });

      describe("test export all wdbs->snapshot", () =>
        testPromise(
          "upload one wdb w1;
           export;

           should convert w1->snapshot base64 to uint8Array;",
          () => {
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

            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=boxTexturedWDBArrayBuffer^,
              (),
            )
            |> then_(uploadedWDBNodeId => {
                 ExportPackageTool.exportWPK() |> ignore;

                 let editorState = StateEditorService.getState();
                 let engineState = StateEngineService.unsafeGetState();

                 let {imageDataIndex}: wdbNodeData =
                   editorState
                   |> OperateTreeAssetEditorService.unsafeFindNodeById(
                        uploadedWDBNodeId,
                      )
                   |> WDBNodeAssetService.getNodeData;

                 editorState
                 |> BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
                      imageDataIndex,
                    )
                 |> (
                   ({base64, uint8Array}) =>
                     uint8Array
                     |> OptionService.unsafeGet
                     |> expect
                     == BufferUtils.convertBase64ToUint8Array(
                          imgCanvasFakeBase64Str,
                        )
                     |> resolve
                 );
               });
          },
        )
      );
    });
  });