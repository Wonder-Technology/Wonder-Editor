open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

open Js.Typed_array;

open NodeAssetType;

let _ =
  describe("header import package->geometry", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareFakeCanvas = sandbox =>
      ImportPackageTool.prepareFakeCanvas(sandbox);

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);

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

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      DirectorToolEngine.prepareAndInitAllEnginState();

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

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