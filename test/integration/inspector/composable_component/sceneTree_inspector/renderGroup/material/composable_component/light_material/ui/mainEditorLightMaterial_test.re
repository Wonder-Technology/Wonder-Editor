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
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
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
        beforeEach(() => {
          _prepareWithEmptyJob();
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            () => {
              MainEditorAssetTool.initAssetTree();
              MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();
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
            describe("test engine ", () => {
              beforeEach(() => {
                MainEditorAssetTool.buildFakeFileReader();
                MainEditorAssetTool.buildFakeImage();
              });

              testPromise(
                "test upload texture;
               drag texture to set gameObject material texture;",
                () => {
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                  MainEditorAssetTool.fileLoad(
                    TestTool.getDispatch(),
                    BaseEventTool.buildFileEvent(),
                  )
                  |> Js.Promise.then_(() => {
                       assetTreeDomRecord
                       |> MainEditorAssetNodeTool.OperateTwoLayer.getAddedFirstNodeDomIndex
                       |> MainEditorMaterialTool.triggerFileDragStartEvent;

                       MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();

                       let currentGameObject =
                         SceneEditorService.unsafeGetCurrentSceneTreeNode
                         |> StateLogicService.getEditorState;
                       let engineStateToGetData =
                         StateLogicService.getRunEngineState();

                       let mapId =
                         engineStateToGetData
                         |> GameObjectComponentEngineService.getLightMaterialComponent(
                              currentGameObject,
                            )
                         |. LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
                              engineStateToGetData,
                            )
                         |> TypeArrayType.convertUint32ToInt;

                       mapId
                       |>
                       expect == MainEditorAssetNodeTool.OperateTwoLayer.getUploadedTextureIndex(
                                   assetTreeDomRecord,
                                 )
                       |> Js.Promise.resolve;
                     });
                },
              );
            })
          );
          describe("fix bug", () =>
            test(
              "test set lightMaterial color;
              drag texture to set gameObject material texture;

              the color should == original color
            ",
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

          describe("test logic", () =>
            test(
              "test removeTexture should remove material map from engine", () => {
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
              let engineStateToGetData = StateLogicService.getRunEngineState();

              engineStateToGetData
              |> GameObjectComponentEngineService.getLightMaterialComponent(
                   currentGameObject,
                 )
              |. LightMaterialEngineService.getLightMaterialDiffuseMap(
                   engineStateToGetData,
                 )
              |> expect == None;
            })
          );
        });
      });

      describe("test change light material shininess", () => {
        beforeEach(() => {
          _prepareWithEmptyJob();

          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
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