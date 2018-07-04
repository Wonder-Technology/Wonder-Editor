open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("TextureInspector", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("prepare currentSelectSource", () => {
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
          let component = BuildComponentTool.buildAssetComponent();
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.clickAssetTreeChildrenNode(2),
          );

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test texture rename", () => {
        let triggerChangeEvent = (value, domChildren) => {
          let article = _getFromArray(domChildren, 0);
          let texArticle = _getFromArray(article##children, 0);
          let div = _getFromArray(texArticle##children, 0);
          let renameDiv = _getFromArray(div##children, 2);
          let input = _getFromArray(renameDiv##children, 1);
          BaseEventTool.triggerChangeEvent(
            input,
            BaseEventTool.buildFormEvent(value),
          );
        };
        let triggerBlurEvent = (value, domChildren) => {
          let article = _getFromArray(domChildren, 0);
          let texArticle = _getFromArray(article##children, 0);
          let div = _getFromArray(texArticle##children, 0);
          let renameDiv = _getFromArray(div##children, 2);
          let input = _getFromArray(renameDiv##children, 1);
          BaseEventTool.triggerBlurEvent(
            input,
            BaseEventTool.buildFormEvent(value),
          );
        };
        beforeEach(() =>
          StateAssetService.getState()
          |> CurrentNodeIdAssetService.clearCurrentNodeId
          |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
          |> StateAssetService.setState
          |> ignore
        );
        describe("test snapshot", () =>
          test("test rename to specific name", () => {
            let component = BuildComponentTool.buildAssetComponent();
            BaseEventTool.triggerComponentEvent(
              component,
              AssetTreeEventTool.clickAssetTreeChildrenNode(2),
            );
            let newName = "newTextureName";
            let inspectorComponent =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            BaseEventTool.triggerComponentEvent(
              inspectorComponent,
              triggerChangeEvent(newName),
            );
            BaseEventTool.triggerComponentEvent(
              inspectorComponent,
              triggerBlurEvent(newName),
            );
            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test logic", () =>
          describe("test set engine", () =>
            test("test rename texture", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );
              let newName = "newTextureToEngine";
              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(newName),
              );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerBlurEvent(newName),
              );

              let textureId =
                StateAssetService.getState()
                |> NodeMapAssetService.unsafeGetNodeMap
                |> WonderCommonlib.SparseMapService.unsafeGet(4)
                |> (
                  ({result}) =>
                    result |> OptionService.unsafeGet |> int_of_string
                );

              BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                textureId,
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == newName;
            })
          )
        );
      });

      describe("test set engine", () => {
        describe("test texture change wrap", () => {
          let triggerChangeEvent = (index, value, domChildren) => {
            let article = _getFromArray(domChildren, 0);
            let textureArticle = _getFromArray(article##children, 0);
            let div = _getFromArray(textureArticle##children, 0);
            let selectDiv = _getFromArray(div##children, index);
            let selectArticle = _getFromArray(selectDiv##children, 0);
            let select = _getFromArray(selectArticle##children, 1);
            BaseEventTool.triggerChangeEvent(
              select,
              BaseEventTool.buildFormEvent(value),
            );
          };
          beforeEach(() =>
            StateAssetService.getState()
            |> CurrentNodeIdAssetService.clearCurrentNodeId
            |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
            |> StateAssetService.setState
            |> ignore
          );
          describe("test set wrapS to REPEAT", () => {
            test("test snapshot", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(3, "2"),
              );
              inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test logic", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );
              let wrapType = 2;

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(3, wrapType |> string_of_int),
              );

              let assetState = StateAssetService.getState();
              let textureId =
                assetState
                |> NodeMapAssetService.unsafeGetNodeMap
                |> WonderCommonlib.SparseMapService.unsafeGet(
                     assetState
                     |> CurrentNodeIdAssetService.unsafeGetCurrentNodeId,
                   )
                |> (
                  ({result}) =>
                    result |> OptionService.unsafeGet |> int_of_string
                );

              BasicSourceTextureEngineService.getWrapS(textureId)
              |> StateLogicService.getEngineStateToGetData
              |> TextureInspectorUtils.convertWrapToInt
              |> expect == wrapType;
            });
          });
          describe("test set wrapT to MIRRORED_REPEAT", () => {
            test("test snapshot", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(4, "1"),
              );
              inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test logic", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );
              let wrapType = 1;

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(4, wrapType |> string_of_int),
              );

              let assetState = StateAssetService.getState();
              let textureId =
                assetState
                |> NodeMapAssetService.unsafeGetNodeMap
                |> WonderCommonlib.SparseMapService.unsafeGet(
                     assetState
                     |> CurrentNodeIdAssetService.unsafeGetCurrentNodeId,
                   )
                |> (
                  ({result}) =>
                    result |> OptionService.unsafeGet |> int_of_string
                );

              BasicSourceTextureEngineService.getWrapT(textureId)
              |> StateLogicService.getEngineStateToGetData
              |> TextureInspectorUtils.convertWrapToInt
              |> expect == wrapType;
            });
          });
        });
        describe("test texture change filter", () => {
          let triggerChangeEvent = (index, value, domChildren) => {
            let article = _getFromArray(domChildren, 0);
            let textureArticle = _getFromArray(article##children, 0);
            let div = _getFromArray(textureArticle##children, 0);
            let selectDiv = _getFromArray(div##children, index);
            let selectArticle = _getFromArray(selectDiv##children, 0);
            let select = _getFromArray(selectArticle##children, 1);
            BaseEventTool.triggerChangeEvent(
              select,
              BaseEventTool.buildFormEvent(value),
            );
          };
          beforeEach(() =>
            StateAssetService.getState()
            |> CurrentNodeIdAssetService.clearCurrentNodeId
            |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
            |> StateAssetService.setState
            |> ignore
          );
          describe("test set FilterMag to LINEARMIPMAPLINEAR", () => {
            test("test snapshot", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(5, "5"),
              );
              inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test logic", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );
              let filterType = 5;

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(5, filterType |> string_of_int),
              );

              let assetState = StateAssetService.getState();
              let textureId =
                assetState
                |> NodeMapAssetService.unsafeGetNodeMap
                |> WonderCommonlib.SparseMapService.unsafeGet(
                     assetState
                     |> CurrentNodeIdAssetService.unsafeGetCurrentNodeId,
                   )
                |> (
                  ({result}) =>
                    result |> OptionService.unsafeGet |> int_of_string
                );

              BasicSourceTextureEngineService.getMagFilter(textureId)
              |> StateLogicService.getEngineStateToGetData
              |> TextureInspectorUtils.convertFilterToInt
              |> expect == filterType;
            });
          });
          describe("test set FilterMin to NEARESTMIPMAPLINEAR", () => {
            test("test snapshot", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(6, "4"),
              );
              inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test logic", () => {
              let component = BuildComponentTool.buildAssetComponent();
              BaseEventTool.triggerComponentEvent(
                component,
                AssetTreeEventTool.clickAssetTreeChildrenNode(2),
              );
              let filterType = 4;

              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(6, filterType |> string_of_int),
              );

              let assetState = StateAssetService.getState();
              let textureId =
                assetState
                |> NodeMapAssetService.unsafeGetNodeMap
                |> WonderCommonlib.SparseMapService.unsafeGet(
                     assetState
                     |> CurrentNodeIdAssetService.unsafeGetCurrentNodeId,
                   )
                |> (
                  ({result}) =>
                    result |> OptionService.unsafeGet |> int_of_string
                );

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