open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("CheckSceneTreeLogicService", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("checkGameObjectRelation", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        let engineState = StateEngineService.unsafeGetState();
        engineState
        |> FakeGlToolEngine.setFakeGl(
             FakeGlToolEngine.buildFakeGl(~sandbox, ()),
           )
        |> StateEngineService.setState
        |> ignore;
      });

      test("if draged and target gameObject is the same one, return fail", () =>
        CheckSceneTreeLogicService.checkGameObjectRelation(1, 1)
        |> StateLogicService.getStateToGetData
        |> Result.RelationResult.isSuccess
        |> expect == false
      );

      describe("else", () => {
        test(
          "if draged gameObject is target gameObject's parent, return fail", () => {
          let editorState = StateEditorService.getState();
          let engineState = StateEngineService.unsafeGetState();
          let (engineState, gameObject1, transform1) =
            GameObjectToolEngine.createGameObject(engineState);
          let (engineState, gameObject2, transform2) =
            GameObjectToolEngine.createGameObject(engineState);

          let engineState =
            GameObjectUtils.addChild(gameObject1, gameObject2, engineState);

          CheckSceneTreeLogicService.checkGameObjectRelation(
            gameObject2,
            gameObject1,
            (editorState, engineState),
          )
          |> Result.RelationResult.isSuccess
          |> expect == false;
        });

        describe("else", () =>
          test(
            "if target gameObject is draged gameObject's parent, return fail",
            () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, gameObject1, transform1) =
              GameObjectToolEngine.createGameObject(engineState);
            let (engineState, gameObject2, transform2) =
              GameObjectToolEngine.createGameObject(engineState);

            let engineState =
              GameObjectUtils.addChild(gameObject1, gameObject2, engineState);

            CheckSceneTreeLogicService.checkGameObjectRelation(
              gameObject1,
              gameObject2,
              (editorState, engineState),
            )
            |> Result.RelationResult.isSuccess
            |> expect == false;
          })
        );
      });
    });
  });