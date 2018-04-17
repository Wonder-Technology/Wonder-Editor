open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "controller header dispose gameObject",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          TestTool.closeContractCheck();
          sandbox := createSandbox()
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestTool.openContractCheck()
        }
      );
      describe(
        "test dispose gameObject from engine",
        () => {
          beforeEach(
            () => {
              MainEditorSceneTool.initStateAndGl(sandbox);
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              GameObjectTool.unsafeGetCurrentGameObject()
              |> GameObjectTool.addFakeVboBufferForGameObject
            }
          );
          test(
            "dispose current gameObject, the EditEngineState's children length == 3 and RunEngineState's children length should == 2",
            () => {
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDispose
              );
              (
                StateLogicService.getEditEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length,
                StateLogicService.getRunEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length
              )
              |> expect == (3, 2)
            }
          );
          test(
            "disposed current gameObject shouldn't in engineStateForEdit and engineStateForRun's children",
            () => {
              let currentGameObject = GameObjectTool.unsafeGetCurrentGameObject();
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDispose
              );
              (
                StateLogicService.getEditEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.includes(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       currentGameObject
                     )
                   ),
                StateLogicService.getRunEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.includes(currentGameObject)
              )
              |> expect == (false, false)
            }
          )
        }
      );
      describe(
        "dispose current gameObject from sceneTree",
        () => {
          beforeEach(
            () => {
              MainEditorSceneTool.initStateAndGl(sandbox);
            }
          );
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
          );
          test(
            "dispose current gameObject, the sceneTree children should == 2",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              GameObjectTool.unsafeGetCurrentGameObject()
              |> GameObjectTool.addFakeVboBufferForGameObject;
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDispose
              );
              BuildComponentTool.buildSceneTree(SceneTreeTool.buildAppStateSceneGraphFromEngine())
              |> ReactTestTool.createSnapshotAndMatch
            }
          )
        }
      );
      describe(
        "fix bug",
        () => {
          test(
            "dispose gameObject should re-render edit canvas and run canvas",
            () => {
              TestToolEngine.createAndSetEngineState(
                ~sandbox,
                ~noWorkerJobRecord=
                  NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                    ~loopPipelines={|[
                                  {"name": "default", "jobs": [{"name": "clear_color"}]}
                                ]|},
                    ()
                  ),
                ()
              );
              TestTool.createScene();
              TestToolEngine.setFakeGl(sandbox);
              AllMaterialToolEngine.prepareForInit();
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              let editEngineState = StateLogicService.getEditEngineState();
              let runEngineState = StateLogicService.getRunEngineState();
              let eeGl = DeviceManagerToolEngine.getGl(editEngineState) |> Obj.magic;
              let reGl = DeviceManagerToolEngine.getGl(runEngineState) |> Obj.magic;
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDispose
              );
              MainEditorSceneTool.setFirstBoxTobeCurrentGameObject();
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickDispose
              );
              (eeGl##clearColor |> getCallCount, reGl##clearColor |> getCallCount)
              |> expect == (1, 1)
            }
          );
          test(
            "can't dispose last camera",
            () => {
              MainEditorSceneTool.initStateAndGl(sandbox);
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              GameObjectTool.unsafeGetCurrentGameObject()
              |> GameObjectTool.addFakeVboBufferForGameObject;



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
            }
          )
        }
      )
    }
  );