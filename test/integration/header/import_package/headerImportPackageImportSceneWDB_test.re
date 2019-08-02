open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

open NodeAssetType;

let _ =
  describe("header import package->import scene wdb", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareFakeCanvas = sandbox =>
      ImportPackageTool.prepareFakeCanvas(sandbox);

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerEmptyJobConfig(),
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

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

      DirectorToolEngine.prepareAndInitAllEnginState();

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

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

    describe("test skybox", () => {
      let _prepare = sandbox => {
        let _ = WDBTool.prepareFakeCanvas(sandbox);
        let _ = MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
        let addedCubemapNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addCubemap();

        let cubemapName = "ACubemap";

        AssetInspectorTool.Rename.renameAssetCubemapNode(
          ~nodeId=addedCubemapNodeId1,
          ~name=cubemapName,
          (),
        );

        let ((editorState, engineState), _, _) =
          MainEditorAssetCubemapNodeTool.setAllSources(
            ~nodeId=addedCubemapNodeId1,
            (),
          );

        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        HeaderSettingTool.Scene.Skybox.setCubemapTextureToSceneSkybox(
          MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
            ~nodeId=addedCubemapNodeId1,
            (),
          ),
        );

        let wpkArrayBuffer = ExportPackageTool.exportWPK();

        HeaderSettingTool.Scene.Skybox.removeCubemap();

        (wpkArrayBuffer, cubemapName);
      };

      testPromise("set package->skybox->cubemap", () => {
        let (wpkArrayBuffer, cubemapName) = _prepare(sandbox);

        ImportPackageTool.testImportPackageWithoutExport(
          ~wpkArrayBuffer,
          ~testFunc=
            () => {
              let engineState = StateEngineService.unsafeGetState();

              CubemapTextureEngineService.unsafeGetCubemapTextureName(
                SceneEngineService.getCubemapTexture(engineState)
                |> OptionService.unsafeGet,
                engineState,
              )
              |> expect == cubemapName
              |> resolve;
            },
          (),
        );
      });

      describe("relate scene skybox->cubemap and cubemap assets", () => {
        testPromise(
          "should set the corresponding one of cubemap assets to scene skybox",
          () => {
          let (wpkArrayBuffer, cubemapName) = _prepare(sandbox);

          ImportPackageTool.testImportPackageWithoutExport(
            ~wpkArrayBuffer,
            ~testFunc=
              () => {
                let engineState = StateEngineService.unsafeGetState();

                (
                  ImportPackageTool.Cubemap.getImportedCubemapAssetCubemapComponents()
                  |> Js.Array.length,
                  SceneEngineService.getCubemapTexture(engineState)
                  |> OptionService.unsafeGet,
                )
                |> expect
                == (
                     1,
                     ImportPackageTool.Cubemap.getImportedCubemapAssetCubemapComponents()
                     |> ArrayService.unsafeGetFirst,
                   )
                |> resolve;
              },
            (),
          );
        });
        testPromise("should init scene skybox->cubemap", () => {
          let _ = WDBTool.prepareFakeCanvas(sandbox);
          let glTexture = Obj.magic(1);
          let createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          createTexture |> returns(glTexture);
          FakeGlToolEngine.setFakeGl(
            FakeGlToolEngine.buildFakeGl(~sandbox, ~createTexture, ()),
          )
          |> StateLogicService.getAndSetEngineState;

          let (wpkArrayBuffer, cubemapName) = _prepare(sandbox);

          ImportPackageTool.testImportPackageWithoutExport(
            ~wpkArrayBuffer,
            ~testFunc=
              () => {
                let engineState = StateEngineService.unsafeGetState();
                CubemapTextureToolEngine.unsafeGetGlTexture(
                  SceneEngineService.getCubemapTexture(engineState)
                  |> OptionService.unsafeGet,
                  engineState,
                )
                |> expect == glTexture
                |> resolve;
              },
            (),
          );
        });
      });
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
                  ~gameObject=MainEditorSceneTool.getSecondCube(engineState),
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
              let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();

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
                   MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
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
                         let engineState = StateEngineService.unsafeGetState();
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

              let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
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
                        MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                          ~textureNodeId=uploadedTextureNodeId1,
                          ~material=material1,
                          (),
                        );
                        MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                          ~textureNodeId=uploadedTextureNodeId2,
                          ~material=material2,
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
                                MainEditorSceneTool.getFirstCube(engineState);
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

              let addedMaterialNodeId1 = MainEditorAssetIdTool.getNewAssetId();
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

              MainEditorLightMaterialForGameObjectTool.changeColor(
                material1,
                color1,
              );
              MainEditorBasicMaterialForGameObjectTool.changeColor(
                material2,
                color2,
              );

              MainEditorAssetUploadTool.loadOneTexture(
                ~imgName="1.png",
                ~imgSrc=base64_1,
                (),
              )
              |> then_(uploadedTextureNodeId1 => {
                   MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
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
                         let engineState = StateEngineService.unsafeGetState();

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

    describe("relate scene gameObjects and script event function assets", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorInspectorAddComponentTool.addScriptComponent();
      });

      describe("relate by event function name", () =>
        testPromise(
          {|
            add script event function asset sef1;
            gameObject g1 in scene use sef1;
            export;
            import;
            remove script event function asset sef1;

            should remove sef1 from g1->script component;
            |},
          () => {
            let currentGameObjectName = "Cube1";
            GameObjectEngineService.setGameObjectName(
              currentGameObjectName,
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getAndSetEngineState;

            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

            let scriptEventFunctionDataName =
              ScriptEventFunctionInspectorTool.getEventFunctionName(
                addedNodeId,
              )
              |> StateLogicService.getEditorState;

            MainEditorScriptEventFunctionTool.addScriptEventFunction(
              ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () => {
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
                      SceneToolEngine.findGameObjectByName(
                        currentGameObjectName,
                        engineState,
                      )
                      |> ArrayService.unsafeGetFirst,
                      engineState,
                    ),
                    scriptEventFunctionDataName,
                    engineState,
                  )
                  |> expect == false
                  |> resolve;
                },
              (),
            );
          },
        )
      );
    });

    describe("relate scene gameObjects and script attribute assets", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorInspectorAddComponentTool.addScriptComponent();
      });

      describe("relate by attribute name", () =>
        describe(
          "gameObject->script component->attribute can be different from script attribute asset->attribute after import",
          () =>
          testPromise(
            {|
                 add script attribute asset sef1;
                 gameObject g1 in scene use sef1;
                 update g1->script->attribute->field->defaultValue to d1;
                 export;
                 import;

                 g1->script->attribute->field->defaultValue should still be d1;
                 |},
            () => {
              let currentGameObjectName = "Cube1";
              GameObjectEngineService.setGameObjectName(
                currentGameObjectName,
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              )
              |> StateLogicService.getAndSetEngineState;

              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
              ScriptAttributeInspectorTool.addDefaultField(
                ~sandbox,
                ~nodeId=addedNodeId,
                (),
              );

              let script = GameObjectTool.getCurrentSceneTreeNodeScript();

              MainEditorScriptAttributeTool.addScriptAttribute(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let engineState = StateEngineService.unsafeGetState();
              let attributeName =
                ScriptAttributeInspectorTool.getAttributeName(
                  addedNodeId,
                  engineState,
                );
              let attribute =
                ScriptAttributeInspectorTool.getAttribute(
                  addedNodeId,
                  engineState,
                );
              let (fieldName, field) =
                ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
                |> StateLogicService.getEditorState
                |> ArrayService.unsafeGetFirst;

              let newDefaultValue = 1.1;

              engineState |> StateEngineService.setState |> ignore;

              MainEditorScriptAttributeTool.changeScriptAttributeFieldDefaultValueFloat(
                script,
                attributeName,
                fieldName,
                attribute,
                newDefaultValue,
              );

              ImportPackageTool.testImportPackage(
                ~testFunc=
                  () => {
                    let scriptAttributeNodeId =
                      ImportPackageTool.getImportedScriptAttributeAssetNodeId()
                      |> ArrayService.unsafeGetFirst;

                    let engineState = StateEngineService.unsafeGetState();

                    ScriptAttributeFieldTool.unsafeGetScriptAttributeFieldDefaultValue(
                      GameObjectComponentEngineService.unsafeGetScriptComponent(
                        SceneToolEngine.findGameObjectByName(
                          currentGameObjectName,
                          engineState,
                        )
                        |> ArrayService.unsafeGetFirst,
                        engineState,
                      ),
                      attributeName,
                      fieldName,
                      engineState,
                    )
                    |> expect
                    == (
                         newDefaultValue
                         |> ScriptAttributeFieldTool.buildFloatValue
                       )
                    |> resolve;
                  },
                (),
              );
            },
          )
        )
      );
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