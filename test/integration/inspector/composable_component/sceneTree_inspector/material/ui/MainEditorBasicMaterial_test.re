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
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );
      describe("test snapshot", () => {
        test("test no drag", () =>
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch
        );
        test("test drag texture file into gameObject material texture", () => {
          MainEditorBasicMaterialTool.triggerFileDragStartEvent(2);

          MainEditorBasicMaterialTool.triggerTextureFirstDragEvent();

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        test("test if have already set map, set map again", () => {
          MainEditorBasicMaterialTool.triggerFileDragStartEvent(2);

          MainEditorBasicMaterialTool.triggerTextureDragEvent();

          MainEditorBasicMaterialTool.triggerFileDragStartEvent(4);

          MainEditorBasicMaterialTool.triggerTextureDragEvent();

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });
      describe("test logic", () =>
        describe("test set engine ", () =>
          testPromise(
            "test upload texture;
             drag texture to set gameObject material texture;",
            () => {
              MainEditorAssetTool.buildFakeFileReader();
              MainEditorAssetTool.buildFakeImage();

              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(),
              )
              |> Js.Promise.then_(() => {
                   /* TODO all: remove magic number
                      let uploadedTextureDomIndex = 5; */

                   MainEditorBasicMaterialTool.triggerFileDragStartEvent(5);

                   MainEditorBasicMaterialTool.triggerTextureFirstDragEvent();

                   /* TODO fix test:
                   get diffuseMap from material;
                   diffuseMap |> expect === uploaded texture index */
                   BuildComponentTool.buildInspectorComponent(
                     TestTool.buildEmptyAppState(),
                     InspectorTool.buildFakeAllShowComponentConfig(),
                   )
                   |> ReactTestTool.createSnapshotAndMatch
                   |> Js.Promise.resolve;
                 });
            },
          )
        )
      );

      describe("deal with specific case", () =>
        test(
          "if drag folder into gameObject material texture, change nothing", () => {
          MainEditorBasicMaterialTool.triggerFileDragStartEvent(1);

          MainEditorBasicMaterialTool.triggerTextureDragEvent();

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
        |> CurrentNodeDataAssetService.clearCurrentNodeData
        |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
        |> StateAssetService.setState
        |> ignore
      );

      test("test if not set map, change nothing", () => {
        MainEditorBasicMaterialTool.triggerTextureRemoveClickEvent();

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });

      test("test if have already set map, set map is null", () => {
        MainEditorBasicMaterialTool.triggerFileDragStartEvent(2);

        MainEditorBasicMaterialTool.triggerTextureDragEvent();
        MainEditorBasicMaterialTool.triggerTextureRemoveClickEvent();

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });