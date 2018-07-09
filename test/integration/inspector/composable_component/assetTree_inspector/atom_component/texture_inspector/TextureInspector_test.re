open Wonder_jest;

open Expect;

open Expect.Operators;

open AssetNodeType;

open Sinon;

let _ =
  describe("TextureInspector", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare currentSelectSource", () => {
      let _clickAssetChildrenNodeToSetCurrentNode = index => {
        let component = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeChildrenNode(index),
        );
      };
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.AssetTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test component snapshot", () =>
        test("test texture attribute default value", () => {
          _clickAssetChildrenNodeToSetCurrentNode(2);

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test texture rename", () => {
        let _triggerInspectorRenameEvent = newName => {
          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            TextureInspectorTool.triggerChangeRenameEvent(newName),
          );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            TextureInspectorTool.triggerBlurRenameEvent(newName),
          );
        };
        afterEach(() =>
          StateAssetService.getState()
          |> CurrentNodeDataAssetService.clearCurrentNodeData
          |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
          |> StateAssetService.setState
          |> ignore
        );

        describe("test snapshot", () =>
          test("test rename to specific name", () => {
            _clickAssetChildrenNodeToSetCurrentNode(2);
            let newName = "newTextureName";

            _triggerInspectorRenameEvent(newName);

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test logic", () =>
          describe("test set engine", () =>
            testPromise(
              "upload texture;
                         rename texture;", () => {
              MainEditorAssetTool.buildFakeFileReader();
              MainEditorAssetTool.buildFakeImage();

              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(),
              )
              |> Js.Promise.then_(() => {
                   _clickAssetChildrenNodeToSetCurrentNode(5);
                   let newName = "newTextureToEngine";

                   _triggerInspectorRenameEvent(newName);

                   BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                     2,
                   )
                   |> StateLogicService.getEngineStateToGetData
                   |> expect == newName
                   |> Js.Promise.resolve;
                 });
            })
          )
        );
      });

      describe("test set engine", () => {
        describe("test texture change wrap", () => {
          let _triggerInspectorChangeWrapEvent = (wrapIndex, type_) => {
            let inspectorComponent =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            BaseEventTool.triggerComponentEvent(
              inspectorComponent,
              TextureInspectorTool.triggerChangeWrapEvent(
                wrapIndex,
                type_ |> string_of_int,
              ),
            );
          };
          beforeEach(() =>
            StateAssetService.getState()
            |> CurrentNodeDataAssetService.clearCurrentNodeData
            |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
            |> StateAssetService.setState
            |> ignore
          );
          describe("test set wrapS to REPEAT", () => {
            test("test snapshot", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);

              _triggerInspectorChangeWrapEvent(3, 2);

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test logic", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);
              let wrapType = 2;

              _triggerInspectorChangeWrapEvent(3, wrapType);

              let textureId =
                TextureInspectorTool.getTextureIdFromCurrentNodeData();

              BasicSourceTextureEngineService.getWrapS(textureId)
              |> StateLogicService.getEngineStateToGetData
              |> TextureInspectorUtils.convertWrapToInt
              |> expect == wrapType;
            });
          });
          describe("test set wrapT to MIRRORED_REPEAT", () => {
            test("test snapshot", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);

              _triggerInspectorChangeWrapEvent(4, 1);

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test logic", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);
              let wrapType = 1;

              _triggerInspectorChangeWrapEvent(4, wrapType);

              let textureId =
                TextureInspectorTool.getTextureIdFromCurrentNodeData();

              BasicSourceTextureEngineService.getWrapT(textureId)
              |> StateLogicService.getEngineStateToGetData
              |> TextureInspectorUtils.convertWrapToInt
              |> expect == wrapType;
            });
          });
        });
        describe("test texture change filter", () => {
          let _triggerInspectorChangeWrapEvent = (index, type_) => {
            let inspectorComponent =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            BaseEventTool.triggerComponentEvent(
              inspectorComponent,
              TextureInspectorTool.triggerChangeFilterEvent(
                index,
                type_ |> string_of_int,
              ),
            );
          };
          beforeEach(() =>
            StateAssetService.getState()
            |> CurrentNodeDataAssetService.clearCurrentNodeData
            |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
            |> StateAssetService.setState
            |> ignore
          );
          describe("test set FilterMag to LINEARMIPMAPLINEAR", () => {
            test("test snapshot", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);

              _triggerInspectorChangeWrapEvent(5, 5);

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test logic", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);
              let filterType = 5;

              _triggerInspectorChangeWrapEvent(5, filterType);

              let textureId =
                TextureInspectorTool.getTextureIdFromCurrentNodeData();

              BasicSourceTextureEngineService.getMagFilter(textureId)
              |> StateLogicService.getEngineStateToGetData
              |> TextureInspectorUtils.convertFilterToInt
              |> expect == filterType;
            });
          });
          describe("test set FilterMin to NEARESTMIPMAPLINEAR", () => {
            test("test snapshot", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);

              _triggerInspectorChangeWrapEvent(6, 4);

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });

            test("test logic", () => {
              _clickAssetChildrenNodeToSetCurrentNode(2);
              let filterType = 4;

              _triggerInspectorChangeWrapEvent(6, filterType);

              let textureId =
                TextureInspectorTool.getTextureIdFromCurrentNodeData();

              BasicSourceTextureEngineService.getMinFilter(textureId)
              |> StateLogicService.getEngineStateToGetData
              |> TextureInspectorUtils.convertFilterToInt
              |> expect == filterType;
            });
          });
        });
      });
    });
  });