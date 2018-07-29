open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AddableComponent", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test gameObject add component workflow", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });
      test("click the add component button, show addableComponent list", () => {
        let component =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        let boxComponentCount = ComponentDomTool.getBoxComponentCount();

        BaseEventTool.triggerComponentEvent(
          component,
          OperateComponentEventTool.triggerClickShowComponentList(
            boxComponentCount,
          ),
        );
        component |> ReactTestTool.createSnapshotAndMatch;
      });
      /* test("click sourceInstance component, add to inspector", () => {
           let component =
             BuildComponentTool.buildInspectorComponent(
               TestTool.buildEmptyAppState(),
               InspectorTool.buildFakeAllShowComponentConfig(),
             );
           let boxComponentCount = ComponentDomTool.getBoxComponentCount();

           BaseEventTool.triggerComponentEvent(
             component,
             OperateComponentEventTool.triggerClickShowComponentList,
           );
           BaseEventTool.triggerComponentEvent(
             component,
             OperateComponentEventTool.triggerClickAddSourceInstanceEvent,
           );

           BuildComponentTool.buildInspectorComponent(
             TestTool.buildEmptyAppState(),
             InspectorTool.buildFakeAllShowComponentConfig(),
           )
           |> ReactTestTool.createSnapshotAndMatch;
         }); */
      test("click light component, add to inspector", () => {
        let boxComponentCount = ComponentDomTool.getBoxComponentCount();
        let renderingCategoryDomIndex =
          ComponentDomTool.getRenderingCategoryDomIndex();
        let lightTypeDomIndex = ComponentDomTool.getLightTypeDomIndex();

        OperateComponentEventTool.addComponentIntoCurrentGameObject(
          boxComponentCount,
          renderingCategoryDomIndex,
          lightTypeDomIndex,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
    describe("test camera add component workflow", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setCameraTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });
      test("click the add component button, show addableComponent list", () => {
        let component =
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          );
        let cameraComponentCount = ComponentDomTool.getCameraComponentCount();

        BaseEventTool.triggerComponentEvent(
          component,
          OperateComponentEventTool.triggerClickShowComponentList(
            cameraComponentCount,
          ),
        );

        component |> ReactTestTool.createSnapshotAndMatch;
      });
      test("click arcballCameraController, add to inspector", () => {
        let cameraComponentCount = ComponentDomTool.getCameraComponentCount();
        let cameraCategoryDomIndex =
          ComponentDomTool.getCameraCategoryDomIndex();
        let arcballCameraTypeDomIndex =
          ComponentDomTool.getArcballCameraControllerTypeDomIndex();

        OperateComponentEventTool.addComponentIntoCurrentGameObject(
          cameraComponentCount,
          cameraCategoryDomIndex,
          arcballCameraTypeDomIndex,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
    describe("deal with specific case", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        )
      );
      test("if component type is error, should throw error", () =>
        expect(() =>
          InspectorComponentUtils.addComponentByType(
            "MeshTest",
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            (None, StateLogicService.getRunEngineState()),
          )
        )
        |> toThrowMessage("the type:MeshTest is not find")
      );
    });
  });