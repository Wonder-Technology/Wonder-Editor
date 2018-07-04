open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

type retainedProps = {
  color: string,
  map: option(int),
};

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
      test("if ( color, map ) not change, should not update", () =>
        MainEditorBasicMaterial.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {color: "#ffffff", map: Some(1)},
            {color: "#ffffff", map: Some(1)},
          ),
        )
        |> expect == false
      );
      test("else if color change, should update", () =>
        MainEditorBasicMaterial.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {color: "#ffffff", map: Some(1)},
            {color: "#c0c0c0", map: Some(1)},
          ),
        )
        |> expect == true
      );
      test("else if map change, should update", () =>
        MainEditorBasicMaterial.shouldUpdate(
          OldNewSelfTool.buildOldNewSelf(
            {color: "#ffffff", map: Some(1)},
            {color: "#ffffff", map: Some(2)},
          ),
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
      describe("test change color should set current gameObject color", () =>
        test("set color value to stringInput", () => {
          let currentGameObjectMaterial =
            GameObjectTool.getCurrentSceneTreeNodeMaterial();
          let value = "#c0c0c0";
          let component =
            BuildComponentTool.buildMaterialComponent(
              currentGameObjectMaterial,
            );
          MaterialEventTool.triggerChangeAndBlurMaterialEvent(
            component,
            value,
          );
          component |> ReactTestTool.createSnapshotAndMatch;
        })
      );
      /* describe(
           "set engine color value",
           () => {
             test(
               "else, get the z from engine should == last value",
               () => {
                 let currentGameObjectTransform =
                   MainEditorSceneTool.getCurrentSceneTreeNodeTransform();
                 let component =
                   BuildComponentTool.buildMainEditorTransformComponent(TestTool.buildEmptyAppState(),currentGameObjectTransform);
                 let value1 = "-1.23435";
                 let value2 = "-24.6613123";
                 BaseEventTool.triggerComponentEvent(
                   component,
                   TransformEventTool.triggerChangeZEvent(value1)
                 );
                 BaseEventTool.triggerComponentEvent(
                   component,
                   TransformEventTool.triggerChangeZEvent(value2)
                 );
                 let (_, _, zFromEngine) =
                   getCurrentSceneTreeNodeLocalPosition(currentGameObjectMaterial)
                   |> MainEditorBasicMaterial.Method.truncateTransformValue;
                 expect(zFromEngine) == value1
               }
             )
           }
         ) */
    });
    describe("test drag texture to set gameObject material map", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          () => {
            MainEditorAssetTool.initAssetTree(
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
              (),
            );
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
        |> CurrentNodeIdAssetService.clearCurrentNodeId
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );

      test("test no drag", () =>
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      test("test drag texture file into gameObject material texture", () => {
        let assetComponent = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          assetComponent,
          BasicMaterialEventTool.triggerFileDragStartEvent(2),
        );
        let inspectorComponent =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragEnterEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragLeaveEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragEnterEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragDropEvent,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("test if have already set map, set map again", () => {
        let assetComponent = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          assetComponent,
          BasicMaterialEventTool.triggerFileDragStartEvent(2),
        );
        let inspectorComponent =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragEnterEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragDropEvent,
        );
        let assetComponent2 = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          assetComponent2,
          BasicMaterialEventTool.triggerFileDragStartEvent(4),
        );
        let inspectorComponent2 =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent2,
          BasicMaterialEventTool.triggerTextureDragEnterEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent2,
          BasicMaterialEventTool.triggerTextureDragDropEvent,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      describe("deal with specific case", () =>
        test(
          "if drag folder into gameObject material texture, change nothing", () => {
          let assetComponent = BuildComponentTool.buildAssetComponent();
          BaseEventTool.triggerComponentEvent(
            assetComponent,
            BasicMaterialEventTool.triggerFileDragStartEvent(1),
          );
          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            BasicMaterialEventTool.triggerTextureDragEnterEvent,
          );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            BasicMaterialEventTool.triggerTextureDragDropEvent,
          );

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });

    describe("test set texture is null", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          () => {
            MainEditorAssetTool.initAssetTree(
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
              (),
            );
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
        |> CurrentNodeIdAssetService.clearCurrentNodeId
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );

      test("test if not set map, change nothing", () => {
        let inspectorComponent =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerRemoveTextureClickEvent,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test if have already set map, set map is null", () => {
        let assetComponent = BuildComponentTool.buildAssetComponent();
        BaseEventTool.triggerComponentEvent(
          assetComponent,
          BasicMaterialEventTool.triggerFileDragStartEvent(2),
        );
        let inspectorComponent =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragEnterEvent,
        );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent,
          BasicMaterialEventTool.triggerTextureDragDropEvent,
        );

        let inspectorComponent2 =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        BaseEventTool.triggerComponentEvent(
          inspectorComponent2,
          BasicMaterialEventTool.triggerRemoveTextureClickEvent,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });