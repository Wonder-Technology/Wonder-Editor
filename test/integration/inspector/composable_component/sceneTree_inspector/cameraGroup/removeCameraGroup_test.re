open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test remove camera group", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test remove all scene->camera groups", () => {
      test("should remove from inspector", () => {
        SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
        |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("should remove activedBasicCameraView from editorState", () => {
        SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
        |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

        GameViewEditorService.getActivedBasicCameraView(
          StateEditorService.getState(),
        )
        |> expect == None;
      });
    });

    describe("test still has other camera groups after remove ", () => {
      beforeEach(() => {
        HeaderTool.triggerAddBox();

        SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
        |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

        AddableComponentTool.addCameraGroupInBox();
      });

      test("should mark last scene camera to be active", () => {
        let lastBasicCameraView =
          SceneEditorService.getCurrentSceneTreeNode(
            StateEditorService.getState(),
          )
          |> OptionService.unsafeGet
          |> GameObjectComponentEngineService.getBasicCameraViewComponent(
               _,
               StateEngineService.unsafeGetState(),
             );
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();

        SceneTreeNodeDomTool.OperateDefaultScene.getCameraGroupFromCamera()
        |> OperateComponentEventTool.removeComponentFromCurrentGameObject;

        GameViewEditorService.getActivedBasicCameraView(
          StateEditorService.getState(),
        )
        |> expect == Some(lastBasicCameraView);
      });
    });
  });