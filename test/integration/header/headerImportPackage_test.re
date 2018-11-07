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

    let _buildFakeCanvas = (sandbox, base64, callIndex) => {
      let toDataURLStub = createEmptyStubWithJsObjSandbox(sandbox);
      toDataURLStub |> returns(base64);

      let canvasDom = {
        "width": 0,
        "height": 0,
        "getContext": () => {
          "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
        },
        "toDataURL": toDataURLStub,
      };

      canvasDom;
    };

    let _prepareFakeCanvas = () => {
      let base64_1 = "data:image/png;base64,aaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaacccccccccccccccccccccccaaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaacccccccccccccccccccccccaaccccccccccccccccccccccc";
      let base64_2 = "data:image/jpeg;base64,bbb";
      let canvas1 = _buildFakeCanvas(sandbox, base64_1, 0);
      let canvas2 = _buildFakeCanvas(sandbox, base64_2, 1);

      let createElementStub = BuildCanvasTool.documentToJsObj(
                                BuildCanvasTool.document,
                              )##createElement;

      createElementStub
      |> withOneArg("canvas")
      |> onCall(0)
      |> returns(canvas1)
      |> onCall(1)
      |> returns(canvas2)
      |> ignore;

      (base64_1, base64_2);
    };

    beforeAll(() => {
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured");
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

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test import scene wdb", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~isBuildFakeDom=false,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
          (),
        );

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );

        DirectorToolEngine.prepareAndInitAllEnginState();

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      testPromise("should reset scene gameObject", () => {
        MainEditorSceneTreeHeaderTool.addBox();

        ImportPackageTool.testImportPackage(
          ~testFunc=
            () =>
              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              )
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

            let gameObject = MainEditorSceneTool.getFirstBox(engineState);

            let sourceMaterial =
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject,
                engineState,
              );

            let {materialComponent}: AssetNodeType.materialResultType =
              StateEditorService.getState()
              |> MaterialNodeMapAssetEditorService.unsafeGetResult(
                   addedMaterialNodeId,
                 );
            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial,
              ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=AssetMaterialDataType.LightMaterial,
              ~gameObject,
              ~materialNodeId=Some(addedMaterialNodeId),
              (),
            );

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
                  let engineState = StateEngineService.unsafeGetState();

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject=MainEditorSceneTool.getFirstBox(engineState),
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
                    ~gameObject=MainEditorSceneTool.getSecondBox(engineState),
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

            let gameObject = MainEditorSceneTool.getFirstBox(engineState);

            let sourceMaterial =
              GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                gameObject,
                engineState,
              );

            let {materialComponent}: AssetNodeType.materialResultType =
              StateEditorService.getState()
              |> MaterialNodeMapAssetEditorService.unsafeGetResult(
                   addedMaterialNodeId,
                 );

            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial,
              ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=AssetMaterialDataType.LightMaterial,
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
                    MainEditorSceneTool.getSecondBox(engineState);

                  let sourceMaterial =
                    GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                      gameObject,
                      engineState,
                    );

                  MainEditorMaterialTool.changeMaterial(
                    ~sourceMaterial,
                    ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                    ~targetMaterial=materialComponent,
                    ~targetMaterialType=AssetMaterialDataType.LightMaterial,
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
                let (base64_1, _) = _prepareFakeCanvas();
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
                       MainEditorSceneTool.getFirstBox(engineState);

                     let sourceMaterial1 =
                       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         gameObject1,
                         engineState,
                       );

                     MainEditorMaterialTool.changeMaterial(
                       ~sourceMaterial=sourceMaterial1,
                       ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                       ~targetMaterial=material1,
                       ~targetMaterialType=AssetMaterialDataType.LightMaterial,
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
                             MainEditorSceneTool.getFirstBox(engineState);

                           [|
                             GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                               gameObject1,
                               engineState,
                             ),
                           |]
                           |>
                           expect == ImportPackageTool.getImporteMaterialAssetMaterialComponents()
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
                let (base64_1, base64_2) = _prepareFakeCanvas();

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
                            MainEditorSceneTool.getFirstBox(engineState);

                          let sourceMaterial1 =
                            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                              gameObject1,
                              engineState,
                            );

                          MainEditorMaterialTool.changeMaterial(
                            ~sourceMaterial=sourceMaterial1,
                            ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                            ~targetMaterial=material1,
                            ~targetMaterialType=AssetMaterialDataType.LightMaterial,
                            ~gameObject=gameObject1,
                            ~materialNodeId=Some(addedMaterialNodeId1),
                            (),
                          );

                          let gameObject2 =
                            MainEditorSceneTool.getSecondBox(engineState);

                          let sourceMaterial2 =
                            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                              gameObject2,
                              engineState,
                            );

                          MainEditorMaterialTool.changeMaterial(
                            ~sourceMaterial=sourceMaterial2,
                            ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                            ~targetMaterial=material2,
                            ~targetMaterialType=AssetMaterialDataType.LightMaterial,
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
                                  MainEditorSceneTool.getFirstBox(
                                    engineState,
                                  );
                                let gameObject2 =
                                  MainEditorSceneTool.getSecondBox(
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
                                |>
                                expect == ImportPackageTool.getImporteMaterialAssetMaterialComponents()
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
                let (base64_1, base64_2) = _prepareFakeCanvas();

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
                  ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                  ~targetMaterialType=AssetMaterialDataType.BasicMaterial,
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
                       MainEditorSceneTool.getFirstBox(engineState);

                     let sourceMaterial1 =
                       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         gameObject1,
                         engineState,
                       );

                     MainEditorMaterialTool.changeMaterial(
                       ~sourceMaterial=sourceMaterial1,
                       ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                       ~targetMaterial=material1,
                       ~targetMaterialType=AssetMaterialDataType.LightMaterial,
                       ~gameObject=gameObject1,
                       ~materialNodeId=Some(addedMaterialNodeId1),
                       (),
                     );

                     let gameObject2 =
                       MainEditorSceneTool.getSecondBox(engineState);

                     let sourceMaterial2 =
                       GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         gameObject2,
                         engineState,
                       );

                     MainEditorMaterialTool.changeMaterial(
                       ~sourceMaterial=sourceMaterial2,
                       ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                       ~targetMaterial=material2,
                       ~targetMaterialType=AssetMaterialDataType.BasicMaterial,
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
                             MainEditorSceneTool.getFirstBox(engineState);
                           let gameObject2 =
                             MainEditorSceneTool.getSecondBox(engineState);

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
                           |>
                           expect == (
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
    });

    describe("test geometry", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~isBuildFakeDom=false,
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
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
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

              MainEditorSceneTool.getFirstBox(engineState)
              |> GameObjectTool.setCurrentSceneTreeNode;

              MainEditorSceneTreeTool.Select.selectGameObject(
                ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                (),
              );

              let component =
                BuildComponentTool.buildGeometry(
                  ~geometryComponent=
                    GameObjectTool.getCurrentGameObjectGeometry(),
                  ~isShowGeometryGroup=true,
                  (),
                );

              component |> ReactTestTool.createSnapshotAndMatch |> resolve;
            },
          (),
        )
      );

      describe("test with wdb assets", () => {
        beforeEach(() => _prepareFakeCanvas() |> ignore);

        describe("relate wdb asset gameObjects with default geometrys", () => {
          let boxWDBArrayBuffer = ref(Obj.magic(1));

          let _generateBoxWDB = () =>
            WDBTool.generateWDB((editorState, engineState) => {
              let geometry =
                GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
                  editorState,
                );

              let (engineState, lightMaterial) =
                LightMaterialEngineService.create(engineState);

              let (editorState, engineState, box1) =
                PrimitiveEngineService.createBox(
                  (geometry, lightMaterial),
                  editorState,
                  engineState,
                );

              let (engineState, rootGameObject) =
                GameObjectEngineService.create(engineState);

              let engineState =
                engineState |> GameObjectUtils.addChild(rootGameObject, box1);

              (rootGameObject, (editorState, engineState));
            });

          beforeAll(() => boxWDBArrayBuffer := _generateBoxWDB());

          testPromise(
            {|
               1.load box wdb asset w1(with default cube geometry);
               2.export;
               3.import;
               4.drag w1 to scene tree to be gameObject g1;


               g1->geometry->select geometry group widget should only have default geometrys and be using default cube geometry
               |},
            () =>
            MainEditorAssetUploadTool.loadOneWDB(
              ~arrayBuffer=boxWDBArrayBuffer^,
              (),
            )
            |> then_(uploadedWDBNodeId =>
                 ImportPackageTool.testImportPackage(
                   ~testFunc=
                     () => {
                       let (wdbNodeId, _) =
                         ImportPackageTool.getImportedWDBAssetData()
                         |> ArrayService.unsafeGetFirst;

                       MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                         ~wdbNodeId,
                         (),
                       );

                       let engineState = StateEngineService.unsafeGetState();

                       MainEditorSceneTool.getFirstBox(engineState)
                       |> GameObjectTool.setCurrentSceneTreeNode;

                       MainEditorSceneTreeTool.Select.selectGameObject(
                         ~gameObject=
                           GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                         (),
                       );

                       let component =
                         BuildComponentTool.buildGeometry(
                           ~geometryComponent=
                             GameObjectTool.getCurrentGameObjectGeometry(),
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
               1.load box wdb asset w1(with default cube geometry);
               1.load box wdb asset w2(with default cube geometry);
               2.export;
               3.import;
               4.drag w1 to scene tree to be gameObject g1;
               5.drag w2 to scene tree to be gameObject g2;
               |},
            () => {
              let _prepare = testFunc =>
                MainEditorAssetUploadTool.loadOneWDB(
                  ~arrayBuffer=boxWDBArrayBuffer^,
                  (),
                )
                |> then_(uploadedWDBNodeId1 =>
                     MainEditorAssetUploadTool.loadOneWDB(
                       ~arrayBuffer=boxWDBArrayBuffer^,
                       (),
                     )
                     |> then_(uploadedWDBNodeId2 =>
                          ImportPackageTool.testImportPackage(
                            ~testFunc=
                              () => {
                                let (wdbNodeId1, _) =
                                  ImportPackageTool.getImportedWDBAssetData()
                                  |> ArrayService.unsafeGetFirst;

                                let (wdbNodeId2, _) =
                                  ImportPackageTool.getImportedWDBAssetData()
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

                  MainEditorSceneTool.getFirstBox(engineState)
                  |> GameObjectTool.setCurrentSceneTreeNode;

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                    (),
                  );

                  let component =
                    BuildComponentTool.buildGeometry(
                      ~geometryComponent=
                        GameObjectTool.getCurrentGameObjectGeometry(),
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

                  MainEditorSceneTool.getSecondBox(engineState)
                  |> GameObjectTool.setCurrentSceneTreeNode;

                  MainEditorSceneTreeTool.Select.selectGameObject(
                    ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                    (),
                  );

                  let component =
                    BuildComponentTool.buildGeometry(
                      ~geometryComponent=
                        GameObjectTool.getCurrentGameObjectGeometry(),
                      ~isShowGeometryGroup=true,
                      (),
                    );

                  component |> ReactTestTool.createSnapshotAndMatch |> resolve;
                })
              );
            },
          );
        });

        describe(
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
                             GameObjectTool.getCurrentGameObjectGeometry(),
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
        );
      });
    });

    describe("test import assets", () => {
      describe("test import material assets", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          )
        );

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

            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
            );

            DirectorToolEngine.prepareAndInitAllEnginState();

            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
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
                      MainEditorSceneTool.getFirstBox(engineState);

                    let sourceMaterial =
                      GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                        gameObject,
                        engineState,
                      );

                    MainEditorMaterialTool.changeMaterial(
                      ~sourceMaterial,
                      ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                      ~targetMaterial=materialComponent,
                      ~targetMaterialType=AssetMaterialDataType.LightMaterial,
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
                      ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                      ~targetMaterialType=AssetMaterialDataType.BasicMaterial,
                      ~materialNodeId,
                      (),
                    );

                    MaterialInspectorTool.changeMaterialType(
                      ~material=materialComponent,
                      ~sourceMaterialType=AssetMaterialDataType.BasicMaterial,
                      ~targetMaterialType=AssetMaterialDataType.LightMaterial,
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
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
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
               MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
             ); */

          MainEditorSceneTool.createDefaultComponents();

          FakeGlToolEngine.setFakeGl(
            FakeGlToolEngine.buildFakeGl(~sandbox, ()),
          )
          |> StateLogicService.getAndSetEngineState;

          DirectorToolEngine.prepareAndInitAllEnginState();
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;

          _prepareFakeCanvas() |> ignore;

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
                         MaterialNodeMapAssetEditorService.getValidValues(
                           editorState,
                         )
                         |> SparseMapService.length,
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
                            |> expect == (3, 3, {"type": "image/png"})
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
  });