open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

open NodeAssetType;

let _ =
  describe("header import package->fix bug", () => {
    let sandbox = getSandboxDefaultVal();
    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let stoveWDBArrayBuffer = ref(Obj.magic(1));

    let _prepareFakeCanvas = sandbox =>
      ImportPackageTool.prepareFakeCanvas(sandbox);

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
      stoveWDBArrayBuffer := WDBTool.convertGLBToWDB("SuperLowPolyStove");
    });

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise(
      {|
            1.import package p1(error);
            2.import package p2;

            should import p2 success
            |},
      () => {
        MainEditorSceneTool.initState(
          ~sandbox,
          ~buffer=
            SettingToolEngine.buildBufferConfigStr(
              ~geometryPointCount=100000,
              ~geometryCount=30,
              (),
            ),
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

        _prepareFakeCanvas(sandbox);
        MainEditorSceneTool.prepareScene(sandbox);

        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             let boxTexturedWPKArrayBuffer = ExportPackageTool.exportWPK();

             MainEditorAssetUploadTool.loadOneWDB(
               ~arrayBuffer=stoveWDBArrayBuffer^,
               (),
             )
             |> then_(uploadedWDBNodeId => {
                  let cubeTextuedAndStoveWPKArrayBuffer =
                    ExportPackageTool.exportWPK();

                  MainEditorSceneTool.initState(
                    ~sandbox,
                    ~isBuildFakeDom=false,
                    ~buffer=
                      SettingToolEngine.buildBufferConfigStr(
                        ~geometryPointCount=5000,
                        ~geometryCount=30,
                        (),
                      ),
                    (),
                  );
                  MainEditorSceneTool.prepareScene(sandbox);

                  ImportPackageTool.testImportPackageWithoutExport(
                    ~wpkArrayBuffer=cubeTextuedAndStoveWPKArrayBuffer,
                    ~testFunc=
                      () => {
                        let error =
                          createMethodStubWithJsObjSandbox(
                            sandbox,
                            ConsoleTool.console,
                            "error",
                          );

                        ImportPackageTool.testImportPackageWithoutExport(
                          ~wpkArrayBuffer=boxTexturedWPKArrayBuffer,
                          ~testFunc=
                            () =>
                              error |> expect |> not_ |> toCalled |> resolve,
                          (),
                        );
                      },
                    (),
                  );
                });
           });
      },
    );

    describe(
      "test use extracted assets from wdb assets to scene gameObject before export package",
      () => {
        let error = ref(Obj.magic(-1));

        beforeEach(() => {
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

          error :=
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
        });

        testPromise(
          {|
             add gameObject g1 to scene tree;
             add material asset m1;
             load BoxTextured wdb asset w1;
             drag w1 to scene tree to be gameObject g2;
             drag w1->extracted texture t1 to be m1->diffuseMap;
             set g1->material to be m1;
             export;
             import;

             g1->material should be m1;
             g1->material->diffuseMap should be t1;
             |},
          () => {
            let firstCube = GameObjectTool.unsafeGetCurrentSceneTreeNode();
            let firstCubeName = "firstCube";
            GameObjectEngineService.setGameObjectName(
              firstCubeName,
              firstCube,
            )
            |> StateLogicService.getAndSetEngineState;

            let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let materialComponent1 =
              MainEditorAssetMaterialNodeTool.getMaterialComponent(
                ~nodeId=addedMaterialNodeId1,
                (),
              );

            let materialComponent1Name =
              LightMaterialEngineService.unsafeGetLightMaterialName(
                materialComponent1,
              )
              |> StateLogicService.getEngineStateToGetData;

            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=boxTexturedWDBArrayBuffer^,
              (),
            )
            |> then_(uploadedWDBNodeId => {
                 MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                   ~wdbNodeId=uploadedWDBNodeId,
                   (),
                 );

                 let editorState = StateEditorService.getState();
                 let engineState = StateEngineService.unsafeGetState();

                 let boxTexturedMeshDiffuseMap =
                   LoadWDBTool.unsafeGetBoxTexturedMeshDiffuseMap(
                     engineState,
                   );
                 let boxTexturedMeshDiffuseMapName =
                   boxTexturedMeshDiffuseMap
                   |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                        _,
                        engineState,
                      );

                 MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                   ~textureNodeId=
                     boxTexturedMeshDiffuseMap
                     |> MainEditorAssetTextureNodeTool.findTextureNodeIdByTextureComponent(
                          _,
                          editorState,
                        )
                     |> OptionService.unsafeGet,
                   ~material=materialComponent1,
                   (),
                 );

                 editorState |> StateEditorService.setState |> ignore;
                 engineState |> StateEngineService.setState |> ignore;

                 MainEditorMaterialTool.changeMaterial(
                   ~sourceMaterial=
                     GameObjectTool.getCurrentSceneTreeNodeLightMaterial(),
                   ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                   ~targetMaterial=materialComponent1,
                   ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                   ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                   ~materialNodeId=Some(addedMaterialNodeId1),
                   (),
                 );

                 let wpkArrayBuffer = ExportPackageTool.exportWPK();

                 ImportPackageTool.testImportPackageWithoutExport(
                   ~wpkArrayBuffer,
                   ~testFunc=
                     () => {
                       let engineState = StateEngineService.unsafeGetState();

                       let firstCube =
                         SceneToolEngine.findGameObjectByName(
                           firstCubeName,
                           engineState,
                         )
                         |> ArrayService.unsafeGetFirst;

                       let firstCubeMaterial =
                         firstCube
                         |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                              _,
                              engineState,
                            );

                       (
                         firstCubeMaterial
                         |> LightMaterialEngineService.unsafeGetLightMaterialName(
                              _,
                              engineState,
                            ),
                         firstCubeMaterial
                         |> LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
                              _,
                              engineState,
                            )
                         |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                              _,
                              engineState,
                            ),
                       )
                       |> expect
                       == (
                            materialComponent1Name,
                            boxTexturedMeshDiffuseMapName,
                          )
                       |> resolve;
                     },
                   (),
                 );
               });
          },
        );
        testPromise(
          {|
          add gameObject g1 to scene tree;
          load texture asset t1;
          load BoxTextured wdb asset w1;
          drag w1 to scene tree to be gameObject g2;
          drag t1 to be w1->extracted material m1->diffuseMap;
          set g1->material to be m1;
          export;
          import;

          g1->material should be m1;
          g1->material->diffuseMap should be t1;
          |},
          () => {
            let firstCube = GameObjectTool.unsafeGetCurrentSceneTreeNode();
            let firstCubeName = "firstCube";
            GameObjectEngineService.setGameObjectName(
              firstCubeName,
              firstCube,
            )
            |> StateLogicService.getAndSetEngineState;

            let imgName1 = "image1.png";
            MainEditorAssetUploadTool.loadOneTexture(~imgName=imgName1, ())
            |> then_(uploadedTextureNodeId1 =>
                 MainEditorAssetUploadTool.loadOneWDB(
                   ~arrayBuffer=boxTexturedWDBArrayBuffer^,
                   (),
                 )
                 |> then_(uploadedWDBNodeId => {
                      MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                        ~wdbNodeId=uploadedWDBNodeId,
                        (),
                      );

                      let editorState = StateEditorService.getState();
                      let engineState = StateEngineService.unsafeGetState();

                      let wdbMaterial =
                        LoadWDBTool.unsafeGetBoxTexturedMeshLightMaterial(
                          engineState,
                        );
                      let wdbMaterialName =
                        LightMaterialEngineService.unsafeGetLightMaterialName(
                          wdbMaterial,
                          engineState,
                        );
                      let wdbMaterialNodeId =
                        MainEditorAssetMaterialNodeTool.findNodeIdByMaterialComponentAndType(
                          wdbMaterial,
                          MaterialDataAssetType.LightMaterial,
                          editorState,
                        );

                      MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                        ~textureNodeId=uploadedTextureNodeId1,
                        ~material=wdbMaterial,
                        (),
                      );

                      editorState |> StateEditorService.setState |> ignore;
                      engineState |> StateEngineService.setState |> ignore;

                      MainEditorMaterialTool.changeMaterial(
                        ~sourceMaterial=
                          GameObjectTool.getCurrentSceneTreeNodeLightMaterial(),
                        ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                        ~targetMaterial=wdbMaterial,
                        ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                        ~gameObject=
                          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                        ~materialNodeId=wdbMaterialNodeId,
                        (),
                      );

                      let boxTexturedWPKArrayBuffer =
                        ExportPackageTool.exportWPK();

                      ImportPackageTool.testImportPackageWithoutExport(
                        ~wpkArrayBuffer=boxTexturedWPKArrayBuffer,
                        ~testFunc=
                          () => {
                            let engineState =
                              StateEngineService.unsafeGetState();

                            let firstCube =
                              SceneToolEngine.findGameObjectByName(
                                firstCubeName,
                                engineState,
                              )
                              |> ArrayService.unsafeGetFirst;

                            let firstCubeMaterial =
                              firstCube
                              |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                                   _,
                                   engineState,
                                 );

                            (
                              error^ |> getCallCount,
                              firstCubeMaterial
                              |> LightMaterialEngineService.unsafeGetLightMaterialName(
                                   _,
                                   engineState,
                                 ),
                              firstCubeMaterial
                              |> LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
                                   _,
                                   engineState,
                                 )
                              |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                                   _,
                                   engineState,
                                 ),
                            )
                            |> expect
                            == (
                                 0,
                                 wdbMaterialName,
                                 MainEditorAssetTextureNodeTool.buildTextureAssetName(
                                   imgName1,
                                 ),
                               )
                            |> resolve;
                          },
                        (),
                      );
                    })
               );
          },
        );
      },
    );

    describe("test pick", () => {
      let truckGLBArrayBuffer = ref(Obj.magic(1));

      let _prepare = () =>
        InitPickingJobTool.prepare(
          ~sandbox,
          ~viewWidth=500,
          ~viewHeight=200,
          ~offsetLeft=0,
          ~offsetTop=0,
          ~cameraPos=(0., 2., 3.),
          (),
        );

      beforeAll(() =>
        truckGLBArrayBuffer := GLBTool.getGLBArrayBuffer("CesiumMilkTruck")
      );

      beforeEach(() => {
        _prepare();
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

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      testPromise(
        {|
          import glb;
          drag the converted wdb to scene tree to be gameObject g1;
          export wpk w1;
          import w1;
          pick g1;
          import w1;
          pick g1;

          should pick g1;
          |},
        () => {
          let glbName = "Wdb";

          MainEditorAssetUploadTool.loadOneGLB(
            ~fileName=glbName,
            ~arrayBuffer=truckGLBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                 ~wdbNodeId=uploadedWDBNodeId,
                 (),
               );

               let wpkArrayBuffer = ExportPackageTool.exportWPK();

               ImportPackageTool.testImportPackageWithoutExport(
                 ~wpkArrayBuffer,
                 ~testFunc=
                   () => {
                     InitPickingJobTool.triggerPicking(
                       ~sandbox,
                       ~pageX=250,
                       ~pageY=100,
                       (),
                     );

                     ImportPackageTool.testImportPackageWithoutExport(
                       ~wpkArrayBuffer,
                       ~testFunc=
                         () => {
                           InitPickingJobTool.triggerPicking(
                             ~sandbox,
                             ~pageX=250,
                             ~pageY=100,
                             (),
                           );

                           InitPickingJobTool.pickOne(
                             LoadWDBTool.findGameObjectByName(glbName)
                             |> StateLogicService.getEngineStateToGetData,
                           )
                           |> resolve;
                         },
                       (),
                     );
                   },
                 (),
               );
             });
        },
      );
    });

    describe("test dispose renderGroup component", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
              ~loopPipelines=
                {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
              (),
            ),
          (),
        );
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      testPromise(
        {|
          add gameObject g1 to scene tree;
          g1->add default light material component;
          g1->dispose renderGroup component;
          export wpk w1;
          import w1;

          g1 should has no meshRenderer and lightMaterial component;
          |},
        () => {
          let gameObjectName = "g1";

          GameObjectEngineService.setGameObjectName(
            gameObjectName,
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          )
          |> StateLogicService.getAndSetEngineState;

          MainEditorInspectorRemoveComponentTool.removeRenderGroupComponent();

          let wpkArrayBuffer = ExportPackageTool.exportWPK();

          ImportPackageTool.testImportPackageWithoutExport(
            ~wpkArrayBuffer,
            ~testFunc=
              () => {
                let engineState = StateEngineService.unsafeGetState();
                let g1 =
                  LoadWDBTool.findGameObjectByName(
                    gameObjectName,
                    engineState,
                  );

                (
                  GameObjectComponentEngineService.hasMeshRendererComponent(
                    g1,
                    engineState,
                  ),
                  GameObjectComponentEngineService.hasLightMaterialComponent(
                    g1,
                    engineState,
                  ),
                )
                |> expect == (false, false)
                |> resolve;
              },
            (),
          );
        },
      );

      describe("removed material asset should exist after import", () =>
        testPromise(
          {|
          add gameObject g1 to scene tree;
          add material asset m1;
          g1->add m1 lightMaterial component;
          g1->dispose renderGroup component;
          export wpk w1;
          import w1;

          m1 should alive;
          |},
          () => {
            let g1 = GameObjectTool.unsafeGetCurrentSceneTreeNode();

            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addMaterial();
            let removedMaterialComponent =
              MainEditorAssetMaterialNodeTool.getMaterialComponent(
                ~nodeId=addedMaterialNodeId,
                (),
              );
            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial=
                GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                  g1,
                )
                |> StateLogicService.getEngineStateToGetData,
              ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
              ~targetMaterial=removedMaterialComponent,
              ~targetMaterialType=MaterialDataAssetType.LightMaterial,
              ~gameObject=g1,
              ~materialNodeId=Some(addedMaterialNodeId),
              (),
            );
            MainEditorInspectorRemoveComponentTool.removeRenderGroupComponent();
            let wpkArrayBuffer = ExportPackageTool.exportWPK();
            ImportPackageTool.testImportPackageWithoutExport(
              ~wpkArrayBuffer,
              ~testFunc=
                () => {
                  let engineState = StateEngineService.unsafeGetState();

                  (
                    LightMaterialToolEngine.isAlive(
                      removedMaterialComponent,
                      engineState,
                    ),
                    LightMaterialEngineService.hasLightMaterialGameObjects(
                      removedMaterialComponent,
                      engineState,
                    ),
                  )
                  |> expect == (true, false)
                  |> resolve;
                },
              (),
            );
          },
        )
      );
    });

    describe("test material assets after import", () => {
      let truckWDBArrayBuffer = ref(Obj.magic(1));

      beforeAll(() =>
        truckWDBArrayBuffer := WDBTool.convertGLBToWDB("CesiumMilkTruck")
      );

      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.initInspectorEngineState(
          ~sandbox,
          ~buffer=
            SettingToolEngine.buildBufferConfigStr(
              ~geometryPointCount=50000,
              (),
            ),
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

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });
      testPromise(
        {|
             load wdb w1;
             add folder f1 to root;
             enter f1;
             load wdb w2;
             export;
             import;
             enter f1->Materials folder;

             should show w2->materials;
             |},
        () =>
        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(_ => {
             let addedFolderNodeId = MainEditorAssetIdTool.getNewAssetId();

             MainEditorAssetHeaderOperateNodeTool.addFolder();

             MainEditorAssetTreeTool.Select.selectFolderNode(
               ~nodeId=addedFolderNodeId,
               (),
             );

             MainEditorAssetUploadTool.loadOneWDB(
               ~arrayBuffer=truckWDBArrayBuffer^,
               (),
             )
             |> then_(_ =>
                  ImportPackageTool.testImportPackage(
                    ~testFunc=
                      () => {
                        let truckMaterialsFolderId =
                          MainEditorAssetTreeTool.findNodeIdsByName(
                            "Materials",
                          )
                          |> StateLogicService.getStateToGetData
                          |> OptionService.unsafeGet
                          |> List.nth(_, 1);

                        MainEditorAssetTreeTool.Select.selectFolderNode(
                          ~nodeId=truckMaterialsFolderId,
                          (),
                        );

                        BuildComponentTool.buildAssetChildrenNode()
                        |> ReactTestTool.createSnapshotAndMatch
                        |> resolve;
                      },
                    (),
                  )
                );
           })
      );
    });
  });