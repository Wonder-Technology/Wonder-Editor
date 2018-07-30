open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AddableComponent", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test show component", () => {
      test("if hasn't currentSceneTreeNode, show nothing", () => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });

      describe("else", () => {
        test(
          "if currentSceneTreeNode is camera, should show transform and basicCameraView and perspectiveCameraProjection",
          () => {
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setCameraTobeCurrentSceneTreeNode,
            );
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );

        test(
          "else if currentSceneTreeNode is box, should show transform and material",
          () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });
    });
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
          )
          |> StateLogicService.getEngineStateToGetData
        )
        |> toThrowMessage("the type:MeshTest is not find")
      );
    });
  });