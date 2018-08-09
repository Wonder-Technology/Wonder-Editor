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
      describe("test change color should set current gameObject color", () => {
        describe("test snapshot", () => {
          beforeEach(() => {
            _prepareWithEmptyJob();

            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
            );
          });

          test("show color picker component for change color", () => {
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;

            let component =
              BuildComponentTool.buildLightMaterial(
                GameObjectTool.getCurrentGameObjectLightMaterial(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              PickColorEventTool.triggerShowColorPickEvent,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("close color picker component", () => {
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;

            let component =
              BuildComponentTool.buildLightMaterial(
                GameObjectTool.getCurrentGameObjectLightMaterial(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              PickColorEventTool.triggerShowColorPickEvent,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              PickColorEventTool.triggerCloseColorPickEvent,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () =>
          test("material->diffuseColor should be changed", () => {
            _prepareWithJob();
            _prepareDefaultSceneAndInit();

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

            PickColorEventTool.triggerChangeLightColor(
              currentGameObjectMaterial,
              newColor,
            );

            LightMaterialEngineService.getLightMaterialDiffuseColor(
              currentGameObjectMaterial,
            )
            |> StateLogicService.getEngineStateToGetData
            |> Color.getHexString
            |> expect == newColor##hex;
          })
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
                       |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeTextureNodeDomIndex
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
              change lightMaterial to basicMaterial;
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
                PickColorEventTool.triggerChangeLightColor(
                  currentGameObjectMaterial,
                  newColor,
                );
                let originalColor =
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

                originalColor |> expect == newColor;
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
            |. FloatService.truncateFloatValue(6)
            |> expect == value;
          })
        );
      });
    });
  });