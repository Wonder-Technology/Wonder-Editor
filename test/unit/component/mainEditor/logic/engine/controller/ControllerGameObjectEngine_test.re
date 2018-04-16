open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;
/* TODO all: move into folder
TODO split to ControllerHeaderAddBoxEngine_test, ControllerHeaderDisposeGameObjectEngine_test */


/* TODO add material, scenetree ... tests */


/* TODO move all controller tests to unit/component/header/controller/ */

let _ =
  describe(
    "engine:controller gameObject",
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
        "test add gameObject",
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
            "add one box gameObject, the engineStateForEdit and engineStateForRun's children length should == 5",
            () => {
              let component =
                BuildComponentTool.buildHeader(SceneTreeTool.buildAppStateSceneGraphFromEngine());
              BaseEventTool.triggerComponentEvent(
                component,
                OperateGameObjectEventTool.triggerClickAddBox
              );
              (
                StateLogicService.getEditEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length,
                StateLogicService.getRunEngineState()
                |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                |> Js.Array.length
              )
              |> expect == (5, 4)
            }
          )
        }
      );
      describe(
        "test dispose gameObject from engine",
        () => {
          describe(
            "test logic",
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
                "dispose current gameObject, the engineStateForEdit and engineStateForRun's children length should == 3",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
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
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
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
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
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
                  WonderLog.Log.print(1) |> ignore;
                  expect(1) == 1
                }
              )
            }
          )
        }
      )
    }
  );