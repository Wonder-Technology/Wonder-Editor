open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorBasicMaterialMap;

let _ =
  describe("MainEditorBasicMaterial", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test should update", () => {
      test("if retainedProps not change, should not update", () =>
        MainEditorBasicMaterialMap.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf({map: None}, {map: None}),
        )
        |> expect == false
      );
      test("if map change, should update", () =>
        MainEditorBasicMaterialMap.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf({map: None}, {map: Some(1)}),
        )
        |> expect == true
      );
    });
    describe("test set currentSceneTreeNode", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        )
      );

      describe("test change color should set current gameObject color", () => {
        describe("test snapshot", () => {
          test("show color picker component for change color", () => {
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;

            let currentGameObjectMaterial =
              GameObjectTool.getCurrentGameObjectBasicMaterial();
            let component =
              BuildComponentTool.buildBasicMaterial(
                currentGameObjectMaterial,
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MaterialEventTool.triggerShowColorPickEvent,
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

            let currentGameObjectMaterial =
              GameObjectTool.getCurrentGameObjectBasicMaterial();
            let component =
              BuildComponentTool.buildBasicMaterial(
                currentGameObjectMaterial,
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MaterialEventTool.triggerShowColorPickEvent,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MaterialEventTool.triggerShowColorPickEvent,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () =>
          test("test change color should set into engine", () => {
            let currentGameObjectMaterial =
              GameObjectTool.getCurrentGameObjectBasicMaterial();
            let newColor = {
              "hex": "#7df1e8",
              "rgb": {
                "r": 125,
                "g": 241,
                "b": 232,
              },
            };

            MaterialEventTool.triggerChangeBasicColor(
              currentGameObjectMaterial,
              newColor,
            );
            BasicMaterialEngineService.getColor(currentGameObjectMaterial)
            |> StateLogicService.getEngineStateToGetData
            |> Color.getHexString
            |> expect == newColor##hex;
          })
        );
      });
    });

    describe("test gameObject basic material texture", () => {
      beforeEach(() => {
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
        StateAssetService.getState()
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
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
              |> MainEditorBasicMaterialTool.triggerFileDragStartEvent;

              MainEditorBasicMaterialTool.triggerDragTextureToGameObjectMaterial();

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

            MainEditorBasicMaterialTool.triggerFileDragStartEvent(
              firstTextureDomIndex,
            );
            MainEditorBasicMaterialTool.triggerDragTextureToGameObjectMaterial();

            MainEditorBasicMaterialTool.triggerFileDragStartEvent(
              secondTextureDomIndex,
            );
            MainEditorBasicMaterialTool.triggerDragTextureToGameObjectMaterial();

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

                MainEditorAssetHeader.Method._fileLoad(
                  TestTool.getDispatch(),
                  BaseEventTool.buildFileEvent(),
                )
                |> Js.Promise.then_(() => {
                     assetTreeDomRecord
                     |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeTextureNodeDomIndex
                     |> MainEditorBasicMaterialTool.triggerFileDragStartEvent;

                     MainEditorBasicMaterialTool.triggerDragTextureToGameObjectMaterial();

                     let currentGameObject =
                       SceneEditorService.unsafeGetCurrentSceneTreeNode
                       |> StateLogicService.getEditorState;
                     let engineStateToGetData =
                       StateLogicService.getRunEngineState();

                     let mapId =
                       engineStateToGetData
                       |> GameObjectComponentEngineService.getBasicMaterialComponent(
                            currentGameObject,
                          )
                       |. BasicMaterialEngineService.unsafeGetMap(
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

        describe("deal with specific case", () => {
          test(
            "if drag texture-asset dragLeave gameObject material texture, should change nothing",
            () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
              |> MainEditorBasicMaterialTool.triggerFileDragStartEvent;

              MainEditorBasicMaterialTool.triggerDragTextureLeaveGameObjectMaterial();

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          );
          test(
            "if drag folder into gameObject material texture,should change nothing",
            () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
            |> MainEditorBasicMaterialTool.triggerFileDragStartEvent;

            MainEditorBasicMaterialTool.triggerTextureDragEvent();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });

      describe("test set remove texture", () => {
        describe("test snapshop", () => {
          test("test if not set map,should change nothing", () => {
            MainEditorBasicMaterialTool.triggerTextureRemoveClickEvent();

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
            |> MainEditorBasicMaterialTool.triggerFileDragStartEvent;
            MainEditorBasicMaterialTool.triggerDragTextureToGameObjectMaterial();
            MainEditorBasicMaterialTool.triggerTextureRemoveClickEvent();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () =>
          test("test removeTexture should remove material map from engine", () => {
            let assetTreeDomRecord =
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

            assetTreeDomRecord
            |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
            |> MainEditorBasicMaterialTool.triggerFileDragStartEvent;
            MainEditorBasicMaterialTool.triggerDragTextureToGameObjectMaterial();
            MainEditorBasicMaterialTool.triggerTextureRemoveClickEvent();

            let currentGameObject =
              SceneEditorService.unsafeGetCurrentSceneTreeNode
              |> StateLogicService.getEditorState;
            let engineStateToGetData = StateLogicService.getRunEngineState();

            engineStateToGetData
            |> GameObjectComponentEngineService.getBasicMaterialComponent(
                 currentGameObject,
               )
            |. BasicMaterialEngineService.getMap(engineStateToGetData)
            |> expect == None;
          })
        );
      });
    });
  });