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
          MainEditorSceneTool.initStateAndGl(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "fix bug",
        () => {
          describe(
            "test snapshot",
            () => {
              test(
                "if not set currentGameObject, disposed button's disabled props should == true",
                () => {
                  MainEditorSceneTool.createDefaultScene(sandbox, () => ());
                  BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine())
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "if set currentGameObject, disposed button's disabled props should == false",
                () => {
                  MainEditorSceneTool.createDefaultScene(
                    sandbox,
                    MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
                  );
                  BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine())
                  |> ReactTestTool.createSnapshotAndMatch
                }
              )
            }
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