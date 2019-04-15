open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

open Js.Promise;

let _ =
  describe("MainEditorGeometry component", () => {
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

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      describe("test change geometry", () => {
        describe("test snapshot", () => {
          describe("test show select geometry group widget", () => {
            let _addNoTexCoordGeometryWDBGameObject = () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              let (engineState, gameObject, _, _, name) =
                GeometryToolEngine.createGameObjectAndSetPointData(
                  ~engineState,
                  ~hasTexCoords=false,
                  (),
                );

              let (editorState, id1) =
                IdAssetEditorService.generateNodeId(editorState);
              let editorState =
                MainEditorAssetWDBNodeTool.addWDBNodeToRoot(
                  ~editorState,
                  ~nodeId=id1,
                  ~name,
                  ~gameObject,
                  (),
                );

              editorState |> StateEditorService.setState |> ignore;
              engineState |> StateEngineService.setState |> ignore;
            };

            let _setGameObjectLightMateiralDiffuseMap = gameObject => {
              let engineState = StateEngineService.unsafeGetState();

              let (engineState, map) =
                BasicSourceTextureEngineService.create(engineState);
              let engineState =
                GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                  gameObject,
                  engineState,
                )
                |> LightMaterialEngineService.setLightMaterialDiffuseMap(
                     _,
                     map,
                     engineState,
                   );

              StateEngineService.setState(engineState);
            };

            test(
              "if current material has no map, select geometry group should contain geometry which has texCoord or no texCoord",
              () => {
                _addNoTexCoordGeometryWDBGameObject();
                let currentGameObjectGeometry =
                  GameObjectTool.getCurrentSceneTreeNodeGeometry();

                let component =
                  BuildComponentTool.buildGeometry(
                    ~geometryComponent=currentGameObjectGeometry,
                    ~isShowGeometryGroup=true,
                    (),
                  );

                component |> ReactTestTool.createSnapshotAndMatch;
              },
            );
            test(
              "else, select geometry group should only contain geometry which has texCoord",
              () => {
              _addNoTexCoordGeometryWDBGameObject();
              _setGameObjectLightMateiralDiffuseMap(
                GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              );
              let currentGameObjectGeometry =
                GameObjectTool.getCurrentSceneTreeNodeGeometry();

              let component =
                BuildComponentTool.buildGeometry(
                  ~geometryComponent=currentGameObjectGeometry,
                  ~isShowGeometryGroup=true,
                  (),
                );

              component |> ReactTestTool.createSnapshotAndMatch;
            });
          });

          test("test hide select geometry group widget", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentSceneTreeNodeGeometry();

            let component =
              BuildComponentTool.buildGeometry(
                ~geometryComponent=currentGameObjectGeometry,
                ~isShowGeometryGroup=false,
                (),
              );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () => {
          test("test the current gameObject geometry should be Cube", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentSceneTreeNodeGeometry();

            GeometryEngineService.unsafeGetGeometryName(
              currentGameObjectGeometry,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == MainEditorGeometryTool.getDefaultCubeGeometryName();
          });
          test(
            "change geometry to be Sphere, the current gameObject geometry should be Sphere",
            () => {
              MainEditorGeometryTool.changeGeometry(
                ~sourceGeometry=
                  GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                ~targetGeometry=
                  MainEditorGeometryTool.getDefaultSphereGeometryComponent(),
                (),
              );

              let newGameObjectGeometry =
                GameObjectTool.getCurrentSceneTreeNodeGeometry();

              GeometryEngineService.unsafeGetGeometryName(
                newGameObjectGeometry,
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect
              == MainEditorGeometryTool.getDefaultSphereGeometryName();
            },
          );
          test(
            "test add Cube geometry component again and again, currentSceneTreeNode's geometry should be Cube",
            () => {
              let component =
                BuildComponentTool.buildGeometry(
                  ~geometryComponent=
                    GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                  (),
                );

              MainEditorGeometryTool.changeGeometry(
                ~sourceGeometry=
                  GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                ~targetGeometry=
                  MainEditorGeometryTool.getDefaultSphereGeometryComponent(),
                (),
              );
              MainEditorGeometryTool.changeGeometry(
                ~sourceGeometry=
                  GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                ~targetGeometry=
                  MainEditorGeometryTool.getDefaultCubeGeometryComponent(),
                (),
              );
              MainEditorGeometryTool.changeGeometry(
                ~sourceGeometry=
                  GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                ~targetGeometry=
                  MainEditorGeometryTool.getDefaultSphereGeometryComponent(),
                (),
              );
              MainEditorGeometryTool.changeGeometry(
                ~sourceGeometry=
                  GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                ~targetGeometry=
                  MainEditorGeometryTool.getDefaultCubeGeometryComponent(),
                (),
              );

              let newGameObjectGeometry =
                GameObjectTool.getCurrentSceneTreeNodeGeometry();

              StateEngineService.unsafeGetState()
              |> GeometryEngineService.unsafeGetGeometryName(
                   newGameObjectGeometry,
                 )
              |> expect == "Wonder-Default-Cube";
            },
          );
        });
      });

      describe("test load asset wdb", () => {
        let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

        beforeAll(() =>
          boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
        );
        beforeEach(() => {
          MainEditorAssetTool.buildFakeFileReader();
          MainEditorAssetTool.buildFakeImage();

          LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
          LoadTool.buildFakeURL(sandbox^);

          LoadTool.buildFakeLoadImage(.);
        });

        testPromise(
          "test select geometry group widget should show all geometry", () => {
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;
          let fileName = "BoxTextured";

          MainEditorAssetUploadTool.loadOneWDB(
            ~fileName,
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let component =
                 BuildComponentTool.buildGeometry(
                   ~geometryComponent=
                     GameObjectTool.getCurrentSceneTreeNodeGeometry(),
                   ~isShowGeometryGroup=true,
                   (),
                 );

               component |> ReactTestTool.createSnapshotAndMatch |> resolve;
             });
        });
        testPromise("test set new geometry should set into engineState", () => {
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;
          let fileName = "BoxTextured";
          let newGeometry = GeometryToolEngine.getNewGeometry();

          MainEditorAssetUploadTool.loadOneWDB(
            ~fileName,
            ~arrayBuffer=boxTexturedWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let oldGameObjectGeometry =
                 GameObjectTool.getCurrentSceneTreeNodeGeometry();

               MainEditorGeometryTool.changeGeometry(
                 ~sourceGeometry=oldGameObjectGeometry,
                 ~targetGeometry=newGeometry,
                 (),
               );

               let newGameObjectGeometry =
                 GameObjectTool.getCurrentSceneTreeNodeGeometry();

               GeometryEngineService.unsafeGetGeometryName(
                 newGameObjectGeometry,
               )
               |> StateLogicService.getEngineStateToGetData
               |> expect == MainEditorGeometryTool.getBoxTexturedGeometryName()
               |> resolve;
             });
        });
      });
    });

    describe("test select geometry group->show order", () => {
      let truckWDBArrayBuffer = ref(Obj.magic(1));

      beforeAll(() =>
        truckWDBArrayBuffer := WDBTool.convertGLBToWDB("CesiumMilkTruck")
      );
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);

        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      });

      testPromise(
        {|
        order should be:
        1)default geometry is in the end;
        2)sort geometry assets by firstname alphabetically
        |},
        () =>
        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=truckWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId =>
             BuildComponentTool.buildGeometry(
               ~geometryComponent=
                 GameObjectTool.getCurrentSceneTreeNodeGeometry(),
               ~isShowGeometryGroup=true,
               (),
             )
             |> ReactTestTool.createSnapshotAndMatch
             |> resolve
           )
      );
    });
  });