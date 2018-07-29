open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      TestTool.closeContractCheck();
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.run();
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      TestTool.openContractCheck();
    });
    describe("test add component", () =>
      describe("test add component in engine", ()
        /* describe("test add sourceInstance component", () => {
             test(
               "current gameObject shouldn't have sourceInstance component before add it",
               () =>
               (
                 StateLogicService.getEditEngineState()
                 |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                      GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                    ),
                 StateLogicService.getRunEngineState()
                 |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                      GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                    ),
               )
               |> expect == (false, false)
             );
             test(
               "current gameObject should have sourceInstance component after add it",
               () => {
               let component =
                 BuildComponentTool.buildInspectorComponent(
                   TestTool.buildEmptyAppState(),
                   InspectorTool.buildFakeAllShowComponentConfig(),
                 );
               BaseEventTool.triggerComponentEvent(
                 component,
                 OperateComponentEventTool.triggerClickShowComponentList,
               );
               BaseEventTool.triggerComponentEvent(
                 component,
                 OperateComponentEventTool.triggerClickAddSourceInstanceEvent,
               );
               (
                 StateLogicService.getEditEngineState()
                 |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                      DiffComponentTool.getEditEngineComponent(
                        DiffType.GameObject,
                        GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                      ),
                    ),
                 StateLogicService.getRunEngineState()
                 |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                      GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                    ),
               )
               |> expect == (true, true);
             });
           }); */
        =>
          describe("test add light component", () => {
            let _execAddDirectionLightComponent = () => {
              let boxComponentCount = ComponentDomTool.getBoxComponentCount();
              let renderingCategoryDomIndex =
                ComponentDomTool.getRenderingCategoryDomIndex();
              let lightTypeDomIndex = ComponentDomTool.getLightTypeDomIndex();

              OperateComponentEventTool.addComponentIntoCurrentGameObject(
                boxComponentCount,
                renderingCategoryDomIndex,
                lightTypeDomIndex,
              );
            };

            test(
              "current gameObject shouldn't have light component before add it",
              () =>
              (
                StateLogicService.getEditEngineState()
                |> LightEngineService.hasLightComponent(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                     ),
                   ),
                StateLogicService.getRunEngineState()
                |> LightEngineService.hasLightComponent(
                     GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                   ),
              )
              |> expect == (false, false)
            );
            test(
              "current gameObject should have light component after add it", () => {
              _execAddDirectionLightComponent();

              (
                StateLogicService.getEditEngineState()
                |> LightEngineService.hasLightComponent(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                     ),
                   ),
                StateLogicService.getRunEngineState()
                |> LightEngineService.hasLightComponent(
                     GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                   ),
              )
              |> expect == (true, true);
            });

            describe(
              "should re-init all light material components in the scene", () =>
              describe("test add direction light component", () =>
                test("glsl->DIRECTION_LIGHTS_COUNT should + 1", () => {
                  let (editGl, runGl) =
                    FakeGlToolEngine.getEditEngineStateGlAndRunEngineStateGl();
                  let editGlShaderSource = editGl##shaderSource;
                  let runGlShaderSource = runGl##shaderSource;

                  _execAddDirectionLightComponent();

                  (
                    GLSLToolEngine.contain(
                      GLSLToolEngine.getVsSource(editGlShaderSource),
                      {|#define DIRECTION_LIGHTS_COUNT 2|},
                    ),
                    GLSLToolEngine.contain(
                      GLSLToolEngine.getVsSource(runGlShaderSource),
                      {|#define DIRECTION_LIGHTS_COUNT 2|},
                    ),
                  )
                  |> expect == (true, true);
                })
              )
            );
          })
        )
    );
  });