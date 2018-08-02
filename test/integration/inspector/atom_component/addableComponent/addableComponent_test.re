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

      describe("test add light component", () => {
        describe("test snapshot", () =>
          test("test click add light component, should add into inspector", () => {
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
          })
        );

        describe("test logic", () => {
          test(
            "test if not add light component, current gameObject shouldn't has it",
            () =>
            LightEngineService.hasLightComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test("test click add light component, should add into engine", () => {
            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let renderingCategoryDomIndex =
              ComponentDomTool.getRenderingCategoryDomIndex();
            let lightTypeDomIndex = ComponentDomTool.getLightTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              renderingCategoryDomIndex,
              lightTypeDomIndex,
            );

            LightEngineService.hasLightComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });
      describe("test add basicCameraView component", () => {
        describe("test snapshot", () =>
          test("test click add basicCameraView, should add into inspector", () => {
            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let cameraCategoryDomIndex =
              ComponentDomTool.getCameraCategoryDomIndex();
            let basicCameraViewTypeDomIndex =
              ComponentDomTool.getBasicCameraViewTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              cameraCategoryDomIndex,
              basicCameraViewTypeDomIndex,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test logic", () => {
          test(
            "test if not add basicCameraView component, current gameObject shouldn't has it",
            () =>
            GameObjectComponentEngineService.hasBasicCameraViewComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test(
            "test click add basicCameraView component, should add into engine",
            () => {
            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let cameraCategoryDomIndex =
              ComponentDomTool.getCameraCategoryDomIndex();
            let basicCameraViewTypeDomIndex =
              ComponentDomTool.getBasicCameraViewTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              cameraCategoryDomIndex,
              basicCameraViewTypeDomIndex,
            );

            GameObjectComponentEngineService.hasBasicCameraViewComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });

      describe("test add perspectiveCamera component", () => {
        describe("test snapshot", () =>
          test(
            "test click add perspectiveCamera, should add into inspector", () => {
            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let cameraCategoryDomIndex =
              ComponentDomTool.getCameraCategoryDomIndex();
            let perspectiveCameraTypeDomIndex =
              ComponentDomTool.getPerspectiveCameraTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              cameraCategoryDomIndex,
              perspectiveCameraTypeDomIndex,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test logic", () => {
          test(
            "test if not add perspectiveCamera component, current gameObject shouldn't has it",
            () =>
            GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test(
            "test click add perspectiveCamera component, should add into engine",
            () => {
            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let cameraCategoryDomIndex =
              ComponentDomTool.getCameraCategoryDomIndex();
            let perspectiveCameraTypeDomIndex =
              ComponentDomTool.getPerspectiveCameraTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              cameraCategoryDomIndex,
              perspectiveCameraTypeDomIndex,
            );

            GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });
    });

    describe("test camera add component", () => {
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

      describe("test add arcballCamera component", () => {
        describe("test snapshot", () =>
          test("test click add arcballCamera, should add into inspector", () => {
            let cameraComponentCount =
              ComponentDomTool.getCameraComponentCount();
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
          })
        );

        describe("test logic", () => {
          test(
            "test if not add arcballCamera component, current gameObject shouldn't has it",
            () =>
            GameObjectComponentEngineService.hasArcballCameraControllerComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test(
            "test click add arcballCamera component, should add into engine",
            () => {
            let cameraComponentCount =
              ComponentDomTool.getCameraComponentCount();
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
            GameObjectComponentEngineService.hasArcballCameraControllerComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });
      });
    });
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