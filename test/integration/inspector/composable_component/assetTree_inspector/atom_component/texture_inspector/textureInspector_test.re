open Wonder_jest;

open Expect;

open Expect.Operators;

open AssetNodeType;

open Sinon;

open Js.Promise;

let _ =
  describe("texture inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare currentSelectSource", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree,
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.Asset,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test texture inspector->show default value", () =>
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

          MainEditorAssetChildrenNodeTool.selectTextureNode(
            ~nodeId=
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
        })
      );

      describe("test texture rename", () => {
        describe("test rename to specific name", () =>
          test("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let newName = "newTextureName";

            AssetTreeInspectorTool.Rename.renameAssetTextureNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              ~name=newName,
              (),
            );

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        testPromise(
          {|upload texture;
            rename texture;

            texture name should be renamed
              |},
          () => {
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();

            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let newName = "newTextureToEngine";

            MainEditorAssetUploadTool.loadOneTexture()
            |> then_(uploadedTextureNodeId => {
                 AssetTreeInspectorTool.Rename.renameAssetTextureNode(
                   ~nodeId=uploadedTextureNodeId,
                   ~name=newName,
                   (),
                 );
                 MainEditorAssetChildrenNodeTool.selectTextureNode(
                   ~nodeId=uploadedTextureNodeId,
                   (),
                 );

                 MainEditorAssetNodeTool.getTextureComponentFromCurrentNodeId()
                 |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName
                 |> StateLogicService.getEngineStateToGetData
                 |> expect == newName
                 |> Js.Promise.resolve;
               });
          },
        );
      });

      describe("test texture change wrap", () => {
        describe("test set wrapS to Repeat", () => {
          test("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();

            TextureInspectorTool.changeWrapS(
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              ),
              wrapRepeatType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test logic", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );

            TextureInspectorTool.changeWrapS(
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId),
              wrapRepeatType,
            );

            let textureComponent =
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
            BasicSourceTextureEngineService.getWrapS(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapRepeatType;
          });
        });

        describe("test set wrapT to Mirrored_repeat", () => {
          test("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let wrapMirroredRepeatType =
              TextureInspectorTool.getWrapMirroredRepeatType();

            TextureInspectorTool.changeWrapT(
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              ),
              wrapMirroredRepeatType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test logic", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let wrapMirroredRepeatType =
              TextureInspectorTool.getWrapMirroredRepeatType();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );

            TextureInspectorTool.changeWrapT(
              MainEditorAssetNodeTool.getTextureNode(nodeId).textureComponent,
              wrapMirroredRepeatType,
            );

            let textureComponent =
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
            BasicSourceTextureEngineService.getWrapT(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapMirroredRepeatType;
          });
        });
      });

      describe("test texture change filter", () => {
        describe("test set MagFilter to Linear_mipmap_linear", () => {
          test("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            TextureInspectorTool.changeMagFilter(
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              ),
              filterLinearMipmapLinearType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test logic", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );

            TextureInspectorTool.changeMagFilter(
              MainEditorAssetNodeTool.getTextureNode(nodeId).textureComponent,
              filterLinearMipmapLinearType,
            );

            let textureComponent =
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
            BasicSourceTextureEngineService.getMagFilter(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterLinearMipmapLinearType;
          });
        });

        describe("test set MinFilter to Nearest_mipmap_linear", () => {
          test("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            TextureInspectorTool.changeMinFilter(
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              ),
              filterLinearMipmapLinearType,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("test logic", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );

            TextureInspectorTool.changeMinFilter(
              MainEditorAssetNodeTool.getTextureNode(nodeId).textureComponent,
              filterLinearMipmapLinearType,
            );

            let textureComponent =
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
            BasicSourceTextureEngineService.getMinFilter(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterLinearMipmapLinearType;
          });
        });
      });
    });
  });