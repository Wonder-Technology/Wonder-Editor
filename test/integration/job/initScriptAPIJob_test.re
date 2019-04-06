open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("init script api job", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test api", () =>
      describe("disposeGameObject", () => {
        describe("handle engine state", () =>
          test("dispose gameObject", () => {
            let disposeGameObjectFunc =
              InitScriptAPIJob._buildDisposeGameObjectFunc(
                InitScriptJobTool.createScriptAPIJsObj(),
              );

            let engineState = StateEngineService.unsafeGetState();

            let (engineState, gameObject, _) =
              GameObjectToolEngine.createGameObject(engineState);

            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);

            GameObjectToolEngine.isAlive(gameObject, engineState)
            |> expect == false;
          })
        );

        describe("handle editor state", () =>
          test("clear current data", () => {
            let disposeGameObjectFunc =
              InitScriptAPIJob._buildDisposeGameObjectFunc(
                InitScriptJobTool.createScriptAPIJsObj(),
              );
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, gameObject, _) =
              GameObjectToolEngine.createGameObject(engineState);
            engineState |> StateEngineService.setState |> ignore;
            GameObjectTool.setCurrentSceneTreeNode(gameObject);

            let engineState = StateEngineService.unsafeGetState();
            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);
              engineState |> StateEngineService.setState  |> ignore;

            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          })
        );
      })
    );
  });