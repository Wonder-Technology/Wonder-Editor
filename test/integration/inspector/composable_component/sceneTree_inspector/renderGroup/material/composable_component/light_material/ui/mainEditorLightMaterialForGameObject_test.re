open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorLightMaterialForGameObject component", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareWithEmptyJob = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };
    let _prepareDefaultSceneAndInit = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
      DirectorToolEngine.prepareAndInitAllEnginState();
    };

    let _prepareWithJob = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
        (),
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      describe("test change color", () => {
        beforeEach(() => {
          _prepareWithJob();
          _prepareDefaultSceneAndInit();
        });

        PickColorTool.testOperateColorPickToChangeColor(
          sandbox,
          (
            GameObjectTool.getCurrentSceneTreeNodeLightMaterial,
            MainEditorLightMaterialForGameObjectTool.changeColor,
            LightMaterialEngineService.getLightMaterialDiffuseColor,
          ),
        );
      });

      describe("test gameObject light material texture", () => {
        let _getGameObjectMaterialMap = (engineState, gameObject) =>
          (
            engineState
            |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                 gameObject,
               )
          )
          ->(
              LightMaterialEngineService.getLightMaterialDiffuseMap(
                engineState,
              )
            );

        beforeEach(() => {
          _prepareWithEmptyJob();
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            () => {
              MainEditorAssetTool.initAssetTree();
              MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
            },
          );

          CurrentSelectSourceEditorService.setCurrentSelectSource(
            SceneTreeWidgetService.getWidget(),
          )
          |> StateLogicService.getAndSetEditorState;
        });
        afterEach(() =>
          StateEditorService.getState()
          |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
          |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
          |> StateEditorService.setState
          |> ignore
        );

        describe("test drag texture to set gameObject material map", () => {
          describe("test snapshot", () => {
            test("test no drag", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });

            test(
              "test drag texture asset into gameObject material map zone, the zone should show the texture source",
              () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

                MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                  ~textureNodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                      assetTreeData,
                    ),
                  (),
                );
                MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                  ~textureNodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getSecondTextureNodeId(
                      assetTreeData,
                    ),
                  (),
                );

                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              },
            );

            test(
              "test set map when already has map, material's map should be the new one",
              () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

              MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                ~textureNodeId=
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                    assetTreeData,
                  ),
                (),
              );
              MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                ~textureNodeId=
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.getSecondTextureNodeId(
                    assetTreeData,
                  ),
                (),
              );

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });

          describe("test logic", () =>
            describe(
              {|
              upload texture;
              drag texture to set gameObject->material->map;
               |},
              () => {
                let _prepare = testFunc => {
                  let assetTreeData =
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

                  MainEditorAssetUploadTool.loadOneTexture()
                  |> Js.Promise.then_(uploadedTextureNodeId =>
                       testFunc(uploadedTextureNodeId, assetTreeData)
                     );
                };

                let _exec = uploadedTextureNodeId =>
                  MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                    ~textureNodeId=uploadedTextureNodeId,
                    (),
                  );

                let _hasMap = () => {
                  let engineState = StateEngineService.unsafeGetState();
                  let currentGameObject =
                    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
                    |> StateLogicService.getEditorState;

                  (
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         currentGameObject,
                       )
                  )
                  ->(
                      LightMaterialEngineService.hasLightMaterialDiffuseMap(
                        engineState,
                      )
                    );
                };

                beforeEach(() => {
                  MainEditorAssetTool.buildFakeFileReader();
                  MainEditorAssetTool.buildFakeImage();
                });

                testPromise("should set texture to be material's map", () =>
                  _prepare((uploadedTextureNodeId, assetTreeData) => {
                    _exec(uploadedTextureNodeId);

                    _hasMap() |> expect == true |> Js.Promise.resolve;
                  })
                );
                testPromise("if gameObject has no geometry, still can set", () =>
                  _prepare((uploadedTextureNodeId, assetTreeData) => {
                    /* SceneTreeNodeDomTool.OperateDefaultScene.getGeometryComponentFromCube()
                       |> OperateComponentEventTool.removeComponentFromCurrentSceneTreeNode; */

                    MainEditorInspectorRemoveComponentTool.removeGeometryComponent();

                    _exec(uploadedTextureNodeId);

                    _hasMap() |> expect == true |> Js.Promise.resolve;
                  })
                );
                testPromise(
                  "if gameObject->geometry has no texCoords, warn and can't set",
                  () =>
                  _prepare((uploadedTextureNodeId, assetTreeData) => {
                    ConsoleTool.notShowMessage();
                    let warn =
                      createMethodStubWithJsObjSandbox(
                        sandbox,
                        ConsoleTool.console,
                        "warn",
                      );
                    let currentGameObject =
                      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
                      |> StateLogicService.getEditorState;

                    let engineState = StateEngineService.unsafeGetState();
                    let engineState =
                      GameObjectComponentEngineService.unsafeGetGeometryComponent(
                        currentGameObject,
                        engineState,
                      )
                      |> GeometryEngineService.setGeometryTexCoords(
                           Js.Typed_array.Float32Array.make([||]),
                           _,
                           engineState,
                         );
                    engineState |> StateEngineService.setState |> ignore;

                    _exec(uploadedTextureNodeId);

                    let engineMaterialMap =
                      _getGameObjectMaterialMap(
                        StateEngineService.unsafeGetState(),
                        currentGameObject,
                      );

                    (
                      ConsoleTool.getMessage(warn)
                      |> Js.String.includes("have no texCoords"),
                      engineMaterialMap,
                    )
                    |> expect == (true, None)
                    |> Js.Promise.resolve;
                  })
                );
              },
            )
          );
          describe("fix bug", () =>
            test(
              {|
              set lightMaterial color;
              drag texture to set gameObject material texture;

              the color should == original color
            |},
              () => {
                let currentGameObjectMaterial =
                  GameObjectTool.getCurrentSceneTreeNodeLightMaterial();
                let newColor = {
                  "hex": "#7df1e8",
                  "rgb": {
                    "r": 125,
                    "g": 241,
                    "b": 232,
                  },
                };

                MainEditorLightMaterialForGameObjectTool.changeColor(
                  currentGameObjectMaterial,
                  newColor,
                );

                let oldColor =
                  LightMaterialEngineService.getLightMaterialDiffuseColor(
                    currentGameObjectMaterial,
                  )
                  |> StateLogicService.getEngineStateToGetData
                  |> Color.getHexString;

                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

                MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                  ~textureNodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                      assetTreeData,
                    ),
                  (),
                );
                MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                  ~textureNodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Texture.getSecondTextureNodeId(
                      assetTreeData,
                    ),
                  (),
                );

                let currentGameObjectMaterial =
                  GameObjectTool.getCurrentSceneTreeNodeLightMaterial();
                let newColor =
                  LightMaterialEngineService.getLightMaterialDiffuseColor(
                    currentGameObjectMaterial,
                  )
                  |> StateLogicService.getEngineStateToGetData
                  |> Color.getHexString;

                newColor |> expect == oldColor;
              },
            )
          );
        });

        describe("test set remove texture", () => {
          beforeEach(() => {
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

          describe("test snapshop", () => {
            test("test if not set map,should change nothing", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

              MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                ~textureNodeId=
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                    assetTreeData,
                  ),
                (),
              );

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });

            test("test if have already set map,should remove map", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

              let textureNodeId =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                );

              MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                ~textureNodeId,
                (),
              );
              MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                ~textureNodeId,
                (),
              );

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });

          describe("test logic", () =>
            test("should remove material's map", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

              let textureNodeId =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                );

              MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
                ~textureNodeId,
                (),
              );
              MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                ~textureNodeId,
                (),
              );

              let currentGameObject =
                SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
                |> StateLogicService.getEditorState;

              let engineMaterialMap =
                _getGameObjectMaterialMap(
                  StateEngineService.unsafeGetState(),
                  currentGameObject,
                );

              engineMaterialMap |> expect == None;
            })
          );
        });
      });

      describe("test change light material shininess", () => {
        beforeEach(() => {
          _prepareWithEmptyJob();

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          );
        });

        describe("test logic", () =>
          test("test change shininess should set into engine", () => {
            let currentGameObjectMaterial =
              GameObjectTool.getCurrentSceneTreeNodeLightMaterial();
            let component =
              BuildComponentTool.buildLightMaterialForGameObject(
                currentGameObjectMaterial,
              );
            let value = 1.1;

            MainEditorLightMaterialForGameObjectTool.changeShininess(
              ~material=currentGameObjectMaterial,
              ~value,
              (),
            );
            MainEditorLightMaterialForGameObjectTool.blurShininess(
              ~material=currentGameObjectMaterial,
              ~value,
              (),
            );

            (
              LightMaterialEngineService.getLightMaterialShininess(
                currentGameObjectMaterial,
              )
              |> StateLogicService.getEngineStateToGetData
            )
            ->(FloatService.truncateFloatValue(5))
            |> expect == value;
          })
        );
      });
    });
  });