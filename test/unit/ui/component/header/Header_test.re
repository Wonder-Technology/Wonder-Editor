open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Header ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(sandbox);
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      /* describe(
        "test snapshot",
        () => {
          beforeEach(() => TestTool.closeContractCheck());
          afterEach(() => TestTool.openContractCheck());
          test(
            "header ui component",
            () =>
              BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine())
              |> ReactTestTool.createSnapshotAndMatch
          )
        }
      ); */
      describe(
        "fix bug",
        () => {
          describe(
            "test snapshot",
            () =>
            /* TODO add case */
              test(
                "if not set currentGameObject, disposed button's disabled props should == true",
                () => {
                  MainEditorSceneTool.createDefaultScene(sandbox, () => ());
                  /* let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    ); */
                  /* BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDispose
                  ); */
                  BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine())
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
          );
          describe(
            "test logic",
            () =>
              test(
                "if scene children has only one camera, can't remove it",
                () =>
                  (
                    MainEditorSceneTool.unsafeGetScene()
                    |> GameObjectTool.getChildren
                    |> Js.Array.filter(
                         (gameObject) =>
                           CameraEngineService.isCamera(gameObject)
                           |> StateLogicService.getEngineStateToGetData
                       )
                    |> Js.Array.length,
                    HeaderUtils.doesSceneHasRemoveableCamera()
                  )
                  |> expect == (1, false)
              )
          )
        }
      )
    }
  );