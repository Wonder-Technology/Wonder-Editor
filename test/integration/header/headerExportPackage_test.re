open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

open NodeAssetType;

let _ =
  describe("header export package", () => {
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
             "should export package when stop, but now is run!",
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

               TextureNodeAssetEditorService.findAllTextureNodes(editorState)
               |> Js.Array.filter(node => {
                    let {uint8Array}: ImageDataType.imageData =
                      ImageDataMapTool.getDataByTextureNode(
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

      describe("test export all material's snapshot", () => {
        test(
          "add new material;
           export;

           should export material default base64 to uint8Array;",
          () => {
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let wpkArrayBuffer = ExportPackageTool.exportWPK();

            let editorState = StateEditorService.getState();

            let {imageDataIndex}: materialNodeData =
              editorState
              |> OperateTreeAssetEditorService.unsafeFindNodeById(
                   addedMaterialNodeId,
                 )
              |> MaterialNodeAssetService.getNodeData;

            editorState
            |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
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

           should convert base64 to uint8Array;",
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

            let wpkArrayBuffer = ExportPackageTool.exportWPK();

            let editorState = StateEditorService.getState();

            let {imageDataIndex}: materialNodeData =
              editorState
              |> OperateTreeAssetEditorService.unsafeFindNodeById(
                   addedMaterialNodeId,
                 )
              |> MaterialNodeAssetService.getNodeData;

            editorState
            |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
            |> (
              ({base64, uint8Array}) =>
                uint8Array
                |> OptionService.unsafeGet
                |> expect == BufferUtils.convertBase64ToUint8Array(base64)
            );
          },
        );
      });
    });
  });