open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

open NodeAssetType;

let _ =
  describe("header import package->dispose assets", () => {
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
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

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

        InspectorCanvasTool.prepareInspectorEngineState(sandbox);

        CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

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
              GeometryEngineService.createSphereGeometry(1., 3, engineState);
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

    describe("dispose script event function assets", () => {
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
      });

      testPromise(
        {|
          add script event function asset;
          export;
          import;

          should has one script event function asset;
          |},
        () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

          ImportPackageTool.testImportPackage(
            ~testFunc=
              () =>
                ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes
                |> StateLogicService.getEditorState
                |> Js.Array.length
                |> expect == 1
                |> resolve,
            (),
          );
        },
      );

      describe("should remove from script components", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          MainEditorInspectorAddComponentTool.addScriptComponent();
        });

        test(
          {|
          current gameObject g1 add script component s1;
          add script event function asset sef1;
          s1 add sef1;
          invoke import package->disposeAssets

          sef1 should only be removed from s1;
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

            ImportPackageTool.disposeAssets();

            ScriptEngineService.hasScriptEventFunctionData(
              script,
              eventFunctionName,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false;
          },
        );
      });
    });

    describe("dispose script attribute assets", () => {
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
      });

      testPromise(
        {|
          add script attribute asset;
          export;
          import;

          should has one script attribute asset;
          |},
        () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

          ImportPackageTool.testImportPackage(
            ~testFunc=
              () =>
                ScriptAttributeNodeAssetEditorService.findAllScriptAttributeNodes
                |> StateLogicService.getEditorState
                |> Js.Array.length
                |> expect == 1
                |> resolve,
            (),
          );
        },
      );

      describe("should remove from script components", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );

          MainEditorInspectorAddComponentTool.addScriptComponent();
        });

        test(
          {|
          current gameObject g1 add script component s1;
          add script attribute asset sa1;
          s1 add sa1;
          invoke import package->disposeAssets

          sa1 should only be removed from s1;
          |},
          () => {
            let script = GameObjectTool.getCurrentSceneTreeNodeScript();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
            MainEditorScriptAttributeTool.addScriptAttribute(
              ~script,
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );
            let attributeName =
              ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
              |> StateLogicService.getEditorState;

            ImportPackageTool.disposeAssets();

            ScriptEngineService.hasScriptAttributeData(script, attributeName)
            |> StateLogicService.getEngineStateToGetData
            |> expect == false;
          },
        );
      });
    });

    describe("dispose asset bundle assets", () => {
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
      });

      testPromise(
        {|
          add asset bundle asset;
          export;
          import;

          should has one asset bundle asset;
          |},
        () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

          MainEditorAssetUploadTool.loadOneAssetBundle()
          |> then_(uploadedAssetBundleNodeId =>
               ImportPackageTool.testImportPackage(
                 ~testFunc=
                   () =>
                     AssetBundleNodeAssetEditorService.findAllAssetBundleNodes
                     |> StateLogicService.getEditorState
                     |> Js.Array.length
                     |> expect == 1
                     |> resolve,
                 (),
               )
             );
        },
      );
    });

    testPromise("clear imageData map", () => {
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
                       |> expect == 3
                       |> resolve,
                   (),
                 ),
             (),
           )
         );
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
  });