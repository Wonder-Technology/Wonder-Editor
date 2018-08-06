open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

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
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test add component", () =>
      describe("test add component in engine", () =>
        describe("test add light component", () => {
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
            AddableComponentTool.execAddDirectionLightComponent();

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
        })
      )
    );
  });