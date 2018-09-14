open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test add camera group", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("shouldn't active basicCameraView", () => {
      AddableComponentTool.addCameraGroupInBox();

      GameObjectTool.unsafeGetCurrentSceneTreeNode()
      |> GameObjectComponentEngineService.getBasicCameraViewComponent(
           _,
           StateEngineService.unsafeGetState(),
         )
      |> BasicCameraViewEngineService.isActiveBasicCameraView(
           _,
           StateEngineService.unsafeGetState(),
         )
      |> expect == false;
    });
  });