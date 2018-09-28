open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorLightMaterial", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareWithEmptyJob = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };
    let _prepareDefaultSceneAndInit = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
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

        PickColorEventTool.testOperateColorPickToChangeColor(
          sandbox,
          BuildComponentForCurryTool.buildLightMaterial,
          (
            GameObjectTool.getCurrentGameObjectLightMaterial,
            PickColorEventTool.triggerChangeLightMaterialColor,
            LightMaterialEngineService.getLightMaterialDiffuseColor,
          ),
        );
      });

      describe("test gameObject light material texture", () => {
        let _getGameObjectMaterialMap = (engineState, gameObject) =>
          engineState
          |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
               gameObject,
             )
          |. LightMaterialEngineService.getLightMaterialDiffuseMap(
               engineState,
             );

        beforeEach(() => {
          _prepareWithEmptyJob();
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            () => {
              MainEditorAssetTool.initAssetTree();
              MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
            },
          );

          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.SceneTree,
          )
          |> StateLogicService.getAndSetEditorState;
        });
        afterEach(() =>
          StateEditorService.getState()
          |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
          |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
          |> StateEditorService.setState
          |> ignore
        );

        describe("test drag texture to set gameObject material map", () => {
          describe("test snapshot", () => {
            test("test no drag", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });

            test(
              "test drag texture asset into gameObject material map zone, the zone should show the texture source",
              () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
                |> MainEditorMaterialTool.triggerFileDragStartEvent;

                MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();

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
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let firstTextureDomIndex =
                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex;
              let secondTextureDomIndex =
                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getSecondTextureDomIndex;

              MainEditorMaterialTool.triggerFileDragStartEvent(
                firstTextureDomIndex,
              );
              MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();

              MainEditorMaterialTool.triggerFileDragStartEvent(
                secondTextureDomIndex,
              );
              MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();

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
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                  MainEditorAssetTool.fileLoad(
                    TestTool.getDispatch(),
                    BaseEventTool.buildFileEvent(),
                  )
                  |> Js.Promise.then_(() => testFunc(assetTreeDomRecord));
                };

                let _exec =
                    (
                      ~assetTreeDomRecord,
                      ~sceneTreeInspectorDomIndex=None,
                      (),
                    ) => {
                  assetTreeDomRecord
                  |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                  |> MainEditorMaterialTool.triggerFileDragStartEvent;

                  switch (sceneTreeInspectorDomIndex) {
                  | None =>
                    MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial()
                  | Some(sceneTreeInspectorDomIndex) =>
                    MainEditorMaterialTool.triggerDragTextureToGameObjectMaterialWithSceneTreeInspectorDomIndex(
                      sceneTreeInspectorDomIndex,
                    )
                  };
                };

                let _getMap = () => {
                  let engineState = StateEngineService.unsafeGetState();
                  let currentGameObject =
                    SceneEditorService.unsafeGetCurrentSceneTreeNode
                    |> StateLogicService.getEditorState;

                  engineState
                  |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                       currentGameObject,
                     )
                  |. LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
                       engineState,
                     )
                  |> TypeArrayType.convertUint32ToInt;
                };

                beforeEach(() => {
                  MainEditorAssetTool.buildFakeFileReader();
                  MainEditorAssetTool.buildFakeImage();
                });

                testPromise("should set texture to be material's map", () =>
                  _prepare(assetTreeDomRecord => {
                    _exec(~assetTreeDomRecord, ());

                    _getMap()
                    |>
                    expect == MainEditorAssetNodeTool.OperateTwoLayer.getUploadedTextureIndex(
                                assetTreeDomRecord,
                              )
                    |> Js.Promise.resolve;
                  })
                );
                testPromise("if gameObject has no geometry, still can set", () =>
                  _prepare(assetTreeDomRecord => {
                    SceneTreeNodeDomTool.OperateDefaultScene.getGeometryComponentFromBox()
                    |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

                    _exec(
                      ~assetTreeDomRecord,
                      ~sceneTreeInspectorDomIndex=Some(2),
                      (),
                    );

                    _getMap()
                    |>
                    expect == MainEditorAssetNodeTool.OperateTwoLayer.getUploadedTextureIndex(
                                assetTreeDomRecord,
                              )
                    |> Js.Promise.resolve;
                  })
                );
                testPromise(
                  "if gameObject->geometry has no texCoords, warn and can't set",
                  () =>
                  _prepare(assetTreeDomRecord => {
                    let warn =
                      createMethodStubWithJsObjSandbox(
                        sandbox,
                        ConsoleTool.console,
                        "warn",
                      );
                    let currentGameObject =
                      SceneEditorService.unsafeGetCurrentSceneTreeNode
                      |> StateLogicService.getEditorState;

                    let engineState = StateEngineService.unsafeGetState();
                    let engineState =
                      GameObjectComponentEngineService.unsafeGetGeometryComponent(
                        currentGameObject,
                        engineState,
                      )
                      |> GeometryEngineService.setGeometryTexCoords(
                           _,
                           Js.Typed_array.Float32Array.make([||]),
                           engineState,
                         );
                    engineState |> StateEngineService.setState |> ignore;

                    _exec(~assetTreeDomRecord, ());

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
                  GameObjectTool.getCurrentGameObjectLightMaterial();
                let newColor = {
                  "hex": "#7df1e8",
                  "rgb": {
                    "r": 125,
                    "g": 241,
                    "b": 232,
                  },
                };
                PickColorEventTool.triggerChangeLightMaterialColor(
                  currentGameObjectMaterial,
                  newColor,
                );
                let oldColor =
                  LightMaterialEngineService.getLightMaterialDiffuseColor(
                    currentGameObjectMaterial,
                  )
                  |> StateLogicService.getEngineStateToGetData
                  |> Color.getHexString;

                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
                |> MainEditorMaterialTool.triggerFileDragStartEvent;

                MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();

                let currentGameObjectMaterial =
                  GameObjectTool.getCurrentGameObjectLightMaterial();
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
          describe("test snapshop", () => {
            test("test if not set map,should change nothing", () => {
              MainEditorMaterialTool.triggerTextureRemoveClickEvent();

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });

            test("test if have already set map,should remove map", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
              |> MainEditorMaterialTool.triggerFileDragStartEvent;
              MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();
              MainEditorMaterialTool.triggerTextureRemoveClickEvent();

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });

          describe("test logic", () => {
            test("should remove material's map", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
              |> MainEditorMaterialTool.triggerFileDragStartEvent;
              MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();
              MainEditorMaterialTool.triggerTextureRemoveClickEvent();

              let currentGameObject =
                SceneEditorService.unsafeGetCurrentSceneTreeNode
                |> StateLogicService.getEditorState;

              let engineMaterialMap =
                _getGameObjectMaterialMap(
                  StateEngineService.unsafeGetState(),
                  currentGameObject,
                );

              engineMaterialMap |> expect == None;
            });

            describe("should replace material of current scene tree node", () => {
              let _exec = () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
                |> MainEditorMaterialTool.triggerFileDragStartEvent;
                MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();
                MainEditorMaterialTool.triggerTextureRemoveClickEvent();
              };

              test("test", () => {
                let currentGameObject =
                  SceneEditorService.unsafeGetCurrentSceneTreeNode
                  |> StateLogicService.getEditorState;
                let oldMaterial =
                  StateEngineService.unsafeGetState()
                  |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                       currentGameObject,
                     );

                _exec();

                let newMaterial =
                  StateEngineService.unsafeGetState()
                  |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                       currentGameObject,
                     );
                newMaterial |> expect |> not_ |> toEqual(oldMaterial);
              });

              describe(
                "the other gameObjects which use the material shouldn't be affected",
                () =>
                test("test gameObject in scene", () => {
                  let currentGameObject =
                    SceneEditorService.unsafeGetCurrentSceneTreeNode
                    |> StateLogicService.getEditorState;
                  let engineState = StateEngineService.unsafeGetState();
                  let oldMaterial =
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         currentGameObject,
                       );
                  let (engineState, gameObject2) =
                    GameObjectEngineService.create(engineState);
                  let engineState =
                    SceneEngineService.addSceneChild(
                      gameObject2,
                      engineState,
                    );
                  let engineState =
                    GameObjectComponentEngineService.addLightMaterialComponent(
                      gameObject2,
                      oldMaterial,
                      engineState,
                    );
                  engineState |> StateEngineService.setState |> ignore;

                  _exec();

                  let engineState = StateEngineService.unsafeGetState();
                  let newMaterial1 =
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         currentGameObject,
                       );
                  let newMaterial2 =
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
                         gameObject2,
                       );

                  (
                    JudgeTool.isEqual(newMaterial1, oldMaterial),
                    JudgeTool.isEqual(newMaterial2, oldMaterial),
                  )
                  |> expect == (false, true);
                })
              );
            });
          });
        });
      });

      describe("test change light material shininess", () => {
        beforeEach(() => {
          _prepareWithEmptyJob();

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          );
        });

        describe("test logic", () =>
          test("test change shininess should set into engine", () => {
            let currentGameObjectMaterial =
              GameObjectTool.getCurrentGameObjectLightMaterial();
            let component =
              BuildComponentTool.buildLightMaterial(
                currentGameObjectMaterial,
              );
            let value = 1.1;

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorMaterialTool.triggerShininessChangeEvent(value),
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorMaterialTool.triggerShininessBlurEvent(value),
            );

            LightMaterialEngineService.getLightMaterialShininess(
              currentGameObjectMaterial,
            )
            |> StateLogicService.getEngineStateToGetData
            |. FloatService.truncateFloatValue(5)
            |> expect == value;
          })
        );
      });
    });
  });