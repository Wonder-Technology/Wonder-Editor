open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("Header", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test operate gameObject", () => {
      beforeEach(() =>
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
        )
      );

      describe("test add gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          )
        );

        describe("test add emptyGameObject", () =>
          test(
            "the added emptyGameObject should only has transform component", () => {
            let engineState = StateEngineService.unsafeGetState();

            let newGameObject = GameObjectTool.getNewGameObjectUid();

            HeaderTool.addEmptyGameObject();

            MainEditorSceneTreeTool.Select.selectGameObject(
              ~gameObject=newGameObject,
              (),
            );

            (
              engineState
              |> GameObjectComponentEngineService.hasTransformComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
              engineState
              |> GameObjectComponentEngineService.hasMeshRendererComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
            )
            |> expect == (true, false);
          })
        );
      });
      describe("test dispose gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          )
        );
        test(
          "if not set current gameObject, log error message and continue", () => {
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );
          GameObjectTool.clearCurrentSceneTreeNode();

          HeaderTool.disposeCurrentSceneTreeNode();

          ConsoleTool.getMessage(error)
          |> expect
          |> toContain("current gameObject should exist, but actual is None");
        });

        describe("else", () =>
          test("remove current gameObject from editorState", () => {
            let component =
              BuildComponentTool.buildHeader(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );

            HeaderTool.disposeCurrentSceneTreeNode();

            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          })
        );
      });

      describe("fix bug", () =>
        test(
          "remove gameObject has children;
            the children should be removed together;",
          () => {
            let (scene, (box1, box3, box4), box2) =
              SceneTreeTool.buildFourLayerSceneGraphToEngine(sandbox);
            GameObjectTool.setCurrentSceneTreeNode(box1);

            let engineState = StateEngineService.unsafeGetState();

            HeaderTool.disposeCurrentSceneTreeNode();

            (
              engineState |> GameObjectTool.isAlive(box1),
              engineState |> GameObjectTool.isAlive(box3),
              engineState |> GameObjectTool.isAlive(box4),
            )
            |> expect == (false, false, false);
          },
        )
      );
    });

    describe("test ambient light", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
      });

      test("test change color should set into engine", () => {
        let newColor = {
          "hex": "#7df1e8",
          "rgb": {
            "r": 125,
            "g": 241,
            "b": 232,
          },
        };

        HeaderTool.changeColor(newColor);

        SceneEngineService.getAmbientLightColor
        |> StateLogicService.getEngineStateToGetData
        |> Color.getHexString
        |> expect == newColor##hex;
      });
    });
  });