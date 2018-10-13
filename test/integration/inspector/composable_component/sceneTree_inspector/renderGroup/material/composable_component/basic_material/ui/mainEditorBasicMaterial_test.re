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
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );

        MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
      });

      PickColorEventTool.testOperateColorPickToChangeColor(
        sandbox,
        BuildComponentForCurryTool.buildBasicMaterial,
        (
          GameObjectTool.getCurrentGameObjectBasicMaterial,
          MainEditorBasicMaterialTool.changeColor,
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
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
          },
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;

        MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
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
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

              MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
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
            },
          );

          test(
            "test set map when already has map, material's map should be the new one",
            () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

            MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
              ~textureNodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
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
          describe("test engine ", () => {
            beforeEach(() => {
              MainEditorAssetTool.buildFakeFileReader();
              MainEditorAssetTool.buildFakeImage();
            });

            describe(
              {|upload texture;
               drag texture to set gameObject material texture;
               |},
              () =>
              testPromise("should set texture to be material's map", () => {
                let assetTreeData =
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

                MainEditorAssetUploadTool.loadOneTexture()
                |> Js.Promise.then_(uploadedTextureNodeId => {
                     MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
                       ~textureNodeId=uploadedTextureNodeId,
                       (),
                     );

                     let engineState = StateEngineService.unsafeGetState();
                     let currentGameObject =
                       SceneEditorService.unsafeGetCurrentSceneTreeNode
                       |> StateLogicService.getEditorState;

                     engineState
                     |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                          currentGameObject,
                        )
                     |. BasicMaterialEngineService.hasBasicMaterialMap(
                          engineState,
                        )
                     |> expect == true
                     |> Js.Promise.resolve;
                   });
              })
            );
          })
        );

        describe("deal with specific case", () => {
          test(
            "if drag texture-asset dragLeave gameObject material texture, should change nothing",
            () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

              MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
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
            },
          );
          test(
            "if drag folder into gameObject material texture,should change nothing",
            () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

            MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
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
        });
      });

      describe("test set remove texture", () => {
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

            MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
              ~textureNodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              (),
            );
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
        });

        describe("test logic", () => {
          let _getGameObjectMaterialMap = (engineState, gameObject) =>
            engineState
            |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                 gameObject,
               )
            |. BasicMaterialEngineService.getBasicMaterialMap(engineState);

          test("should remove material's map", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

            MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
              ~textureNodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              (),
            );
            MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
              ~textureNodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              (),
            );

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
        });
      });
    });
  });