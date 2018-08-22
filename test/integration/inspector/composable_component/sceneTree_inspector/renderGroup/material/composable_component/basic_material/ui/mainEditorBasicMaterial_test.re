open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorBasicMaterial component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        MainEditorMaterialTool.setMaterialTypeToBeBaiscMaterial();
      });

      PickColorEventTool.testOperateColorPickToChangeColor(
        sandbox,
        BuildComponentForCurryTool.buildBasicMaterial,
        (
          GameObjectTool.getCurrentGameObjectBasicMaterial,
          PickColorEventTool.triggerChangeBasicMaterialColor,
          BasicMaterialEngineService.getColor,
        ),
      );
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

        MainEditorMaterialTool.setMaterialTypeToBeBaiscMaterial();
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
              |> MainEditorMaterialTool.triggerFileDragStartEvent;

              MainEditorMaterialTool.triggerDragTextureLeaveGameObjectMaterial();

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
            |> MainEditorMaterialTool.triggerFileDragStartEvent;

            MainEditorMaterialTool.triggerTextureDragEvent();

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
          test("test removeTexture should remove material map from engine", () => {
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