open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AddableComponent add component", () => {
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
            AddableComponentTool.execAddDirectionLightComponent();

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
            AddableComponentTool.execAddDirectionLightComponent();

            LightEngineService.hasLightComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          });
        });

        describe(
          "should re-init all light material components in the scene", () =>
          describe("test add direction light component", () =>
            test("glsl->DIRECTION_LIGHTS_COUNT should + 1", () => {
              let (editGl, runGl) =
                FakeGlToolEngine.getEditEngineStateGlAndRunEngineStateGl();
              let editGlShaderSource = editGl##shaderSource;
              let runGlShaderSource = runGl##shaderSource;

              AddableComponentTool.execAddDirectionLightComponent();

              (
                GLSLToolEngine.contain(
                  GLSLToolEngine.getVsSource(editGlShaderSource),
                  {|#define DIRECTION_LIGHTS_COUNT 2|},
                ),
                GLSLToolEngine.contain(
                  GLSLToolEngine.getFsSource(runGlShaderSource),
                  {|#define DIRECTION_LIGHTS_COUNT 2|},
                ),
              )
              |> expect == (true, true);
            })
          )
        );
      });
      describe("test add cameraGroup component", () => {
        describe("test snapshot", () =>
          test("test click add cameraGroup, should add into inspector", () => {
            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let cameraCategoryDomIndex =
              ComponentDomTool.getCameraCategoryDomIndex();
            let cameraGroupTypeDomIndex = ComponentDomTool.getCameraGroupTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              cameraCategoryDomIndex,
              cameraGroupTypeDomIndex,
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
            "test if not add cameraGroup component, current gameObject shouldn't has it",
            () =>
            CameraEngineService.hasCameraComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false
          );
          test("test click add cameraGroup component, should add into engine", () => {
            let boxComponentCount = ComponentDomTool.getBoxComponentCount();
            let cameraCategoryDomIndex =
              ComponentDomTool.getCameraCategoryDomIndex();
            let cameraGroupTypeDomIndex = ComponentDomTool.getCameraGroupTypeDomIndex();

            OperateComponentEventTool.addComponentIntoCurrentGameObject(
              boxComponentCount,
              cameraCategoryDomIndex,
              cameraGroupTypeDomIndex,
            );

            CameraEngineService.hasCameraComponent(
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
          MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode,
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