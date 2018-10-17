open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("fix material asset bug", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () => {
      describe("fix change material type bug", () => {
        let _prepareTwoGameObjects = () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
          let engineState = StateEngineService.unsafeGetState();
          let gameObject1 = MainEditorSceneTool.getFirstBox(engineState);
          let gameObject2 = MainEditorSceneTool.getSecondBox(engineState);
          let sourceMaterial1 =
            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
              gameObject1,
              engineState,
            );
          let sourceMaterial2 =
            GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
              gameObject2,
              engineState,
            );

          MainEditorAssetHeaderOperateNodeTool.addMaterial();
          let {materialComponent}: AssetNodeType.materialResultType =
            StateEditorService.getState()
            |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                 addedMaterialNodeId,
               );
          MainEditorMaterialTool.changeMaterial(
            ~sourceMaterial=sourceMaterial1,
            ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
            ~targetMaterial=materialComponent,
            ~targetMaterialType=AssetMaterialDataType.LightMaterial,
            ~gameObject=gameObject1,
            ~materialNodeId=Some(addedMaterialNodeId),
            (),
          );
          MainEditorMaterialTool.changeMaterial(
            ~sourceMaterial=sourceMaterial2,
            ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
            ~targetMaterial=materialComponent,
            ~targetMaterialType=AssetMaterialDataType.LightMaterial,
            ~gameObject=gameObject2,
            ~materialNodeId=Some(addedMaterialNodeId),
            (),
          );

          (
            (gameObject1, gameObject2),
            materialComponent,
            addedMaterialNodeId,
          );
        };

        describe("fix change inspector->MainEditorMaterial type bug", () => {
          describe(
            {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        change g1->material->type to basicMaterial;
        |},
            () =>
            test("m1->type should be basicMaterial", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();
              let gameObject = GameObjectTool.unsafeGetCurrentSceneTreeNode();

              MainEditorAssetHeaderOperateNodeTool.addMaterial();
              let {materialComponent}: AssetNodeType.materialResultType =
                StateEditorService.getState()
                |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                     addedMaterialNodeId,
                   );
              MainEditorMaterialTool.changeMaterial(
                ~sourceMaterial=
                  GameObjectTool.getCurrentGameObjectLightMaterial(),
                ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
                ~targetMaterial=materialComponent,
                ~targetMaterialType=AssetMaterialDataType.LightMaterial,
                ~gameObject,
                ~materialNodeId=Some(addedMaterialNodeId),
                (),
              );

              MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();

              let {type_}: AssetNodeType.materialResultType =
                StateEditorService.getState()
                |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                     addedMaterialNodeId,
                   );
              type_ |> expect == AssetMaterialDataType.BasicMaterial;
            })
          );

          describe(
            {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        select sceneTree->gameObject g2;
        g2 change material to m1;
        change g1->material->type to basicMaterial;
        change g1->material->type to lightMaterial;
        |},
            () =>
            test("m1->type and g2->material->type should be lightMaterial", () => {
              let (
                (gameObject1, gameObject2),
                materialComponent,
                addedMaterialNodeId,
              ) =
                _prepareTwoGameObjects();
              gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

              MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
              MainEditorLightMaterialTool.changeMaterialTypeToBeLightMaterial();

              let {type_}: AssetNodeType.materialResultType =
                StateEditorService.getState()
                |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                     addedMaterialNodeId,
                   );
              let engineState = StateEngineService.unsafeGetState();
              (
                type_,
                GameObjectComponentEngineService.hasLightMaterialComponent(
                  gameObject2,
                  engineState,
                ),
              )
              |> expect == (AssetMaterialDataType.LightMaterial, true);
            })
          );
        });

        describe("fix change MaterialInspector->type bug", () => {
          let _prepareAndExec = () => {
            let (
              (gameObject1, gameObject2),
              materialComponent,
              addedMaterialNodeId,
            ) =
              _prepareTwoGameObjects();

            MaterialInspectorTool.changeMaterialType(
              ~material=materialComponent,
              ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
              ~targetMaterialType=AssetMaterialDataType.BasicMaterial,
              ~materialNodeId=addedMaterialNodeId,
              (),
            );

            (
              (gameObject1, gameObject2),
              materialComponent,
              addedMaterialNodeId,
            );
          };

          describe(
            {|
        add material m1;
        select sceneTree->gameObject g1;
        g1 change material to m1;
        select sceneTree->gameObject g2;
        g2 change material to m1;
        change m1->type to basicMaterial;
        |},
            () => {
              test(
                "g1,g2->material->material type should be basicMaterial;", () => {
                let ((gameObject1, gameObject2), _, _) = _prepareAndExec();

                let engineState = StateEngineService.unsafeGetState();
                (
                  GameObjectComponentEngineService.hasBasicMaterialComponent(
                    gameObject1,
                    engineState,
                  ),
                  GameObjectComponentEngineService.hasBasicMaterialComponent(
                    gameObject2,
                    engineState,
                  ),
                )
                |> expect == (true, true);
              });
              test(
                "should dispose source material asset->materialComponent", () => {
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

                let ((gameObject1, gameObject2), sourceMaterialAsset, _) =
                  _prepareAndExec();

                DirectorToolEngine.runWithDefaultTimeEngineState();

                let engineState = StateEngineService.unsafeGetState();
                LightMaterialToolEngine.isAlive(
                  sourceMaterialAsset,
                  engineState,
                )
                |> expect == false;
              });

              describe(
                {|
    change g1->material->type to lightMaterial;
    |}, () =>
                test(
                  "m1->type and g2->material->type should be lightMaterial", () => {
                  let ((gameObject1, gameObject2), _, addedMaterialNodeId) =
                    _prepareAndExec();

                  let engineState = StateEngineService.unsafeGetState();

                  gameObject1 |> GameObjectTool.setCurrentSceneTreeNode;

                  MainEditorLightMaterialTool.changeMaterialTypeToBeLightMaterial();

                  let {type_}: AssetNodeType.materialResultType =
                    StateEditorService.getState()
                    |> AssetMaterialNodeMapEditorService.unsafeGetResult(
                         addedMaterialNodeId,
                       );
                  let engineState = StateEngineService.unsafeGetState();
                  (
                    type_,
                    GameObjectComponentEngineService.hasLightMaterialComponent(
                      gameObject2,
                      engineState,
                    ),
                  )
                  |> expect == (AssetMaterialDataType.LightMaterial, true);
                })
              );
            },
          );
        });
      });

      describe(
        {|
        add material m1;
        upload texture t1;
        drag t1 to m1->diffuseMap;
        remove t1 by remove texture asset;
        |},
        () => {
          beforeEach(() => {
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();
          });

          testPromise("m1->materialInspector->diffuseMap should be none", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

            MainEditorAssetHeaderOperateNodeTool.addMaterial();

            let material =
              MaterialAssetTool.getMaterialComponent(
                ~nodeId=addedMaterialNodeId,
                (),
              );

            MainEditorAssetUploadTool.loadOneTexture()
            |> then_(uploadedTextureNodeId => {
                 let editorState = StateEditorService.getState();
                 let textureComponent =
                   MainEditorAssetTextureNodeTool.getTextureComponent(
                     uploadedTextureNodeId,
                     editorState,
                   );

                 MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
                   ~textureNodeId=uploadedTextureNodeId,
                   ~material,
                   (),
                 );
                 MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                   ~textureNodeId=uploadedTextureNodeId,
                   (),
                 );
                 MainEditorAssetTreeTool.Select.selectMaterialNode(
                   ~nodeId=addedMaterialNodeId,
                   (),
                 );

                 BuildComponentTool.buildInspectorComponent(
                   TestTool.buildEmptyAppState(),
                   InspectorTool.buildFakeAllShowComponentConfig(),
                 )
                 |> ReactTestTool.createSnapshotAndMatch
                 |> resolve;
               });
          });
        },
      );
    });
  });