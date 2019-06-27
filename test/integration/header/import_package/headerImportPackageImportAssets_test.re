open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

open NodeAssetType;

let _ =
  describe("header import package", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

    let _prepareFakeCanvas = sandbox =>
      ImportPackageTool.prepareFakeCanvas(sandbox);

    beforeAll(() =>
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
    );

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);

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
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test import material assets", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        EventListenerTool.buildFakeDom()
        |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      });

      testPromise("should add material assets to asset tree", () => {
        MainEditorAssetHeaderOperateNodeTool.addMaterial();
        MainEditorAssetHeaderOperateNodeTool.addMaterial();

        ImportPackageTool.testImportPackage(
          ~testFunc=
            () =>
              BuildComponentTool.buildAssetChildrenNode()
              |> ReactTestTool.createSnapshotAndMatch
              |> resolve,
          (),
        );
      });

      describe("should draw all materials->snapshot", () =>
        testPromise(
          {j|
              add new material m1;
              change m1 color;
              close color picker;
              export;
              import;

              m1->snapshot should equal between before import and after import;
              |j},
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
            let newMaterialName =
              OperateTreeAssetLogicService.getNodeNameById(
                addedMaterialNodeId,
                (
                  StateEditorService.getState(),
                  StateEngineService.unsafeGetState(),
                ),
              )
              |> OptionService.unsafeGet;

            let materialSnapshotObjectURL = "redraw_material_snapshot_objectURL";

            MainEditorLightMaterialForAssetTool.closeColorPicker(
              ~currentNodeId=addedMaterialNodeId,
              ~material=newMaterialComponent,
              ~color="#7df1e8",
              (),
            );

            let uint8Array =
              BufferUtils.convertBase64ToUint8Array(imgCanvasFakeBase64Str);
            let blob =
              Blob.newBlobFromArrayBuffer(
                uint8Array |> Js.Typed_array.Uint8Array.buffer,
                "image/png",
              );
            let createObjectURL = LoadTool.getFakeCreateObjectURL();

            createObjectURL
            |> withOneArg(blob)
            |> returns(materialSnapshotObjectURL);

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let editorState = StateEditorService.getState();
                  let engineState = StateEngineService.unsafeGetState();

                  let {imageDataIndex}: NodeAssetType.materialNodeData =
                    OperateTreeAssetLogicService.findNodeByName(
                      newMaterialName,
                      (editorState, engineState),
                    )
                    |> OptionService.unsafeGet
                    |> MaterialNodeAssetService.getNodeData;

                  editorState
                  |> ImageDataMapAssetEditorService.unsafeGetData(
                       imageDataIndex,
                     )
                  |> (
                    ({blobObjectURL}) =>
                      blobObjectURL
                      |> OptionService.unsafeGet
                      |> expect == materialSnapshotObjectURL
                      |> resolve
                  );
                },
              (),
            );
          },
        )
      );

      describe("fix bug", () => {
        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~isBuildFakeDom=false,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
            (),
          );

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

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          DirectorToolEngine.prepareAndInitAllEnginState();

          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;

          CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ())
          |> ignore;
        });

        testPromise(
          {|
          1.add material asset m1;
          2.export;
          3.import;
          4.change scecne tree gameObject->material component to m1;
          5.change m1->type to BasicMaterial
          6.change m1->type to LightMaterial

          MaterialInspector should be LightMaterial
          |},
          () => {
            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let (materialNodeId, materialComponent) =
                    ImportPackageTool.getFirstImportedMaterialAssetData();

                  let engineState = StateEngineService.unsafeGetState();

                  let gameObject =
                    MainEditorSceneTool.getFirstCube(engineState);

                  let sourceMaterial =
                    GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                      gameObject,
                      engineState,
                    );

                  MainEditorMaterialTool.changeMaterial(
                    ~sourceMaterial,
                    ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                    ~targetMaterial=materialComponent,
                    ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                    ~gameObject,
                    ~materialNodeId=Some(materialNodeId),
                    (),
                  );

                  MainEditorAssetChildrenNodeTool.selectMaterialNode(
                    ~nodeId=materialNodeId,
                    (),
                  );

                  MaterialInspectorTool.changeMaterialType(
                    ~material=materialComponent,
                    ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                    ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
                    ~materialNodeId,
                    (),
                  );

                  MaterialInspectorTool.changeMaterialType(
                    ~material=materialComponent,
                    ~sourceMaterialType=MaterialDataAssetType.BasicMaterial,
                    ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                    ~materialNodeId,
                    (),
                  );

                  MainEditorAssetChildrenNodeTool.selectMaterialNode(
                    ~nodeId=materialNodeId,
                    (),
                  );

                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig(),
                  )
                  |> ReactTestTool.createSnapshotAndMatch
                  |> resolve;
                },
              (),
            );
          },
        );
      });
    });

    describe("test import texture assets", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        )
      );

      testPromise("should add texture assets to asset tree", () =>
        MainEditorAssetUploadTool.loadOneTexture(
          ~imgName="loadImg.png",
          ~imgSrc="newImgBase64",
          (),
        )
        |> then_(uploadedTextureNodeId =>
             ImportPackageTool.testImportPackage(
               ~testFunc=
                 () =>
                   BuildComponentTool.buildAssetChildrenNode()
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve,
               (),
             )
           )
      );

      describe("should keep texture data not change", () => {
        let _test = (value, (getValueFunc, setValueFunc)) =>
          MainEditorAssetUploadTool.loadOneTexture()
          |> then_(uploadedTextureNodeId => {
               let editorState = StateEditorService.getState();
               let engineState = StateEngineService.unsafeGetState();

               let texture =
                 MainEditorAssetTextureNodeTool.getTextureComponent(
                   uploadedTextureNodeId,
                   editorState,
                 );

               let engineState = setValueFunc(value, texture, engineState);

               editorState |> StateEditorService.setState |> ignore;
               engineState |> StateEngineService.setState |> ignore;

               ImportPackageTool.testImportPackage(
                 ~testFunc=
                   () => {
                     let engineState = StateEngineService.unsafeGetState();

                     let textureComponent =
                       ImportPackageTool.getImportedTextureAssetTextureComponents()
                       |> ArrayService.unsafeGetFirst;

                     getValueFunc(textureComponent, engineState)
                     |> expect == value
                     |> resolve;
                   },
                 (),
               );
             });

        testPromise("test format", () =>
          _test(
            Wonderjs.TextureType.Luminance,
            (
              BasicSourceTextureEngineService.getFormat,
              BasicSourceTextureEngineService.setFormat,
            ),
          )
        );
        testPromise("test type_", () =>
          _test(
            3,
            (
              BasicSourceTextureEngineService.getType,
              BasicSourceTextureEngineService.setType,
            ),
          )
        );
        testPromise("test flipY", () =>
          _test(
            false,
            (
              BasicSourceTextureEngineService.getFlipY,
              BasicSourceTextureEngineService.setFlipY,
            ),
          )
        );
      });
    });

    describe("test import wdb assets", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~isBuildFakeDom=false,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );
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
      });

      describe("relate wdb asset gameObjects and material assets", () => {
        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~isBuildFakeDom=false,
            ~noWorkerJobRecord=
              NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
            (),
          );
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

          MainEditorSceneTool.createDefaultComponents();

          FakeGlToolEngine.setFakeGl(
            FakeGlToolEngine.buildFakeGl(~sandbox, ()),
          )
          |> StateLogicService.getAndSetEngineState;

          DirectorToolEngine.prepareAndInitAllEnginState();
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;

          _prepareFakeCanvas(sandbox) |> ignore;

          LoadTool.clearBlobData(.);
          LoadTool.buildFakeBlob(.);
        });

        testPromise("test", () =>
          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                 ~wdbNodeId=uploadedWDBNodeId,
                 (),
               );

               ImportPackageTool.testImportPackage(
                 ~testFunc=
                   () => {
                     let editorState = StateEditorService.getState();
                     let engineState = StateEngineService.unsafeGetState();

                     let material =
                       LoadWDBTool.getBoxTexturedMeshGameObject(engineState)
                       |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                            _,
                            engineState,
                          );
                     (
                       MainEditorAssetMaterialNodeTool.hasMaterialComponent(
                         material,
                         LoadWDBTool.getBoxTexturedMeshGameObjectMaterialType(),
                         editorState,
                       ),
                       MaterialNodeAssetEditorService.findAllMaterialNodes(
                         editorState,
                       )
                       |> Js.Array.length,
                     )
                     |> expect == (true, 1)
                     |> resolve;
                   },
                 (),
               );
             })
        );
      });

      describe(
        "relate wdb asset gameObjects and script event function assets", () => {
        let wdbArrayBuffer = ref(Obj.magic(1));
        let scriptEventFunctionDataNameRef = ref("");
        let scriptEventFunctionDataRef = ref(Obj.magic(1));

        beforeAll(() => {
          scriptEventFunctionDataNameRef := "aaa";
          scriptEventFunctionDataRef :=
            ScriptToolEngine.buildScriptEventFunctionData(
              ~initFunc=None,
              ~updateFunc=
                ScriptToolEngine.buildSetLocalPositionEventFunc()->Some,
              ~disposeFunc=None,
            );

          wdbArrayBuffer :=
            WDBTool.ScriptEventFunction.generateScriptEventFunctionWDB(
              scriptEventFunctionDataNameRef^,
              scriptEventFunctionDataRef^,
            );
        });

        beforeEach(() => MainEditorSceneTool.prepareScene(sandbox));

        describe("relate by event function name", () =>
          testPromise(
            {|
            add script event function asset sef1;
            load wdb which has the script gameObject that its script component has the event function data with the same name of sef1;
            export;
            import;
            drag wdb gameObject to scene to be g1;
            remove script event function asset sef1;

            should remove sef1 from g1->script gameObject->script component;
            |},
            () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
              MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

              AssetTreeInspectorTool.Rename.renameAssetScriptEventFunctionNode(
                ~nodeId=addedNodeId,
                ~name=scriptEventFunctionDataNameRef^,
                (),
              );

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=wdbArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId =>
                   ImportPackageTool.testImportPackage(
                     ~testFunc=
                       () => {
                         let wdbNodeId =
                           ImportPackageTool.getImportedWDBAssetNodeId()
                           |> ArrayService.unsafeGetFirst;

                         MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                           ~wdbNodeId,
                           (),
                         );

                         let scriptEventFunctionNodeId =
                           ImportPackageTool.getImportedScriptEventFunctionAssetNodeId()
                           |> ArrayService.unsafeGetFirst;

                         MainEditorAssetHeaderOperateNodeTool.removeScriptEventFunctionNode(
                           ~scriptEventFunctionNodeId,
                           (),
                         );

                         let engineState = StateEngineService.unsafeGetState();

                         ScriptEngineService.hasScriptEventFunctionData(
                           GameObjectComponentEngineService.unsafeGetScriptComponent(
                             WDBTool.ScriptEventFunction.getScriptGameObject(
                               engineState,
                             ),
                             engineState,
                           ),
                           scriptEventFunctionDataNameRef^,
                           engineState,
                         )
                         |> expect == false
                         |> resolve;
                       },
                     (),
                   )
                 );
            },
          )
        );
      });

      describe("relate wdb gameObjects and script attribute assets", () => {
        let wdbArrayBuffer = ref(Obj.magic(1));
        let scriptAttributeNameRef = ref("");
        let scriptAttributeRef = ref(Obj.magic(1));

        beforeAll(() => {
          scriptAttributeNameRef := "aaa";
          scriptAttributeRef :=
            ScriptToolEngine.buildScriptAttribute(scriptAttributeNameRef^);

          wdbArrayBuffer :=
            WDBTool.ScriptAttribute.generateScriptAttributeWDB(
              scriptAttributeNameRef^,
              scriptAttributeRef^,
            );
        });

        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          MainEditorInspectorAddComponentTool.addScriptComponent();
        });

        describe("relate by attribute name", () =>
          describe(
            "wdb gameObject->script component->attribute can be different from script attribute asset->attribute after import",
            () =>
            testPromise(
              {|
                   add script attribute asset sef1 with two fields;
                   load wdb which has the script gameObject that its script component has the attribute with the same name of sef1 but with one field;
                   export;
                   import;
                   drag wdb gameObject to scene to be g1;

                   g1->script->attribute should still has one field;
                   |},
              () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
                let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
                ScriptAttributeInspectorTool.addDefaultField(
                  ~sandbox,
                  ~nodeId=addedNodeId,
                  (),
                );
                ScriptAttributeInspectorTool.addDefaultField(
                  ~sandbox,
                  ~nodeId=addedNodeId,
                  (),
                );

                AssetTreeInspectorTool.Rename.renameAssetScriptAttributeNode(
                  ~nodeId=addedNodeId,
                  ~name=scriptAttributeNameRef^,
                  (),
                );

                let script = GameObjectTool.getCurrentSceneTreeNodeScript();

                MainEditorScriptAttributeTool.addScriptAttribute(
                  ~script,
                  ~send=SinonTool.createOneLengthStub(sandbox^),
                  (),
                );

                MainEditorAssetUploadTool.loadOneWDB(
                  ~arrayBuffer=wdbArrayBuffer^,
                  (),
                )
                |> then_(uploadedWDBNodeId =>
                     ImportPackageTool.testImportPackage(
                       ~testFunc=
                         () => {
                           let wdbNodeId =
                             ImportPackageTool.getImportedWDBAssetNodeId()
                             |> ArrayService.unsafeGetFirst;

                           let engineState =
                             StateEngineService.unsafeGetState();

                           MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                             ~wdbNodeId,
                             (),
                           );

                           let engineState =
                             StateEngineService.unsafeGetState();

                           let engineState =
                             StateEngineService.unsafeGetState();

                           ScriptAttributeFieldTool.getScriptAttributeFieldCount(
                             GameObjectComponentEngineService.unsafeGetScriptComponent(
                               WDBTool.ScriptEventFunction.getScriptGameObject(
                                 engineState,
                               ),
                               engineState,
                             ),
                             scriptAttributeNameRef^,
                             engineState,
                           )
                           |> expect == 1
                           |> resolve;
                         },
                       (),
                     )
                   );
              },
            )
          )
        );
      });
    });

    describe("test import script event function assets", () => {
      testPromise("should add script event function assets to asset tree", () => {
        MainEditorSceneTool.prepareScene(sandbox);
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

        ImportPackageTool.testImportPackage(
          ~testFunc=
            () =>
              ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes
              |> StateLogicService.getEditorState
              |> Js.Array.length
              |> expect == 2
              |> resolve,
          (),
        );
      });
      testPromise(
        "script event function assets->event function data should keep the same",
        () => {
          MainEditorSceneTool.prepareScene(sandbox);
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
          let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

          let jsObjStr =
            ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(
              ~initFunc=Some((. script, api, state) => state),
              ~disposeFunc=Some((. script, api, state) => state),
              (),
            );
          let eventFunctionName2 =
            ScriptEventFunctionInspectorTool.getEventFunctionName(
              addedNodeId2,
            )
            |> StateLogicService.getEditorState;

          ScriptEventFunctionInspectorTool.updateEventFunctionData(
            addedNodeId2,
            eventFunctionName2,
            jsObjStr,
          );

          ImportPackageTool.testImportPackage(
            ~testFunc=
              () => {
                let nodeId2 =
                  ImportPackageTool.getImportedScriptEventFunctionAssetNodeId()
                  |> ArrayService.unsafeGetNth(1);

                ScriptEventFunctionInspectorTool.getEventFunctionDataJsObjStr(
                  nodeId2,
                )
                |> StateLogicService.getEditorState
                |> expect == jsObjStr
                |> resolve;
              },
            (),
          );
        },
      );

      describe("test with script component", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          MainEditorInspectorAddComponentTool.addScriptComponent();
        });

        testPromise(
          {|
          first cube gameObject g1 add script component s1;
          add script event function asset sef1;
          s1 add sef1;
          export;
          import;

          first cube gameObject->script component should has sef1;
          |},
          () => {
            let script = GameObjectTool.getCurrentSceneTreeNodeScript();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
            let eventFunctionName =
              ScriptEventFunctionInspectorTool.getEventFunctionName(
                addedNodeId,
              )
              |> StateLogicService.getEditorState;

            MainEditorScriptEventFunctionTool.addScriptEventFunction(
              ~script,
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let script =
                    GameObjectComponentEngineService.unsafeGetScriptComponent(
                      MainEditorSceneTool.getFirstCube
                      |> StateLogicService.getEngineStateToGetData,
                    )
                    |> StateLogicService.getEngineStateToGetData;

                  ScriptEngineService.hasScriptEventFunctionData(
                    script,
                    eventFunctionName,
                  )
                  |> StateLogicService.getEngineStateToGetData
                  |> expect == true
                  |> resolve;
                },
              (),
            );
          },
        );
      });
    });

    describe("test import script attribute assets", () => {
      testPromise("should add script attribute assets to asset tree", () => {
        MainEditorSceneTool.prepareScene(sandbox);
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
        MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

        ImportPackageTool.testImportPackage(
          ~testFunc=
            () =>
              ScriptAttributeNodeAssetEditorService.findAllScriptAttributeNodes
              |> StateLogicService.getEditorState
              |> Js.Array.length
              |> expect == 2
              |> resolve,
          (),
        );
      });

      describe("script attribute assets->attribute should keep the same", () => {
        testPromise("test has two default fields", () => {
          MainEditorSceneTool.prepareScene(sandbox);
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
          ScriptAttributeInspectorTool.addDefaultField(
            ~sandbox,
            ~nodeId=addedNodeId1,
            (),
          );
          ScriptAttributeInspectorTool.addDefaultField(
            ~sandbox,
            ~nodeId=addedNodeId1,
            (),
          );

          ImportPackageTool.testImportPackage(
            ~testFunc=
              () => {
                let nodeId1 =
                  ImportPackageTool.getImportedScriptAttributeAssetNodeId()
                  |> ArrayService.unsafeGetFirst;

                ScriptAttributeInspectorTool.getAttributeEntries(nodeId1)
                |> StateLogicService.getEditorState
                |> Js.Array.length
                |> expect == 2
                |> resolve;
              },
            (),
          );
        });
        testPromise("test set field data", () => {
          MainEditorSceneTool.prepareScene(sandbox);
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedNodeId1 = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
          ScriptAttributeInspectorTool.addDefaultField(
            ~sandbox,
            ~nodeId=addedNodeId1,
            (),
          );
          let (fieldName, field) =
            ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId1)
            |> StateLogicService.getEditorState
            |> ArrayService.unsafeGetFirst;
          ScriptAttributeInspectorTool.updateScriptAttributeNodeByReplaceFieldData(
            addedNodeId1,
            (
              fieldName,
              ScriptAttributeInspectorTool.buildFieldJsObj(
                ~type_="float",
                ~defaultValue=0.1,
              ),
            ),
          );

          ImportPackageTool.testImportPackage(
            ~testFunc=
              () => {
                let nodeId1 =
                  ImportPackageTool.getImportedScriptAttributeAssetNodeId()
                  |> ArrayService.unsafeGetFirst;

                ScriptAttributeInspectorTool.getAttributeEntries(nodeId1)
                |> StateLogicService.getEditorState
                |> ArrayService.unsafeGetFirst
                |> expect
                == (
                     ScriptAttributeNodeNameAssetService.getNewFieldName(),
                     ScriptAttributeInspectorTool.buildField(
                       ~type_=Wonderjs.ScriptAttributeType.Float,
                       ~defaultValue=0.1,
                     ),
                   )
                |> resolve;
              },
            (),
          );
        });
      });

      describe("test with script component", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          MainEditorInspectorAddComponentTool.addScriptComponent();
        });

        testPromise(
          {|
             first cube gameObject g1 add script component s1;
             add script attribute asset sa1;
             s1 add sa1;
             export;
             import;

             first cube gameObject->script component should has sa1;
             |},
          () => {
            let script = GameObjectTool.getCurrentSceneTreeNodeScript();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
            let attributeName =
              ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
              |> StateLogicService.getEditorState;

            MainEditorScriptAttributeTool.addScriptAttribute(
              ~script,
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let script =
                    GameObjectComponentEngineService.unsafeGetScriptComponent(
                      MainEditorSceneTool.getFirstCube
                      |> StateLogicService.getEngineStateToGetData,
                    )
                    |> StateLogicService.getEngineStateToGetData;

                  ScriptEngineService.hasScriptAttributeData(
                    script,
                    attributeName,
                  )
                  |> StateLogicService.getEngineStateToGetData
                  |> expect == true
                  |> resolve;
                },
              (),
            );
          },
        );
      });
    });

    describe("test import asset bundle assets", () =>
      testPromise("should add asset bundle assets to asset tree", () => {
        open NodeAssetType;

        MainEditorSceneTool.prepareScene(sandbox);
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let assetBundle1 = ArrayBuffer.make(14);
        let assetBundle2 = ArrayBuffer.make(12);

        MainEditorAssetUploadTool.loadOneAssetBundle(
          ~fileName="A.rab",
          ~assetBundle=assetBundle1,
          (),
        )
        |> then_(uploadedAssetBundleNodeId1 =>
             MainEditorAssetUploadTool.loadOneAssetBundle(
               ~fileName="B.wab",
               ~assetBundle=assetBundle2,
               (),
             )
             |> then_(uploadedAssetBundleNodeId2 =>
                  ImportPackageTool.testImportPackage(
                    ~testFunc=
                      () =>
                        AssetBundleNodeAssetEditorService.findAllAssetBundleNodes
                        |> StateLogicService.getEditorState
                        |> Js.Array.map(
                             AssetBundleNodeAssetService.getNodeData,
                           )
                        |> expect
                        == [|
                             {
                               type_: RAB,
                               name: "A",
                               assetBundle: assetBundle1,
                             },
                             {
                               type_: WAB,
                               name: "B",
                               assetBundle: assetBundle2,
                             },
                           |]
                        |> resolve,
                    (),
                  )
                )
           );
      })
    );
  });