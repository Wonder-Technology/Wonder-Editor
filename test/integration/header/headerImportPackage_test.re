open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

let _ =
  describe("header import package", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));
    let directionPointLightsAndCubeWDBArrayBuffer = ref(Obj.magic(1));

    let _prepareFakeCanvas = sandbox =>
      ImportPackageTool.prepareFakeCanvas(sandbox);

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");

      directionPointLightsAndCubeWDBArrayBuffer :=
        WDBTool.generateDirectionPointLightsAndCubeWDB();
    });

    beforeEach(() => {
      sandbox := createSandbox();
      LoadTool.buildFakeAtob();
      LoadTool.buildFakeBtoa();
      LoadTool.buildFakeTextEncoder();
      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);
      LoadTool.buildFakeLoadImage();
      MainEditorAssetTool.buildFakeFileReader();
      MainEditorAssetTool.buildFakeImage();
      /* MainEditorSceneTool.initState(~sandbox, ());

         MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore; */
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("dispose assets", () => {
      describe("dispose wdb assets", () => {
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

        describe("dispose geometry assets", () => {
          testPromise(
            {|
          1.load BoxTextured wdb asset w1;
          2.drag w1 to scene tree to be gameObject g1;
          3.export;
          4.import;


          g1->geometry->select geometry group widget should have only one wdb geometry and be using it
          |},
            () => {
              _prepareFakeCanvas(sandbox) |> ignore;

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
                         let engineState = StateEngineService.unsafeGetState();

                         LoadWDBTool.getBoxTexturedMeshGameObject(engineState)
                         |> GameObjectTool.setCurrentSceneTreeNode;

                         MainEditorSceneTreeTool.Select.selectGameObject(
                           ~gameObject=
                             GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                           (),
                         );

                         let component =
                           BuildComponentTool.buildGeometry(
                             ~geometryComponent=
                               GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                             ~isShowGeometryGroup=true,
                             (),
                           );

                         component
                         |> ReactTestTool.createSnapshotAndMatch
                         |> resolve;
                       },
                     (),
                   );
                 });
            },
          );
          testPromise("should dispose geometry engine data", () =>
            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=boxTexturedWDBArrayBuffer^,
              (),
            )
            |> then_(uploadedWDBNodeId => {
                 let engineState = StateEngineService.unsafeGetState();
                 let editorState = StateEditorService.getState();
                 let geometryAssets =
                   GeometryAssetLogicService.getGeometryAssets(
                     editorState,
                     engineState,
                   );

                 ImportPackageTool.disposeAssets();

                 let engineState = StateEngineService.unsafeGetState();
                 geometryAssets
                 |> Js.Array.filter(geometryAsset =>
                      !
                        GeometryToolEngine.isGeometryDisposed(
                          geometryAsset,
                          engineState,
                        )
                    )
                 |> Js.Array.length
                 |> expect == 0
                 |> resolve;
               })
          );
        });

        describe("dispose wdb gameObjects", () => {
          let wdbArrayBuffer = ref(Obj.magic(1));

          let generateWDB = () =>
            WDBTool.generateWDB((editorState, engineState) => {
              let (engineState, geometry) =
                GeometryEngineService.createSphereGeometry(
                  1.,
                  3,
                  engineState,
                );
              let (engineState, lightMaterial) =
                LightMaterialEngineService.create(engineState);

              let (editorState, engineState, cube1) =
                PrimitiveLogicService.createCube(
                  (geometry, lightMaterial),
                  editorState,
                  engineState,
                );

              let defaultCubeGeometryComponent =
                GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
                  editorState,
                );
              let (engineState, lightMaterial) =
                LightMaterialEngineService.create(engineState);

              let (editorState, engineState, cube2) =
                PrimitiveLogicService.createCube(
                  (defaultCubeGeometryComponent, lightMaterial),
                  editorState,
                  engineState,
                );

              let (engineState, rootGameObject) =
                GameObjectEngineService.create(engineState);

              let engineState =
                engineState
                |> HierarchyGameObjectEngineService.addChild(
                     rootGameObject,
                     cube1,
                   )
                |> HierarchyGameObjectEngineService.addChild(
                     rootGameObject,
                     cube2,
                   );

              (rootGameObject, (editorState, engineState));
            });

          beforeAll(() => wdbArrayBuffer := generateWDB());

          testPromise("should dispose gameObject engine data", () =>
            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=wdbArrayBuffer^,
              (),
            )
            |> then_(uploadedWDBNodeId => {
                 let engineState = StateEngineService.unsafeGetState();
                 let editorState = StateEditorService.getState();

                 let allWDBGameObjects =
                   MainEditorAssetWDBNodeTool.getAllWDBGameObjects(
                     editorState,
                     engineState,
                   );

                 ImportPackageTool.disposeAssets();

                 let engineState = StateEngineService.unsafeGetState();
                 allWDBGameObjects
                 |> Js.Array.filter(gameObject =>
                      GameObjectToolEngine.isAlive(gameObject, engineState)
                    )
                 |> Js.Array.length
                 |> expect == 0
                 |> resolve;
               })
          );
        });
      });

      describe("dispose material assets", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          MainEditorSceneTool.prepareScene(sandbox);

          _prepareFakeCanvas(sandbox) |> ignore;
        });

        testPromise(
          {|
          1.load BoxTextured wdb asset w1;
          2.drag w1 to scene tree to be gameObject g1;
          3.export;
          4.import;

          g1->material->select material group widget should have only one wdb material
          |},
          () =>
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
                     let engineState = StateEngineService.unsafeGetState();

                     LoadWDBTool.getBoxTexturedMeshGameObject(engineState)
                     |> GameObjectTool.setCurrentSceneTreeNode;

                     BuildComponentTool.buildMaterial(
                       ~gameObject=
                         GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                       ~isShowMaterialGroup=true,
                       (),
                     )
                     |> ReactTestTool.createSnapshotAndMatch
                     |> resolve;
                   },
                 (),
               );
             })
        );
      });

      testPromise("clear imageData map", () => {
        MainEditorSceneTool.initState(~sandbox, ());
        MainEditorSceneTool.prepareScene(sandbox);

        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId =>
             ImportPackageTool.testImportPackage(
               ~testFunc=
                 () =>
                   ImportPackageTool.testImportPackage(
                     ~testFunc=
                       () =>
                         ImageDataMapTool.getMapValidLength
                         |> StateLogicService.getEditorState
                         |> expect == 1
                         |> resolve,
                     (),
                   ),
               (),
             )
           );
      });
    });

    describe("reallocate", () =>
      describe("reallocate geometry", () => {
        beforeEach(() => {
          MainEditorSceneTool.initStateWithJob(
            ~sandbox,
            ~buffer=
              SettingToolEngine.buildBufferConfigStr(
                ~geometryPointCount=5000,
                ~geometryCount=5,
                (),
              ),
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

          MainEditorSceneTool.prepareScene(sandbox);

          _prepareFakeCanvas(sandbox) |> ignore;
        });

        testPromise(
          "if geometry-buffer-use percent >= 10%, reallocate geometry to new buffer",
          () =>
          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let engineState = StateEngineService.unsafeGetState();

               let verticesBeforeImport =
                 GeometryToolEngine.getVertices(engineState);

               ImportPackageTool.testImportPackage(
                 ~testFunc=
                   () => {
                     let engineState = StateEngineService.unsafeGetState();

                     JudgeTool.isSame(
                       GeometryToolEngine.getVertices(engineState),
                       verticesBeforeImport,
                     )
                     |> expect == false
                     |> resolve;
                   },
                 (),
               );
             })
        );
      })
    );

    describe("test import scene wdb", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
          (),
        );

        MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

        DirectorToolEngine.prepareAndInitAllEnginState();

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      testPromise("should reset scene gameObject", () => {
        MainEditorLeftHeaderTool.addCube();

        ImportPackageTool.testImportPackage(
          ~testFunc=
            () =>
              BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
              |> ReactTestTool.createSnapshotAndMatch
              |> resolve,
          (),
        );
      });

      describe("relate scene gameObjects and material assets", () => {
        testPromise(
          "if scene gameObject use material asset, should still use it after import",
          () => {
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let engineState = StateEngineService.unsafeGetState();

            let gameObject = MainEditorSceneTool.getFirstCube(engineState);

            let sourceMaterial =
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject,
                engineState,
              );

            let materialComponent =
              MainEditorAssetMaterialNodeTool.getMaterialComponent(
                ~nodeId=addedMaterialNodeId,
                (),
              );

            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial,
              ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=MaterialDataAssetType.LightMaterial,
              ~gameObject,
              ~materialNodeId=Some(addedMaterialNodeId),
              (),
            );

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let engineState = StateEngineService.unsafeGetState();

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject=MainEditorSceneTool.getFirstCube(engineState),
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
        testPromise(
          "if scene gameObject use default material, should still use it after import",
          () => {
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let engineState = StateEngineService.unsafeGetState();

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject=
                      MainEditorSceneTool.getSecondCube(engineState),
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

        describe("fix bug", () => {
          testPromise(
            "test change default material to material asset after import", () => {
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let engineState = StateEngineService.unsafeGetState();

            let gameObject = MainEditorSceneTool.getFirstCube(engineState);

            let sourceMaterial =
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject,
                engineState,
              );

            let materialComponent =
              MainEditorAssetMaterialNodeTool.getMaterialComponent(
                ~nodeId=addedMaterialNodeId,
                (),
              );

            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial,
              ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=MaterialDataAssetType.LightMaterial,
              ~gameObject,
              ~materialNodeId=Some(addedMaterialNodeId),
              (),
            );

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let engineState = StateEngineService.unsafeGetState();

                  let (materialNodeId, materialComponent) =
                    ImportPackageTool.getFirstImportedMaterialAssetData();

                  let gameObject =
                    MainEditorSceneTool.getSecondCube(engineState);

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

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject,
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
          });

          describe("test with material and texture assets", () => {
            let _prepareFakeCanvas = sandbox => {
              let base64_1 = ImportPackageTool.buildBase64_1();
              let base64_2 = ImportPackageTool.buildBase64_2();
              let canvas1 =
                ImportPackageTool.buildFakeCanvas(sandbox, base64_1, 0);
              let canvas2 =
                ImportPackageTool.buildFakeCanvas(sandbox, base64_2, 1);

              let createElementStub =
                BuildCanvasTool.documentToJsObj(BuildCanvasTool.document)##createElement;

              createElementStub
              |> withOneArg("canvas")
              |> onCall(0)
              |> returns(canvas1)
              |> onCall(1)
              |> returns(canvas2)
              |> ignore;

              (base64_1, base64_2);
            };

            testPromise(
              {|
          1.add material asset m1;
          2.load texture asset t1;
          3.drag t1 to m1->diffuseMap;
          4.change scecne tree g1->material component to m1;
          5.export;
          6.import;

          g1->material should be m1;
          |},
              () => {
                let (base64_1, _) = _prepareFakeCanvas(sandbox);
                let addedMaterialNodeId1 =
                  MainEditorAssetIdTool.getNewAssetId();

                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let material1 =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId1,
                    (),
                  );

                MainEditorAssetUploadTool.loadOneTexture(
                  ~imgName="1.png",
                  ~imgSrc=base64_1,
                  (),
                )
                |> then_(uploadedTextureNodeId1 => {
                     MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
                       ~textureNodeId=uploadedTextureNodeId1,
                       ~material=material1,
                       (),
                     );

                     let engineState = StateEngineService.unsafeGetState();

                     let gameObject1 =
                       MainEditorSceneTool.getFirstCube(engineState);

                     let sourceMaterial1 =
                       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         gameObject1,
                         engineState,
                       );

                     MainEditorMaterialTool.changeMaterial(
                       ~sourceMaterial=sourceMaterial1,
                       ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                       ~targetMaterial=material1,
                       ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                       ~gameObject=gameObject1,
                       ~materialNodeId=Some(addedMaterialNodeId1),
                       (),
                     );

                     ImportPackageTool.testImportPackage(
                       ~testFunc=
                         () => {
                           let engineState =
                             StateEngineService.unsafeGetState();
                           let gameObject1 =
                             MainEditorSceneTool.getFirstCube(engineState);

                           [|
                             GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                               gameObject1,
                               engineState,
                             ),
                           |]
                           |> expect
                           == ImportPackageTool.getImporteMaterialAssetMaterialComponents()
                           |> resolve;
                         },
                       (),
                     );
                   });
              },
            );
            testPromise(
              {|
             1.add material asset m1;
             2.add material asset m2;
             3.load texture asset t1;
             4.load texture asset t2;
             5.drag t1 to m1->diffuseMap;
             6.drag t2 to m2->diffuseMap;
             7.change scecne tree g1->material component to m1;
             8.change scecne tree g2->material component to m2;
             9.export;
             10.import;


             g1->material should be m1;
             g2->material should be m2;
             |},
              () => {
                let (base64_1, base64_2) = _prepareFakeCanvas(sandbox);

                let addedMaterialNodeId1 =
                  MainEditorAssetIdTool.getNewAssetId();
                let addedMaterialNodeId2 = addedMaterialNodeId1 |> succ;

                MainEditorAssetHeaderOperateNodeTool.addMaterial();
                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let material1 =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId1,
                    (),
                  );
                let material2 =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId2,
                    (),
                  );

                MainEditorAssetUploadTool.loadOneTexture(
                  ~imgName="1.png",
                  ~imgSrc=base64_1,
                  (),
                )
                |> then_(uploadedTextureNodeId1 =>
                     MainEditorAssetUploadTool.loadOneTexture(
                       ~imgName="2.jpg",
                       ~imgSrc=base64_2,
                       (),
                     )
                     |> then_(uploadedTextureNodeId2 => {
                          MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
                            ~textureNodeId=uploadedTextureNodeId1,
                            ~material=material1,
                            (),
                          );
                          MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
                            ~textureNodeId=uploadedTextureNodeId2,
                            ~material=material2,
                            (),
                          );

                          let engineState =
                            StateEngineService.unsafeGetState();

                          let gameObject1 =
                            MainEditorSceneTool.getFirstCube(engineState);

                          let sourceMaterial1 =
                            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                              gameObject1,
                              engineState,
                            );

                          MainEditorMaterialTool.changeMaterial(
                            ~sourceMaterial=sourceMaterial1,
                            ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                            ~targetMaterial=material1,
                            ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                            ~gameObject=gameObject1,
                            ~materialNodeId=Some(addedMaterialNodeId1),
                            (),
                          );

                          let gameObject2 =
                            MainEditorSceneTool.getSecondCube(engineState);

                          let sourceMaterial2 =
                            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                              gameObject2,
                              engineState,
                            );

                          MainEditorMaterialTool.changeMaterial(
                            ~sourceMaterial=sourceMaterial2,
                            ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                            ~targetMaterial=material2,
                            ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                            ~gameObject=gameObject2,
                            ~materialNodeId=Some(addedMaterialNodeId2),
                            (),
                          );

                          ImportPackageTool.testImportPackage(
                            ~testFunc=
                              () => {
                                let engineState =
                                  StateEngineService.unsafeGetState();

                                let gameObject1 =
                                  MainEditorSceneTool.getFirstCube(
                                    engineState,
                                  );
                                let gameObject2 =
                                  MainEditorSceneTool.getSecondCube(
                                    engineState,
                                  );

                                [|
                                  GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                                    gameObject1,
                                    engineState,
                                  ),
                                  GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                                    gameObject2,
                                    engineState,
                                  ),
                                |]
                                |> expect
                                == ImportPackageTool.getImporteMaterialAssetMaterialComponents()
                                |> resolve;
                              },
                            (),
                          );
                        })
                   );
              },
            );
            testPromise(
              {|
                 1.add material asset m1;
                 2.add material asset m2;
                 3.change m2 type to basic;
                 4.set m1,m2 color;
                 5.load texture asset t1;
                 6.drag t1 to m1->diffuseMap;
                 7.change scecne tree g1->material component to m1;
                 8.change scecne tree g2->material component to m2;
                 9.export;
                 10.import;


                 g1->material should be m1;
                 g2->material should be m2;
                 |},
              () => {
                let (base64_1, base64_2) = _prepareFakeCanvas(sandbox);

                let addedMaterialNodeId1 =
                  MainEditorAssetIdTool.getNewAssetId();
                let addedMaterialNodeId2 = addedMaterialNodeId1 |> succ;

                MainEditorAssetHeaderOperateNodeTool.addMaterial();
                MainEditorAssetHeaderOperateNodeTool.addMaterial();

                let material1 =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId1,
                    (),
                  );
                let material2 =
                  MainEditorAssetMaterialNodeTool.getMaterialComponent(
                    ~nodeId=addedMaterialNodeId2,
                    (),
                  );

                MaterialInspectorTool.changeMaterialType(
                  ~material=material2,
                  ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                  ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
                  ~materialNodeId=addedMaterialNodeId2,
                  (),
                );

                let color1 = PickColorTool.buildColor1();
                let color2 = PickColorTool.buildColor2();

                MainEditorLightMaterialTool.changeColor(material1, color1);
                MainEditorBasicMaterialTool.changeColor(material2, color2);

                MainEditorAssetUploadTool.loadOneTexture(
                  ~imgName="1.png",
                  ~imgSrc=base64_1,
                  (),
                )
                |> then_(uploadedTextureNodeId1 => {
                     MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
                       ~textureNodeId=uploadedTextureNodeId1,
                       ~material=material1,
                       (),
                     );

                     let engineState = StateEngineService.unsafeGetState();

                     let gameObject1 =
                       MainEditorSceneTool.getFirstCube(engineState);

                     let sourceMaterial1 =
                       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         gameObject1,
                         engineState,
                       );

                     MainEditorMaterialTool.changeMaterial(
                       ~sourceMaterial=sourceMaterial1,
                       ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                       ~targetMaterial=material1,
                       ~targetMaterialType=MaterialDataAssetType.LightMaterial,
                       ~gameObject=gameObject1,
                       ~materialNodeId=Some(addedMaterialNodeId1),
                       (),
                     );

                     let gameObject2 =
                       MainEditorSceneTool.getSecondCube(engineState);

                     let sourceMaterial2 =
                       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         gameObject2,
                         engineState,
                       );

                     MainEditorMaterialTool.changeMaterial(
                       ~sourceMaterial=sourceMaterial2,
                       ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
                       ~targetMaterial=material2,
                       ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
                       ~gameObject=gameObject2,
                       ~materialNodeId=Some(addedMaterialNodeId2),
                       (),
                     );

                     ImportPackageTool.testImportPackage(
                       ~testFunc=
                         () => {
                           let engineState =
                             StateEngineService.unsafeGetState();

                           let gameObject1 =
                             MainEditorSceneTool.getFirstCube(engineState);
                           let gameObject2 =
                             MainEditorSceneTool.getSecondCube(engineState);

                           (
                             [|
                               GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                                 gameObject1,
                                 engineState,
                               ),
                             |],
                             [|
                               GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                                 gameObject2,
                                 engineState,
                               ),
                             |],
                           )
                           |> expect
                           == (
                                ImportPackageTool.getImporteMaterialAssetLightMaterialComponents(),
                                ImportPackageTool.getImporteMaterialAssetBasicMaterialComponents(),
                              )
                           |> resolve;
                         },
                       (),
                     );
                   });
              },
            );
          });
        });
      });

      testPromise("set scene gameObject->name to Scene", () =>
        ImportPackageTool.testImportPackage(
          ~testFunc=
            () =>
              GameObjectEngineService.unsafeGetGameObjectName(
                SceneEngineService.getSceneGameObject
                |> StateLogicService.getEngineStateToGetData,
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == "Scene"
              |> resolve,
          (),
        )
      );

      describe("test show Scene inspector", () =>
        testPromise("should show component ui", () =>
          ImportPackageTool.testImportPackage(
            ~testFunc=
              () => {
                MainEditorSceneTreeTool.Select.selectGameObject(
                  ~gameObject=
                    SceneEngineService.getSceneGameObject(
                      StateEngineService.unsafeGetState(),
                    ),
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
          )
        )
      );
    });

    describe("test geometry", () => {
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

        DirectorToolEngine.prepareAndInitAllEnginState();

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      testPromise(
        {|
          1.export;
          2.import;

          select geometry group widget should have only default geometrys
          |},
        () =>
        ImportPackageTool.testImportPackage(
          ~testFunc=
            () => {
              let engineState = StateEngineService.unsafeGetState();

              MainEditorSceneTool.getFirstCube(engineState)
              |> GameObjectTool.setCurrentSceneTreeNode;

              MainEditorSceneTreeTool.Select.selectGameObject(
                ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                (),
              );

              let component =
                BuildComponentTool.buildGeometry(
                  ~geometryComponent=
                    GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                  ~isShowGeometryGroup=true,
                  (),
                );

              component |> ReactTestTool.createSnapshotAndMatch |> resolve;
            },
          (),
        )
      );

      describe("test with wdb assets", () => {
        beforeEach(() => _prepareFakeCanvas(sandbox) |> ignore);

        describe("relate wdb asset gameObjects with default geometrys", () => {
          let cubeWDBArrayBuffer = ref(Obj.magic(1));

          let _generateCubeWDB = () =>
            WDBTool.generateWDB((editorState, engineState) => {
              let geometry =
                GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
                  editorState,
                );

              let (engineState, lightMaterial) =
                LightMaterialEngineService.create(engineState);

              let (editorState, engineState, cube1) =
                PrimitiveLogicService.createCube(
                  (geometry, lightMaterial),
                  editorState,
                  engineState,
                );

              let (engineState, rootGameObject) =
                GameObjectEngineService.create(engineState);

              let engineState =
                engineState
                |> HierarchyGameObjectEngineService.addChild(
                     rootGameObject,
                     cube1,
                   );

              (rootGameObject, (editorState, engineState));
            });

          beforeAll(() => cubeWDBArrayBuffer := _generateCubeWDB());

          testPromise(
            {|
               1.load cube wdb asset w1(with default cube geometry);
               2.export;
               3.import;
               4.drag w1 to scene tree to be gameObject g1;


               g1->geometry->select geometry group widget should only have default geometrys and be using default cube geometry
               |},
            () =>
            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=cubeWDBArrayBuffer^,
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

                       let engineState = StateEngineService.unsafeGetState();

                       MainEditorSceneTool.getFirstCube(engineState)
                       |> GameObjectTool.setCurrentSceneTreeNode;

                       MainEditorSceneTreeTool.Select.selectGameObject(
                         ~gameObject=
                           GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                         (),
                       );

                       let component =
                         BuildComponentTool.buildGeometry(
                           ~geometryComponent=
                             GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                           ~isShowGeometryGroup=true,
                           (),
                         );

                       component
                       |> ReactTestTool.createSnapshotAndMatch
                       |> resolve;
                     },
                   (),
                 )
               )
          );

          describe(
            {|
                  1.load cube wdb asset w1(with default cube geometry);
                  1.load cube wdb asset w2(with default cube geometry);
                  2.export;
                  3.import;
                  4.drag w1 to scene tree to be gameObject g1;
                  5.drag w2 to scene tree to be gameObject g2;
                  |},
            () => {
              let _prepare = testFunc =>
                MainEditorAssetUploadTool.loadOneWDB(
                  ~arrayBuffer=cubeWDBArrayBuffer^,
                  (),
                )
                |> then_(uploadedWDBNodeId1 =>
                     MainEditorAssetUploadTool.loadOneWDB(
                       ~arrayBuffer=cubeWDBArrayBuffer^,
                       (),
                     )
                     |> then_(uploadedWDBNodeId2 =>
                          ImportPackageTool.testImportPackage(
                            ~testFunc=
                              () => {
                                let wdbNodeId1 =
                                  ImportPackageTool.getImportedWDBAssetNodeId()
                                  |> ArrayService.unsafeGetFirst;

                                let wdbNodeId2 =
                                  ImportPackageTool.getImportedWDBAssetNodeId()
                                  |> ArrayService.unsafeGetNth(1);

                                MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                                  ~wdbNodeId=wdbNodeId1,
                                  (),
                                );
                                MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                                  ~wdbNodeId=wdbNodeId2,
                                  (),
                                );

                                testFunc();
                              },
                            (),
                          )
                        )
                   );

              testPromise(
                "g1->geometry->select geometry group widget should only have default geometrys and be using default cube geometry",
                () =>
                _prepare(() => {
                  let engineState = StateEngineService.unsafeGetState();

                  MainEditorSceneTool.getFirstCube(engineState)
                  |> GameObjectTool.setCurrentSceneTreeNode;

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                    (),
                  );

                  let component =
                    BuildComponentTool.buildGeometry(
                      ~geometryComponent=
                        GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                      ~isShowGeometryGroup=true,
                      (),
                    );

                  component |> ReactTestTool.createSnapshotAndMatch |> resolve;
                })
              );
              testPromise(
                "g2->geometry->select geometry group widget should only have default geometrys and be using default cube geometry",
                () =>
                _prepare(() => {
                  let engineState = StateEngineService.unsafeGetState();

                  MainEditorSceneTool.getSecondCube(engineState)
                  |> GameObjectTool.setCurrentSceneTreeNode;

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                    (),
                  );

                  let component =
                    BuildComponentTool.buildGeometry(
                      ~geometryComponent=
                        GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                      ~isShowGeometryGroup=true,
                      (),
                    );

                  component |> ReactTestTool.createSnapshotAndMatch |> resolve;
                })
              );
            },
          );
        });
        /* describe(
             "relate scene wdb gameObjects with wdb asset gameObjects->geometrys",
             () =>
             testPromise(
               {|
             1.load BoxTextured wdb asset w1;
             2.drag w1 to scene tree to be gameObject g1;
             3.export;
             4.import;


             g1->geometry->select geometry group widget should have one wdb geometry and be using it
             |},
               () =>
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
                          let engineState = StateEngineService.unsafeGetState();

                          LoadWDBTool.getBoxTexturedMeshGameObject(engineState)
                          |> GameObjectTool.setCurrentSceneTreeNode;

                          MainEditorSceneTreeTool.Select.selectGameObject(
                            ~gameObject=
                              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                            (),
                          );

                          let component =
                            BuildComponentTool.buildGeometry(
                              ~geometryComponent=
                                GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                              ~isShowGeometryGroup=true,
                              (),
                            );

                          component
                          |> ReactTestTool.createSnapshotAndMatch
                          |> resolve;
                        },
                      (),
                    );
                  })
             )
           ); */
      });
    });

    describe("test import assets", () => {
      beforeEach(() => MainEditorSceneTool.initState(~sandbox, ()));

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
              Wonderjs.SourceTextureType.Luminance,
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

          /* MainEditorSceneTool.createDefaultScene(
               sandbox,
               MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
             ); */

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

        describe("relate wdb asset gameObjects and material assets", () =>
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
          )
        );

        describe("fix bug", () =>
          testPromise(
            {|
          1.load BoxTextured wdb asset w1;
          2.load texture asset t1;
          3.export;
          4.import;

          import asb->t1->blob data should be correct
          |},
            () =>
            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=boxTexturedWDBArrayBuffer^,
              (),
            )
            |> then_(uploadedWDBNodeId =>
                 MainEditorAssetUploadTool.loadOneTexture(
                   ~imgName="loadImg.png",
                   ~imgSrc="newImgBase64",
                   (),
                 )
                 |> then_(uploadedTextureNodeId1 => {
                      LoadTool.clearBlobData(.);

                      ImportPackageTool.testImportPackage(
                        ~testFunc=
                          () => {
                            let blobData = LoadTool.getBlobData(.);

                            let (arrayBuffer, param) =
                              Array.unsafe_get(blobData, 1);

                            (
                              blobData |> Js.Array.length,
                              arrayBuffer |> ArrayBuffer.byteLength,
                              param,
                            )
                            |> expect == (2, 3, {"type": "image/png"})
                            |> resolve;
                          },
                        (),
                      );
                    })
               )
          )
        );
      });
    });

    describe(
      "shouldn't warn exceed max count when c1(current scene(before import package)->total light count) + c2(scene wdb->total light count) is exceed but c2 is not exceed",
      () => {
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

          MainEditorSceneTool.prepareScene(sandbox);

          DirectorToolEngine.prepareAndInitAllEnginState();
        });

        testPromise("test", () => {
          ConsoleTool.notShowMessage();
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "warn",
            );
          let editorState = StateEditorService.getState();
          let engineState = StateEngineService.unsafeGetState();
          let (editorState, engineState, light1) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );
          let (editorState, engineState, light2) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );
          let (editorState, engineState, light3) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );
          let (editorState, engineState, light4) =
            PrimitiveLogicService.createDirectionLight(
              editorState,
              engineState,
            );

          let engineState =
            SceneEngineService.addSceneChildren(
              [|light1, light2, light3, light4|],
              engineState,
            );
          editorState |> StateEditorService.setState |> ignore;
          engineState |> StateEngineService.setState |> ignore;

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId =>
               ImportPackageTool.testImportPackage(
                 ~execBeforeImportFunc=
                   _ => {
                     let editorState = StateEditorService.getState();
                     let engineState = StateEngineService.unsafeGetState();

                     let engineState =
                       engineState
                       |> SceneEngineService.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial
                       |> JobEngineService.execDisposeJob;

                     let (editorState, engineState, light5) =
                       PrimitiveLogicService.createDirectionLight(
                         editorState,
                         engineState,
                       );

                     let engineState =
                       SceneEngineService.addSceneChild(light5, engineState);

                     editorState |> StateEditorService.setState |> ignore;
                     engineState |> StateEngineService.setState |> ignore;
                   },
                 ~testFunc=() => warn |> expect |> not_ |> toCalled |> resolve,
                 (),
               )
             );
        });
      },
    );

    describe("fix bug", () => {
      let stoveWDBArrayBuffer = ref(Obj.magic(1));

      beforeAll(() =>
        stoveWDBArrayBuffer := WDBTool.convertGLBToWDB("SuperLowPolyStove")
      );

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
          _prepareFakeCanvas(sandbox);
          MainEditorSceneTool.prepareScene(sandbox);
          ConsoleTool.notShowMessage();

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
                    ConsoleTool.notShowMessage();

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

                   MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
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
                     ~gameObject=
                       GameObjectTool.unsafeGetCurrentSceneTreeNode(),
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

                        MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
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

          MainEditorSceneTool.prepareScene(sandbox);

          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;
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

          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;
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
          MainEditorSceneTool.prepareScene(sandbox);

          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;
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
  });